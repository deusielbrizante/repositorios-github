
interface RepositoriesPageProps {
  params: {
    name: string
  }
}

export default function RepositoriesPage({ params }: RepositoriesPageProps) {
  return (
    <div>
      <h1>Repositories Page</h1>
      <p>{params.name}</p>
    </div>
  )
}