import React, { useState, useEffect } from "react";
import Axios from "axios";

import Header from "../components/Header";
import UpdateFile from "../components/UpdateFile";
import ViewFile from "../components/ViewFile";
import iconUpLoad from "../assets/computacion-en-la-nube.svg";
import IconClose from "../assets/close.svg";
// import imgJS from "../assets/tipo-js.svg";
// import imgBDD from "../assets/base-de-datos.svg";
// import imgText from "../assets/codigo-fuente.svg";
import "../styles/App.css";

const App = () => {
  // APIS
  const API = "http://localhost:4000/api/files/";

  // ESTADOS
  const [urlImage, setUrlImage] = useState("");
  const [typeFile, setTypeFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [files, setFiles] = useState([]);

  // LISTADO DE PUBLICACION DE ARCHIVOS
  const fetchFiles = async () => {
    const { data } = await Axios.get(API);
    setFiles(data.msg);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // PREVIEW DE LA IMAGEN

  const handleImage = (e) => {
    setImageFile(e.target.files[0]);
    previewImage(e.target.files[0]);
  };

  const previewImage = (image) => {
    const imageUrl = URL.createObjectURL(image);
    setUrlImage(imageUrl);
    setTypeFile(image.name);
  };

  const validatePreview = () => {
    let permitImage = /.(png|jpg|jpeg|svg)$/;
    let permitMovie = /.(mp4|webm|ogg)$/;
    // let permitServer = /.(sql|odb|mdb)$/;
    // let permitJS = /.js$/;

    if (permitImage.exec(typeFile)) {
      return (
        <img src={urlImage} alt={typeFile} className="Upload__imagePreview" />
      );
    } else if (permitMovie.exec(typeFile)) {
      return <video src={urlImage} className="Upload__imagePreview"></video>;
    }
    // else if (permitJS.exec(typeFile)) {
    //   return imgJS;
    // } else {
    //   return imgText;
    // }
  };

  const handleClose = () => {
    setImageFile(null);
    setUrlImage("");
    setTypeFile("");
  };

  // PUBLICANDO EL ARCHIVO
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();

      formData.append("title", caption);
      formData.append("image", imageFile);

      await Axios.post(API, formData);

      fetchFiles();
      setImageFile(null);
      setCaption("");
      setUrlImage("");
      setTypeFile("");
    } catch (error) {
      console.log(error);
    }
  };

  // ELIMINANDO ARCHIVOS

  const handleDelete = async (id) => {
    await Axios.delete(`${API}${id}`);
    fetchFiles();
  };

  return (
    <>
      <Header />
      <main className="grid-sections">
        <section className="files-views">
          <h1>Tu Biblioteca</h1>
          <div className="files-scroll">
            <div className="files-list">
              {files.map((item) => (
                <ViewFile
                  key={item._id}
                  handleDelete={() => handleDelete(item._id)}
                  formFile="formFile"
                  {...item}
                />
              ))}
            </div>
          </div>
        </section>
        <UpdateFile
          handleSubmit={handleSubmit}
          handleChange={(e) => setCaption(e.target.value)}
          caption={caption}
        >
          <>
            {urlImage === "" ? (
              <>
                <div className="Upload__select">
                  <img src={iconUpLoad} alt="Sube tu archivo" />
                  <p>Selecciona o Arrastra un Archivo</p>
                </div>
                <input
                  type="file"
                  className="Upload__file"
                  onChange={handleImage}
                  accept="image/*,video/*"
                  required
                />
              </>
            ) : (
              <>
                <div className="detete_select" onClick={handleClose}>
                  <img src={IconClose} alt="close" className="btn-close" />
                </div>
                {validatePreview()}
              </>
            )}
          </>
        </UpdateFile>
      </main>
    </>
  );
};

export default App;
