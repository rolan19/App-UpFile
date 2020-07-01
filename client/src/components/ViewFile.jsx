import React from "react";
// import imgIcon from "../assets/icon-texto.png";
// import imgJS from "../assets/tipo-js.svg";
// import imgBDD from "../assets/base-de-datos.svg";
import imgText from "../assets/codigo-fuente.svg";
import iconPLay from "../assets/flecha-de-reproduccion.svg";
import iconMenu from "../assets/abajo.svg";
import iconPreview from "../assets/vision.svg";
import iconDelete from "../assets/eliminar.svg";
import "../styles/ViewFile.css";

const ViewFile = ({ title, file, createdAt, handleDelete }) => {
  const validationPreview = () => {
    let permitImage = /.(png|jpg|jpeg|svg)$/;
    let permitMovie = /.(mp4|webm|ogg)$/;
    // let permitServer = /.(sql|odb|mdb)$/;
    // let permitJS = /.js$/;

    const urlFile = `http://localhost:4000/${file}`;

    if (permitImage.exec(file)) {
      return (
        <img src={urlFile} alt="imagen preview" className="file_content_img" />
      );
    } else if (permitMovie.exec(file)) {
      return (
        <div className="file_video">
          <img
            src={iconPLay}
            alt="icono de Play"
            className="file_video-content"
          />
        </div>
      );
    } else {
      return imgText;
    }
    // else if (permitJS.exec(file)) {
    //   return imgJS;
    // }
  };

  const validateType = () => {
    const permitExtencion = /.(png|jpg|jpeg|svg)$/;
    const permitMovie = /.mp4$/;
    if (permitExtencion.exec(file)) {
      return "Imagen";
    } else if (permitMovie.exec(file)) {
      return "Video";
    } else {
      return "Archivo";
    }
  };

  return (
    <article className="View-file">
      <div className="file_img">{validationPreview()}</div>
      <div className="file_description">
        <div className="name">
          <p className="prim">Nombre:</p>
          <p className="secon">{title}</p>
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
        <div className="View_menu">
          <div className="menu-relative">
            <img src={iconMenu} alt="menu" className="btn-menu" />
            <ul className="menu_list">
              <li>
                <img src={iconPreview} alt="Preview" />
              </li>
              <li>
                <img src={iconDelete} alt="Eliminar" onClick={handleDelete} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ViewFile;
