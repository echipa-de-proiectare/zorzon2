const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable
import { useState, useEffect } from "react";

const useFetchServices = () => {
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Use the new controller endpoint that properly populates nested data
        const response = await fetch(`${API_URL}/api/services`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setServices(result.data); // Access the `data` key from the API response
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { services, loading, error };
};

export default useFetchServices;
