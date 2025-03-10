const InfoSidebar = ({ document, downloadCurrent, downloadAll }) => {
  return (
    <div className="block is-flex is-flex-direction-column is-align-items-start is-justify-content-start ">
      <p className="mb-2">{document.description}</p>
      <i className="fa-regular fa-circle-down mb-2" onClick={downloadCurrent}>
        Download
      </i>
      {document.MediaDoc.length > 1 && (
        <i
          className="fa-regular fa-file-zipper"
          onClick={() => downloadAll(document.MediaDoc)}
        >
          Download All
        </i>
      )}
    </div>
  );
};

export default InfoSidebar;
