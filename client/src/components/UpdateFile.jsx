import React from "react";
import "../styles/UpdateFile.css";
const UpdateFile = ({ children, handleSubmit, caption, handleChange }) => {
  return (
    <section>
      <h1>UpdateFile</h1>
      <div className="Upload">
        <form onSubmit={handleSubmit}>
          <div className="Upload__image">{children}</div>
          <textarea
            name="caption"
            className="Upload__caption"
            required
            maxLength="180"
            value={caption}
            onChange={handleChange}
          ></textarea>
          <button className="Upload__submit" type="submit">
            Publicar
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateFile;
