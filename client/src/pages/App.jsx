import React, { useState, useEffect } from "react";
import Axios from "axios";

import Header from "../components/Header";
import UpdateFile from "../components/UpdateFile";
import ViewFile from "../components/ViewFile";
import iconUpLoad from "../assets/computacion-en-la-nube.svg";
import "../styles/App.css";

const App = () => {
  // APIS
  const API = "http://localhost:4000/api/files/";

  // ESTADOS
  const [urlImage, setUrlImage] = useState("");
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

  const previewImage = (urlImage) => {
    const image = URL.createObjectURL(urlImage);
    setUrlImage(image);
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
      setCaption("");
      setUrlImage("");
      setImageFile(null);
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
                  required
                />
              </>
            ) : (
              <img src={urlImage} className="Upload__imagePreview" />
            )}
          </>
        </UpdateFile>
      </main>
    </>
  );
};

export default App;
