import {User} from "../models/User";
import React from "react";

export const UserContext = React.createContext({
    user:<User|null> null,
    updateUser: () => {}
});