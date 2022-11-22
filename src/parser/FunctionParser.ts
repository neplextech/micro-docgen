import { FunctionDeclaration, ParameterDeclaration } from 'ts-morph';
import { formatType } from '../utils/formatType';
import { DocumentMeta, JSDocDeclaration } from './ClassParser';

export interface DocumentedFunction {
    default: boolean;
    name: string;
    parameters: DocumentedParameter[];
    returns: string;
    jsdoc: JSDocDeclaration[];
    meta: DocumentMeta;
}

export interface DocumentedParameter {
    name: string;
    readonly: boolean;
    optional: boolean;
    type: string;
}

export class FunctionParser {
    public constructor(public src: FunctionDeclaration[], public filePath: string) {}

    public serialize() {
        const funcs: DocumentedFunction[] = [];
        for (const declaration of this.src) {
            if (!declaration.isExported()) continue;

            const doc: DocumentedFunction = {
                default: declaration.isDefaultExport(),
                name: declaration.getName()!,
                parameters: this.serializeParameters(declaration.getParameters()),
                returns: formatType(declaration.getReturnType().getText()),
                jsdoc: declaration.getJsDocs().map((m) => ({
                    description: m.getDescription()
                })),
                meta: {
                    line: declaration.getStartLineNumber(false),
                    file: this.filePath
                }
            };

            funcs.push(doc);
        }

        return funcs;
    }

    public serializeParameters(params: ParameterDeclaration[]) {
        return params.map((m) => ({
            name: m.getName(),
            type: formatType(m.getType().getText()),
            optional: m.isOptional(),
            readonly: m.isReadonly(),
            rest: m.isRestParameter()
        })) as DocumentedParameter[];
    }
}
