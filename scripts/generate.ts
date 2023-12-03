import { createDocumentation } from '../src';

async function main() {
    const docs = await createDocumentation({
        tsconfigPath: './tsconfig.json',
        input: ['./src'],
        markdown: true,
        output: './docs'
    });

    console.log(`Took ${docs.metadata.generationMs.toFixed(0)}ms to generate the documentation!`);
}

main();
