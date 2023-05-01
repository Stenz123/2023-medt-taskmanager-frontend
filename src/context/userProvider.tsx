import {useState} from "react";
import {UserModel} from "../models/user.model";
import {UserServices} from "../services/user.services";
import {UserContext} from "./usercontext";
import {UserSubject} from "../services/user.subject";

export const UserProvider = (props: any) => {
    const [user, setUser] = useState<UserModel | null>(null);

    UserSubject.getInstance().subscribe(() => {
        updateUser();
    })

    const updateUser = () => {
        let user: UserModel | null = UserSubject.getInstance().getUser();
        if (user) {
            setUser(user);
        }else {
            setUser(null);
        }
    }

    return (
        <UserContext.Provider value={{user,updateUser}}>
            {props.children}
        </UserContext.Provider>
    )
}