import { JSONOutput, ReflectionKind } from 'typedoc';
import { FileMetadata, getFileMetadata, getName, parseType, parseTypes } from '../utils';
import { AbstractSerializer } from './AbstractSerializer';

export interface DocumentedClass {
    name: string;
    description: string | null;
    see: string[];
    extends: string | null;
    rawExtends: string[] | null;
    implements: string | null;
    rawImplements: string[] | null;
    private: boolean;
    abstract: boolean;
    deprecated: boolean;
    constructor: DocumentedClassConstructor | null;
    methods: DocumentedClassMethod[];
    properties: DocumentedClassProperty[];
    metadata: FileMetadata | null;
}

export interface DocumentedClassConstructor extends DocumentedClassMethod {
    constructor: string;
}

export interface DocumentedClassProperty {
    name: string;
    description: string | null;
    see: string[];
    static: boolean;
    private: boolean;
    readonly: boolean;
    abstract: boolean;
    deprecated: boolean;
    default: string | null;
    type: string | null;
    rawType: string[] | null;
    metadata: FileMetadata | null;
}

export interface DocumentedParameter {
    name: string;
    description: string | null;
    optional: boolean;
    default: string | null;
    type: string | null;
    rawType: string[] | null;
}

export interface DocumentedClassMethod {
    name: string;
    description: string | null;
    see: string[];
    static: boolean;
    private: boolean;
    examples: string[];
    abstract: boolean;
    deprecated: boolean;
    parameters: DocumentedParameter[];
    returns: {
        type: string;
        rawType: string[] | null;
        description: string | null;
    } | null;
    metadata: FileMetadata | null;
}

export class ClassSerializer extends AbstractSerializer {
    public serialize(): DocumentedClass {
        const ctor = this.declaration.children?.find((c) => c.kind === ReflectionKind.Constructor);
        const properties = this.declaration.children?.filter(
            (c) => c.kind === ReflectionKind.Property || c.kind === ReflectionKind.Accessor
        );
        const methods = this.declaration.children?.filter((c) => c.kind === ReflectionKind.Method);

        const ctorSig = ctor?.signatures?.find(
            (r) => r.kind === ReflectionKind.ConstructorSignature
        );

        return {
            name: getName(this.declaration),
            abstract:
                this.declaration.flags.isAbstract ||
                !!this.declaration.comment?.blockTags?.some((r) => r.tag === '@abstract'),
            constructor: ctor
                ? {
                      ...this.parseMethod(ctor),
                      name: (ctorSig?.type as any)?.name || this.declaration.name || ctor.name,
                      constructor:
                          ctorSig?.name ||
                          `new ${
                              (ctorSig?.type as any)?.name || this.declaration.name || ctor.name
                          }`
                  }
                : null,
            metadata: getFileMetadata(this.declaration),
            deprecated: !!this.declaration.comment?.blockTags?.some((r) => r.tag === '@deprecated'),
            description: this.declaration.comment?.summary?.map((t) => t.text).join('') || null,
            extends: this.declaration.extendedTypes?.length
                ? parseType(this.declaration.extendedTypes[0])
                : null,
            implements: this.declaration.implementedTypes?.length
                ? parseType(this.declaration.implementedTypes[0])
                : null,
            rawExtends: this.declaration.extendedTypes?.length
                ? parseTypes(this.declaration.extendedTypes[0])
                : null,
            rawImplements: this.declaration.implementedTypes?.length
                ? parseTypes(this.declaration.implementedTypes[0])
                : null,
            methods: methods?.map((m) => this.parseMethod(m)) || [],
            private:
                this.declaration.flags.isPrivate ||
                !!this.declaration.comment?.blockTags?.some((r) => r.tag === '@private'),
            properties: properties?.map((m) => this.parseProperties(m)) || [],
            see:
                this.declaration.comment?.blockTags
                    ?.filter((r) => r.tag === '@see')
                    .map((m) => m.content?.[0].text) || []
        };
    }

    public parseProperties(decl: JSONOutput.DeclarationReflection): DocumentedClassProperty {
        const base = {
            abstract:
                decl.flags.isAbstract ||
                !!decl.comment?.blockTags?.some((r) => r.tag === '@abstract'),
            default:
                decl.defaultValue ||
                decl.comment?.blockTags?.find((r) => r.tag === '@default')?.content?.[0].text ||
                null,
            deprecated: !!decl.comment?.blockTags?.some((r) => r.tag === '@deprecated'),
            description: decl.comment?.summary?.map((t) => t.text).join('') || null,
            metadata: getFileMetadata(decl),
            name: decl.name,
            private:
                decl.flags.isPrivate ||
                !!decl.comment?.blockTags?.some((r) => r.tag === '@private'),
            readonly:
                decl.flags.isReadonly ||
                !!decl.comment?.blockTags?.some((r) => r.tag === '@readonly'),
            see:
                decl.comment?.blockTags
                    ?.filter((r) => r.tag === '@see')
                    .map((m) => m.content[0].text) || [],
            static:
                decl.flags.isStatic || !!decl.comment?.blockTags?.some((r) => r.tag === '@static'),
            type: decl.type ? parseType(decl.type) : 'any'
        } as DocumentedClassProperty;

        if (decl.kind === ReflectionKind.Accessor) {
            const getter = decl.getSignature;
            if (!getter) throw new Error(`Accessor ${decl.name} does not have a getter`);

            const setter = decl.setSignature != null;
            if (!setter) base.readonly = true;

            return Object.assign(base, {
                abstract:
                    getter.flags.isAbstract ||
                    getter.comment?.blockTags?.some((r) => r.tag === '@abstract'),
                deprecated: getter.comment?.blockTags?.some((r) => r.tag === '@deprecated'),
                description: getter.comment?.summary?.map((t) => t.text).join(''),
                metadata: getFileMetadata(getter as unknown as JSONOutput.DeclarationReflection),
                name: getter.name,
                private:
                    getter.flags.isPrivate ||
                    getter.comment?.blockTags?.some((r) => r.tag === '@private'),
                readonly:
                    getter.flags.isReadonly ||
                    getter.comment?.blockTags?.some((r) => r.tag === '@readonly'),
                see: getter.comment?.blockTags
                    ?.filter((r) => r.tag === '@see')
                    .map((m) => m.content.map((t) => t.text).join('')),
                static:
                    getter.flags.isStatic ||
                    getter.comment?.blockTags?.some((r) => r.tag === '@static'),
                type: getter.type ? parseType(getter.type) : 'any'
            } as Partial<DocumentedClassProperty>);
        }

        return base;
    }

    public parseMethod(decl: JSONOutput.DeclarationReflection): DocumentedClassMethod {
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
