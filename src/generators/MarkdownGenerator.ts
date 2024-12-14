import {
    DocumentedClass,
    DocumentedClassConstructor,
    DocumentedClassMethod,
    DocumentedClassProperty,
    DocumentedFunction,
    DocumentedTypes
} from '../serializers';
import { bold, code, codeBlock, heading, hyperlink, table } from '../utils/md';
import { FileMetadata, escape } from '../utils';
import { MicroDocgenLink } from '..';

export interface MarkdownGeneratorMarkdownBuild {
    name: string;
    metadata: FileMetadata | null;
    content: string;
}

export interface MarkdownGeneratorMdBuilderOptions {
    linker: (t: string, s: string[]) => string;
    links: MicroDocgenLink;
    includeHeaders: boolean;
}

const escapeMultiLine = (src: string) => src.replace(/\n|\r/g, ' ');

/**
 * MarkdownGenerator is a class that generates markdown documentation for classes, functions, and types.
 * It transforms the JSON output from the serializer into markdown and applies the necessary formatting or linking.
 */
export class MarkdownGenerator {
    public linker: typeof this.options.linker;

    public constructor(public options: MarkdownGeneratorMdBuilderOptions) {
        this.linker = this.options.linker;
    }

    public getHeaders(value: DocumentedClass | DocumentedTypes | DocumentedFunction) {
        const headers = [
            '---',
            `title: ${escapeMultiLine(escape(value.name))}`,
            `description: ${escapeMultiLine(escape(value.description || 'No description provided'))}`,
            '---',
            ''
        ];

        return headers.join('\n');
    }

    public getClassHeading(c: DocumentedClass) {
        return `${heading(escape(c.name), 2)}${
            c.extends ? ` extends ${this.linker(c.extends, [c.extends])}` : ''
        }${c.implements ? ` implements ${this.linker(c.implements, [c.implements])}` : ''}${
            c.description ? `\n${c.description}\n` : ''
        }`;
    }

    public getCtor(c: DocumentedClassConstructor) {
        if (!c) return '';

        const ctor = codeBlock(
            `new ${escape(c.constructor)}(${c.parameters
                .filter((p) => !p.name.includes('.'))
                .map((m) => m.name)
                .join(', ')})`,
            'typescript'
        );

        if (c.parameters.length) {
            const tableHead = ['Parameter', 'Type', 'Optional'];
            if (c.parameters.some((p) => p.description && p.description.trim().length > 0))
                tableHead.push('Description');
            const tableBody = c.parameters.map((m) => {
                const params = [
                    escape(m.name),
                    this.linker(m.type || 'any', [m.type || 'any']),
                    m.optional ? '✅' : '❌'
                ];

                if (tableHead.includes('Description')) params.push(m.description || 'N/A');

                return params;
            });

            return `\n${ctor}\n${table(tableHead, tableBody)}\n`;
        }

        return `\n${ctor}\n`;
    }

    public transformClass(classes: DocumentedClass[]): MarkdownGeneratorMarkdownBuild[] {
        return classes.map((c) => {
            return {
                name: c.name,
                metadata: c.metadata,
                content: this.getMarkdown(c)
            };
        });
    }

    public transformFunctions(types: DocumentedFunction[]): MarkdownGeneratorMarkdownBuild[] {
        return types.map((t) => {
            return {
                name: t.name,
                metadata: t.metadata,
                content: this.getFunctions(t)
            };
        });
    }

    public transformTypes(types: DocumentedTypes[]): MarkdownGeneratorMarkdownBuild[] {
        return types.map((t) => {
            return {
                name: t.name,
                metadata: t.metadata,
                content: this.getTypeMarkdown(t)
            };
        });
    }

    public getTypeMarkdown(t: DocumentedTypes) {
        const md = [
            heading(escape(t.name), 2),
            t.description ? '\n' + t.description : '',
            t.deprecated ? `\n- ${bold('⚠️ Deprecated')}` : '',
            t.properties.length
                ? (() => {
                      const tableHead = ['Property', 'Type', 'Value'];
                      if (
                          t.properties.some((p) => p.description && p.description.trim().length > 0)
                      )
                          tableHead.push('Description');
                      const tableBody = t.properties.map((n) => {
                          const params = [
                              escape(n.name),
                              this.linker(n.type || 'any', [n.type || 'any']),
                              escape(n.value || 'N/A')
                          ];

                          if (tableHead.includes('Description'))
                              params.push(n.description || 'N/A');

                          return params;
                      });

                      return `\n${table(tableHead, tableBody)}\n`;
                  })()
                : t.type
                  ? `\n- Type: ${this.linker(t.type, [t.type])}`
                  : '',
            t.metadata?.url ? `\n- ${hyperlink('Source', t.metadata.url)}` : ''
        ];

        if (this.options.includeHeaders) {
            md.unshift(this.getHeaders(t));
        }

        return md
            .filter((r) => r.length > 0)
            .join('\n')
            .trim();
    }

