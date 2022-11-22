import { relative } from 'path';

export function normalizePath(target: string, from = process.cwd()) {
    return relative(from, target);
}
