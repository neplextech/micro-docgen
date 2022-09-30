const importRegex = /import\(.+\)/;

export function formatType(type: string): string {
    if (!importRegex.test(type)) return type;
    const clean = type.split(importRegex);
    return clean.map(m => m.trim().startsWith(".") ? m.slice(1).trim() : m.trim()).join(" ").trim();
}