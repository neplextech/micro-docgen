import {
    ClassDeclaration,
    ConstructorDeclaration,
    MethodDeclaration,
    PropertyDeclaration,
    ts
} from 'ts-morph';
import { formatType } from '../utils/formatType';

export interface DocumentMeta {
    line: number;
}

export interface DocumentedClass {
    abstract: boolean;
    default: boolean;
    ambient: boolean;
    name: string | null;
    constructors: Array<ClassConstructor>;
    properties: Array<ClassProperty>;
    methods: Array<ClassMethod>;
    meta: DocumentMeta;
}

export interface ClassConstructor {
    scope: string;
    parameters: Array<ClassConstructorParameter>;
    returns: string;
    meta: DocumentMeta;
}

export interface ClassConstructorParameter {
    name: string;
    type: string;
}

export interface ClassProperty {
    static: boolean;
    abstract: boolean;
    ambient: boolean;
    readonly: boolean;
    name: string;
    type: string;
    scope: string;
    jsdoc: {
        description: string;
    }[];
    meta: DocumentMeta;
}

export interface ClassMethod {
    static: boolean;
    abstract: boolean;
    async: boolean;
    generator: boolean;
    name: string;
    returns: string;
    scope: string;
    parameters: {
        name: string;
        type: string;
        optional: boolean;
        readonly: boolean;
        restParameter: boolean;
    }[];
    jsdoc: JSDocDeclaration[];
    meta: DocumentMeta;
}

export interface JSDocDeclaration {
    description: string;
}

export class ClassParser {
    public constructor(public src: ClassDeclaration[]) {}

    public serialize(): Array<DocumentedClass> {
        const serialized: Array<DocumentedClass> = [];

        for (const declaration of this.src) {
            // skip unexported classes
            if (!declaration.isExported()) continue;
            const doc: DocumentedClass = {
                abstract: declaration.isAbstract(),
                default: declaration.isDefaultExport(),
                ambient: declaration.isAmbient(),
                name: declaration.getName() || null,
                constructors: declaration
                    .getConstructors()
                    .map((c) => this.serializeConstructor(c)),
                properties: declaration.getProperties().map((p) => this.serializeProperty(p)),
                methods: declaration.getMethods().map((m) => this.serializeMethod(m)),
                meta: {
                    line: declaration.getStartLineNumber(false)
                }
            };

            serialized.push(doc);
        }

        return serialized;
    }

    public serializeProperty(p: PropertyDeclaration): ClassProperty {
        return {
            static: p.isStatic(),
            abstract: p.isAbstract(),
            ambient: p.isAmbient(),
            readonly: p.isReadonly(),
            name: p.getName(),
            type: formatType(p.getType().getText()),
            scope: p.getScope() as string,
            jsdoc: p.getJsDocs().map((m) => ({
                description: m.getDescription()
            })),
            meta: {
                line: p.getStartLineNumber(false)
            }
        };
    }

    public serializeMethod(m: MethodDeclaration): ClassMethod {
        return {
            static: m.isStatic(),
            abstract: m.isAbstract(),
            async: m.isAsync(),
            generator: m.isGenerator(),
            name: m.getName(),
            returns: formatType(m.getReturnType().getText()),
            scope: m.getScope() as string,
            parameters: m.getParameters().map((p) => ({
                name: p.getName(),
                type: formatType(p.getType().getText()),
                optional: p.isOptional(),
                readonly: p.isReadonly(),
                restParameter: p.isRestParameter()
            })),
            jsdoc: m.getJsDocs().map((m) => ({
                description: m.getDescription()
            })),
            meta: {
                line: m.getStartLineNumber(false)
            }
        };
    }

    public serializeConstructor(c: ConstructorDeclaration): ClassConstructor {
        const parameters = c.getParameters().map((m) => ({
            name: m.getName(),
            type: formatType(m.getType().getText()),
            optional: m.isOptional(),
            readonly: m.isReadonly(),
            restParameter: m.isRestParameter()
        }));
        const returns = formatType(c.getReturnType().getText());

        return {
            parameters,
            returns,
            scope: c.getScope(),
            meta: {
                line: c.getStartLineNumber(false)
            }
        };
    }
}
