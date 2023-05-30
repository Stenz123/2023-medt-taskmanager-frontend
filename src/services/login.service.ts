import {User} from "../models/User";
import {UserServices} from "./user.services";
import {UserSubject} from "./user.subject";

export class LoginService {

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
                let user:User|false = await UserServices.getUser();
                if (user) {
                    UserSubject.getInstance().setUser(user);
                }
            }
        }
        return response.ok;
    }

    public static async logout(): Promise<boolean> {
        const response = await fetch("/api/auth/logout.php", {
            method: "POST"
        });
        const json = await response.json()

        if (json["success"] == true){
            UserSubject.getInstance().setUser(null);
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
            if(UserSubject.getInstance().getUser()==null){
                let user:User|false = await UserServices.getUser();
                if (user) {
                    UserSubject.getInstance().setUser(user);
                }
            }
        }

        return json.success;
    }

}