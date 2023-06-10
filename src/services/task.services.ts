import Task from "../models/Task";

export class TaskServices {

    public static async getTasks(id:number): Promise<Task[]> {
        let response = await fetch("http://localhost:4000/task/getTasks.php?id="+id);
        let boardJson = await response.json();
        let result: Task[] = [];
        for (let i = 0; i < boardJson.data.length; i++) {
            let task = new Task(
                Number(boardJson.data[i].task_id),
                boardJson.data[i].title,
                boardJson.data[i].description,
                Number(boardJson.data[i].column_id),
                Number(boardJson.data[i].board_id)
            );
            result.push(task);
        }
        return result;
    }

    public static async addTask(title:string, description:string, boardId:number): Promise<boolean> {
        let response = await fetch("http://localhost:4000/task/createTask.php", {
            method: "POST",
            body: JSON.stringify({
                title: title,
                description: description,
                boardId: boardId
            })
        });
        let result = await response.json();
        return result.success;
    }

    public static async moveForward(taskId:number): Promise<boolean> {
        let response = await fetch("http://localhost:4000/task/moveForward.php", {
            method: "POST",
            body: JSON.stringify({
                id: taskId,
            })
        });
        let result = await response.json();
        return result.success;
    }

    public static async moveBackward(taskId:number): Promise<boolean> {
        let response = await fetch("http://localhost:4000/task/moveBackwards.php", {
            method: "POST",
            body: JSON.stringify({
                id: taskId,
            })
        });
        let result = await response.json();
        return result.success;
    }
}