import React from 'react';
import Header from '../components/header/Header';

type LayoutProps = {
    children: React.ReactNode;
}

const Layout = ({children}:LayoutProps) => {
  return (
    <div className='layout h-screen dark:bg-gray-900'>
        <Header></Header>
        {children}
    </div>
  )
};

export default Layout;