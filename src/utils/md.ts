import { stripIndents } from 'common-tags';

export type HeadingTypes = 1 | 2 | 3 | 4 | 5 | 6;
export type MdHeading<T extends string> =
    | `# ${T}`
    | `## ${T}`
    | `### ${T}`
    | `#### ${T}`
    | `##### ${T}`
    | `###### ${T}`;

export function heading<T extends string>(src: T): `# ${T}`;
export function heading<T extends string>(src: T, type: 1): `# ${T}`;
export function heading<T extends string>(src: T, type: 2): `## ${T}`;
export function heading<T extends string>(src: T, type: 3): `### ${T}`;
export function heading<T extends string>(src: T, type: 4): `#### ${T}`;
export function heading<T extends string>(src: T, type: 5): `##### ${T}`;
export function heading<T extends string>(src: T, type: 6): `###### ${T}`;
export function heading<T extends string>(src: T, type: HeadingTypes = 1): MdHeading<T> {
    return `${'#'.repeat(type)} ${src}` as `# ${T}`;
}

export function headingId<T extends string, U extends string>(
    src: T,
    id: U,
    type: HeadingTypes = 1
): `<h${HeadingTypes} id="${U}">${T}</h${HeadingTypes}>` {
    return `<h${type} id="${id}">${src}</h${type}>`;
}

export function code<T extends string>(src: T) {
    return `\`${src}\`` as const;
}

export function codeBlock<T extends string, U extends string>(src: T, lang?: U) {
    return `\`\`\`${lang || ''}\n${src}\n\`\`\`` as const;
}

export function bold<T extends string>(src: T) {
    return `**${src}**` as const;
}

export function italic<T extends string>(src: T) {
    return `*${src}*` as const;
}

export function strikethrough<T extends string>(src: T) {
    return `~~${src}~~` as const;
}

export function subscript<T extends string>(src: T) {
    return `~${src}~` as const;
}

export function superscript<T extends string>(src: T) {
    return `^${src}^` as const;
}

export function highlight<T extends string>(src: T) {
    return `==${src}==` as const;
}

export function taskList<T extends string>(src: T): `[] ${T}`;
export function taskList<T extends string>(src: T, checked?: false): `[] ${T}`;
export function taskList<T extends string>(src: T, checked: true): `[x] ${T}`;
export function taskList<T extends string>(src: T, checked = false) {
    return `[${checked ? 'x' : ''}] ${src}` as const;
}

export function blockquote<T extends string>(src: T) {
    return `> ${src}` as const;
}

export function ul<T extends string>(src: T) {
    return `- ${src}` as const;
}

export function ol<T extends string>(src: T): `${number}. ${T}` {
    return `1. ${src}`;
}

export function hr() {
    return `---` as const;
}

export function hyperlink<T extends string, U extends string>(text: T, link: U) {
    return `[${text}](${link})` as const;
}

export function image<T extends string, U extends string>(alt: T, link: U) {
    return `![${alt}](${link})` as const;
}

export function table(heading: string[], body: string[][]) {
    return stripIndents`| ${heading.join(' | ')} |
    | ${heading.map(() => '-'.repeat(11)).join(' | ')} |
    ${body.map((m) => `| ${m.join(' | ').replace(/\n/g, ' ')} |`).join('\n')}`;
}
