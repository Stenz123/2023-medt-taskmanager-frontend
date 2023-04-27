import {UserModel} from "../models/user.model";
import {UserServices} from "./user.services";

export class LoginService {

    private static user:UserModel|null = null;
    public static getUser():UserModel|null {
        return this.user;
    }
    private static setUser(user:null|UserModel):void{
        LoginService.user=user;
    }
    public static async login(email: string, password: string): Promise<boolean> {
        const response = await fetch("/api/auth/login.php", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
        });
        if (response.ok) {
            if(await UserServices.getUser()){
                let user:UserModel|false = await UserServices.getUser();
                if (user) {
                    this.user = user;
                }
            }
        }
        return response.ok;
    }

    public static async logout(): Promise<boolean> {
        const response = await fetch("/api/auth/logout.php", {
            method: "POST"
        });
        const json = await response.json();
        if (json["success"] == true){
            LoginService.setUser(null);
        }
        return json["success"];
    }

    static async register(email: string, password: string, user: string) : Promise<boolean> {
        const response = await fetch("/api/auth/register.php", {
            method: "POST",
            body: JSON.stringify({
                username: user,
                email: email,
                password: password
            }),
        });
        return response.ok;
    }

    public static async isLogged(): Promise<Boolean> {
        let response
        //check if empty
        response = await fetch("/api/auth/isLoggedIn.php");
        const json = await response.json();
        if (json.success) {
            if(this.user==null){
                let user:UserModel|false = await UserServices.getUser();
                if (user) {
                    this.user = user;
                }
            }
        }

        return json.success;
    }

}