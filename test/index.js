const { Docgen } = require("../dist/index");
const docgen = new Docgen();
const fs = require("fs");

docgen.addFiles(`${__dirname}/../src/index.ts`);
fs.writeFileSync("./docs.json", JSON.stringify(docgen.generate(), null, "\t"));