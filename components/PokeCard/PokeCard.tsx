import style from './PokeCard.module.css'
import type {PokemonApi} from '../CardList/CardList'

type PokeCardProps = {
  pokemon: PokemonApi
}

export default function PokeCard({pokemon}: PokeCardProps) {
  return (
   <li className={style.pokeCard}>
    {pokemon.name}
   </li>
  )
}
