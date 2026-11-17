import usePageMeta from "../../main/hooks/usePageMeta";
import { WHATSAPP_CATALOG_URL } from "../../site";
import "../styles/Jewelry.css";

// jewelry.zorzon.com.ro: points visitors to the WhatsApp catalog, so they
// know they are leaving the site
function WhatsAppCatalog() {
  usePageMeta({
    title: "Catalog pe WhatsApp",
    description:
      "Bijuteriile ZORZON Jewelry sunt în catalogul nostru de pe WhatsApp.",
  });

  return (
    <div className="section has-text-centered catalog-notice">
      <h1 className="title is-4 jewelry-title">ZORZON Jewelry</h1>
      <p className="catalog-text">
        Colecția noastră de bijuterii artizanale se află&nbsp;în
      </p>
      <a className="button is-dark" href={WHATSAPP_CATALOG_URL}>
        Catalogul WhatsApp
      </a>
    </div>
  );
}

export default WhatsAppCatalog;
