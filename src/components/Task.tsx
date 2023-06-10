import TaskType from "../models/Task";
import {TaskServices} from "../services/task.services";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

type props={
    task:TaskType
    move:(id:number, forward:boolean)=>void
}
export const Task = (props:props) => {
    return (
        <section className="bg-gray-800 text-white p-3 mb-3 rounded-lg">
            <h1 className="text-xl pb-2">{props.task.getTitle()}</h1>
            <p className="text-gray-500">{props.task.getDescription()}</p>
            <div className="flex justify-end">
                <button onClick={()=>{
                    props.move(props.task.getId(), false)
                }}><ArrowBackIosRoundedIcon></ArrowBackIosRoundedIcon></button>
                <button onClick={()=>{
                    props.move(props.task.getId(), true)
                }}><ArrowForwardIosRoundedIcon></ArrowForwardIosRoundedIcon></button>
            </div>
        </section>
    );
}