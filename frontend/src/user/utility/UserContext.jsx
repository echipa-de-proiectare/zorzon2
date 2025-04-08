import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [hydrated, setHydrated] = useState(false); // NEW

  useEffect(() => {
    const storedToken = sessionStorage.getItem("jwt");
    const storedUser = localStorage.getItem("user");

    if (storedToken) setJwt(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));

    setHydrated(true); // ✅ we’re ready
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, jwt, setJwt, hydrated }}>
      {children}
    </UserContext.Provider>
  );
};
