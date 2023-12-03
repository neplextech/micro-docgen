/**
 * The props for a widget.
 */
export interface WidgetProps {
    /**
     * The name of this widget.
     */
    name: string;
}

/**
 * A widget.
 */
export abstract class Widget<T extends WidgetProps> {
    /**
     * Create a new widget.
     * @param props The props for this widget.
     */
    public constructor(public props: T) {}

    /**
     * The name of this widget.
     */
    public get name() {
        return this.props.name;
    }

    /**
     * Render this widget.
     */
    public abstract render(): string;
}
