const InfoSidebar = ({ document, downloadCurrent, downloadAll }) => {
  return (
    <div className="container is-flex is-flex-direction-column is-align-items-start is-justify-content-start ">
      <i className="fa-regular fa-circle-down mb-2" onClick={downloadCurrent}>
        Download
      </i>
      {document.document.length > 1 && (
        <i
          className="fa-regular fa-file-zipper"
          onClick={() => downloadAll(document.document)}
        >
          Download All
        </i>
      )}
      <p className="mb-2">{document.description}</p>
    </div>
  );
};

export default InfoSidebar;
