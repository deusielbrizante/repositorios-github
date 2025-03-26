'use client';

import { api } from "@/app/services/api";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RepositoriesPage() {
  const params = useParams<{ name: string }>();
  const [repository, setRepository] = useState<any>({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  params.name = decodeURIComponent(params.name);

  useEffect(() => {
    async function fetchData() {
      const [repositoryData, issuesData] = await Promise.all([
        api.get(`repos/${params.name}`),
        api.get(`repos/${params.name}/issues`, {
          params: {
            state: 'open',
            per_page: 5
          }
        })
      ]);

      setRepository(repositoryData.data);
      setIssues(issuesData.data);
      setLoading(false);

      console.log(repositoryData.data);
      console.log(issuesData.data);
    }

    fetchData();
  }, [params.name]);

  if (loading) {
    return <p>Carregando</p>
  }

  return (
    <div>
      <Image src={repository.owner.avatar_url} width={150} height={150} alt={repository.owner.login}/>
      <p>{params.name}</p>
    </div>
  )
}