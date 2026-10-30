import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const useFetchProjects = (path) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setLoading(true);
    setError(null);
    setNotFound(false);

    fetch(`${API_URL}${path}`, {
      mode: "cors",
      method: "GET",
    })
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
          return null;
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => setData(result?.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [path]);

  return { loading, error, notFound, data };
};

const useFetchProjectsSpotlight = () => {
  const { loading, error, data } = useFetchProjects(
    "/api/projects/projects-spotlight"
  );
  return { loading, error, projects: data };
};

const useFetchProjectsPrev = () => {
  const { loading, error, data } = useFetchProjects(
    "/api/projects/projects-preview"
  );
  return { loading, error, projects: data };
};

const useFetchProjectById = (id) => {
  const { loading, error, notFound, data } = useFetchProjects(
    `/api/projects/${encodeURIComponent(id)}`
  );
  return { loading, error, notFound, project: data };
};

export { useFetchProjectsSpotlight, useFetchProjectsPrev, useFetchProjectById };
