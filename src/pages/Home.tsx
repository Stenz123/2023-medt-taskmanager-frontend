import {UserServices} from "../services/user.services";
import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
export default function Home(){
    return(
        <div className="flex flex-col items-center min-h-screen py-2">
            <img className="block h-60 w-auto" src='/Logo.svg' alt="logo"/>
            <h1 className="text-white text-5xl pt-24 w-4/6 text-center">Manage your IT projects easily with taskManager</h1>
            <NavLink to={"./Boards"} className="w-full mt-10 inline-flex justify-center rounded-md
                       border border-transparent shadow-sm px-4 py-2 bg-blue-500
                       text-base font-medium text-white hover:bg-blue-400 mb-4
                       focus:outline-none focus:ring-2 focus:ring-offset-2
                       focus:ring-blue-500 sm:w-auto sm:text-sm
                       disabled:opacity-40 disabled:focus:ring-none disabled:cursor-not-allowed
                       disabled:hover:bg-blue-500">Get Started Now</NavLink>
        </div>
    );
}