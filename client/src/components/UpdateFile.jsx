import React from "react";
import "../styles/UpdateFile.css";
const UpdateFile = ({ children, handleSubmit }) => {
  return (
    <section>
      <div className="Upload">
        <form onSubmit={handleSubmit}>
          <div className="Upload__image">{children}</div>
          <button className="Upload__submit" type="submit">
            Publicar
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateFile;
