import PokeCard from '../PokeCard/PokeCard';
import style from './CardList.module.css'

export type PokemonApi = {
  name: string
  url: string;
}

type CardListProps = {
  pokemons: PokemonApi[]
}

export default function CardList({pokemons}: CardListProps) {
  console.log("pokemons : ",pokemons)

  return (
    <ul className={style.cardList}>
      {pokemons.map((pokemon => <PokeCard pokemon={pokemon} key={pokemon.name} />))}
    </ul>
  )
}
