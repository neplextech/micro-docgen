import * as TypeDoc from 'typedoc';
import { mkdir, readFile, rm, rmdir, writeFile } from 'fs/promises';
import tmp from 'tmp';
import path from 'path';
import {
    ClassSerializer,
    DocumentedClass,
    DocumentedFunction,
    DocumentedTypes,
    FunctionSerializer,
    TypesSerializer
} from './serializers';
import { MarkdownGenerator, MarkdownGeneratorMarkdownBuild } from './generators/MarkdownGenerator';
import { escape } from './utils';
import { hyperlink } from './utils/md';
import { existsSync } from 'fs';
import { DefaultLinksFactory } from './utils/links';

export type MicroDocgenLink = Record<string, string>;

export { LogLevel as DebugLogLevel } from 'typedoc';

export interface MicroDocgenInit {
    jsonInputPath?: string | null;
    input?: string[] | null;
    jsonName?: string;
    output?: string;
    noEmit?: boolean;
    custom?: MicroDocgenCustomFile[];
    tsconfigPath?: string;
    print?: boolean;
    spaces?: number;
    markdown?: boolean;
    noLinkTypes?: boolean;
    extension?: string;
    links?: MicroDocgenLink;
    debug?: TypeDoc.LogLevel | 'Verbose' | 'Info' | 'Warn' | 'Error' | 'None';
    flattenSingleModule?: boolean;
    clean?: boolean;
}

export interface MicroDocgenCustomFile {
    name: string;
    path: string;
    category: string;
    type?: string;
}

export interface DocumentationMetadata {
    timestamp: number;
    generationMs: number;
}

export interface Documentation {
    custom: Record<
        string,
        (MicroDocgenCustomFile & {
            content: string;
        })[]
    >;
    modules: Record<
        string,
        {
            name: string;
            classes: {
                markdown: MarkdownGeneratorMarkdownBuild[];
                data: DocumentedClass;
            }[];
            types: {
                markdown: MarkdownGeneratorMarkdownBuild[];
                data: DocumentedTypes;
            }[];
            functions: {
                markdown: MarkdownGeneratorMarkdownBuild[];
                data: DocumentedFunction;
            }[];
            variables: {
                markdown: MarkdownGeneratorMarkdownBuild[];
                data: DocumentedTypes;
            }[];
            enum: {
                markdown: MarkdownGeneratorMarkdownBuild[];
                data: DocumentedTypes;
            }[];
        }
    >;
    metadata: DocumentationMetadata;
}

