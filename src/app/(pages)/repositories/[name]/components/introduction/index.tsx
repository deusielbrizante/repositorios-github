import Image from 'next/image';
import styles from './styles.module.css';
import { useParams } from 'next/navigation';

export const Introduction = ({ repository }: { repository: any }) => {
  const params = useParams<{ name: string }>();

  return (
    <section className={styles.header}>
      <Image src={repository.owner.avatar_url} width={150} height={150} alt={repository.owner.login} />
      <h1>{repository.name}</h1>
      <p>{repository.description}</p>
      <p>{params.name}</p>
    </section>
  )
}