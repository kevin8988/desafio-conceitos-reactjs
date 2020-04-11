import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((result) => setRepositories(result.data));
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: `Repository Node ${Date.now()}`,
      url: "www.github.com/repository-node",
      techs: ["node", "express"],
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const filteredRepositories = repositories.filter((el) => el.id !== id);
    setRepositories(filteredRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((el) => (
          <li key={el.id}>
            {el.title}
            <button onClick={() => handleRemoveRepository(el.id)}>
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
