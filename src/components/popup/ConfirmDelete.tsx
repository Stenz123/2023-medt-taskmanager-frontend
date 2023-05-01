import React, {Fragment, useEffect, useState} from "react";
import {LoginService} from "../../services/login.service";
import {Dialog, Transition} from "@headlessui/react";
import {NavLink} from "react-router-dom";
import {BoardServices} from "../../services/board.services";

type Props = {
    deleteId:number
    open: boolean;
    setOpen: (open: boolean) => void;
}
export default function ConfirmDelete({deleteId ,open, setOpen}: Props) {
    const cancelButtonRef = React.useRef(null);
    function deleteBoard() {
        console.log("delete board "+deleteId)
        BoardServices.deleteBoard(deleteId)
        setOpen(false)
    }

    return (
        //true -> open
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
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

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
                                <p className="text-white text-lg">Are you sure? {deleteId}</p>
                            </div>
                            <div className="bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    name="submit"
                                    id="submit"
                                    className="w-full inline-flex justify-center rounded-md
                                      border border-transparent shadow-sm px-4 py-2 bg-red-500
                                      text-base font-medium text-white hover:bg-red-400 mb-4 mt-4
                                      focus:outline-none focus:ring-2 focus:ring-offset-2
                                      focus:ring-red-500 sm:w-auto sm:text-sm
                                      disabled:opacity-40 disabled:focus:ring-none disabled:cursor-not-allowed
                                      disabled:hover:bg-red-500"
                                    onClick={deleteBoard}>
                                    DELETE
                                </button>
                                <button
                                    name="submit"
                                    id="submit"
                                    className="w-full inline-flex justify-center rounded-md
                                      border border-transparent shadow-sm px-4 py-2 mr-4 bg-gray-500
                                      text-base font-medium text-white hover:bg-gray-400 mb-4 mt-4
                                      focus:outline-none focus:ring-2 focus:ring-offset-2
                                      focus:ring-gray-500 sm:w-auto sm:text-sm
                                      disabled:opacity-40 disabled:focus:ring-none disabled:cursor-not-allowed
                                      disabled:hover:bg-gray-500"
                                    onClick={deleteBoard}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}