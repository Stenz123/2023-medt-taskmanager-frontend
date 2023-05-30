import {useState} from "react";
import {User} from "../models/User";
import {UserContext} from "./usercontext";
import {UserSubject} from "../services/user.subject";

export const UserProvider = (props: any) => {
    const [user, setUser] = useState<User | null>(null);

    UserSubject.getInstance().subscribe(() => {
        updateUser();
    })

    const updateUser = () => {
        let user: User | null = UserSubject.getInstance().getUser();
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