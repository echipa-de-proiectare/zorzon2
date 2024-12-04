const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

const Footer = ({ about }) => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>{about.description}</p>
        <div className="breadcrumb is-centered has-bullet-separator">
          <ul className="is-flex-direction-row is-align-items-center ">
            {about.contact.map((link) =>
              link.name === "Email" ? (
                <li key={link.id}>
                  <a className="has-text-grey" href={`mailto:${link.link}`}>
                    {link.name}
                  </a>
                </li>
              ) : (
                <li key={link.id}>
                  <a
                    className=" has-text-grey"
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="content has-text-centered">
        <figure className="image is-inline-block ">
          <img
            src={`${API_URL}${about.logo_secondary.url}`}
            alt="Zorzon Logo"
            style={{ maxWidth: "100px" }}
          />
        </figure>
      </div>
    </footer>
  );
};

export default Footer;
