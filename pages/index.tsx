import { useEffect, useState } from "react";
import Head from "next/head";
import CardList from "../components/CardList/CardList";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
    .then(response => response.json())
      .then(json => setPokemons(json.results))
      .catch(error => console.error(error));
  }, [])

  console.log("pokemons api => ", pokemons)
  return (
    <>
      <Head>
        <title>Pokedex React</title>
      </Head>

      <h1>Hello, PokedexApp!</h1>

      <CardList pokemons={pokemons} />
    </>
  );
}
