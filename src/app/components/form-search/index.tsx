import { FaMagnifyingGlass, FaSpinner } from 'react-icons/fa6';
import styles from './styles.module.css';
import { ChangeEvent, FormEvent } from 'react';

interface FormSearchProps {
  search: string;
  setSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  submitForm: (event: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

export const FormSearch = ({ search, setSearch, submitForm, loading }: FormSearchProps) => {
  return (
    <form className={styles.formSearch} onSubmit={(event) => submitForm(event)}>
      <div className={styles.inputSearch}>
        <FaMagnifyingGlass color='#000' />
        <input type="text" placeholder="Pesquise o seu repositório favorito" value={search} onChange={(event) => setSearch(event)} />
      </div>
      
      <button className={styles.button} type="submit" disabled={loading}>
        {!loading ? "Buscar" : <FaSpinner color='#fff' />}
      </button>
    </form>
  )
}