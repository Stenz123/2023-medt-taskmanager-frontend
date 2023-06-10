import Task from "../models/Task";
import {Task as TaskComponent} from "./Task"

type Props = {
    name: string;
    tasks: Task[];
    move:(id:number, forward:boolean)=>void
}

export default (props:Props) => {
    return (
        <>
            <section className="text-white w-full h-full p-2 pt-7 border-r-2 border-gray-500">
                <h1 className="text-3xl pb-8">{props.name}</h1>
                <div>
                    {props.tasks.map((task) => (
                        <TaskComponent task={task} move={props.move}></TaskComponent>
                    ))}
                </div>
            </section>
        </>
    );
};