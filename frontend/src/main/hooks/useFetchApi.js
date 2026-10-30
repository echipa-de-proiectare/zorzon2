import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

// Fetch `data` from a Strapi endpoint; a 404 sets notFound instead of error
const useFetchApi = (path) => {
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

export default useFetchApi;
