import "../styles/InfoSidebar.css";
const InfoSidebar = ({ document, downloadCurrent, downloadAll }) => {
  return (
    <div className="block is-flex is-flex-direction-column is-align-items-start is-justify-content-start">
      <p className="mb-2">{document.description}</p>

      <button className="download-btn mb-2" onClick={downloadCurrent}>
        <i className="fa-regular fa-circle-down mr-1"></i> Download
      </button>

      {document.MediaDoc.length > 1 && (
        <button
          className="download-btn"
          onClick={() => downloadAll(document.MediaDoc)}
        >
          <i className="fa-regular fa-file-zipper mr-1"></i> Download All
        </button>
      )}
    </div>
  );
};

export default InfoSidebar;
