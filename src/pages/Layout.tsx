import React, {useEffect} from 'react';
import Header from '../components/header/Header';
import {LoginService} from "../services/login.service";
import {UserProvider} from "../context/userProvider";

type LayoutProps = {
    children: React.ReactNode;
}

const Layout = ({children}:LayoutProps) => {

    useEffect(() => {
        console.log('loaded')
        LoginService.isLogged();
    })

    return (
    <div className='layout h-screen dark:bg-gray-900 overflow-hidden'>
        <UserProvider>
            <Header></Header>
            {children}
        </UserProvider>
    </div>
  )
};

export default Layout;