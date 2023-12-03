import path from 'path';
import { JSONOutput } from 'typedoc';

export function getName(decl: JSONOutput.DeclarationReflection) {
    return decl.name === 'default'
        ? path.parse(getFileMetadata(decl)?.name || 'default').name
        : decl.name;
}

export function getFileMetadata(decl: JSONOutput.DeclarationReflection): FileMetadata | null {
    const src = decl.sources?.[0];
    if (!src) return null;

    return {
        name: path.basename(src.fileName),
        directory: path.dirname(src.fileName),
        line: src.line,
        url: src.url
    };
}

export interface FileMetadata {
    name: string;
    directory: string;
    line: number;
    url?: string;
}

export function escape(src: string) {
    return src
        .replace(/\[/g, '\\[')
        .replace(/\</g, '\\<')
        .replace(/\*/g, '\\*')
        .replace(/\-/g, '\\-')
        .replace(/\|/g, '\\|')
        .replace(/\`/g, '\\`')
        .replace(/\{/g, '\\{');
}

export function parseType(t: JSONOutput.SomeType): string {
    if (!t?.type) return '';
    switch (t.type) {
        case 'array':
            return `Array<${parseType(t.elementType)}>`;
        case 'conditional':
            return `${parseType(t.checkType)} extends ${parseType(t.extendsType)} ? ${parseType(
                t.trueType
            )} : ${parseType(t.falseType)}`;
        case 'indexedAccess':
            return `${parseType(t.objectType)}[${parseType(t.indexType)}]`;
        case 'intersection':
            return t.types.map(parseType).join(' & ');
        case 'predicate':
            return `${t.asserts ? 'asserts ' : ''}${t.name}${
                t.targetType ? ` is ${parseType(t.targetType)}` : ''
            }`;
        case 'reference':
            return `${t.name}${
                t.typeArguments ? `<${t.typeArguments.map(parseType).join(', ').trim()}>` : ''
            }`;
        case 'reflection': {
            const obj = {} as Record<string, any>;
            const { children, signatures } = t.declaration;

            if (children && children.length > 0) {
                for (const child of children) {
                    obj[child.name] = parseType(child.type as JSONOutput.SomeType);
                }
                return `{ ${Object.entries(obj)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(', ')} }`;
            }

            if (signatures && signatures.length > 0) {
                const s = signatures[0];
                const params = s.parameters?.map(
                    (p) =>
                        `${p.name}: ${
                            p.type ? parseType(p.type as JSONOutput.SomeType) : 'unknown'
                        }`
                );
                return `(${params?.join(', ') || '...args: unknown[]'}) => ${
                    s.type ? parseType(s.type as JSONOutput.SomeType) : 'unknown'
                }`;
            }

            return '{}';
        }
        case 'templateLiteral':
            return t.tail
                .map((tail) => {
                    return `${t.head.replace(/\n/g, '\\n')}\\$\{${escape(
                        parseType(tail[0])
                    )}\}${tail[1].replace(/\n/g, '\\n')}`;
                })
                .join(' | ');
        case 'literal':
            return typeof t.value === 'string' ? `'${t.value}'` : `${t.value}`;
        case 'tuple':
            return `[${t.elements?.map(parseType).join(', ') || ''}]`;
        case 'typeOperator':
            return `${t.operator} ${parseType(t.target)}`;
        case 'union':
            return t.types
                .map(parseType)
                .filter((t) => !!t?.trim().length)
                .join(' | ');
        case 'query':
            return `(typeof ${parseType(t.queryType)})`;
        case 'inferred':
        case 'intrinsic':
        case 'unknown':
            return t.name;
        default:
            return 'any';
    }
}

export function parseTypes(t: JSONOutput.SomeType): string[] {
    if (!t?.type) return [''];
    switch (t.type) {
        case 'array':
            return ['Array', '<', ...parseTypes(t.elementType), '>'];
        case 'conditional':
            return [
                ...parseTypes(t.checkType),
                ' ',
                'extends',
                ' ',
                ...parseTypes(t.extendsType),
                ' ? ',
                ...parseTypes(t.trueType),
                ' : ',
                ...parseTypes(t.falseType)
            ];
        case 'indexedAccess':
            return [...parseTypes(t.objectType), '[', ...parseTypes(t.indexType), ']'];
        case 'intersection':
            return t.types.flatMap((m, i, a) =>
                [...parseTypes(m), i === a.length - 1 ? '' : ' & '].filter((m) => !!m)
            );
        case 'predicate': {
            const res: string[] = [];
            if (t.asserts) res.push('asserts', ' ', t.name);
            if (t.targetType) res.push(' is', ...parseTypes(t.targetType));
            return res;
        }
        case 'reference': {
            const res: string[] = [];
            res.push(t.name);
            if (t.typeArguments) res.push('<', ...t.typeArguments.flatMap(parseTypes), '>');
            return res;
        }
        case 'reflection': {
            const obj = {} as Record<string, any>;
            const { children, signatures } = t.declaration;

            if (children && children.length > 0) {
                for (const child of children) {
                    obj[child.name] = parseTypes(child.type as JSONOutput.SomeType);
                }
                return [
                    '{',
                    ' ',
                    ...Object.entries(obj)
                        .flatMap(([k, v], i, a) => [
                            k,
                            ':',
                            ' ',
                            ...[Array.isArray(v) ? v.flat() : v],
                            ';'.concat(i === a.length - 1 ? '' : ' ')
                        ])
                        .flat(),
                    ' ',
                    '}'
                ];
            }

            if (signatures && signatures.length > 0) {
                const s = signatures[0];
                const params = s.parameters?.flatMap(
                    (p) =>
                        `${p.name}: ${
                            p.type ? parseTypes(p.type as JSONOutput.SomeType) : 'unknown'
                        }`
                );
                return [
                    '(',
                    ...(params || ['...args', 'unknown', '[', ']']),
                    ')',
                    ' ',
                    '=>',
                    ' ',
                    ...(s.type ? parseTypes(s.type as JSONOutput.SomeType) : ['unknown'])
                ];
            }

            return ['{', '}'];
        }
        case 'literal':
            return typeof t.value === 'string' ? ["'", t.value, "'"] : [`${t.value}`];
        case 'templateLiteral':
            return t.tail.map(
                (tail) => `\`${t.head}${t.tail.length ? `\\$\{${parseType(tail[0])}\}\`` : ''}`
            );
        case 'tuple':
            return ['[', ...(t.elements?.flatMap(parseTypes) || []), ']'];
        case 'typeOperator':
            return [t.operator, ...parseTypes(t.target)];
        case 'union':
            return t.types
                .flatMap(parseTypes)
                .filter((t) => !!t)
                .flat(Infinity);
        case 'query':
            return ['(', 'typeof', ' ', ...parseTypes(t.queryType), ')'];
        case 'inferred':
        case 'intrinsic':
        case 'unknown':
            return [t.name];
        default:
            return ['any'];
    }
}

export function makeId(src: string, prefix?: string) {
    src = src
        .replace(/ +/g, '-')
        .replace(/#/g, '-')
        .replace(/\</g, '-')
        .replace(/\>/g, '-')
        .replace(/\[/g, '-')
        .replace(/\]/g, '-');
    return `${prefix || ''}${src}`;
}
