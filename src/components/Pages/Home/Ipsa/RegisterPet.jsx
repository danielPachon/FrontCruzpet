import React, { Fragment, useState, useEffect } from 'react'
import NavBar from '../../../Layout/NavBar/NavBar'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

export default function RegisterPet() {

  const [openModal, setOpenModal] = useState(false)
  const [edadMascota, setEdadMascota] = useState("")
  const [nombreMascota, setNombreMascota] = useState("")
  const [nacimientoMascota, setNacimientoMascota] = useState("")
  const [genero, setGenero] = useState("")
  const [tipo, setTipo] = useState("")
  const [cedulaCliente, setcedulaCliente] = useState("")
  const [sanguineo, setSanguineo] = useState("")
  const [raza, setRaza] = useState("")
  const [razaMascota, setRazaMascota] = useState([])
  const [tipoMascota, setTipoMascota] = useState([])
  const [generoMascota, setGeneroMascota] = useState([])
  const [sangreMascota, setSangreMascota] = useState([])

  localStorage.setItem("color", 5)

  useEffect(() => {
    axios.get('https://api.cruzpet.com:8443/v1.0/generos/').then(response => {
      setGeneroMascota(response.data)
    })
  }, [])

  useEffect(() => {
    axios.get('https://api.cruzpet.com:8443/v1.0/razas/').then(response => {
      setRazaMascota(response.data)
    })
  }, [])

  useEffect(() => {
    axios.get('https://api.cruzpet.com:8443/v1.0/tipos_mascotas/').then(response => {
      setTipoMascota(response.data)
    })
  }, [])

  const obtenerSangre = (e) => {
    // e.preventDefault()
    axios.post('https://api.cruzpet.com:8443/v1.0/tipossangre/traertipomascota', {
      tipoMascotaEntity: {
        idTipoMascota: tipo
      }
    }).then((response) => {
      if (response.status === 200 && response.data.length > 0) {
        setSangreMascota(response.data)
      } else {
        setSangreMascota([])
      }
    }).catch((error) => {
    })


  }

  const verificarDatos = (e) => {
    // e.target.value()
    if (edadMascota === '') {
      edadM()
    } else if (nombreMascota === '') {
      nombreM()
    } else if (cedulaCliente === '') {
      warnCedula()
    } else if (nacimientoMascota === '') {
      fechaM()
    } else if (raza === '') {
      razaM()
    } else if (genero === '') {
      generoM()
    } else if (tipo === '') {
      tipoM()
    } else if (sanguineo === '') {
      sanguineoM()
    } else {
      setOpenModal(true)
    }
  }

  const registrarMascota = (e) => {
    e.preventDefault()
    axios.post('https://api.cruzpet.com:8443/v1.0/mascotas/crear', {
      edad: edadMascota,
      nombreMascota: nombreMascota,
      fechaNacimiento: nacimientoMascota,
      estado: "a",
      razaMascota: {
        idRaza: raza
      },
      clienteMascota: {
        cedulaCliente: cedulaCliente
      },
      tipoMascota: {
        idTipoMascota: tipo
      },
      generoMascota: {
        idGenero: genero
      },
      tipoSangreMascota: {
        idTipoSangre: sanguineo
      },
      imagenMascota: "https://res.cloudinary.com/dadzakyw1/image/upload/v1655903473/Logos/jnte2qfqbihga2oifus3_yuzlet.png",
      administradorCreador: null
    }).then((response) => {
      registroM()
      setOpenModal(false)
      const timer = setTimeout(() => {
        window.location.reload()
      }, 3000);
      return () => clearTimeout(timer);
    }).catch((error) => {

    })

  }

  const handleGenero = (e) => {
    setGenero(e.target.value)
  }

  const handleRaza = (e) => {
    setRaza(e.target.value)
  }

  const handleSangre = (e) => {
    setSanguineo(e.target.value)
  }

  const handleTipo = (e) => {
    e.preventDefault()
    setTipo(e.target.value)
    obtenerSangre()
  }

  const edadM = () => toast.warn('Ingresa la edad de tu mascota.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const nombreM = () => toast.warn('Dale un nombre a tu mascota.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const fechaM = () => toast.warn('Selecciona la fecha de nacimiento de tu mascota.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const razaM = () => toast.warn('Selecciona la raza de tu mascota.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const generoM = () => toast.warn('Selecciona el género de tu mascota.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const tipoM = () => toast.warn('Selecciona el tipo mascota.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const warnCedula = () => toast.warn('Ingresa la cédula del usuario.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const sanguineoM = () => toast.warn('Selecciona el grupo sanguíneo de tu mascota.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const registroM = () => toast.success('Se ha registrado la mascota exitosamente.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  return (
    <div>
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
        <NavBar />
      </div>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">

          <form className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

            <div className="flex items-center text-center justify-center px-4 py-3 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">
                Ingresa los siguientes datos para registar la mascota
              </h3>
            </div>

            <div className="w-full px-4 py-1 pt-4 flex">
              <div className='w-2/5 mx-1'>
                <div className="relative">
                  <input required onChange={e => setEdadMascota(e.target.value)} type="number" id="edad_mascota" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlFor="edad_mascota" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Edad</label>
                </div>
              </div>
              <div className='w-3/5 mx-1'>
                <div className="relative">
                  <input required onChange={e => setNombreMascota(e.target.value)} type="text" id="nombre_mascota" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlFor="nombre_mascota" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Nombre de la mascota</label>
                </div>
              </div>
            </div>
            <div className="w-full px-4 py-1 flex">
              <div className='w-full mx-1'>
                <div className="relative">
                  <input required onChange={e => setNacimientoMascota(e.target.value)} type="date" id="fecha_nacimiento" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlFor="fecha_nacimiento" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Fecha de nacimiento</label>
                </div>
              </div>
              <div className='w-full mx-1'>
                <div className="relative">
                  <input required onChange={e => setcedulaCliente(e.target.value)} type="text" id="num_documento" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlFor="num_documento" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Documento del cliente</label>
                </div>
              </div>
            </div>
            <div className="w-full px-4 py-1 flex">
              <div className='w-full mx-1'>
                <select required onClick={handleRaza} onBlur={handleRaza} id="race_pet" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option  >Raza</option>
                  {razaMascota.map(raza =>
                    <option key={raza.idRaza} value={raza.idRaza} >{raza.nombreRaza}</option>
                  )}
                </select>
              </div>
              <div className='w-full mx-1'>
                <select required onClick={handleGenero} onBlur={handleGenero} id="gender_pet" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option  >Género</option>
                  {generoMascota.map(genero => (
                    <option key={genero.idGenero} value={genero.idGenero} >{genero.genero}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full px-4 py-1 pb-4 flex">
              <div className='w-full mx-1'>
                <select required onClick={handleTipo} onBlur={handleTipo} id="type_pet" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option  >Tipo de mascota</option>
                  {tipoMascota.map(tipo => (
                    <option key={tipo.idTipoMascota} value={tipo.idTipoMascota} >{tipo.tipoMascota}</option>
                  ))}
                </select>
              </div>
              <div className='w-full mx-1'>
                <select required onClick={handleSangre} onBlur={handleSangre} id="type_blood" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option  >Tipo de sangre</option>
                  {sangreMascota.map(sangre => (<option key={sangre.idTipoSangre} value={sangre.idTipoSangre}>{sangre.tipoSangre}</option>))}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <div className='flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-tr focus:ring-4 focus:ring-green-200  hover:from-blue-600 hover:to-green-400 rounded-lg w-auto'>
                <button type="button" onClick={verificarDatos} className="relative inline-flex items-center justify-center py-[9px] px-5 my-[0.125rem]  mx-[0.125rem] overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-white hover:bg-gradient-to-tr hover:from-blue-600 hover:to-green-400 hover:text-white">
                  Registrar mascota
                </button>
              </div>
            </div>
          </form>
        </div>
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
                    <div className="flex-col w-full">
                      <div className="flex-auto w-full px-8 text-center">
                        <h4>Registrar Mascota</h4>
                        <section aria-labelledby="options-heading">
                          <p className="text-2xl text-gray-900">¿Estás seguro de crear una mascota para el usuario?</p>
                          <form className='w-full'>
                            <div className="w-full mt-4">
                              <div className="flex items-center justify-center">
                                <p htmlFor="name" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                  ¡La mascota está esperando a ser registrada!
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 px-10 pt-3">
                              <button type="button" onClick={() => setOpenModal(false)} className="flex-shrink-0 px-4 py-2 w-full text-base font-semibold text-white bg-red-700 rounded-lg shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2 focus:ring-offset-red-200">
                                Cerrar
                              </button>
                              <button type="button" onClick={registrarMascota} className="flex-shrink-0 px-4 py-2 w-full text-base font-semibold text-white bg-dark-purple rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-blue-200">
                                Confirmar
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
    </div>
  )
}
