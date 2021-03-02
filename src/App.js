import React, { useState, useEffect }  from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    //usar async await na funcao para listar repositorios
    //chamar a funcao que lista
    async function getRepositories() {
      const response = await api.get('/repositories');

      setRepositories(response.data)

    }

    getRepositories();

  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafio ReactJS ${Date.now()}`, 
      url: 'https://github.com/techbrasilia', 
      techs: ["React", "Node.js"], 
      likes: 0 
    });

    const repository = response.data;

    setRepositories([ ...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    //ao remover setar repositorios filtrando os diferentes do removido
    const response = await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(repo => repo.id != id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>{repo.title}
          
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>

          </li>
        ))}        
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
