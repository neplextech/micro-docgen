import { JSONOutput } from 'typedoc';

export abstract class AbstractSerializer {
    public constructor(public declaration: JSONOutput.DeclarationReflection) {}

    public serialize() {}
}
