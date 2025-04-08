import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utility/UserContext";
const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

export const useFetchUserProjects = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState();
  const context = useContext(UserContext);
  const jwt = context.jwt || sessionStorage.getItem("jwt");

  useEffect(() => {
    fetch(`${API_URL}/api/user-projects/my-projects`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
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
  const context = useContext(UserContext);
  const jwt = context.jwt || sessionStorage.getItem("jwt");

  useEffect(() => {
    fetch(`${API_URL}/api/not-allowed-user?populate=*`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
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

//fetches full project
export const useFetchUserProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [project, setProject] = useState();
  const context = useContext(UserContext);
  const jwt = context.jwt || sessionStorage.getItem("jwt");

  useEffect(() => {
    setLoading(true); // Begin loading only when IDs are valid

    fetch(`${API_URL}/api/project-phases`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const fetchedData = data.data[0];
        setProject(fetchedData);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);
  return { loading, error, project };
};
