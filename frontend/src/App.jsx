import { BrowserRouter, Route, Routes } from "react-router-dom";
import useFetchAbout from "./main/hooks/useFetchAbout";
import MainAppLayout from "./layouts/MainAppLayout";
import Homepage from "./main/components/Homepage";
import Portfolio from "./main/components/Portfolio";
import Project from "./main/components/Project";
import LoadingIcon from "./elements/loadingIcon";
import ErrorMessage from "./elements/ErrorMessage";
import ScrollToTop from "./main/components/utility/ScrollToTop";
import { useEffect } from "react";
import Services from "./main/components/Services";
import Choice from "./main/components/Choice";
import JewelleryHome from "./jewellery/components/JewelleryHome";
import Jewel from "./jewellery/components/Jewel";
import { DESIGN_URL, isJewellerySite, JEWELLERY_URL } from "./site";

const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

function App() {
  useEffect(() => {
    // Enforce light mode
    document.documentElement.classList.remove("dark-mode");
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  const { about, loading, error } = useFetchAbout();
  if (loading) return <LoadingIcon />;
  if (error) return <ErrorMessage />;

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
      {isJewellerySite ? (
        <Routes>
          <Route
            element={
              <MainAppLayout
                about={about}
                homePath="/"
                links={[
                  { label: "COLECȚIE", to: "/" },
                  { label: "INTERIOR DESIGN", href: `${DESIGN_URL}/design` },
                ]}
              />
            }
          >
            <Route index element={<JewelleryHome />} />
            <Route path="piesa/:id" element={<Jewel />} />
            <Route path="*" element={<JewelleryHome />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route index element={<Choice about={about} />} />
          <Route
            element={
              <MainAppLayout
                about={about}
                homePath="/design"
                links={[
                  { label: "PORTOFOLIU", to: "/portofoliu" },
                  { label: "SERVICII", to: "/services-and-rates" },
                  { label: "JEWELLERY", href: JEWELLERY_URL },
                ]}
              />
            }
          >
            <Route path="design" element={<Homepage about={about} />} />
            {/* <Route path="contact" element={<Contact />} /> */}
            <Route path="portofoliu" element={<Portfolio />} />
            <Route path="services-and-rates" element={<Services />} />
            <Route path="portofoliu/:id" element={<Project />} />
            <Route path="*" element={<Homepage about={about} />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
