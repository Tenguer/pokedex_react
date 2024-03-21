import { ChangeEvent, Dispatch, SetStateAction  } from 'react'
import style from './Input.module.css'

interface InputProps {
  setInputSearch: Dispatch<SetStateAction<string>>;
  inputSearch: string;
}
export default function Input({ inputSearch, setInputSearch }:InputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);
  };

  const onFormSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  }

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <input className={style.input} type='text' placeholder='Rechercher un pokémon' value={inputSearch} onChange={handleChange} />
      </form>
    </>
  )
}

