import style from './PokeCard.module.css'

type PokeCardProps = {
  name: string
  image?: string
}

export default function PokeCard({name, image}: PokeCardProps) {
  return (
    <li className={style.card}>
      <p className={style.name}>{name}</p>
      {/* <img src={image} alt={name} className={style.img} /> */}
   </li>
  )
}
