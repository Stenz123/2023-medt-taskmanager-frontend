import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Board as BoardType} from "../models/Board";
import Task from "../models/Task";
import Column from "../components/Column";
import {TaskServices} from "../services/task.services";
import CreateTask from "../components/popup/CreateTask"
import AddRoundedIcon from '@mui/icons-material/AddRounded';

export const Board = () => {

    const [isOpen, setOpen] = useState(false);

    const [id, setId ] = useState<number>(-1);
    const [board, setBoard] = useState<BoardType|undefined>();

    const [tasks0, setTasks0] = useState<Task[]>([]);
    const [tasks1, setTasks1] = useState<Task[]>([]);
    const [tasks2, setTasks2] = useState<Task[]>([]);

    const navigate = useNavigate();

    const redirectHome = () => {
        navigate("/")
    }

    const location = useParams();
    useEffect(() => {
        const params = Number(location["*"] as string)
        if (isNaN(params)){
            redirectHome()
        }
        setId(params)
    }, []);

    useEffect(() => {
        getTasks(23).then(r => console.log(r))
    },[])

    async function getTasks(id:number){
        const response = await TaskServices.getTasks(id);
        let task0:Task[] = []
        let task1:Task[] = []
        let task2:Task[] = []

        console.log(response)

        response.forEach((task) => {
            if (task.getColumn() === 0){
                task0.push(task)
            } else if (task.getBoardId() === 1){
                task1.push(task)
            } else if (task.getColumn() === 2){
                task2.push(task)
            }
        })

        setTasks0(task0)
        setTasks1(task1)
        setTasks2(task2)

        console.log(tasks0)
        console.log(tasks1)
        console.log(tasks2)
    }

    return (
        <>
            <button onClick={()=>setOpen(true)} className="rounded-md px-3 py-2 text-lg
                                        font-medium bg-blue-500 text-white
                                        inline-flex justify-center
                                        border border-transparent shadow-sm hover:bg-blue-400
                                        focus:outline-none focus:ring-2 focus:ring-offset-2
                                        focus:ring-blue-500 sm:w-auto sm:text-sm absolute right-0
                                        bottom-0 m-12"><AddRoundedIcon></AddRoundedIcon></button>

            <div className="grid grid-cols-3 h-full p-5 pt-0">
                <Column name={"not begun"} tasks={tasks0}/>
                <Column name={"in progress"} tasks={tasks1}/>
                <Column name={"finished"} tasks={tasks2}/>
            </div>
            <CreateTask open={isOpen} setOpen={setOpen} boardId={id}></CreateTask>
        </>
    );
};