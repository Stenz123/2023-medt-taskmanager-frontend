import {User} from "../models/User";
import {LoginService} from "../services/login.service";

export class UserServices {

    public static async getUser(): Promise<Promise<User> | false> {
        let response = await fetch("/api/user/get.php");
        let userJson = await response.json();
        if (userJson.success == false) {
            return false;
        }
        let userObject = new User(userJson.data[0].user_id, userJson.data[0].username, userJson.data[0].email, userJson.data[0].password)
        return userObject;
    }

    public async deleteUser(): Promise<Promise<boolean> | false>{
            if (await LoginService.isLogged()) {

                const response = await fetch("/api/user/delete.php", {
                method: "DELETE"
            });
            return response.ok;
        }else {
            return false;
        }
    }
}