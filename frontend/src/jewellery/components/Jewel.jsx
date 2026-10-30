import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import LoadingIcon from "../../elements/loadingIcon";
import ErrorMessage from "../../elements/ErrorMessage";
import usePageMeta from "../../main/hooks/usePageMeta";
import { imageFallbackUrl, imageSrcSet } from "../../main/utils/images";
import { SITE_URL } from "../../site";
import { useFetchJewelById, useFetchJewelleryInfo } from "../hooks/useFetchJewels";
import "../styles/Jewellery.css";

// wa.me opens WhatsApp (app or web) with the message already written
const whatsappLink = (number, jewel) => {
  const text = jewel.available
    ? `Bună! Aș dori mai multe detalii despre „${jewel.name}”: ${SITE_URL}/piesa/${jewel.id}`
    : `Bună! Am văzut „${jewel.name}” și aș dori o piesă asemănătoare: ${SITE_URL}/piesa/${jewel.id}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};

function Jewel() {
  const { id } = useParams();
  const { loading, error, notFound, jewel } = useFetchJewelById(id);
  const { info } = useFetchJewelleryInfo();
  usePageMeta(
    notFound
      ? { title: "Piesă negăsită", noindex: true }
      : {
          title: jewel?.name,
          description:
            jewel &&
            [jewel.material, jewel.price, jewel.description]
              .filter(Boolean)
              .join(" · "),
          image: jewel && imageFallbackUrl(jewel.cover, 1000),
        }
  );

  if (loading) return <LoadingIcon />;
  if (notFound)
    return (
      <div className="section has-text-centered">
        <h1 className="title is-4">Piesa nu a fost găsită</h1>
        <Link to="/" className="button is-gray">
          Vezi toată colecția
        </Link>
      </div>
    );
  if (error) return <ErrorMessage />;

  return (
    <div className="section">
      <div className="columns is-variable is-6">
        <div className="column is-7">
          <Swiper
            spaceBetween={16}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="jewel-gallery"
          >
            {jewel.images.map((image) => (
              <SwiperSlide key={image.id}>
                <figure className="image is-4by5">
                  <img
                    src={imageFallbackUrl(image, 1000)}
                    srcSet={imageSrcSet(image)}
                    sizes="(max-width: 768px) calc(100vw - 3rem), 560px"
                    alt={image.alternativeText || jewel.name}
                    className="is-cover"
                  />
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="column is-5 jewel-details">
          <h1 className="title is-4">{jewel.name}</h1>
          {jewel.material && (
            <p className="jewel-material">{jewel.material}</p>
          )}
          <p className="jewel-price is-size-5">
            {jewel.available ? jewel.price : "Vândut"}
          </p>
          {jewel.description && (
            <p className="jewel-description">{jewel.description}</p>
          )}
          {info?.whatsapp && (
            <a
              className="button is-dark is-fullwidth whatsapp-button"
              href={whatsappLink(info.whatsapp, jewel)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {jewel.available
                ? "Comandă pe WhatsApp"
                : "Întreabă de o piesă similară"}
            </a>
          )}
          <Link to="/" className="jewel-back">
            ← Înapoi la colecție
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Jewel;
