# `micro-docgen`

Simple documentation generator for TypeScript projects.

> ⚠️ **WIP!! Currently only supports class serialization**

# Example

```js
const { Docgen } = require('micro-docgen');
const docgen = new Docgen();
const fs = require('fs');

// add source file(s)
docgen.addFiles('./src/*.ts');

// Generate json
const documentation = docgen.generate();

// write the output to docs.json
fs.writeFileSync('./docs.json', JSON.stringify(documentation, null, '\t'));
```
