import { useEffect, useState } from "react";
import Head from "next/head";
import CardList from "../components/CardList/CardList";
import type { Pokemon } from "../interface";

interface PokeApi {
  name: string;
  url: string;
}

export default function Pokedex() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemonsShow, setPokemonsShow] = useState<Pokemon[]>([]);
  const [index, setIndex] = useState(0);
  const urlLimit = 150;
  const listByPage = 20;
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${urlLimit}&offset=0`;

  const prevPage = () => {
    if (index - listByPage >= 0) {
      setIndex(index - listByPage);
    } else {
      setIndex(0);
    }
  };

  const nextPage = () => {
    if (index + listByPage <= urlLimit) {
      setIndex(index + listByPage);
    }
  };

  useEffect(() => {
    const getPokemons = async () => {
      const pokeApiResponse = await fetch(url)
        .then((res) => res.json())
        .then((data) => data.results)
        .catch((error) => console.error(error));

      pokeApiResponse.forEach(async ({ name }: PokeApi) => {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
          .then((res) => res.json())
          .then((data) => setPokemons((poke) => [...poke, data]))
          .catch((error) => console.error(error));
      });
    };

    if (pokemons.length === 0) {
      getPokemons();
    }
  }, [pokemons, url]);

  useEffect(() => {
    const pokeList = () => {
      setPokemonsShow(pokemons.slice(index, index + listByPage));
    };

    if (pokemons.length === urlLimit) {
      pokeList();
    }
  }, [index, pokemons]);

  return (
    <>
      <Head>
        <title>Pokedex React</title>
      </Head>

      <h1>Hello, PokedexApp!</h1>

      <CardList pokemons={pokemonsShow} />
      <div>
        <button onClick={prevPage}>Prev</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </>
  );
}
