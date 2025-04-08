import { useContext } from "react";
import { UserContext } from "../utility/UserContext";

const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable
const UserHome = ({ globalSettings }) => {
  const { user } = useContext(UserContext);
  const logoSecondary = globalSettings.logo_secondary;

  if (!user) return <p>Loading...</p>;

  return (
    <div
      className="section mt-6 is-flex is-flex-direction-column is-justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="section">
        <h1 className="is-size-2 has-text-centered">Salut, {user.username}</h1>
      </div>
      <div className="section columns is-0">
        <div className="column is-4 is-flex is-justify-content-center">
          <figure className="image ">
            <img
              src={`${API_URL}${logoSecondary.formats.small.url}`} // Check if primary logo is available
              alt="Company logo"
              style={{ maxWidth: "300px" }}
            />
          </figure>
        </div>
        <div className="column is-8 is-flex is-flex-direction-column is-justify-content-space-between">
          <h2 className="title">Bun venit pe profilul tau ZORZON!</h2>
          <div>
            <p>
              Aici vei putea urmări evoluția proiectului tău în timp real. Pe
              măsură ce echipa noastră de arhitecți avansează, vei avea acces la
              planșe, imagini și documente direct din profilul tău.
            </p>
            <ul>
              <li>
                <strong>Fișiere disponibile pentru descărcare</strong> – Vei
                putea descărca materialele încărcate de arhitecți, inclusiv
                planuri si randări.
              </li>
              <li>
                <strong>Versiuni și propuneri</strong> – Explorează diferitele
                variante ale proiectului și vezi cum evoluează acesta.
              </li>
              <li>
                <strong>Actualizări constante</strong> – Fii mereu la curent cu
                noile modificări și îmbunătățiri aduse proiectului tău.
              </li>
            </ul>
          </div>
          <p>
            Dacă ai întrebări sau ai nevoie de clarificări, echipa noastră este
            aici pentru a te ajuta.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
