'use client';

import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { FormSearch } from "./components/form-search";
import { Header } from "./components/header"
import { api } from "./services/api";
import { Repository } from "./interface/repository";
import { RepositoryFound } from "./components/repository-found";
import { Repositories } from "./components/repositories";
import Modal from "./components/modal";

export default function Home() {
  const [search, setSearch] = useState('');
  const [repositoryFound, setRepositoryFound] = useState<Repository>({ name: '' });
  const [repositoriesAdded, setRepositoriesAdded] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const repositories = localStorage.getItem('@repositories');

    if (repositories)
      setRepositoriesAdded(JSON.parse(repositories));
  }, []);

  useEffect(() => {
    if (repositoriesAdded.length > 0)
      localStorage.setItem('@repositories', JSON.stringify(repositoriesAdded));
  }, [repositoriesAdded]);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (search.length === 0) {
      openModal('Digite o nome do repositório');
      return;
    }

    const submit = async () => {
      setLoading(true);

      try {
        const response = await api.get(`repos/${search}`)

        const repository: Repository = {
          name: response.data.full_name,
        };

        setRepositoryFound(repository);
        setSearch('');
      } catch (error: any) {
        if (error.status === 404)
          openModal('Repositório não encontrado!');

        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    submit();
  }, [repositoryFound, search]);

  const addRepository = useCallback((repository: Repository) => {
    setRepositoriesAdded([...repositoriesAdded, repository]);
  }, [repositoriesAdded]);

  const removeRepository = useCallback((repository: Repository) => {
    setRepositoriesAdded(repositoriesAdded.filter(repo => repo.name !== repository.name));
  }, [repositoriesAdded]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const openModal = (text: string) => {
    setText(text);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} text={text} />
      <Header />
      <div>
        <FormSearch search={search} setSearch={handleSearch} submitForm={handleSubmit} loading={loading} />
        <RepositoryFound repository={repositoryFound} loading={loading} addRepository={addRepository} repositories={repositoriesAdded} />
        <Repositories repositories={repositoriesAdded} removeRepository={removeRepository} />
      </div>
    </>
  );
}