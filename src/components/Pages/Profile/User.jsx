import React, { useEffect, useState } from 'react'
import Header from '../../Layout/Header'
import { Footer } from '../../Layout/Footer'
import Popup from '../../UI/PopupUser'
import axios from 'axios'
import { fetchPhotos, openUploadWidget } from "../../../cloudinaryservice";
import { data } from 'autoprefixer'
import { counter } from '@fortawesome/fontawesome-svg-core'

export default function User() {
  const [CedulaCliente, setCedulaCliente] = useState("")
  const [Username, setUsername] = useState("")
  const [Estado, setEstado] = useState("")
  // const [UrlImage, setUrlImage] = useState("")
  const [Plan, setPlan] = useState("")
  const [Images, setImages] = useState("")

  const username = localStorage.getItem("username")

  useEffect(() => {

    axios.post("https://api.cruzpet.com:8443/v1.0/clientes/buscarcliente", {
      username: username,
    }).then(function (resp) {
      setCedulaCliente(resp.data.cedulaUsuario)
      setUsername(resp.data.nombres)
      setImages(resp.data.imagenCliente)
      if (resp.data.estado === 'a') {
        setEstado('Activo')
      } else {
        setEstado('Inactivo')
      }
      if (resp.data.planes === null) {
        setPlan('N/A')
      } else {
        setPlan(resp.data.planes)
      }

    })
  }, [])

  const beginUpload = tag => {
    const uploadOptions = {
      cloudName: "dadzakyw1",
      tags: [tag, 'anImage'],
      uploadPreset: "photoUser"
    };
    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        if (photos.event === 'success') {
          const url = photos.info.url
          UpdateFoto(url)
          localStorage.getItem('imagen')
          localStorage.setItem('imagen', url)
        }

        if (photos.event === 'close') {
          const timer = setTimeout(() => {
            window.location.reload(true)
          }, 2000);
          return () => clearTimeout(timer);
        }

      } else {
      }
    })
  }

  useEffect(() => {
    fetchPhotos("image", setImages);
  }, [3])

  const [putResult, setPutResult] = useState(null);
  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  async function UpdateFoto(url) {
    const updateFoto = {
      cedulaCliente: CedulaCliente,
      imagenCliente: url
    };
    try {
      const res = await axios.put(`https://api.cruzpet.com:8443/v1.0/clientes/actualizarimagen`, updateFoto, {

        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = {
        data: res.data,
      };
      setPutResult(fortmatResponse(result));

    } catch (err) {
      setPutResult(fortmatResponse(err.response?.data || err));
    }
  }

  return (
    <div>
      <Header />
      <div className='min-h-[460px]'>
        <div className='w-100 flex justify-center'>
          <div className="md:flex gap-8">
            <div className="md:w-full text-center">
              <button className='relative' onClick={() => beginUpload("image")}>
                <img className="relative top-0 left-0 z-50 opacity-1 transition-opacity hover:opacity-50 w-48 h-48 rounded-full mx-auto -mb-24 object-cover" src={localStorage.getItem("imagen")} alt={'Photo' + username} />
                <p className='relative top-5 left-0 botton-0 text-black-800'>Cambiar</p>
              </button>
              <div className="bg-white shadow-lg rounded-lg px-8 pt-20 pb-10 text-gray-400">
                <h3 className="font-title text-gray-800 text-xl mb-3">
                  {Username}
                </h3>
                <div>
                  <Popup />
                  <div className="rounded-lg p-2 w-full mt-4">
                    <div className="flex w-100 items-center justify-between text-sm text-gray-600 dark:text-gray-200">
                      <p className="flex flex-col mx-2 w-14 items-center">
                        Estado
                        <span className="text-black dark:text-white font-bold">
                          {Estado}
                        </span>
                      </p>
                      <p className="flex flex-col mx-2 w-14 items-center">
                        Mascotas
                        <span className="text-black dark:text-white font-bold">
                          {localStorage.getItem('pets')}
                        </span>
                      </p>
                      <p className="flex flex-col mx-2 w-14 items-center">
                        Plan
                        <span className="text-black dark:text-white font-bold">
                          {Plan}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='sm:absolute bottom-0 left-0 w-100 '>
        <Footer />
      </div>
    </div>
  )
}