    public getMarkdown(c: DocumentedClass) {
        const md = [
            this.getClassHeading(c),
            this.getCtor(c.constructor!),
            this.getProperties(c.properties),
            this.getMethods(c.methods)
        ];

        if (this.options.includeHeaders) {
            md.unshift(this.getHeaders(c));
        }

        return md.join('\n\n');
    }

    public getProperties(properties: DocumentedClassProperty[]) {
        if (!properties.length) return '';

        const head = heading('Properties', 2);
        const body = properties.map((m) => {
            const name = `${m.private ? 'private' : 'public'} ${m.static ? 'static ' : ''}${escape(
                m.name
            )}`.trim();
            const title = heading(
                `${name}: ${this.linker(m.type || 'any', m.rawType || ['any'])}`,
                3
            );
            const desc = [
                m.description || '',
                m.deprecated ? `\n- ${bold('⚠️ Deprecated')}` : '',
                m.metadata?.url ? `\n- ${hyperlink('Source', m.metadata.url)}` : ''
            ]
                .filter((r) => r.length > 0)
                .join('\n')
                .trim();

            return `${title}\n${desc}`;
        });

        return `${head}\n${body.join('\n')}`;
    }

    public getMethods(methods: DocumentedClassMethod[]) {
        if (!methods.length) return '';

        const head = heading('Methods', 2);
        const body = methods.map((m) => {
            const name = `${m.private ? `private` : `public`} ${m.static ? 'static ' : ''}${escape(
                m.name
            )}(${m.parameters
                .filter((r) => !r.name.includes('.'))
                .map((m) => {
                    return `${m.name}${m.optional ? '?' : ''}`;
                })
                .join(', ')})`.trim();
            const title = heading(
                `${name}: ${
                    m.returns?.type
                        ? `${this.linker(m.returns.type || 'any', m.returns.rawType || ['any'])}`
                        : 'any'
                }`,
                3
            );
            const desc = [
                m.description || '',
                m.deprecated ? `\n- ${bold('⚠️ Deprecated')}` : '',
                m.examples
                    ? '\n' +
                      m.examples
                          .map((m) => (m.includes('```') ? m : codeBlock(m, 'typescript')))
                          .join('\n\n')
                    : '',
                m.parameters.length
                    ? (() => {
                          const tableHead = ['Parameter', 'Type', 'Optional'];
                          if (
                              m.parameters.some(
                                  (p) => p.description && p.description.trim().length > 0
                              )
                          )
                              tableHead.push('Description');
                          const tableBody = m.parameters.map((n) => {
                              const params = [
                                  n.default
                                      ? `${escape(n.name)}=${code(escape(n.default))}`
                                      : escape(n.name),
                                  this.linker(n.type || 'any', n.rawType || ['any']),
                                  n.optional ? '✅' : '❌'
                              ];

                              if (tableHead.includes('Description'))
                                  params.push(n.description || 'N/A');

                              return params;
                          });

                          return `\n${table(tableHead, tableBody)}\n`;
                      })()
                    : '',
                m.metadata?.url ? `\n- ${hyperlink('Source', m.metadata.url)}` : ''
            ]
                .filter((r) => r.length > 0)
                .join('\n')
                .trim();

            return `${title}\n${desc}`;
        });

        return `${head}\n${body.join('\n')}`;
    }

    public getFunctions(m: DocumentedFunction) {
        const name = `${escape(m.name)}(${m.parameters
            .filter((r) => !r.name.includes('.'))
            .map((m) => {
                return `${m.name}${m.optional ? '?' : ''}`;
            })
            .join(', ')})`.trim();
        const title = heading(
            `${name}: ${
                m.returns?.type
                    ? `${this.linker(m.returns.type || 'any', m.returns.rawType || ['any'])}`
                    : 'any'
            }`,
            3
        );
        const desc = [
            m.description || '',
            m.deprecated ? `\n- ${bold('⚠️ Deprecated')}` : '',
            m.examples
                ? '\n' +
                  m.examples
                      .map((m) => (m.includes('```') ? m : codeBlock(m, 'typescript')))
                      .join('\n\n')
                : '',
            m.parameters.length
                ? (() => {
                      const tableHead = ['Parameter', 'Type', 'Optional'];
                      if (
                          m.parameters.some((p) => p.description && p.description.trim().length > 0)
                      )
                          tableHead.push('Description');
                      const tableBody = m.parameters.map((n) => {
                          const params = [
                              n.default
                                  ? `${escape(n.name)}=${code(escape(n.default))}`
                                  : escape(n.name),
                              this.linker(n.type || 'any', n.rawType || ['any']),
                              n.optional ? '✅' : '❌'
                          ];

                          if (tableHead.includes('Description'))
                              params.push(n.description || 'N/A');

                          return params;
                      });

                      return `\n${table(tableHead, tableBody)}\n`;
                  })()
                : '',
            m.metadata?.url ? `\n- ${hyperlink('Source', m.metadata.url)}` : ''
        ]
            .filter((r) => r.length > 0)
            .join('\n')
            .trim();

        const md = [title, desc];

        if (this.options.includeHeaders) {
            md.unshift(this.getHeaders(m));
        }

        return md.join('\n\n');
    }
}
