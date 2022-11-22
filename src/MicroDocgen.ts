import { Project, SourceFile } from "ts-morph";
import { ClassParser, DocumentedClass } from "./parser/ClassParser";
import { FunctionParser, DocumentedFunction } from "./parser/FunctionParser";
import { normalizePath } from "./utils/pathNormalizer";
import fs from "fs";

export interface Documentation {
    classes: Array<DocumentedClass>;
    functions: Array<DocumentedFunction>;
    custom: CustomDocument[];
    meta: {
        generatedTimestamp: number;
        generatedAt: string;
    }
}

export interface CustomDocument {
    file: string;
    content: string;
    name: string;
}

export interface CustomDocumentRegisterInfo {
    path: string;
    displayPath?: string;
    name: string;
}

class MicroDocgen {
    private customFileStore : Array<CustomDocument> = [];
    public project = new Project();
    public constructor() { }

    public addFile(path: string) {
        this.project.addSourceFileAtPath(path);
    }

    public addFiles(path: string | readonly string[]) {
        this.project.addSourceFilesAtPaths(path);
    }

    public getFiles(pattern?: readonly string[]): Array<SourceFile> {
        if (Array.isArray(pattern)) return this.project.getSourceFiles(pattern);
        return this.project.getSourceFiles();
    }

    public addCustomSync(file: CustomDocumentRegisterInfo) {
        if (!file.name || typeof file.name !== "string") throw new TypeError("File name must be a non-empty string");
        if (this.customFileStore.some(r => r.name === file.name)) throw new Error(`File with name ${file.name} already exists`);

        try {
            const content = fs.readFileSync(file.path, { encoding: "utf-8" });
            this.customFileStore.push({
                content,
                file: file.displayPath || file.path,
                name: file.name
            });
        } catch (e) {
            throw new Error(`Failed to load file at path ${file.path}:\n${e}`);
        }
    }

    public async addCustom(file: CustomDocumentRegisterInfo) {
        if (!file.name || typeof file.name !== "string") throw new TypeError("File name must be a non-empty string");
        if (this.customFileStore.some(r => r.name === file.name)) throw new Error(`File with name ${file.name} already exists`);

        try {
            const content = await fs.promises.readFile(file.path, { encoding: "utf-8" });
            this.customFileStore.push({
                content,
                file: file.displayPath || file.path,
                name: file.name
            });
        } catch (e) {
            throw new Error(`Failed to load file at path ${file.path}:\n${e}`);
        }
    }

    public generate(pattern?: readonly string[]): Documentation {
        const gen = new Date();

        const doc: Documentation = {
            custom: this.customFileStore,
            classes: [],
            functions: [],
            meta: {
                generatedAt: gen.toISOString(),
                generatedTimestamp: gen.getTime()
            }
        };

        for (const file of this.getFiles(pattern)) {
            const filePath = normalizePath(file.getFilePath());

            doc.classes.push(...new ClassParser(file.getClasses(), filePath).serialize());
            doc.functions.push(...new FunctionParser(file.getFunctions(), filePath).serialize());
        }


        return doc;
    }
}

export { MicroDocgen as Docgen };