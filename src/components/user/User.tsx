import {UserServices} from "../../services/user.services";
import {UserModel} from "../../models/user.model";
import React, {useEffect} from "react";
import {Props} from "@headlessui/react/dist/types";

let user : UserModel;

 export const User : React.FC<Props<any>> = ({}) => {

     const [user, setUser] = React.useState<UserModel>(new UserModel());

     useEffect(() => {
         fetchUser();
     },[]);

    return (
        <div className="flex">
            <h2 className="text-white p-5">{user.getId()}</h2>
            <h2 className="text-white p-5">{user.getName()}</h2>
            <h2 className="text-white p-5">{user.getEmail()}</h2>
        </div>
    );

     async function fetchUser() {
         console.log("fetching user");
         await UserServices.getUser().then(r => setUser(r));
     }
}