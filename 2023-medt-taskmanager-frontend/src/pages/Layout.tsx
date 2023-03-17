import React from 'react';
import Header from '../components/header/Header';

type LayoutProps = {
    children: React.ReactNode;
}

const Layout = ({children}:LayoutProps) => {
  return (
    <div className='layout min-h-screen'>
        <Header></Header>
    </div>
  )
};

export default Layout;
