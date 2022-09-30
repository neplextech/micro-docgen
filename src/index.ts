import { Project, SourceFile } from "ts-morph";
import { ClassParser, DocumentedClass } from "./parser/ClassParser";

export interface Documentation {
    classes: Array<DocumentedClass>;
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

    public generate(pattern?: readonly string[]): Documentation {
        const meta = {} as Documentation;

        for (const file of this.getFiles(pattern)) {
            const classParser = new ClassParser(file.getClasses());
            meta.classes = classParser.serialize();
        }

        return meta;
    }
}

export { MicroDocgen as Docgen, ClassParser };