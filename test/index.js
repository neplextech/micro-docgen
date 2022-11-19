const { Docgen } = require("../dist/index");
const docgen = new Docgen();
const fs = require("fs");

const path = `${__dirname}/../src/**/*.ts`;
docgen.addFiles(path);
fs.writeFileSync("./docs.json", JSON.stringify(docgen.generate(), null, "\t"));

// docgen.addFile("./example.ts");

// console.log(docgen.generate().classes[0].methods[0].jsdoc);