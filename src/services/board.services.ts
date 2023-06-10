import {Board} from "../models/Board";
import {User} from "../models/User";

export class BoardServices {

    public static async getUserBoards(): Promise<Board[]> {
        let response = await fetch("/api/board/getUserBoards.php");
        let boardJson = await response.json();
        let result: Board[] = [];
        for (let i = 0; i < boardJson.data.length; i++) {
            let users: Array<User> = []
            for (let j = 0; j < boardJson.data[i]["B_USERS"].length; j++) {
                let user = new User(
                    boardJson.data[i]["B_USERS"][j] ["user_id"],
                    boardJson.data[i]["B_USERS"][j]["username"],
                    boardJson.data[i]["B_USERS"][j]["email"],
                    boardJson.data[i]["B_USERS"][j]["password"],
                );
                users.push(user)
            }

            let boardObject = new Board(
                boardJson.data[i].B_ID,
                boardJson.data[i].B_TITLE,
                boardJson.data[i].B_OWNER,
                boardJson.data[i].B_SPRINTLEN,
                users
            );
            result.push(boardObject);
        }
        return result;
    }

    public static async createBoard(title:string, sprintLength:number): Promise<Board> {
        console.log(title, sprintLength)
        console.log(JSON.stringify({
            title: title,
            sprintlen: sprintLength
        }))

        let response = await fetch("/api/board/createBoard.php", {
            method: "POST",
            body: JSON.stringify({
                title: title,
                sprintlen: sprintLength
            })
        });
        let boardJson = await response.json();
        console.log(boardJson)
        return new Board(
            boardJson.data.B_ID,
            boardJson.data.B_TITLE,
            boardJson.data.B_OWNER,
            boardJson.data.B_SPRINTLEN,
            boardJson.data.B_USERS
        );
    }

    static async deleteBoard(id: number) {
        let responese = await fetch(`/api/board/deleteBoard.php?id=${id}`, {
            method: "DELETE",
        })
    }

    static async addUserToBoard(boardId: number, userId: String) {
        let response = await fetch(`/api/board/addUser.php`, {
            method: "POST",
            body: JSON.stringify({
                userId: userId,
                boardId: boardId
            })
        })
        return await response.json();
    }
}