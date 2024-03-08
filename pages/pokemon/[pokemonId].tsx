import { useRouter } from 'next/router';

const PokemonPage = () => {
  const router = useRouter()
  const pokemonId = router.query.pokemonId;


  return <div>Pokemon test {pokemonId}</div>
}

export default PokemonPage;