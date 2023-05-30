import { User } from "../models/User";

export class UserSubject {
    private user:User|null;
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

    public getUser():User|null {
        return this.user;
    }

    public setUser(user:User|null):void {
        this.user = user;
        this.notifyObservers();
    }


    private notifyObservers() {
        this.observers.forEach(observer => observer());
    }

    public subscribe(observer:Function):void {
        this.observers.push(observer);
    }

    public unsubscribe(observer:Function):void {
        this.observers = this.observers.filter(subscriber => subscriber !== observer);
    }
}