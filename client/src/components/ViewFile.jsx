import React from "react";
// import imgIcon from "../assets/icon-texto.png";
import imgJS from "../assets/tipo-js.svg";
import imgBDD from "../assets/base-de-datos.svg";
import imgText from "../assets/codigo-fuente.svg";
import "../styles/ViewFile.css";

const ViewFile = ({ nombre, archivos, createdAt, handleDelete }) => {
  const validationPreview = () => {
    let permitImage = /.(png|jpg|jpeg|svg)$/;
    // const permitMovie = /.mp4$/;
    let permitServer = /.(sql|odb|mdb)$/;
    let permitJS = /.js$/;

    if (permitImage.exec(archivos)) {
      return archivos;
    } else if (permitServer.exec(archivos)) {
      return imgBDD;
    } else if (permitJS.exec(archivos)) {
      return imgJS;
    } else {
      return imgText;
    }
  };

  const validateType = () => {
    const permitExtencion = /.(png|jpg|jpeg|svg)$/;
    const permitMovie = /.mp4$/;
    if (permitExtencion.exec(archivos)) {
      return "Imagen";
    } else if (permitMovie.exec(archivos)) {
      return "Video";
    } else {
      return "Archivo";
    }
  };

  return (
    <article onDoubleClick={handleDelete} className="View-file">
      <div className="file_img">
        <img src={validationPreview()} alt="" />
      </div>
      <div className="file_description">
        <div className="name">
          <p className="prim">Nombre:</p>
          <p className="secon">{nombre}</p>
        </div>
        <div className="type">
          <p className="prim">Tipo:</p>
          <p className="secon">{validateType()}</p>
        </div>
        <div className="size">
          <p className="prim">Tamaño:</p>
          <p className="secon">{"36B"}</p>
        </div>
        <div className="update">
          <p className="prim">Fecha de Subida:</p>
          <p className="secon">{createdAt}</p>
        </div>
      </div>
    </article>
  );
};

export default ViewFile;
