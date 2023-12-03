# micro-docgen

TypeScript documentation generator on steroids 💉. MicroDocgen is built on top of typedoc to leverage its power and add more features.

## TODO

-   Static site generation
-   More options

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
