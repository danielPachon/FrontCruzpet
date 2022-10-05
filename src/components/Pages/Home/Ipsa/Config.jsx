import React, { Fragment, useState, useEffect } from 'react'
import Navbar from '../../../Layout/NavBar/NavBar'
import axios from 'axios'
import PwdRequisite from '../../../Helpers/PwdRequisite/PwdRequisite'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { XIcon } from '@heroicons/react/outline'
import { fetchPhotos, openUploadWidget } from '../../../../cloudinaryservice'
import { ToastContainer, toast } from 'react-toastify'

export const Config = () => {

  const [openModal, setOpenModal] = useState(false)
  const [shpss, setShpss] = useState("")
  const [shpssTwo, setShpssTwo] = useState("")
  const [passwordNew, setPasswordNew] = useState("")
  const [passwordNewTwo, setPasswordNewTwo] = useState("")
  const [nombreIpsa, setNombreIpsa] = useState("")
  const [urlImage, setUrlImage] = useState("")
  const [idUbicacion, setIDUbicacion] = useState("")
  const [correoIpsa, setCorreoIpsa] = useState("")

  localStorage.setItem("color", 8)

  useEffect(() => {
    axios.post('https://api.cruzpet.com:8443/v1.0/ipsas/ipsarut', {
      rut: localStorage.getItem('rut')
    }).then((response) => {
      console.log("Información", response.data)
      setNombreIpsa(response.data.nombre)
      setUrlImage(response.data.logoIpsa)
      setIDUbicacion(response.data.ubicacion.idDireccion)
      setCorreoIpsa(response.data.correoIpsa)
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
          setUrlImage(url)
        }
      } else {

      }
    })
  }

  useEffect( () => {
    fetchPhotos("image", setUrlImage)
  }, [3])

  function mostrarContrasena() {

    const tipoUno = document.getElementById("passwordOne")
    if (tipoUno.type == "password") {
      tipoUno.type = "text"
      setShpss(true)
    } else {
      tipoUno.type = "password"
      setShpss(false)
    }

  }

  function mostrarContrasenaTwo() {

    const tipoDos = document.getElementById("passwordTwo")

    if (tipoDos.type == "password") {
      tipoDos.type = "text"
      setShpssTwo(true)
    } else {
      tipoDos.type = "password"
      setShpssTwo(false)
    }

  }

  const validateForm = (e) => {
    e.preventDefault()
    if (passwordNew === passwordNewTwo) {
      setOpenModal(true)
    } else {
      warnPassword()
    }

  }

  async function actualizarIpsa() {
    const updateIpsa = {
      rut: localStorage.getItem("rut"),
      nombre: nombreIpsa,
      estado: "a",
      logoIpsa: urlImage,
      passwordIpsa: passwordNew,
      direccion: {
        idDireccion: idUbicacion,
      },
      administradorCreador: null
    }

    await axios.put(`https://api.cruzpet.com:8443/v1.0/ipsas/actualizar`, updateIpsa, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      successUpdate()
      setOpenModal(false)
      const timer = setTimeout(() => {
        localStorage.clear()
        sessionStorage.clear()
        window.location.reload()
      }, 3000);
      return () => clearTimeout(timer)
    })

  }

  const warnPassword = () => toast.warn('Las contraseñas ingresadas no coinciden.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const successUpdate = () => toast.success('La información de la veterinaria se ha actualizado.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex">
        <Navbar />
      </div>
      <div className='pl-20 mt-4'>
        <form onSubmit={validateForm} className='relative m-4 p-4 flex flex-col min-w-0 bg-white bg-clip-border border-1 border-solid shadow-sm rounded-xl justify-center overflow-hidden w-11/12 max-w-full'>
          <div className='my-20 flex justify-center w-full'>
            <button type='button' onClick={() => beginUpload("image")} className='relative' >
              <img className="relative top-0 left-0 z-50 opacity-1 transition-opacity hover:opacity-50 w-48 h-48 rounded-full mx-auto -mb-24 object-cover" src={urlImage} alt='Photo' />
              <p className='relative top-5 left-0 botton-0 text-black-800'>Cambiar</p>
            </button>
          </div>

          <div className='grid grid-cols-2 gap-3 w-full'>
            <div className="relative">
              <input required type="text" value={nombreIpsa} onChange={e => setNombreIpsa(e.target.value)} id="nombreIpsa" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="nombreIpsa" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nombre de la Veterinaria</label>
            </div>
            <div className="relative">
              <input required disabled type="text" value={correoIpsa} id="correoIpsa" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="correoIpsa" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Correo de la Veterinaria</label>
            </div>
          </div>

          <div className="flex w-full my-1">
            <div className='w-full relative'>
              <input type="password" required placeholder=" " id='passwordOne' className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-l-lg border-1 border-gray-300 border-r-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                autoComplete="off"
                onChange={e => setPasswordNew(e.target.value)}
                minLength="8"
              />
              <label htmlFor='passwordOne' className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nueva Contraseña</label>
            </div>
            {
              shpss ? <button type="button" className="block px-2.5 pb-2 w-20 text-center justify-center items-center flex-col pt-3 text-sm text-gray-900 bg-transparent rounded-r-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onClick={mostrarContrasena}><FaRegEye /></button>
                : <button type="button" className="block px-2.5 pb-2 w-20 text-center justify-center items-center flex-col pt-3 text-sm text-gray-900 bg-transparent rounded-r-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onClick={mostrarContrasena}><FaRegEyeSlash /></button>
            }
          </div>
          <div className="flex w-full my-2">
            <div className='w-full relative'>
              <input type="password" required placeholder=" " id='passwordTwo' className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-l-lg border-1 border-gray-300 border-r-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                autoComplete="off"
                onChange={e => setPasswordNewTwo(e.target.value)}
                minLength="8"
              />
              <label htmlFor='passwordTwo' className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Confirmar Contraseña</label>
            </div>
            {
              shpssTwo ? <button type="button" className="block px-2.5 pb-2 w-20 text-center justify-center items-center flex-col pt-3 text-sm text-gray-900 bg-transparent rounded-r-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onClick={mostrarContrasenaTwo}><FaRegEye /></button>
                : <button type="button" className="block px-2.5 pb-2 w-20 text-center justify-center items-center flex-col pt-3 text-sm text-gray-900 bg-transparent rounded-r-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onClick={mostrarContrasenaTwo}><FaRegEyeSlash /></button>
            }
          </div>
          <div className="w-full text-center">
            <PwdRequisite password={passwordNew} />
          </div>
          <div className='flex justify-center my-3'>
            <button type="submit" className="flex-shrink-0 px-4 py-2 w-50 text-base font-semibold text-white bg-dark-purple rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-blue-200">
              Aceptar
            </button>
          </div>
        </form>
      </div>
      <Transition.Root show={openModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-stretch md:items-center justify-center min-h-full text-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex text-base text-left transform transition w-full md:max-w-2xl md:px-4 md:my-8 lg:max-w-3xl xl:max-w-xl 2xl:max-w-5xl">
                  <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                      onClick={() => setOpenModal(false)}
                    >
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="w-full">
                      <div className="text-center justify-center items-center col-span-1">
                        <h2 className="text-3xl font-extrabold text-gray-900" >Actualizar información</h2>
                        <section aria-labelledby="options-heading">
                          <p className="text-2xl text-gray-900">¿Estás seguro de actualizar la información de este Admin?</p>
                          <form className=''>
                            {/* Sizes */}
                            <div className="w-full mt-4">
                              <div className="flex items-center justify-center">
                                <p htmlFor="name" className="text-sm text-center font-medium text-blue-600 hover:text-blue-500">
                                  ¡Tu sesión se cerrará automáticamente!
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-4">
                              <button type="button" onClick={() => setOpenModal(false)} className="flex-shrink-0 px-4 py-2 w-full text-base font-semibold text-white bg-red-700 rounded-lg shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2 focus:ring-offset-red-200">
                                Cancelar
                              </button>
                              <button type="button" onClick={actualizarIpsa} className="flex-shrink-0 px-4 py-2 w-full text-base font-semibold text-white bg-dark-purple rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-blue-200">
                                Aceptar
                              </button>
                            </div>
                          </form>
                        </section>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

