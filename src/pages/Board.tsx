import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Board as BoardType} from "../models/Board";
import Task from "../models/Task";
import Column from "../components/Column";

export const Board = () => {
    const task = new Task(1, "Task 1", "This is task 1", 1);
    const testTasks: Task[] = [task, task, task];
    const testColumns = {
        name: "Test",
        tasks: testTasks
    }

    const [id, setId] = useState<number>(-1);
    const [board, setBoard] = useState<BoardType|undefined>();

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


    return (
        <>
            <div className="grid grid-cols-3 h-full p-5 pt-0">
                <Column name={testColumns.name} tasks={testColumns.tasks}/>
                <Column name={testColumns.name} tasks={testColumns.tasks}/>
                <Column name={testColumns.name} tasks={testColumns.tasks}/>
            </div>
        </>
    );
};