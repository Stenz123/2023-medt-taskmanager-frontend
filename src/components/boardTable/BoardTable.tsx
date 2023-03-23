import Icon from "../Icon"
import { Menu } from '@headlessui/react';


export default () => {

    const tableItems = [
        {
            name: "MEDT-Board",
            team: "liamjames@example.com",
            length: 2,
        },
        {
            name: "My Team",
            team: "oliviaemma@example.com",
            length: 15,
        },
        {
            name: "William Benjamin",
            team: "william.benjamin@example.com",
            length: 25,
        },
        {
            name: "Henry Theodore",
            email: "henrytheodore@example.com",
            length: 10,
        },
    ]

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
                            tableItems.map((item, idx) => (
                                <tr key={idx} className= {`hover:bg-gray-500 ${idx % 2 === 0 ? "bg-gray-700" : "bg-gray-800"}`}>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap flex items-center"><Icon src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'/>{item.team}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.length}</td>
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