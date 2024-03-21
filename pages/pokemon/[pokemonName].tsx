import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { PokemonType } from '../../interface';

const PokemonPage = () => {
  const router = useRouter()
  const pokemonName = router.query.pokemonName;
  const [pokemon, setPokemon] = useState<PokemonType | null>(null)
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  
  useEffect(() => {
    console.log(pokemonName)
    if (pokemonName) {
      const getPokemon = async () => {
        await fetch(url)
          .then((res) => res.json())
          .then((data) => setPokemon(data))
          .catch((error) => console.error(error));
      }
  
      getPokemon();
    }
  }, [pokemonName, url])

  return (
    <div>
      <div>
        <Link href={'/'}>Retour</Link>
      </div>
      Pokemon test {pokemonName}
      {pokemon && (
        <div>
          <p>Name: {pokemon.name}</p>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>
            <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
          </p>
        </div>
      )}
    </div>
  )
}

export default PokemonPage;