import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export const useFetchUserProject = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [project, setProject] = useState();

  useEffect(() => {
    if (!token) return;
    if (!API_URL) {
      console.error("VITE_API_URL is undefined");
      return;
    }

    setLoading(true);

    fetch(`${API_URL}/api/project-phases`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched project phases:", data);
        const fetchedData = data.data?.[0];
        setProject(fetchedData);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [token, API_URL]);

  return { loading, error, project };
};
