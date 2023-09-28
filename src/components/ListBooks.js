import axios from "axios";
import React from "react";
import { baseURL } from "../utils/constant";

const ListBooks = ({book, id, setUpdateUI}) =>{
    const removeBook = () => {
        console.log(id);
        axios.delete(`${baseURL}/delete/${id}`)
        .then((res) => {
            console.log(res);
            setUpdateUI((prevState) => !prevState);
        })
    }
    return(
        <tr>
        <td>{book.nombre}</td>
        <td>{book.autor}</td>
        <td>{book.sinopsis}</td>
        <td role="presentation" onClick={removeBook}>Eliminar</td>
    </tr>
    )
}

export default ListBooks;