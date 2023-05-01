import { UserModel } from "../models/user.model";

export class UserSubject {
    private user:UserModel|null;
    private observers:Function[];

    private static instance:UserSubject;

    //singelton
    private constructor() {
        this.user = null;
        this.observers = [];
    }

    public static getInstance():UserSubject {
        if (!UserSubject.instance) {
            UserSubject.instance = new UserSubject();
        }
        return UserSubject.instance;
    }

    public getUser():UserModel|null {
        console.log(this.user)
        return this.user;
    }

    public setUser(user:UserModel|null):void {
        this.user = user;
        this.notifyObservers();
    }


    private notifyObservers() {
        this.observers.forEach(observer => observer());
    }

    public subscribe(observer:Function):void {
        this.observers.push(observer);
        console.log(this.observers)
    }

    public unsubscribe(observer:Function):void {
        this.observers = this.observers.filter(subscriber => subscriber !== observer);
        console.log(this.observers)
    }
}