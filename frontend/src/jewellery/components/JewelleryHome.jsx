import { Link } from "react-router-dom";
import JewelCard from "./JewelCard";
import LoadingIcon from "../../elements/loadingIcon";
import ErrorMessage from "../../elements/ErrorMessage";
import usePageMeta from "../../main/hooks/usePageMeta";
import { useFetchJewels, useFetchJewelleryInfo } from "../hooks/useFetchJewels";

function JewelleryHome() {
  const { loading, error, jewels } = useFetchJewels();
  const { info } = useFetchJewelleryInfo();
  usePageMeta({ title: "Bijuterii artizanale", description: info?.description });

  if (loading) return <LoadingIcon />;
  if (error) return <ErrorMessage />;

  return (
    <div className="section has-text-centered">
      <h1 className="title is-4 jewellery-title">ZORZON Jewellery Design</h1>
      {info?.description && (
        <p className="subtitle is-6 jewellery-intro">{info.description}</p>
      )}
      {jewels.length === 0 ? (
        <p className="jewellery-empty">Colecția apare în curând.</p>
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

export default JewelleryHome;
