import React, {Fragment, useEffect, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {BoardServices} from "../../services/board.services";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    boardId: number;
}
export default function CreateBoard({open, setOpen, boardId}: Props) {
    const cancelButtonRef = React.useRef(null);

    const [userName, setUserName] = useState("");
    const [description, setDescription] = useState("");

    const [validName, setValidName] = useState(true);
    const [error, setError] = useState("");

    const submitBoard = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        if (validName) {
            BoardServices.addUserToBoard(Number(boardId),userName)
            setOpen(false);
        } else {
            setError("Please enter a User");
        }

    };
    useEffect(() => {
        if (userName!=null) {
            setValidName(true);
        } else {
            setValidName(false);
        }
    }, [userName]);


    return (
        //true -> open
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                                <p className="text-white text-lg">Add Collaborator to Board</p>
                            </div>
                            <div className="bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">

                                <form onSubmit={submitBoard} className="w-full flex flex-col justify-end">
                                    <div className="mb-4">
                                        <label className="block text-white text-sm font-bold mb-2" htmlFor="email">User name</label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name"
                                            type="text"
                                            placeholder="hansi@email.com"
                                            onChange={(e) => {
                                                setUserName(e.target.value)
                                            }}
                                        />
                                    </div>

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
                                        disabled={!validName}>
                                        Add User
                                    </button>
                                </form>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}