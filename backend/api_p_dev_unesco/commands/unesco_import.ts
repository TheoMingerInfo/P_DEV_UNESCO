import { BaseCommand, args } from '@adonisjs/core/ace'
import UnescoImporter from '#services/unesco_importer'

export default class UnescoImport extends BaseCommand {
  public static commandName = 'unesco:import'
  public static description = 'Importer les données UNESCO'

  public static options = {
    startApp: true,
  }

  @args.string({ description: 'Chemin du fichier JSON à importer' })
  declare filePath: string

  public async run() {
    const importer = new UnescoImporter()

    const result = await importer.importFromFile(this.filePath, {
      dryRun: false,
    })

    this.logger.info(JSON.stringify(result, null, 2))
  }
}
