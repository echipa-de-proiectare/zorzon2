import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

export const useFetchUserProjects = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    fetch(`${API_URL}/api/user-projects/my-projects`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const fetchedData = data.data[0];
        setProjects(fetchedData);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);
  return { loading, error, projects };
};

export const useFetchNotAllwedUser = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    fetch(`${API_URL}/api/not-allowed-user?populate=*`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const fetchedData = data.data;
        setMessage(fetchedData);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);
  return { loading, error, message };
};

export const useFetchProjectPhase = (viewPhaseId, viewItemId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projectPhase, setProjectPhase] = useState();

  useEffect(() => {
    if (!viewPhaseId || !viewItemId) {
      // If either ID is null or undefined, exit early
      return;
    }

    setLoading(true); // Begin loading only when IDs are valid
    const token = localStorage.getItem("jwt");
    fetch(
      `${API_URL}/api/project-phases?pid=${viewPhaseId}&iid=${viewItemId}`,
      {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const fetchedData = data.data[0].phase[0].item[0];
        setProjectPhase(fetchedData);
        console.log(fetchedData);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [viewPhaseId, viewItemId]);
  return { loading, error, projectPhase };
};
