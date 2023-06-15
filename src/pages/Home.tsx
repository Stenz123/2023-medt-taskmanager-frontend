import {UserServices} from "../services/user.services";
import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
export default function Home(){
    return(
        <div className="flex flex-col items-center align-middle justify-center min-h-screen py-2 bg-gradient-to-b from-gray-900 to-gray-800">
            <h1 className="text-white text-5xl w-4/7 text-center">Manage your IT projects easily with TaskManager</h1>
            <NavLink to={"./Boards"} className="w-full mt-10 inline-flex justify-center rounded-md
                       border border-transparent shadow-sm px-4 py-2 bg-blue-500
                       text-base font-medium text-white hover:bg-blue-400
                       focus:outline-none focus:ring-2 focus:ring-offset-2
                       focus:ring-blue-500 sm:w-auto sm:text-sm
                       disabled:opacity-40 disabled:focus:ring-none disabled:cursor-not-allowed
                       disabled:hover:bg-blue-500 mb-14 scale-150">Get Started Now</NavLink>
        </div>
    );
}