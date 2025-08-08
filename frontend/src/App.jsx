import { BrowserRouter, Route, Routes } from "react-router-dom";
import useFetchAbout from "./main/hooks/useFetchAbout";
import MainAppLayout from "./layouts/MainAppLayout";
import Homepage from "./main/components/Homepage";
import Contact from "./main/components/Contact";
import Portfolio from "./main/components/Portfolio";
import Project from "./main/components/Project";
import LoadingIcon from "./elements/loadingIcon";
import ScrollToTop from "./main/components/utility/ScrollToTop";
import { useEffect } from "react";
import Services from "./main/components/Services";

const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

function App() {
  useEffect(() => {
    // Enforce light mode
    document.documentElement.classList.remove("dark-mode");
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  const { about, loading, error } = useFetchAbout();
  if (loading) return <LoadingIcon />;
  if (error) return <p>Error: {error}</p>;

  // Extract the logo_secondary URL
  const logoSecondaryUrl = about.logo_secondary.url;
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
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainAppLayout about={about} />}>
          <Route index element={<Homepage about={about} />} />
          <Route path="contact" element={<Contact />} />
          <Route path="portofoliu" element={<Portfolio />} />
          <Route path="services-and-rates" element={<Services />} />
          <Route path="portofoliu/:id" element={<Project />} />
          <Route path="*" element={<Homepage about={about} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
