import { useEffect, useState } from "react";
import Head from "next/head";
import CardList from "../components/CardList/CardList";
import type { PokemonType } from "../interface";
import Input from "../components/Input/Input";

interface PokeApi {
  name: string;
  url: string;
}

export default function Pokedex() {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [pokemonsShow, setPokemonsShow] = useState<PokemonType[]>([]);
  const [inputSearch, setInputSearch] = useState('');
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

  // Get pokemons
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

  // Manage list
  useEffect(() => {
    // Show 20 pokemons by pages
    const pokeList = () => {
      setPokemonsShow(pokemons.slice(index, index + listByPage));
    };

    if (pokemons.length === urlLimit) {
      pokeList();
    }

    // Search a pokemon in list
    const changeList = () => {
      const pokeFilter: PokemonType[] = pokemons.filter((pokemon: PokemonType) =>
        pokemon.name.toLowerCase().includes(inputSearch.toLowerCase())
      );
      setPokemonsShow(pokeFilter);
    };

    if (inputSearch !== "") {
      changeList()
    }

  }, [index, inputSearch, pokemons]);

  
  return (
    <>
      <Head>
        <title>Pokedex React</title>
      </Head>

      <h1>Hello, PokedexApp!</h1>

      <Input inputSearch={ inputSearch } setInputSearch={setInputSearch} />

      { inputSearch }

      {
        pokemonsShow.length > 20 ? "" : <div>
          <button onClick={prevPage}>Prev</button>
          <button onClick={nextPage}>Next</button>
        </div>
      }
      
      <CardList pokemons={pokemonsShow} />
    </>
  );
}
