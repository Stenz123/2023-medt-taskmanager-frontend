import {User} from "./User";

export class Board {
    private _id: number;
    private _title: string;
    private _owner: number;
    private _sprintLength: number;
    private _users: User[];


    constructor(id: number, title: string, owner: number, sprintLength: number, users : User[]) {
        this._id = id;
        this._title = title;
        this._owner = owner;
        this._sprintLength = sprintLength;
        this._users = users;
    }


    get users(): User[] {
        return this._users;
    }

    set users(value: User[]) {
        this._users = value;
    }

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get owner(): number {
        return this._owner;
    }

    get sprintLength(): number {
        return this._sprintLength;
    }
}