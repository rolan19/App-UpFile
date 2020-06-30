import React, { useState, useEffect } from "react";
import Axios from "axios";

import Header from "../components/Header";
import UpdateFile from "../components/UpdateFile";
import ViewFile from "../components/ViewFile";
// import iconUpLoad from "../assets/computacion-en-la-nube.svg";
import "../styles/App.css";

const App = () => {
  // APIS
  const API = "http://localhost:4000/api/files";

  // ESTADOS
  // const [imagenUrl, setImagenUrl] = useState("");
  // const [subiendoImagen, setSubiendoImagen] = useState(false);
  // const [enviandoPost, setEnviandoPost] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState({});

  const [files, setFiles] = useState([]);

  // LISTADO DE PUBLICACION DE ARCHIVOS
  const fetchFiles = async () => {
    const { data } = await Axios.get(API);
    setFiles(data.msg);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // SUBIDA DE ARCHIVOS

  // const handleImageSelect = async (e) => {
  //   const APIUPFILE = "http://localhost:3000/api/upload/";

  //   try {
  //     setSubiendoImagen(true);
  //     let file = e.target.files[0];
  //     setSubiendoImagen(true);

  //     // const response = await Axios.post(APIUPFILE, {
  //     //   archivos,
  //     // });
  //     // console.log(response);
  //     setTimeout(() => {
  //       console.log(file);
  //       setSubiendoImagen(false);
  //     }, 2000);
  //     // console.log(archivos.name);
  //   } catch (error) {
  //     setSubiendoImagen(false);
  //     console.log(error);
  //   }
  // };

  // PUBLICACION DE ARCHIVOS

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // await Axios.post(API, {
      //   title: caption,
      //   image: image,
      // });
      console.log(image);
      // console.log(res);
      // const response = {
      //   title: caption,
      //   image: image,
      // };
      // console.log(response);
      // console.log(image);
    } catch (error) {
      console.log(error);
    }
  };

  // ELIMINANDO ARCHIVOS

  // const handleDelete = async (id) => {
  //   await Axios.delete(`${APIFILES}${id}`);
  // };

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
                  // handleDelete={() => handleDelete(item._id)}
                  {...item}
                />
              ))}
            </div>
          </div>
        </section>
        <UpdateFile handleSubmit={handleSubmit}>
          <div>
            <input type="file" name="image" onChange={handleImage} />
            <input type="text" onChange={handleChange} />
          </div>
        </UpdateFile>
      </main>
    </>
  );
};

export default App;
