import { Link } from "react-router-dom";
import JewelCard from "./JewelCard";
import LoadingIcon from "../../elements/loadingIcon";
import ErrorMessage from "../../elements/ErrorMessage";
import usePageMeta from "../../main/hooks/usePageMeta";
import { useFetchJewels, useFetchJewelryInfo } from "../hooks/useFetchJewels";

function JewelryHome() {
  const { loading, error, jewels } = useFetchJewels();
  const { info } = useFetchJewelryInfo();
  usePageMeta({ title: "Bijuterii artizanale", description: info?.description });

  if (loading) return <LoadingIcon />;
  if (error) return <ErrorMessage />;

  return (
    <div className="section has-text-centered">
      <h1 className="title is-4 jewelry-title">ZORZON Jewelry</h1>
      {info?.description && (
        <p className="subtitle is-6 jewelry-intro">{info.description}</p>
      )}
      {jewels.length === 0 ? (
        <p className="jewelry-empty">Colecția apare în curând.</p>
      ) : (
        <div className="fixed-grid has-2-cols-mobile has-3-cols-tablet">
          <div className="grid">
            {jewels.map((jewel) => (
              <div className="cell" key={jewel.id}>
                <Link to={`/piesa/${jewel.id}`}>
                  <JewelCard jewel={jewel} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default JewelryHome;
