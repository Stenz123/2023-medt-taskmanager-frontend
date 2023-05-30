export default class Task{
    private id: number;
    private title: string;
    private description: string;
    private column: number;

    constructor(id:number, title:string, description:string, column:number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.column = column;
    }

    public getId(): number {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getDescription(): string {
        return this.description;
    }

    public getColumn(): number {
        return this.column;
    }
}