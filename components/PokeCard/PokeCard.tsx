import style from "./PokeCard.module.css";

type PokeCardProps = {
  name: string;
  image?: string;
};

export default function PokeCard({ name, image }: PokeCardProps) {
  return (
    <li className={style.card}>
      <p className={style.name}>{name}</p>
      <div className={style.imgWrapper}>
        <img src={image} alt={name} className={style.img} />
      </div>
    </li>
  );
}
