import { Repository } from '@/app/interface/repository';
import styles from './styles.module.css';
import { FaCheck, FaPlus } from 'react-icons/fa';

interface RepositoryFoundProps {
  repository: Repository;
  loading: boolean;
  addRepository: (repository: Repository) => void;
  repositories: Repository[];
}

export const RepositoryFound = ({ repository, loading, addRepository, repositories }: RepositoryFoundProps) => {
  const isAdded = repositories.some(repo => repo.name === repository.name);

  return (
    <div className={styles.container}>
      {loading && <p>Carregando...</p>}
      {(repository.name.length > 0 && !loading) && (
        <>
          <h1>Repositório Encontrado</h1>
          <div className={styles.repository}>
            <div>
              <p>{repository.name}</p>
              <button onClick={!isAdded ? () => addRepository(repository) : undefined} disabled={isAdded} style={isAdded ? {backgroundColor: '#4CAF50'} : {}}>
                {isAdded ? <FaCheck size={20} color='#fff' /> : <FaPlus size={20} color='#fff' />}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}