import Link from 'next/link'
import style from "./PokeCard.module.css";

type PokeCardProps = {
  name: string;
  image: string;
};

export default function PokeCard({ name, image }: PokeCardProps) {
  return (
    <li className={style.card}>
      <Link href={`/pokemon/${name}`}>
        <p className={style.name}>{name}</p>
        <div className={style.imgWrapper}>
          <img src={image} alt={name} className={style.img} />
        </div>
      </Link>
    </li>
  );
}
