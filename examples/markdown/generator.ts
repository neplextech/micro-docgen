import { createDocumentation } from '../../src/index';

async function main() {
    const docs = await createDocumentation({
        tsconfigPath: './tsconfig.json',
        input: ['./lib'],
        markdown: true,
        custom: [
            {
                category: 'Welcome',
                name: 'Introduction',
                path: 'README.md'
            }
        ],
        output: './docs'
    });

    console.log(`Took ${docs.metadata.generationMs}ms to generate the documentation!`);
}

main();
