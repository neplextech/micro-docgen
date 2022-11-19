import { Project, SourceFile } from "ts-morph";
import { ClassParser, DocumentedClass } from "./parser/ClassParser";
import { FunctionParser, DocumentedFunction } from "./parser/FunctionParser";

export interface Documentation {
    classes: Array<DocumentedClass>;
    functions: Array<DocumentedFunction>;
    file: string;
}

class MicroDocgen {
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

    public generate(pattern?: readonly string[]): Documentation[] {
        const meta: Documentation[] = [];

        for (const file of this.getFiles(pattern)) {
            const doc: Documentation = {
                file: file.getFilePath(),
                classes: new ClassParser(file.getClasses()).serialize(),
                functions: new FunctionParser(file.getFunctions()).serialize()
            };

            meta.push(doc);
        }

        return meta;
    }
}

export { MicroDocgen as Docgen, ClassParser };