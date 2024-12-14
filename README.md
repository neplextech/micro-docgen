# micro-docgen

TypeScript documentation generator on steroids 💉. MicroDocgen is built on top of typedoc to leverage its power and add more features.

## TODO

- Static site generation
- More options
- CLI

## Installation

```sh
$ npm install micro-docgen
```

## Usage

```js
import { createDocumentation } from 'micro-docgen';

await createDocumentation({
    // source files
    input: ['src'],
    // output directory
    output: 'docs',
    // tsconfig path
    tsconfigPath: './tsconfig.json',
    // to generate markdown files
    markdown: true,
    // to generate json file
    jsonName: 'docs.json',
    // include custom files such as readme
    custom: [...]
});
```

## CLI usage

You need to have `./micro-docgen.json` file in your project root.

```json
{
    "input": ["src"],
    "output": "docs",
    "tsconfigPath": "./tsconfig.json",
    "markdown": true,
    "jsonName": "docs.json"
}
```

Then run:

```sh
$ docgen
```

or

```sh
$ micro-docgen
```
