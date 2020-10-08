import React, { useEffect, useState } from "react";
import Axios from "axios";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const { data } = await Axios.get(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    console.log(data.results);
    setCharacters((datos) => [...datos, ...data.results]);
  };

  const moreFetch = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div>
      <h1>Prueva</h1>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <img src={character.image} alt={character.name} />
            <p>{character.name}</p>
          </li>
        ))}
      </ul>
      <button onClick={moreFetch}>Ver mas Personajes</button>
    </div>
  );
};

export default Home;