export async function createDocumentation(options: MicroDocgenInit): Promise<Documentation> {
    let data: TypeDoc.JSONOutput.ProjectReflection | undefined = undefined;

    options.debug ??= TypeDoc.LogLevel.Verbose;
    options.noLinkTypes ??= false;
    options.links ??= DefaultLinksFactory;
    options.extension ??= 'md';
    options.flattenSingleModule ??= true;
    options.clean ??= true;

    const shouldLog = ![
        'None',
        'Warn',
        'Error',
        TypeDoc.LogLevel.None,
        TypeDoc.LogLevel.Error,
        TypeDoc.LogLevel.Warn
    ].includes(options.debug);

    const start = performance.now();

    if (options.jsonInputPath) {
        data = JSON.parse(
            await readFile(options.jsonInputPath, 'utf-8')
        ) as TypeDoc.JSONOutput.ProjectReflection;
    } else if (options.input) {
        const app = await TypeDoc.Application.bootstrap({
            plugin: [],
            entryPoints: options.input,
            tsconfig: options.tsconfigPath,
            logLevel: options.debug
        });
        const tmpOutputPath = path.join(tmp.dirSync().name, 'project-reflection.json');

        app.options.addReader(new TypeDoc.TSConfigReader());
        app.options.addReader(new TypeDoc.TypeDocReader());

        const _proj = await app.convert();

        if (_proj) {
            await app.generateJson(_proj, tmpOutputPath);
            data = JSON.parse(
                await readFile(tmpOutputPath, 'utf-8')
            ) as TypeDoc.JSONOutput.ProjectReflection;
        }
    }

    if (!data && !options.custom?.length) {
        throw new Error('No input files to process');
    }

    const doc: Documentation = {
        custom: {},
        modules: {},
        metadata: {
            generationMs: 0,
            timestamp: 0
        }
    };

    const modules = (() => {
        if (data?.kind === TypeDoc.ReflectionKind.Project) {
            const childs = data.children?.filter((r) => r.kind === TypeDoc.ReflectionKind.Module);
            if (!childs?.length) return [data];
            return childs;
        }

        return data?.children?.filter((r) => r.kind === TypeDoc.ReflectionKind.Module);
    })();

    const mdTransformer = new MarkdownGenerator({
        links: options.links,
        linker: (t, r) => {
            const { noLinkTypes = false, links = {} } = options;
            if (noLinkTypes) return escape(t);
            const linkKeys = Object.entries(links);

            const linkTypes = (type: string) => {
                for (const [li, val] of linkKeys) {
                    if (li.toLowerCase() === type.toLowerCase()) {
                        const hyl = hyperlink(escape(type), val);
                        return hyl;
                    }
                }

                return escape(type);
            };

            const linked = r.map((p) => linkTypes(p)).join('');
            return linked;

            // TODO: auto link
            // let metadata: DocumentedClass | DocumentedClassProperty | DocumentedClassMethod | DocumentedTypes | null = null,
            //     prefix = '';

            // for (const c of Object.values(doc.modules)) {
            //     for (const res of c.classes) {
            //         if (res.data.name === src) {
            //             metadata = res.data;
            //             prefix = 'c-';
            //             break;
            //         }

            //         const foundProp = res.data.properties.find((r) => r.name === src);
            //         if (foundProp) {
            //             metadata = foundProp;
            //             prefix = 'p-';
            //             break;
            //         }

            //         const foundMethod = res.data.methods.find((r) => r.name === src);
            //         if (foundMethod) {
            //             metadata = foundMethod;
            //             prefix = 'm-';
            //             break;
            //         }
            //     }

            //     if (!metadata) {
            //         for (const res of c.types) {
            //             if (res.data.name === src) {
            //                 metadata = res.data;
            //                 prefix = 't-';
            //                 break;
            //             }
            //         }
            //     }
            // }

            // if (!metadata) return t;
            // const link = `/${prefix === 't-' ? 'types' : 'classes'}/${metadata.name}#${makeId(src, prefix)}`;
            // return hyperlink(t, link);
        }
    });

    if (Array.isArray(modules)) {
        if (shouldLog) console.log('Processing modules...');
        modules.forEach((mod, i) => {
            if (!mod.children) return;

            if (shouldLog)
                console.log(`Processing module "${mod.name}" (${i + 1} of ${modules.length})...`);

            doc.modules[mod.name] ??= {
                classes: [],
                functions: [],
                name: mod.name,
                types: [],
                enum: [],
                variables: []
            };

            const currentModule = doc.modules[mod.name];
            mod.children?.forEach((child) => {
                switch (child.kind) {
                    case TypeDoc.ReflectionKind.Class:
                        {
                            const classSerializer = new ClassSerializer(child);
                            const serialized = classSerializer.serialize();
                            currentModule.classes.push({
                                data: serialized,
                                markdown: options.markdown
                                    ? mdTransformer.transformClass([serialized])
                                    : []
                            });
                        }
                        break;
                    case TypeDoc.ReflectionKind.Interface:
                    case TypeDoc.ReflectionKind.TypeAlias:
                    case TypeDoc.ReflectionKind.Enum:
                    case TypeDoc.ReflectionKind.Variable:
                        {
                            const typesSerializer = new TypesSerializer(child);
                            const serialized = typesSerializer.serialize();

                            const dest =
                                TypeDoc.ReflectionKind.Enum === child.kind
                                    ? currentModule.enum
                                    : TypeDoc.ReflectionKind.Variable === child.kind
                                      ? currentModule.variables
                                      : currentModule.types;

                            dest.push({
                                data: serialized,
                                markdown: options.markdown
                                    ? mdTransformer.transformTypes([serialized])
                                    : []
                            });
                        }
                        break;
                    case TypeDoc.ReflectionKind.Function:
                        {
                            const functionsSerializer = new FunctionSerializer(child);
                            const serialized = functionsSerializer.serialize();

                            currentModule.functions.push({
                                data: serialized,
                                markdown: options.markdown
                                    ? mdTransformer.transformFunctions([serialized])
                                    : []
                            });
                        }
                        break;
                    default:
                        break;
                }
            });
        });
    }

    if (Array.isArray(options.custom) && options.custom.length > 0) {
        if (shouldLog) console.log('Processing custom files...');
        await Promise.all(
            options.custom.map(async (m) => {
                const cat = doc.custom[m.category || 'Custom'];
                if (!cat) doc.custom[m.category || 'Custom'] = [];

                doc.custom[m.category || 'Custom'].push({
                    category: m.category || 'Custom',
                    name: m.name,
                    path: m.path,
                    type: m.type,
                    content: await readFile(m.path, 'utf-8')
                });
            })
        );
    }

    doc.metadata = {
        generationMs: performance.now() - start,
        timestamp: Date.now()
    };

    if (options.print) console.log(doc);

    if (!options.noEmit) {
        if (!options.output) throw new Error('Output path was not specified');
        const outputExists = existsSync(options.output);

        if (options.clean && outputExists) {
            await rm(options.output, {
                recursive: true,
                force: true
            });
        }
        if (!outputExists) await mkdir(options.output, { recursive: true });

        if (options.jsonName) {
            const docStr = JSON.stringify(doc, null, options.spaces || 0);
            await writeFile(path.join(options.output, options.jsonName), docStr);
        }

        if (options.markdown) {
            const shouldFlatten =
                Object.keys(doc.modules).length === 1 && options.flattenSingleModule;
            const createBasePath = (...loc: string[]) => {
                if (shouldFlatten) loc.pop();
                return path.join(...loc);
            };

            if (shouldFlatten && shouldLog) console.log('Flattening single module...');

            for (const moduleIdx in doc.modules) {
                const module = doc.modules[moduleIdx];

                await Promise.all([
                    ...module.classes.flatMap((cl) => {
                        return cl.markdown.map(async (md) => {
                            const classPath = createBasePath(
                                options.output!,
                                'classes',
                                module.name
                            );

                            if (shouldLog)
                                console.log(
                                    `Writing class document "${md.name}.${options.extension}"`
                                );

                            if (!existsSync(classPath))
                                await mkdir(classPath, {
                                    recursive: true
                                });

                            await writeFile(
                                path.join(classPath, `${md.name}.${options.extension}`),
                                md.content
                            );
                        });
                    }),
                    ...module.types.flatMap((cl) => {
                        return cl.markdown.map(async (md) => {
                            const typesPath = createBasePath(options.output!, 'types', module.name);
                            if (shouldLog)
                                console.log(
                                    `Writing types document "${md.name}.${options.extension}"`
                                );
                            if (!existsSync(typesPath))
                                await mkdir(typesPath, {
                                    recursive: true
                                });
                            await writeFile(
                                path.join(typesPath, `${md.name}.${options.extension}`),
                                md.content
                            );
                        });
                    }),
                    ...module.enum.flatMap((cl) => {
                        return cl.markdown.map(async (md) => {
                            const typesPath = createBasePath(options.output!, 'enums', module.name);
                            if (shouldLog)
                                console.log(
                                    `Writing enums document "${md.name}.${options.extension}"`
                                );
                            if (!existsSync(typesPath))
                                await mkdir(typesPath, {
                                    recursive: true
                                });
                            await writeFile(
                                path.join(typesPath, `${md.name}.${options.extension}`),
                                md.content
                            );
                        });
                    }),
                    ...module.variables.flatMap((cl) => {
                        return cl.markdown.map(async (md) => {
                            const typesPath = createBasePath(
                                options.output!,
                                'variables',
                                module.name
                            );
                            if (shouldLog)
                                console.log(
                                    `Writing variables document "${md.name}.${options.extension}"`
                                );
                            if (!existsSync(typesPath))
                                await mkdir(typesPath, {
                                    recursive: true
                                });
                            await writeFile(
                                path.join(typesPath, `${md.name}.${options.extension}`),
                                md.content
                            );
                        });
                    }),
                    ...module.functions.flatMap((cl) => {
                        return cl.markdown.map(async (md) => {
                            const funcsPath = createBasePath(
                                options.output!,
                                'functions',
                                module.name
                            );
                            if (shouldLog)
                                console.log(
                                    `Writing functions document "${md.name}.${options.extension}"`
                                );
                            if (!existsSync(funcsPath))
                                await mkdir(funcsPath, {
                                    recursive: true
                                });
                            await writeFile(
                                path.join(funcsPath, `${md.name}.${options.extension}`),
                                md.content
                            );
                        });
                    })
                ]);
            }

            for (const fileIdx in doc.custom) {
                const file = doc.custom[fileIdx];

                await Promise.all(
                    file.map(async (m) => {
                        const catPath = path.join(options.output!, path.normalize(m.category));

                        if (shouldLog)
                            console.log(
                                `Writing custom file ${m.name}${m.type || path.extname(m.path)}`
                            );

                        if (!existsSync(catPath))
                            await mkdir(catPath, {
                                recursive: true
                            });

                        await writeFile(
                            path.join(catPath, `${m.name}${m.type || path.extname(m.path)}`),
                            m.content
                        );
                    })
                );
            }
        }
    }

    return doc;
}

export default createDocumentation;
export * from './generators';
export * from './serializers';
export * from './utils';
