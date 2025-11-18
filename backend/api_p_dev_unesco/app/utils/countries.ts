import countries from 'i18n-iso-countries'
import fr from 'i18n-iso-countries/langs/fr.json' with { type: 'json' }

countries.registerLocale(fr)

export function iso2ToFrenchName(code: string | null | undefined): string | null {
  if (!code) return null

  const upper = code.toUpperCase()

  const name = countries.getName(upper, 'fr')

  return name ?? null
}
