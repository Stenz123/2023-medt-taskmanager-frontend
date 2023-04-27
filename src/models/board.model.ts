import {UserModel} from "./user.model";

export class BoardModel {
    private _id: number;
    private _title: string;
    private _owner: number;
    private _sprintLength: number;
    private _users: UserModel[];


    constructor(id: number, title: string, owner: number, sprintLength: number, users : UserModel[]) {
        this._id = id;
        this._title = title;
        this._owner = owner;
        this._sprintLength = sprintLength;
        this._users = users;
    }


    get users(): UserModel[] {
        return this._users;
    }

    set users(value: UserModel[]) {
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