import React, {useContext, useEffect, useState} from "react";
import {BoardServices} from "../services/board.services";
import {BoardModel} from "../models/board.model";
import CreateBoard from "../components/popup/CreateBoard";
import ConfirmDelete from "../components/popup/ConfirmDelete";
import {LoginService} from "../services/login.service";
import {UserProvider} from "../context/userProvider";
import {UserContext} from "../context/usercontext";
import {Navigate, NavLink, redirect, useNavigate} from "react-router-dom";
import {UserSubject} from "../services/user.subject";

export default () => {

    const [tableItems, setTableItems] = useState([new BoardModel(-1, "noBoard", -1, -1, [])]);
    const [isOpen, setOpen] = useState(false);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(-1)

    useEffect(() => {
        UserSubject.getInstance().subscribe(getMyBoards)
        if (UserSubject.getInstance().getUser()!==null){
            getMyBoards()
        }
    },[])

    useEffect(() => {
        if (!isOpen){
            getMyBoards()
        }
    }, [isOpen])

    useEffect(() => {
        if (!isDeleteOpen){
            getMyBoards()
        }
    }, [isDeleteOpen])

    async function getMyBoards() {
        const response = await BoardServices.getUserBoards();
        setTableItems(response);
    }

    useEffect(() => {
        const createButton = document.getElementById('createBoard');
        createButton?.addEventListener('click', () => {
            setOpen(true);
        });
    }, [document.getElementById('createBoard')]);

    function deleteBoard(id: number) {
        setDeleteId(id)
        setIsDeleteOpen(true)
    }

    const navigate = useNavigate();

    const redirectBoard = (id:number) => {
        navigate("/board/"+id)
    }

    return (

        <UserContext.Consumer>

            {({user, updateUser}) => (

                user !== null ?
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <button className="rounded-md px-3 pr-6 pl-6 mt-5 py-2 text-sm font-medium bg-blue-500 text-white
                                   inline-flex justify-center
                                   border border-transparent shadow-sm hover:bg-blue-400
                                   focus:outline-none focus:ring-2 focus:ring-offset-2
                                   focus:ring-blue-500 sm:w-auto sm:text-sm" id="createBoard">
                    New board
                </button>
                <div className="mt-12 shadow-sm border border-gray-500 rounded-lg overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-900 text-white font-medium border-b border-gray-500">
                        <tr>
                            <th className="py-3 px-6">Boardname</th>
                            <th className="py-3 px-6">Team</th>
                            <th className="py-3 px-6">Sprint length [Days]</th>
                            <th className="py-3 px-6"></th>
                        </tr>
                        </thead>
                        <tbody className="text-white divide-y divide-gray-500" id="existId">
                        {
                            tableItems.map((item: BoardModel, idx) => (

                                <tr key={idx} onClick={() => {
                                    console.log(item.id)
                                    //redirect to board
                                    redirectBoard(item.id)
                                }}
                                    className={`hover:bg-gray-500 ${idx % 2 === 0 ? "bg-gray-700" : "bg-gray-800"}`}>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap flex items-center">{item.users.map(user => user.getName()+" ")}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.sprintLength}</td>
                                        {item.owner===user.getId() ? <td className="text-red-600" onClick={function (){deleteBoard(item.id)}}>delete</td>:<td></td>}
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
                <CreateBoard open={isOpen} setOpen={setOpen}></CreateBoard>
                <ConfirmDelete deleteId={deleteId} open={isDeleteOpen} setOpen={setIsDeleteOpen}></ConfirmDelete>
            </div>: <><h1 className="text-white">You have to be logged in to view this page</h1><NavLink to="/"></NavLink></>
            )}
        </UserContext.Consumer>
    )
}