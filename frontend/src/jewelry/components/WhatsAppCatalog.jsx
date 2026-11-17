import usePageMeta from "../../main/hooks/usePageMeta";
import { DESIGN_URL, WHATSAPP_CATALOG_URL } from "../../site";
import "../styles/Jewelry.css";

// jewelry.zorzon.com.ro: tells visitors the collection is on WhatsApp
// before they leave the site
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
        Colecția de bijuterii artizanale se află în catalogul nostru de pe
        WhatsApp.
      </p>
      <p className="catalog-leaving">
        Linkul de mai jos te duce în afara site-ului zorzon.com.ro, pe WhatsApp.
      </p>
      <a className="button is-dark catalog-button" href={WHATSAPP_CATALOG_URL}>
        Mergi la catalogul WhatsApp
      </a>
      <a className="catalog-back" href={DESIGN_URL}>
        ← Înapoi la ZORZON Design
      </a>
    </div>
  );
}

export default WhatsAppCatalog;
