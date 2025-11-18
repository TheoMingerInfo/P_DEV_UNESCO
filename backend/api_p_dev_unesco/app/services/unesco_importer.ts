/* eslint-disable @typescript-eslint/naming-convention */

import fs from 'node:fs'
import Type from '#models/type'
import Country from '#models/country'
import Site from '#models/site'

/**
 * Enum strict correspondant à la colonne ENUM de ta table countries
 */
type ContinentEnum = 'Europe' | 'Asie' | 'Amérique' | 'Afrique' | 'Océanie' | 'Antarctique'

export default class UnescoImporter {
  /**
   * Importe les données UNESCO depuis un fichier JSON.
   * @param filePath chemin du fichier JSON
   * @param opts.dryRun si true → aucune écriture
   */
  public async importFromFile(filePath: string, opts: { dryRun?: boolean } = {}) {
    const dryRun = opts.dryRun === true

    // ---------------------------------------------------------------------
    // 1. Lire & parser le fichier
    // ---------------------------------------------------------------------
    if (!fs.existsSync(filePath)) {
      console.log(filePath)
      throw new Error(`Le fichier ${filePath} est introuvable`)
    }

    const raw = fs.readFileSync(filePath, 'utf8')
    let json: any

    try {
      json = JSON.parse(raw)
    } catch {
      throw new Error('JSON UNESCO invalide')
    }

    // ---------------------------------------------------------------------
    // 2. Détection du format (3 formats possibles UNESCO)
    // ---------------------------------------------------------------------
    let rows: any[] = []

    if (Array.isArray(json)) {
      rows = json
    } else if (Array.isArray(json.results)) {
      rows = json.results.map((r: { record: { fields: any } }) => r.record?.fields ?? {})
    } else if (Array.isArray(json.records)) {
      rows = json.records.map((r: { fields: any }) => r.fields ?? {})
    } else {
      throw new Error('Format JSON non supporté')
    }

    let imported = 0
    let skipped = 0

    // ---------------------------------------------------------------------
    // 3. Parcours des entrées UNESCO
    // ---------------------------------------------------------------------
    for (const rawItem of rows) {
      const f = rawItem.record?.fields ?? rawItem.fields ?? rawItem

      // On a besoin d’au minimum name_fr + iso_codes + category
      if (!f.name_fr || !f.iso_codes || !f.category) {
        skipped++
        continue
      }

      // -------------------------------------------------------------------
      // 3.1 Normalisation des champs UNESCO
      // -------------------------------------------------------------------
      const siteName = String(f.name_fr).trim()

      // description obligatoire dans ta DB
      const description = (f.short_description_fr ?? '').trim()
      if (!description) {
        skipped++
        continue
      }

      // image (facultatif)
      const imageRaw = Array.isArray(f.images_urls) ? f.images_urls[0] : f.images_urls
      const image_path = (imageRaw ?? '').slice(0, 255)

      // ISO / pays
      const iso =
        Array.isArray(f.iso_codes) && f.iso_codes.length > 0 ? f.iso_codes[0] : f.iso_codes

      const countryName =
        Array.isArray(f.states_names) && f.states_names.length > 0
          ? f.states_names[0]
          : f.states_names

      if (!countryName) {
        skipped++
        continue
      }

      // continent (enum obligatoire)
      const continent = this.mapContinent(f.region)

      // register_date → timestamp NOT NULL
      const registerDate = f.date_inscribed ? new Date(f.date_inscribed) : null
      if (!registerDate || Number.isNaN(registerDate.getTime())) {
        skipped++
        continue
      }

      // coordonnées obligatoires
      const lon = Number(f.coordinates?.lon ?? null)
      const lat = Number(f.coordinates?.lat ?? null)
      if (!Number.isFinite(lon) || !Number.isFinite(lat)) {
        skipped++
        continue
      }

      // -------------------------------------------------------------------
      // 3.2 Mode Dry-run : uniquement comptage
      // -------------------------------------------------------------------
      if (dryRun) {
        imported++
        continue
      }

      // -------------------------------------------------------------------
      // 3.3 Enregistrement du Type
      // -------------------------------------------------------------------
      const typeModel = await Type.updateOrCreate(
        { name: f.category.trim() },
        { name: f.category.trim() }
      )

      // -------------------------------------------------------------------
      // 3.4 Enregistrement du Pays
      // continent est obligatoire (enum strict)
      const countryModel = await Country.updateOrCreate(
        { iso: iso },
        {
          name: countryName.trim(),
          iso: iso,
          continent: continent,
        }
      )

      // -------------------------------------------------------------------
      // 3.5 Enregistrement du Site
      // clé unique : name
      // -------------------------------------------------------------------
      await Site.updateOrCreate(
        { name: siteName },
        {
          name: siteName,
          image_path,
          description,
          register_date: registerDate,
          longitude: lon,
          latitude: lat,
          typeId: typeModel.id,
          countryId: countryModel.id,
        }
      )

      imported++
    }

    return {
      ok: true,
      imported,
      skipped,
    }
  }

  /**
   * Convertit la valeur UNESCO "region" en enum strict de la DB:
   */
  private mapContinent(region: string | null): ContinentEnum {
    if (!region) return 'Europe'

    const r = region.toLowerCase()

    if (r.includes('europe')) return 'Europe'
    if (r.includes('asia') || r.includes('asie')) return 'Asie'
    if (r.includes('america') || r.includes('amérique')) return 'Amérique'
    if (r.includes('africa') || r.includes('afrique')) return 'Afrique'
    if (r.includes('oceania') || r.includes('océanie')) return 'Océanie'
    if (r.includes('antarctic')) return 'Antarctique'

    return 'Europe'
  }
}
