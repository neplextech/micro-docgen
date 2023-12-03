import { JSONOutput, ReflectionKind } from 'typedoc';
import { FunctionDeclaration } from 'typescript';
import { getFileMetadata, getName, parseType, parseTypes } from '../utils';
import { AbstractSerializer } from './AbstractSerializer';
import { DocumentedClassMethod, DocumentedParameter } from './ClassSerializer';

export type DocumentedFunction = DocumentedClassMethod;

export class FunctionSerializer extends AbstractSerializer {
    public serialize(): DocumentedFunction {
        const decl = this.declaration;
        const signature = decl.signatures?.[0] || decl;

        return {
            name: decl.name,
            description: signature.comment?.summary?.map((t) => t.text).join('') || null,
            see:
                signature.comment?.blockTags
                    ?.filter((r) => r.tag === '@see')
                    .map((t) => t.content.map((t) => t.text).join('')) || [],
            static: !!signature.flags.isStatic || !!decl.flags.isStatic,
            private:
                decl.flags.isPrivate ||
                !!signature.comment?.blockTags?.filter((r) => r.tag === '@private').length,
            examples:
                signature.comment?.blockTags
                    ?.filter((r) => r.tag === '@example')
                    .map((t) => t.content.map((t) => t.text).join('')) || [],
            abstract:
                decl.flags.isAbstract ||
                !!signature.comment?.blockTags?.some((r) => r.tag === '@abstract'),
            deprecated: !!signature.comment?.blockTags?.some((r) => r.tag === '@deprecated'),
            parameters:
                (signature as any).parameters?.map((m: any) => this.parseParameter(m)) ||
                ((decl as any).parameters || decl.typeParameters)?.map((m: any) =>
                    this.parseParameter(m)
                ) ||
                [],
            returns: {
                type: signature.type ? parseType(signature.type) : 'any',
                rawType: signature.type ? parseTypes(signature.type) : ['any'],
                description:
                    signature.comment?.blockTags
                        ?.find((r) => r.tag === '@returns')
                        ?.content?.map((t) => t.text)
                        .join('') || null
            },
            metadata: getFileMetadata(decl)
        };
    }

    public parseParameter(decl: JSONOutput.TypeParameterReflection): DocumentedParameter {
        return {
            name: decl.name,
            description:
                decl.comment?.summary
                    ?.map((t) => t.text)
                    .join('')
                    .trim() || null,
            optional: !!decl.flags.isOptional,
            default:
                (decl.default as any)?.name ||
                decl.comment?.blockTags?.find((r) => r.tag === '@default')?.content[0].text ||
                null,
            type: decl.type ? parseType(decl.type) : 'any',
            rawType: decl.type ? parseTypes(decl.type) : ['any']
        };
    }
}
