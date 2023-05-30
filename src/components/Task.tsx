import TaskType from "../models/Task";

type props={
    task:TaskType
}
export const Task = (props:props) => {
    return (
        <section className="bg-gray-800 text-white p-3 mb-3 rounded-lg">
            <h1 className="text-xl pb-2">{props.task.getTitle()}</h1>
            <p className="text-gray-500">{props.task.getDescription()}</p>
        </section>
    );
}