import {UserModel} from "../models/user.model";
import React from "react";

export const UserContext = React.createContext({
    user:<UserModel|null> null,
    updateUser: () => {}
});