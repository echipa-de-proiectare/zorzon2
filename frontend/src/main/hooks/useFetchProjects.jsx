import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const useFetchProjectsSpotlight = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState();

  useEffect(() => {
    fetch(`${API_URL}/api/projects/projects-spotlight`, {
      mode: "cors",
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const fetchedData = data.data;
        setProjects(fetchedData);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);
  return { loading, error, projects };
};

const useFetchProjectsPrev = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState();

  useEffect(() => {
    fetch(`${API_URL}/api/projects/projects-preview`, {
      mode: "cors",
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const fetchedData = data.data;
        setProjects(fetchedData);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);
  return { loading, error, projects };
};

const useFetchProjectById = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [project, setProject] = useState();

  useEffect(() => {
    fetch(`${API_URL}/api/projects/${id}`, {
      mode: "cors",
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const fetchedData = data.data;
        setProject(fetchedData);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);
  return { loading, error, project };
};

export { useFetchProjectsSpotlight, useFetchProjectsPrev, useFetchProjectById };
