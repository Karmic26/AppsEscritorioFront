import { useEffect, useState } from "react";
import ListBooks from "./components/ListBooks";
import axios from "axios";
import { baseURL } from "./utils/constant";

function App() {
  const [books, setBooks] = useState([]);
  const [inputs, setInputs] = useState({ nombre: '', autor: '', sinopsis: '' });
  const [updateUI, setUpdateUI] = useState(false);

  const addBook = () => {
    axios.post(`${baseURL}/create`, {
      nombre: inputs.nombre,
      autor: inputs.autor,
      sinopsis: inputs.sinopsis
    })
      .then((res) => {
        console.log(res.data);
        setInputs({ nombre: '', autor: '', sinopsis: '' });
        setUpdateUI((prevState) => !prevState);
      })
      .catch((error) => {
        console.error("Error al agregar el libro:", error);
      });
  }


  useEffect(() => {
    axios.get(`${baseURL}/get`)
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
      })
  }, [updateUI])

  const handleNombreChange = (e) => {
    setInputs({ ...inputs, nombre: e.target.value });
  }

  const handleAutorChange = (e) => {
    setInputs({ ...inputs, autor: e.target.value });
  }

  const handleSinopsisChange = (e) => {
    setInputs({ ...inputs, sinopsis: e.target.value });
  }

  return (
  <>
<h1 className="h1">EBOOKS</h1>

      <table border="1" className="table">
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Autor</th>
            <th>Sinopsis</th>
            <th>Eliminar Libro</th>
        </tr>
    </thead>
    <tbody>
      {books.map((item, idx) => (
          <ListBooks key={idx} book={item} id={item._id} setUpdateUI={setUpdateUI} />
      ))}
    </tbody>
</table>
<div class="login-page">
        <form class="login-form">
          <h1 className="h1">Agregar Libro</h1>
          <input placeholder="Nombre libro" value={inputs.nombre} onChange={handleNombreChange} />
          <input placeholder="Autor" value={inputs.autor} onChange={handleAutorChange} />
          <input placeholder="Sinopsis" value={inputs.sinopsis} onChange={handleSinopsisChange} />
          <button type="button" onClick={addBook}>Confirmar</button>
        </form>
      </div>
  </>
  );
}

export default App;
