import Icon from "../Icon"
import {useEffect, useState} from "react";
import {BoardServices} from "../../services/board.services";
import {BoardModel} from "../../models/board.model";

export default () => {

    const [tableItems, setTableItems] = useState([new BoardModel(-1, "noBoard", -1, -1,[])]);


    useEffect(() => {
        getMyBoards()
    }, []);
    async function getMyBoards() {
        const response = await BoardServices.getUserBoards();
        setTableItems(response);
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="mt-12 shadow-sm border border-gray-500 rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-900 text-white font-medium border-b border-gray-500">
                        <tr>
                            <th className="py-3 px-6">Boardname</th>
                            <th className="py-3 px-6">Team</th>
                            <th className="py-3 px-6">Sprint length (D)</th>
                            <th className="py-3 px-6"></th>
                        </tr>
                    </thead>
                    <tbody className="text-white divide-y divide-gray-500">
                        {
                            tableItems.map((item:BoardModel, idx) => (
                                <tr key={idx} className= {`hover:bg-gray-500 ${idx % 2 === 0 ? "bg-gray-700" : "bg-gray-800"}`}>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap flex items-center">{item.users.map(user => user.getName())}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.sprintLength}</td>
                                    <td className="text-red-600">delete</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}