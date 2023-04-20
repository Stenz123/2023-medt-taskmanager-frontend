import React, {Fragment, useEffect, useState} from "react";
import {LoginService} from "../services/login.service";
import {Dialog, Transition} from "@headlessui/react";
import {NavLink} from "react-router-dom";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
}
export default function Login({open, setOpen}: Props) {
    const cancelButtonRef = React.useRef(null);

    const [register, setRegister] = useState(true);

    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [error, setError] = useState('');

    const [repeatPassword, setRepeatPassword] = useState('');
    const [isValidRepeatPassword, setIsValidRepeatPassword] = useState(false);
    const[user, setUser] = useState('');
    const [isValidUser, setIsValidUser] = useState(false);

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", password);

        if (register){
            const response = await LoginService.register(email, password, user);
            if (response) {
                setError('')
                setRegister(false)
                setPassword('')
            } else {
                setError('Invalid parameters');
            }
        }else {
            const response = await LoginService.login(email, password);
            if (response) {
                setError('')
                setOpen(false);
            } else {
                setError('Invalid email or password');
            }
        }
    };

    useEffect(() => {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        setIsValidEmail(regex.test(email));
    }, [email]);

    useEffect(() => {
        if (register){
            setIsValidPassword(password.length > 8);
        }else {
            setIsValidPassword(password.length > 0);
        }
    }, [password]);

    useEffect(() => {
        if (register){
            setIsFormFilled(isValidEmail && isValidPassword && isValidRepeatPassword && isValidUser);
        }else {
            setIsFormFilled(isValidEmail && isValidPassword);
        }
    }, [isValidEmail, isValidPassword, isValidUser, isValidRepeatPassword]);

    useEffect(() => {
        setIsValidRepeatPassword(repeatPassword === password);
    }, [repeatPassword, password]);

    useEffect(() => {
        setIsValidUser(user.length > 0);
    }, [user]);

    function changeForm() {
        setRegister(!register);
        setError('');
        setPassword('');
        setEmail('');
        setRepeatPassword('');
        setUser('');
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
                <div
                    className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className="inline-block align-bottom bg-gray-900 rounded-lg
                                text-left
                                overflow-hidden shadow-xl
                                transform transition-all
                                sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-gray-700 px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                                <p className="text-white text-lg">{!register ? "Log in" : "Register"}</p>
                            </div>
                            <div className="bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">

                                <form onSubmit={login} className="w-full flex flex-col justify-end">
                                    <div className="mb-4">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="email">Email</label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                            onChange={(e) => { setEmail(e.target.value) }}
                                        />
                                    </div>

                                    {register ? <div className="mb-4">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="text">Username</label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="username"
                                            type="text"
                                            placeholder="Username"
                                            onChange={(e) => { setUser(e.target.value) }}
                                        />
                                    </div>: ''}

                                    <div className="mb-4">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="password">Password</label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="*******"
                                            onChange={(e) => { setPassword(e.target.value) }}
                                        />
                                    </div>

                                    {register ? <div className="mb-4">
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="password">Repeat Password</label>
                                    <input
                                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                       id="repeatPassword"
                                       type="password"
                                       placeholder="*******"
                                       onChange={(e) => {setRepeatPassword(e.target.value) }}
                                       />
                                    </div>: ''}


                                    <p className="text-red-600">{error}</p>

                                    <button
                                        type="submit"
                                        name="submit"
                                        id="submit"
                                        className="w-full inline-flex justify-center rounded-md
                                        border border-transparent shadow-sm px-4 py-2 bg-blue-500
                                        text-base font-medium text-white hover:bg-blue-400 mb-4 mt-4
                                        focus:outline-none focus:ring-2 focus:ring-offset-2
                                        focus:ring-blue-500 sm:w-auto sm:text-sm
                                        disabled:opacity-40 disabled:focus:ring-none disabled:cursor-not-allowed
                                        disabled:hover:bg-blue-500"
                                        disabled={!isFormFilled}>
                                        {!register ? "Log in" : "Register"}
                                    </button>
                                    <p className="text-white text-sm mb-4">Don't have an account? <button onClick={changeForm} className="text-blue-500">{!register ? "Log in" : "Register"}</button></p>
                                </form>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}