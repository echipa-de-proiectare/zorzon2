const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

const Footer = ({ footer, logoSecondary }) => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>{footer.about}</p>
        <div className="breadcrumb is-centered has-bullet-separator">
          <ul className="is-flex-direction-row is-align-items-center ">
            {footer.contact.map((contact) => (
              <li key={contact.id}>
                <a
                  className=" has-text-grey"
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="content has-text-centered">
        <figure className="image is-inline-block ">
          <img
            src={`${API_URL}${logoSecondary.url}`}
            alt="Zorzon Logo"
            style={{ maxWidth: "100px" }}
          />
        </figure>
      </div>
    </footer>
  );
};

export default Footer;
