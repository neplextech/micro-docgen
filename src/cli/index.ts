import { Command } from 'commander';
import { createDocumentation } from '../documentation';
import path from 'path';

export function createCommandLine(args: string[]) {
    const { name, version } = (() => {
        try {
            const root = require.resolve('micro-docgen');
            const pkg = require(`${root}/package.json`);
            return { name: pkg.name, version: pkg.version };
        } catch (e) {
            return { name: 'micro-docgen', version: 'unknown' };
        }
    })();

    const program = new Command();

    program
        .name(name)
        .version(version)
        .name('micro-docgen')
        .helpCommand(true)
        .description('Generate documentation for TypeScript projects')
        .option('-c, --config <path>', 'Path to the configuration file', './micro-docgen.json')
        .parse(args);

    const options = program.opts();
    console.log(options);

    try {
        var config = require(path.resolve(process.cwd(), options.config));
    } catch {
        console.error('Failed to load configuration file');
        process.exit(1);
    }

    createDocumentation(config)
        .then(() => console.log('Documentation generated successfully'))
        .catch((e) => console.error('Failed to generate documentation:', e));
}
