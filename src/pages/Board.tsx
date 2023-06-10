import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Board as BoardType} from "../models/Board";
import Task from "../models/Task";
import Column from "../components/Column";
import {TaskServices} from "../services/task.services";
import CreateTask from "../components/popup/CreateTask"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import GroupsIcon from '@mui/icons-material/Groups';
import AddUser from "../components/popup/AddUser";

export const Board = () => {

    const [isOpen, setOpen] = useState(false);

    const [myid, setId ] = useState<number>(-1);
    const [board, setBoard] = useState<BoardType|undefined>();

    const [tasks0, setTasks0] = useState<Task[]>([]);
    const [tasks1, setTasks1] = useState<Task[]>([]);
    const [tasks2, setTasks2] = useState<Task[]>([]);

    const [isUserOpen, setUserOpen] = useState(false);

    const navigate = useNavigate();

    const redirectHome = () => {
        navigate("/")
    }

    const location = useParams();
    useEffect(() => {
        const params = parseInt(location["*"] as string)
        if (isNaN(params)){
            redirectHome()
        }else if (params < 0){
            navigate("/boards")
        }
        setId(params)
    }, []);

    useEffect(() => {
        console.log("fetching")
        console.log(myid)
        getTasks(myid).then(r => console.log(r))
    },[myid, isOpen])

    async function getTasks(id:number){
        const response = await TaskServices.getTasks(id);
        if (response !== undefined){
            filterAndSetTasks(response)
        }
    }

    function move(id:number, forward:boolean){
        if (forward){
            TaskServices.moveForward(id)
        }else {
            TaskServices.moveBackward(id)
        }

        let allTasks = tasks0.concat(tasks1).concat(tasks2)
        let task = allTasks.find((task) => task.getId() === id)
        if (task !== undefined){
            //remove
            allTasks = allTasks.filter((task) => task.getId() !== id)

            if (task.getColumn()<2 && forward){
                task = new Task(task.getId(), task.getTitle(), task.getDescription(), task.getColumn()+1, task.getBoardId())
            }else if (task.getColumn()>0){
                task = new Task(task.getId(), task.getTitle(), task.getDescription(), task.getColumn()-1, task.getBoardId())
            }
            allTasks.push(task)
            filterAndSetTasks(allTasks)
        }
    }

    function filterAndSetTasks(tasks:Task[]){
        let task0:Task[] = []
        let task1:Task[] = []
        let task2:Task[] = []

        tasks.forEach((task) => {
            if (task.getColumn() === 0) {
                task0.push(task)
            } else if (task.getColumn() === 1) {
                task1.push(task)
            } else if (task.getColumn() === 2) {
                task2.push(task)
            }
        })

        setTasks0(task0)
        setTasks1(task1)
        setTasks2(task2)
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

            <button onClick={()=>setUserOpen(true)} className="rounded-md px-3 py-2 text-lg
                                        font-medium bg-blue-500 text-white
                                        inline-flex justify-center
                                        border border-transparent shadow-sm hover:bg-blue-400
                                        focus:outline-none focus:ring-2 focus:ring-offset-2
                                        focus:ring-blue-500 sm:w-auto sm:text-sm absolute right-0
                                        bottom-0 m-12 mr-32"><GroupsIcon></GroupsIcon></button>

            <div className="grid grid-cols-3 h-full p-5 pt-0">
                <Column name={"not begun"} tasks={tasks0} move={move}/>
                <Column name={"in progress"} tasks={tasks1} move={move}/>
                <Column name={"finished"} tasks={tasks2} move={move}/>
            </div>
            <AddUser open={isUserOpen} setOpen={setUserOpen} boardId={myid}></AddUser>
            <CreateTask open={isOpen} setOpen={setOpen} boardId={myid}></CreateTask>
        </>
    );
};