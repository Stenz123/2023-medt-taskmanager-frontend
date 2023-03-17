import React from 'react';
import Header from '../components/header/Header';

type LayoutProps = {
    children: React.ReactNode;
}

const Layout = ({children}:LayoutProps) => {
  return (
    <div className='layout min-h-screen'>
        <Header></Header>
        <h2>In layout</h2>
        {children}
    </div>
  )
};

export default Layout;