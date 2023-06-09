import React, { useEffect} from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, useLocation } from 'react-router-dom'
import {LoginService} from "../../services/login.service";
import Login from "../popup/Login";
import {UserContext} from "../../context/usercontext";


const navigation = [
  //WITH SLASHES!!!
  { name: 'Dashboard', href: '/'},
  { name: 'Boards', href: '/boards'},
]

//...classes may cause problems, idk what it does
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {


  function setOpened(){
    setOpen(true);
  }

  function logout(){
    LoginService.logout();
  }

  const [isOpen, setOpen] = React.useState(false);

  return (
    <Disclosure as="nav" className="bg-gray-800 z-0">
      {({ open }) => (
        <>
          <div className="mx-2auto max-w-full px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
                </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <NavLink to='/'>
                    <img className="block h-8 w-auto" src='/Logo.svg' alt="logo"/>
                  </NavLink>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink key={item.name}
                        className={classNames(
                          item.href === useLocation().pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium')} to={item.href}>
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              <UserContext.Consumer>
                {context =>
                    context.user!=null ? <><p className="text-white p-5" id="logoutButton"> {context.user.getName()}</p>
                          <button onClick={logout} className="text-red-600">Logout</button>
                        </> :
                        <button onClick={function (){
                            setOpened();
                        }} className="rounded-md px-3 py-2 text-sm font-medium bg-blue-500 text-white
                                        inline-flex justify-center
                                        border border-transparent shadow-sm hover:bg-blue-400
                                        focus:outline-none focus:ring-2 focus:ring-offset-2
                                        focus:ring-blue-500 sm:w-auto sm:text-sm">Sign In</button>
                }
              </UserContext.Consumer>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden relative">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                  <NavLink
                      key={item.name}
                      to={item.href}
                      className={classNames(
                          item.href === useLocation().pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium mt-3 mb-3'
                      )}
                    >
                    {item.name}
                  </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
          <Login open={isOpen} setOpen={setOpen}></Login>
        </>
      )}
    </Disclosure>
  )
}
