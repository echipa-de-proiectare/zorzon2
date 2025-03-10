import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainAppLayout from "./layouts/MainAppLayout";
import Homepage from "./main/components/Homepage";
import Contact from "./main/components/Contact";
import Portfolio from "./main/components/Portfolio";
import Project from "./main/components/Project";
import LoadingIcon from "./elements/loadingIcon";
import ScrollToTop from "./main/components/utility/ScrollToTop";
import GoogleAuthRedirect from "./user/utility/GoogleAuthRedirect";
import UserAppLayout from "./layouts/UserAppLayout";
import { useEffect } from "react";
import { UserProvider } from "./user/utility/UserContext";
import { Protector } from "./user/utility/helpers";
import UserHome from "./user/components/UserHome";
import UserProject from "./user/components/UserProject";
import useFetchGlobalSettings from "./main/hooks/useFetchGlobalSettings";
import LogOut from "./user/utility/LogOut";
import LogIn from "./user/utility/LogIn";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

function App() {
  useEffect(() => {
    // Enforce light mode
    document.documentElement.classList.remove("dark-mode");
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  const { globalSettings, loading, error } = useFetchGlobalSettings();
  if (loading) return <LoadingIcon />;
  if (error) return <p>Error: {error}</p>;

  // Extract the logo_secondary URL
  const logoSecondaryUrl = globalSettings.logo_secondary.url;
  if (logoSecondaryUrl) {
    // Ensure the URL is absolute
    const absoluteUrl = `${API_URL}${logoSecondaryUrl}`;

    // Set the favicon dynamically
    const favicon = document.getElementById("dynamic-favicon");
    favicon.href = absoluteUrl;
  } else {
    console.error("logo_secondary URL not found in API response");
  }

  return (
    <UserProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={<MainAppLayout globalSettings={globalSettings} />}
          >
            <Route
              index
              element={<Homepage logoPrimary={globalSettings.logo_primary} />}
            />
            <Route path="contact" element={<Contact />} />
            <Route path="portofoliu" element={<Portfolio />} />
            <Route path="portofoliu/:id" element={<Project />} />
            <Route path="log-in" element={<LogIn />} />
            <Route
              path="connect/google/callback/*"
              element={<GoogleAuthRedirect />}
            />
          </Route>
          <Route
            path="/user/"
            element={<UserAppLayout globalSettings={globalSettings} />}
          >
            <Route
              path="profile"
              element={<Protector Component={<UserHome />} />}
            />
            <Route
              path="project"
              element={<Protector Component={<UserProject />} />}
            />
            <Route
              path="log-out"
              element={<Protector Component={<LogOut />} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
