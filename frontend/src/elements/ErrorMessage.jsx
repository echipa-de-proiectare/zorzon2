const ErrorMessage = () => {
  return (
    <div className="hero is-fullheight is-flex is-align-items-center is-justify-content-center">
      <div className="has-text-centered">
        <p className="title is-5">Pagina nu a putut fi încărcată</p>
        <p className="subtitle is-6">Te rugăm să încerci din nou mai târziu.</p>
        <button
          className="button is-gray"
          onClick={() => window.location.reload()}
        >
          Reîncarcă pagina
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
