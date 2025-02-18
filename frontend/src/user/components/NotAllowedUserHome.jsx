import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../utility/UserContext";
import { useFetchNotAllwedUser } from "../hooks/useFetchUserProjects";
const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

const NotAllowedUserHome = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const { loading, error, message } = useFetchNotAllwedUser();

  const handleLogoutClick = () => {
    // Clear user session or token
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");

    setUser(null); // Update user state in context
    // Redirect to homepage after logout
  };

  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  return user === null ? (
    <p>Loading...</p>
  ) : (
    <section className="hero is-fullheight">
      <div className="hero-body columns">
        <div className="column is-one-third">
          <figure className="image is-3by4">
            <img
              loading="lazy"
              src={`${API_URL}${message.image.formats.thumbnail.url}`} // Fallback image for older browsers
              srcSet={`
            ${API_URL}${message.image.formats.thumbnail.url} 117w,
            ${API_URL}${message.image.formats.small.url} 375w,
            ${API_URL}${message.image.formats.medium.url} 563w,
            ${API_URL}${message.image.formats.large.url} 750w,
            ${API_URL}${message.image.url} 3000w
          `}
              sizes="
            (max-width: 768px) 375px,
            (min-width: 769px) and (max-width: 1023px) 563px,
            (min-width: 1024px) and (max-width: 1215px) 750px,
            (min-width: 1216px) and (max-width: 1407px) 1000px,
            3000px
          "
              alt={message.image.name || "Image"}
            />
          </figure>
        </div>

        <div className="column">
          <h1 className="title">Salut, {user.username}</h1>
          <span></span>
          <p className="subtitle">{message.message}</p>
          <Link className="button" to="/contact" onClick={handleLogoutClick}>
            <strong>Contact</strong>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotAllowedUserHome;
