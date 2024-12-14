import { createDocumentation } from '../src';

async function generateJSON() {
    const docs = await createDocumentation({
        tsconfigPath: './tsconfig.json',
        input: ['./src'],
        markdown: false,
        output: './docs',
        jsonName: 'docs.json',
        clean: true
    });

    console.log(`Took ${docs.metadata.generationMs.toFixed(0)}ms to generate the documentation!`);
}

async function generateMarkdown() {
    const docs = await createDocumentation({
        tsconfigPath: './tsconfig.json',
        input: ['./src'],
        markdown: true,
        output: './docs/markdown',
        clean: true,
        typeLinkerBasePath: '/docs/markdown'
    });

    console.log(`Took ${docs.metadata.generationMs.toFixed(0)}ms to generate the documentation!`);
}

async function main() {
    await generateJSON();
    await generateMarkdown();
}

main();
