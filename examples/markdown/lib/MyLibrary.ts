export interface MyLibraryInit {
    /**
     * The name of the library.
     */
    name: string;

    /**
     * The version of the library. Defaults to `0.0.0`.
     */
    version?: string;
}

/**
 * A library.
 */
export class MyLibrary {
    /**
     * The library options.
     */
    public constructor(public options: MyLibraryInit) {}

    /**
     * The name of this library.
     */
    public get name() {
        return this.options.name;
    }

    /**
     * The version of this library.
     */
    public get version() {
        return this.options.version || '0.0.0';
    }

    /**
     * Create library metadata.
     */
    public create() {
        return {
            name: this.name,
            version: this.version
        };
    }
}
