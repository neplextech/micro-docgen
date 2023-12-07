import { createDocumentation } from '../src';

async function main() {
    // test
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

main();
