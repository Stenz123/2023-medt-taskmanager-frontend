export class UserModel {
    private id: number;
    private name: string;
    private email: string;
    private password: string;
    constructor() {
        this.id = -1;
        this.name = "";
        this.email = "";
        this.password = "";
    }

    public getId(): number {
        return this.id;
    }
    public setId(id: number): void {
        this.id = id;
    }
    public getName(): string {
        return this.name;
    }
    public setName(name: string): void {
        this.name = name;
    }
    public getEmail(): string {
        return this.email;
    }
    public setEmail(email: string): void {
        this.email = email;
    }
    public getPassword(): string {
        return this.password;
    }
    public setPassword(password: string): void {
        this.password = password;
    }


}