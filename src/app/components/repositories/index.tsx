'use client';

import { Repository } from '@/app/interface/repository';
import styles from './styles.module.css';
import { FaBars, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface RepositoryFoundProps {
  repositories: Repository[];
  removeRepository: (repository: Repository) => void;
}

export const Repositories = ({ repositories, removeRepository }: RepositoryFoundProps) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>Repositórios Favoritos</h1>
      <ul className={styles.list}>
        {repositories.map((repository, index) => (
          <li key={index}>
            <button className={styles.trashButton} onClick={() => removeRepository(repository)}>
              <FaTrash size={18} />
            </button>
            <p>{repository.name}</p>
            <a onClick={() => router.push(`/repositories/${encodeURIComponent(repository.name)}`)}>
              <FaBars size={20} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}