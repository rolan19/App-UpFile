import React from "react";
import "../styles/UpdateFile.css";
const UpdateFile = ({ children, handleSubmit, handleChange, caption }) => {
  return (
    <section>
      <form className="Upload" onSubmit={handleSubmit}>
        <h1 className="Upload__title">Sube tus archivos</h1>
        <div className="Upload__container">{children}</div>
        <div className="Upload__name">
          <input
            type="text"
            placeholder="Escribe un nombre"
            value={caption}
            onChange={handleChange}
            minLength="2"
            maxLength="40"
            autoComplete="off"
            required
          />
          <button className="Upload__submit" type="submit">
            Publicar
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateFile;
