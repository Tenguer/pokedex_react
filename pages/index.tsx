import { useEffect, useState } from "react";
import Head from "next/head";
import CardList from "../components/CardList/CardList";
import type {Pokemon} from '../interface'

interface PokeApi {
  name: string
  url: string
}

export default function Pokedex() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [prevPage, setPrevPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [curentPage, setCurentPage] = useState('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
  
  useEffect(() => {
    const getPokemons = async () => {
      const pokeApiResponse = await fetch(curentPage)
        .then(res => res.json())
        .then(data => {
          setPrevPage(data.previous)
          setNextPage(data.next)
          return data.results
        })
        .catch(error => console.error(error));
      
        pokeApiResponse.forEach(async ({ name }: PokeApi) => {
          await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res => res.json())
            .then(data => setPokemons((poke) => [...poke, data]))
            .catch(error => console.error(error));
        });
    }

    getPokemons()
  }, [curentPage])

  const handleNext = () =>  {
    setPokemons([])
    setCurentPage(nextPage)
  }

  const handlePrev = () =>  {
    if (prevPage !== null) {
      setPokemons([])
      setCurentPage(prevPage)
    }
  }

  return (
    <>
      <Head>
        <title>Pokedex React</title>
      </Head>

      <h1>Hello, PokedexApp!</h1>

      <CardList pokemons={pokemons} />
      <div>
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
}
