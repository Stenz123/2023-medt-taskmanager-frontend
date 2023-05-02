import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {BoardModel} from "../models/board.model";
import boardTable from "./BoardTable";
import {BoardServices} from "../services/board.services";

export const Board = () => {
    //get last part of url

    const [id, setId] = useState<number>(-1);
    const [board, setBoard] = useState<BoardModel|undefined>();

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
            <h1>Board</h1>
            <h2>{id}</h2>
    </>
    );
};