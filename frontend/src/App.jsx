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
import JewelryHome from "./jewelry/components/JewelryHome";
import Jewel from "./jewelry/components/Jewel";
import MovedToDesign from "./main/components/utility/MovedToDesign";
import { isChoiceSite, isDesignSite, isJewelrySite } from "./site";

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
      {isJewelrySite && (
        <Routes>
          <Route element={<MainAppLayout about={about} links={[]} />}>
            <Route index element={<JewelryHome />} />
            <Route path="piesa/:id" element={<Jewel />} />
            <Route path="*" element={<JewelryHome />} />
          </Route>
        </Routes>
      )}
      {isDesignSite && (
        <Routes>
          <Route
            element={
              <MainAppLayout
                about={about}
                links={[
                  { label: "PORTOFOLIU", to: "/portofoliu" },
                  { label: "SERVICII", to: "/services-and-rates" },
                ]}
              />
            }
          >
            <Route index element={<Homepage about={about} />} />
            {/* <Route path="contact" element={<Contact />} /> */}
            <Route path="portofoliu" element={<Portfolio />} />
            <Route path="services-and-rates" element={<Services />} />
            <Route path="portofoliu/:id" element={<Project />} />
            <Route path="*" element={<Homepage about={about} />} />
          </Route>
        </Routes>
      )}
      {isChoiceSite && (
        <Routes>
          <Route index element={<Choice about={about} />} />
          {/* Old interior design addresses moved to design.zorzon.com.ro */}
          <Route path="*" element={<MovedToDesign />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
