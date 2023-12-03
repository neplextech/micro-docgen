import { createDocumentation } from '../../src/index';

async function main() {
    const docs = await createDocumentation({
        tsconfigPath: './tsconfig.json',
        input: ['./src'],
        markdown: false,
        custom: [
            {
                category: 'Welcome',
                name: 'Welcome',
                path: 'README.md'
            }
        ],
        output: './docs',
        jsonName: 'docs.json'
    });

    console.log(`Took ${docs.metadata.generationMs.toFixed(0)}ms to generate the documentation!`);
}

main();
