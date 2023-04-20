import {UserModel} from "../models/user.model";

export class UserServices {

    public static async getUser(): Promise<Promise<UserModel> | false> {
        if (await UserServices.isLogged()) {
            let response = await fetch("/api/user/get.php");
            let userJson = await response.json();

            let userObject = new UserModel();
            userObject.setId(userJson.data[0].user_id);
            userObject.setName(userJson.data[0].username);
            userObject.setEmail(userJson.data[0].email);
            userObject.setPassword(userJson.data[0].password);
            return userObject;
        }else {
            return false;
        }
    }

    public async deleteUser(): Promise<Promise<boolean> | false>{
            if (await UserServices.isLogged()) {

                const response = await fetch("/api/user/delete.php", {
                method: "DELETE"
            });
            return response.ok;
        }else {
            return false;
        }
    }

    public static async isLogged(): Promise<Boolean> {
        let response
        //check if empty
        response = await fetch("/api/auth/isLoggedIn.php");
        const json = await response.json();
        return json.success;
    }
}