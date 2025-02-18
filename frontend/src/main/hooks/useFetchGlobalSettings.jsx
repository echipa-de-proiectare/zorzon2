const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable
import { useState, useEffect } from "react";

const useFetchGlobalSettings = () => {
  const [globalSettings, setGlobalSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/global-settings`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setGlobalSettings(result.data); // Access the `data` key from the API response
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { globalSettings, loading, error };
};

export default useFetchGlobalSettings;
