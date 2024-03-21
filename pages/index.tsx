import { useEffect, useState } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Head from "next/head";
import CardList from "../components/CardList/CardList";
import type { PokemonType } from "../interface";
import Input from "../components/Input/Input";

interface PokeApi {
  name: string;
  url: string;
}

interface PokeApiResult  {
  count: number;
  next: string;
  previous: string | null;
  results: PokeApi[]
}

export const getServerSideProps = (async () => {
  let pokemons: PokemonType[] = []
  
  await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150&offset=0`)
    .then((res) => res.json())
    .then(async (data: PokeApiResult) => {
      const promises = data.results.map(async ({url}: PokeApi) => {
        const response = await fetch(url)
        return response.json();
      })
      const pokemonResult = await Promise.all(promises);
      pokemons = pokemonResult;
    })
    .catch((error) => console.error(error));

  return { props: { pokemons } }
}) satisfies GetServerSideProps<{ pokemons: PokemonType[] }>

export default function Pokedex({
  pokemons,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [pokemonsShow, setPokemonsShow] = useState<PokemonType[]>([]);
  const [inputSearch, setInputSearch] = useState('');
  const [index, setIndex] = useState(0);
  const urlLimit = 150;
  const listByPage = 20;

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

  // Manage list
  useEffect(() => {
    const pokeList = () => {
      setPokemonsShow(pokemons.slice(index, index + listByPage));
    };

    const changeList = () => {
      const pokeFilter: PokemonType[] = pokemons.filter((pokemon: PokemonType) =>
        pokemon.name.toLowerCase().includes(inputSearch.toLowerCase())
      );

      setPokemonsShow(pokeFilter);
    };

    if (pokemons) {
      pokeList();
    }

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
