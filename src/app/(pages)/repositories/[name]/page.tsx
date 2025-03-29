'use client';

import { api } from "@/app/services/api";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styles from './styles.module.css';
import { FaArrowCircleLeft } from "react-icons/fa";
import { Introduction } from "./components/introduction";
import { Issue } from "./components/issue";

enum TypePagination {
  PREVIOUS = 'previous',
  NEXT = 'next'
}

enum FilterStates {
  ALL = 'all',
  OPEN = 'open',
  CLOSED = 'closed'
}

export default function RepositoriesPage() {
  const [repository, setRepository] = useState<any>({});
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<FilterStates>(FilterStates.ALL);
  const route = useRouter();

  const params = useParams<{ name: string }>();
  params.name = decodeURIComponent(params.name);

  useEffect(() => {
    async function fetchData() {
      const [repositoryData, issuesData] = await Promise.all([
        api.get(`repos/${params.name}`),
        api.get(`repos/${params.name}/issues`, {
          params: {
            state: 'all',
            per_page: 5
          }
        })
      ]);

      setRepository(repositoryData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }

    fetchData();
  }, [params.name, filter]);

  useEffect(() => {
    async function loadIssue() {
      const issuesData = await api.get(`repos/${params.name}/issues`, {
        params: {
          state: filter,
          per_page: 5,
          page
        }
      });

      setIssues(issuesData.data);
    }

    loadIssue();
  }, [page, params.name, filter]);

  const handlePage = (typePagination: TypePagination) => {
    setPage(prev => typePagination === TypePagination.PREVIOUS ? prev - 1 : prev + 1);
  }

  const getLabelFromFilter = useCallback((filter: FilterStates) => {
    switch (filter) {
      case FilterStates.OPEN:
        return 'Abertas';
      case FilterStates.CLOSED:
        return 'Fechadas';
      case FilterStates.ALL:
        return 'Todas';
    }
  }, [filter]);

  return loading ? (<p className={styles.loading}>Carregando...</p>) : (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => route.back()}>
        <FaArrowCircleLeft size={20} color='#fff' />
      </button>

      <Introduction repository={repository} />

      <div className={styles.filter}>
        {Object.keys(FilterStates).map((state, index) => {
          const typeFilter = FilterStates[state as keyof typeof FilterStates];
          return (
            <button key={index} onClick={() => setFilter(typeFilter)} disabled={filter === typeFilter}>
              {getLabelFromFilter(typeFilter)}
            </button>
          );
        })}
      </div>

      <ul className={styles.issueList}>
        {issues.map(issue => (
          <Issue key={String(issue.id)} issue={issue} />
        ))}
      </ul>

      <div className={styles.pagination}>
        <button onClick={() => handlePage(TypePagination.PREVIOUS)} disabled={page === 1}>Voltar</button>
        <button onClick={() => handlePage(TypePagination.NEXT)}>Próxima Página</button>
      </div>
    </div>
  );
}