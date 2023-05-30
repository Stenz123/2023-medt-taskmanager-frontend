import {UserServices} from "../../services/user.services";
import {User} from "../../models/User";
import React, {useEffect} from "react";
import {Props} from "@headlessui/react/dist/types";

let user : User;

 export const User : React.FC<Props<any>> = ({}) => {

     const [user, setUser] = React.useState<User>(new User());

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