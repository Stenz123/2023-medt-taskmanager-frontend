import React, {useEffect} from 'react';
import Header from '../components/header/Header';
import Login from "../components/Login";
import {LoginService} from "../services/login.service";

type LayoutProps = {
    children: React.ReactNode;
}

const Layout = ({children}:LayoutProps) => {
    useEffect(() => {
        LoginService.isLogged();
    },[])

    return (
    <div className='layout h-screen dark:bg-gray-900 overflow-hidden'>
        <Header></Header>
        {children}
    </div>
  )
};

export default Layout;