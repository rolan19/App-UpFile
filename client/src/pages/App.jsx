import React, { useState, useEffect } from "react";
import Axios from "axios";

import Header from "../components/Header";
import UpdateFile from "../components/UpdateFile";
import ViewFile from "../components/ViewFile";
import iconUpLoad from "../assets/computacion-en-la-nube.svg";
import "../styles/App.css";

const SecccionSubirImagen = ({
  subiendoImagen,
  imagenUrl,
  handleImageSelect,
}) => {
  if (subiendoImagen) {
    return <p>Cargando...</p>;
  } else if (imagenUrl) {
    return <img src={imagenUrl} alt="" />;
  } else {
    return (
      <label name="imagen" className="Upload__content">
        <div className="Upload__container">
          <img src={iconUpLoad} />
          <span>Subir Archivo</span>
        </div>
        <input
          type="file"
          name="archivos"
          className="Upload_input"
          onChange={handleImageSelect}
        />
      </label>
    );
  }
};

const App = () => {
  // APIS
  const APIFILES = "http://localhost:3000/api/archivos/";
  const namePreview = "imagen.jpg";

  // ESTADOS
  const [imagenUrl, setImagenUrl] = useState("");
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [enviandoPost, setEnviandoPost] = useState(false);
  const [caption, setCaption] = useState(namePreview);

  const [files, setFiles] = useState([]);

  // LISTADO DE PUBLICACION DE ARCHIVOS
  const fetchFiles = async () => {
    const { data } = await Axios.get(APIFILES);
    setFiles(data.message);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // SUBIDA DE ARCHIVOS

  const handleImageSelect = async (e) => {
    const APIUPFILE = "http://localhost:3000/api/upload/";

    try {
      setSubiendoImagen(true);
      let file = e.target.files[0];
      setSubiendoImagen(true);

      // const response = await Axios.post(APIUPFILE, {
      //   archivos,
      // });
      // console.log(response);
      setTimeout(() => {
        console.log(file);
        setSubiendoImagen(false);
      }, 2000);
      // console.log(archivos.name);
    } catch (error) {
      setSubiendoImagen(false);
      console.log(error);
    }
  };

  // PUBLICACION DE ARCHIVOS
  const handleChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (enviandoPost) {
      return console.log("Publicando...");
    }

    try {
      setEnviandoPost(true);

      const response = await Axios.post(APIFILES, {
        nombre: caption,
        archivos: imagenUrl,
      });

      console.log(response);

      setEnviandoPost(false);
      setImagenUrl("");
      setCaption("");
      fetchFiles();
    } catch (error) {
      console.log(error);
    }
  };

  // ELIMINANDO ARCHIVOS

  const handleDelete = async (id) => {
    await Axios.delete(`${APIFILES}${id}`);
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
                  {...item}
                />
              ))}
            </div>
          </div>
        </section>
        <UpdateFile
          handleSubmit={handleSubmit}
          caption={caption}
          handleChange={handleChange}
        >
          <SecccionSubirImagen
            imagenUrl={imagenUrl}
            subiendoImagen={subiendoImagen}
            handleImageSelect={handleImageSelect}
          />
        </UpdateFile>
      </main>
    </>
  );
};

export default App;
