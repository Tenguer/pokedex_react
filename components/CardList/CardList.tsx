import PokeCard from '../PokeCard/PokeCard';
import style from './CardList.module.css'
import type {Pokemon} from '../../interface'

type CardListProps = {
  pokemons: Pokemon[]
}

export default function CardList({pokemons}: CardListProps) {

  return (
    <ul className={style.list}>
      {pokemons.map((pokemon => <PokeCard name={pokemon.name} image={pokemon.sprites.other.dream_world.front_default} key={pokemon.id} />))}
    </ul>
  )
}
