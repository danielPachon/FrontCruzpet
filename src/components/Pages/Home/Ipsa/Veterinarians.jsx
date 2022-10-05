import React, { Fragment, useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../../Layout/NavBar/NavBar'
import axios from 'axios'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { Button } from 'flowbite-react'
import { XIcon } from '@heroicons/react/outline'
import PwdRequisite from '../../../Helpers/PwdRequisite/PwdRequisite'
import { ToastContainer, toast } from 'react-toastify'

export const Veterinarians = () => {

  localStorage.setItem("color", 1)

  const [showModal, setShowModal] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [shpss, setShpss] = useState("")
  const [shpssTwo, setShpssTwo] = useState("")
  const [button, setButton] = useState(true)
  const [veterinario, setVeterinario] = useState("")
  const [pagina, setPagina] = useState("")
  const [password, setPassword] = useState("")
  const [nombres, setNombres] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [fechaNacimiento, setFechaNacimiento] = useState("")
  const [cedulaVeterinario, setCedulaVeterinario] = useState("")
  const [celular, setCelular] = useState("")
  const [especialidad, setEspecialidad] = useState("")
  const [veterinarios, setVeterinarios] = useState([])
  const [ruts, setRuts] = useState([])
  const [especialidades, setEspecialidades] = useState([])

  const navigate = useNavigate()

  useEffect(() => {

    axios.post("https://api.cruzpet.com:8443/v1.0/veterinarios/filtroipsas", {
      rut: localStorage.getItem('rut')
    }).then((response) => {
      setVeterinarios(response.data)
    })

  },)

  const registrarVeterinario = (e) => {
    e.preventDefault()

    if (especialidad === '') {
      warnEsp()
    } else if (password === '') {

    } else {
      axios.post("https://api.cruzpet.com:8443/v1.0/veterinarios/crear", {
        cedVeterinario: cedulaVeterinario,
        nombres: nombres,
        apellidos: apellidos,
        fechaNacimiento: fechaNacimiento,
        celular: celular,
        estado: "a",
        foto: "https://www.unilasallista.edu.co/wp-content/uploads/2022/05/Medicina-Veterinaria-1.jpg",
        passwordVeterinario: password,
        ipsaTrabajo: {
          rut: localStorage.getItem('rut')
        },
        especialidadVeterinario: {
          idEspecialidad: especialidad
        },
        direccion: null,
        administradorCreador: null
      })
        .then(function (response) {
          registroVet()
          setShowModal(false)
        }).catch((error) => {

        })
    }

  }

  const updateVeterinarians = (e) => {
    e.preventDefault()

    axios.put('https://api.cruzpet.com:8443/v1.0/veterinarios/actualizarsincontra', {
      cedVeterinario: cedulaVeterinario,
      nombres: nombres,
      apellidos: apellidos,
      fechaNacimiento: fechaNacimiento,
      celular: celular,
      foto: "https://www.unilasallista.edu.co/wp-content/uploads/2022/05/Medicina-Veterinaria-1.jpg",
      ipsaTrabajo: {
        rut: localStorage.getItem('rut')
      },
      especialidadVeterinario: {
        idEspecialidad: especialidad
      },
      direccion: null,
      administradorCreador: null
    }).then((response) => {
      updateVet()
      setOpenModal(false)
    }).catch((error) => {
    })
  }

  const handleUpdate = (e) => {
    setOpenModal(true)
    const Array = [e.target.value]
    const arreglo = Array[0].split(',')
    setCelular(arreglo[0])
    setNombres(arreglo[1])
    setApellidos(arreglo[2])
    setCedulaVeterinario(arreglo[3])
    setFechaNacimiento(arreglo[4].split('T')[0])
    setEspecialidad(arreglo[5])
  }

  useEffect(() => {
    axios.get('https://api.cruzpet.com:8443/v1.0/especialidades/').then(function (response) {
      setEspecialidades(response.data)
    }).catch((error) => {

    })
  }, [])

  const handleEspecialidad = (e) => {
    setEspecialidad(e.target.value)
  }

  const enableVet = (e) => {
    console.log(e.target.value)

    axios.post('https://api.cruzpet.com:8443/v1.0/veterinarios/actualzarveterinarioestado',{
      cedVeterinario: e.target.value,
      estado: "a"
    }).then((response) => {
      console.log(response)
    })
  }

  const disableVet = (e) => {
    console.log(e.target.value)
    axios.post('https://api.cruzpet.com:8443/v1.0/veterinarios/actualzarveterinarioestado',{
      cedVeterinario: e.target.value,
      estado: "i"
    }).then((response) => {
      console.log(response)
    })
  }

  const warnEsp = () => toast.warn('Selecciona la especialidad del veterinario.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const registroVet = () => toast.success('Veterinario registrado.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const updateVet = () => toast.success('El veterinario ha sido actualizado.', {
    position: "top-right",
    autoClose: 3000,
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
      <Navbar />

      <div className='ml-20'>
        <div className="w-full flex flex-row items-center p-2 justify-between bg-dark-purple shadow-xs ">
          <div className="ml-8 text-lg text-white hidden md:flex">
          </div>
          <span className="w-full md:w-1/3 h-10 cursor-pointer text-sm rounded-full flex">
            <input type="search" name="serch" placeholder="Search" className="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none border-white" />
          </span>

          <div className="flex items-center mr-8 hidden md:flex">
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
            <h2 className="text-2xl leading-tight">
              Veterinarios
            </h2>
            <div className="text-end">
              <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-2xl md:space-x-3 space-y-3 md:space-y-0 justify-center">
                <div className="flex relative">
                  <select className='w-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent'>
                    <option>usuario</option>
                    <option>documento</option>
                    <option>nombres</option>
                    <option>apellidos</option>
                    <option>activos</option>
                    <option>inactivos</option>
                    <option>email</option>
                  </select>
                  <input type="text" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="Busqueda..." />
                </div>
                <button type='button' onClick={() => setShowModal(true)} className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-dark-purple rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-blue-200" >
                  Crear
                </button>
              </form>

            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Nombres
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Documento
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Estado
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Email
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                    </th>
                  </tr>
                </thead>
                {veterinarios.map((response, index) =>

                  <tbody>
                    <tr>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="block relative">
                              <img alt="Photo" src={response.foto} className="mx-auto object-cover rounded-full h-10 w-10 " />
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {response.nombres + ' ' + response.apellidos}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {response.cedVeterinario}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white text-sm">
                        {response.estado === 'a' ?
                          <td className="px-4 py-3 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                              </span>
                              <button type='button' value={response.cedVeterinario} onClick={disableVet} className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                {response.estado === 'a' ? "Activo" : "Inactivo"}
                              </button>
                            </span>
                          </td>
                          :
                          <td className="px-4 py-3 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                              <span aria-hidden="true" className="absolute inset-0 bg-red-200 opacity-50 rounded-full">
                              </span>
                              <button type='button' value={response.cedVeterinario} onClick={enableVet} className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                {response.estado === 'a' ? "Activo" : "Inactivo"}
                              </button>
                            </span>
                          </td>
                        }
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {response.correoVeterinario}
                        </p>
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                        <button type="button" value={response.celular + ',' + response.nombres + ',' + response.apellidos + ',' + response.cedVeterinario + ',' + response.fechaNacimiento + ',' + response.especialidadVeterinario.idEspecialidad} onClick={handleUpdate} className="text-dark-purple hover:text-blue-900">
                          Editar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
              {/* <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                <div className="flex items-center">
                  <button type="button" onClick={() => paginarAtras(1)} className="w-full p-[12px] border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                    <MdKeyboardArrowLeft />
                  </button>
                  <button type="button" onClick={() => paginar(0)} className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 ">
                    1
                  </button>
                  <button type="button" onClick={() => paginar(1)} className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                    2
                  </button>
                  <button type="button" onClick={() => paginar(2)} className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100">
                    3
                  </button>
                  <button type="button" onClick={() => paginar(3)} className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                    4
                  </button>
                  <button type="button" onClick={() => paginarDelante(1)} className="w-full p-[12px] border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100">
                    <MdKeyboardArrowRight />
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <form onSubmit={registrarVeterinario} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center text-center justify-center px-4 py-3 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Ingresa los siguientes datos del veterinario
                  </h3>
                </div>
                {/*body*/}
                <div className="w-full px-4 py-1 pt-4 flex">
                  <div className='w-full mx-1'>
                    <div className="relative">
                      <input required type="text" onChange={e => setNombres(e.target.value)} id="nombres" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlFor="nombres" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Nombres</label>
                    </div>
                  </div>
                  <div className='w-full mx-1'>
                    <div className="relative">
                      <input required type="text" onChange={e => setApellidos(e.target.value)} id="apellidos" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlFor="apellidos" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Apellidos</label>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 py-1 flex">
                  <div className='w-full mx-1'>
                    <div className="relative">
                      <input required type="text" onChange={e => setCedulaVeterinario(e.target.value)} id="cedulaVeterinario" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlFor="cedulaVeterinario" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Cédula</label>
                    </div>
                  </div>
                  <div className='w-full mx-1'>
                    <div className="relative">
                      <input required type="number" onChange={e => setCelular(e.target.value)} id="celular" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlFor="celular" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Celular</label>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 py-1 flex">
                  <div className='w-full mx-1'>
                    <div className="relative">
                      <input required type="date" onChange={e => setFechaNacimiento(e.target.value)} id="fechaNacimiento" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlFor="fechaNacimiento" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Fecha nacimiento</label>
                    </div>
                  </div>
                  <div className='w-full mx-1'>
                    <select required onClick={handleEspecialidad} onBlur={handleEspecialidad} id="especialidad" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option  >Especialidad</option>
                      {especialidades.map(esp => <option key={esp.idEspecialidad} value={esp.idEspecialidad}>{esp.nombreEspecialidad}</option>)}
                    </select>
                  </div>
                </div>
                <div className="w-full text-center px-4 py-1">
                  <div className="mb-2">
                    <div className="relative">
                      <input type="text" id='password' className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                        autoComplete="off"
                        onChange={e => setPassword(e.target.value)}
                        required
                        minLength="8"
                      />
                      <label htmlFor='password' className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Contraseña</label>
                    </div>
                  </div>
                  <PwdRequisite password={password} />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                  <Button className='mb-2' type="submit" onMouseEnter={() => setButton(false)} onMouseLeave={() => setButton(true)} outline={button} gradientDuoTone="greenToBlue">
                    Registrar veterinario
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
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

                  <form onSubmit={updateVeterinarians} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <button
                      type="button"
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                      onClick={() => setOpenModal(false)}
                    >
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="flex items-center text-center justify-center px-4 py-3 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-2xl font-semibold">
                        Actualizar información del veterinario
                      </h3>
                    </div>
                    {/*body*/}
                    <div className="w-full px-4 py-1 pt-4 flex">
                      <div className='w-full mx-1'>
                        <div className="relative">
                          <input required type="text" value={nombres} onChange={e => setNombres(e.target.value)} id="nombres" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                          <label htmlFor="nombres" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Nombres</label>
                        </div>
                      </div>
                      <div className='w-full mx-1'>
                        <div className="relative">
                          <input required type="text" value={apellidos} onChange={e => setApellidos(e.target.value)} id="apellidos" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                          <label htmlFor="apellidos" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Apellidos</label>
                        </div>
                      </div>
                    </div>
                    <div className="w-full px-4 py-1 flex">
                      <div className='w-full mx-1'>
                        <div className="relative">
                          <input required type="text" value={cedulaVeterinario} disabled id="cedulaVeterinario" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                          <label htmlFor="cedulaVeterinario" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Cédula</label>
                        </div>
                      </div>
                      <div className='w-full mx-1'>
                        <div className="relative">
                          <input required type="number" value={celular} onChange={e => setCelular(e.target.value)} id="celular" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                          <label htmlFor="celular" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Celular</label>
                        </div>
                      </div>
                    </div>
                    <div className="w-full px-4 pb-4 py-1 flex">
                      <div className='w-full mx-1'>
                        <div className="relative">
                          <input required type="date" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} id="fechaNacimiento" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                          <label htmlFor="fechaNacimiento" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Fecha nacimiento</label>
                        </div>
                      </div>
                      <div className='w-full mx-1'>
                        <select required value={especialidad} onClick={handleEspecialidad} onChange={handleEspecialidad} id="especialidad" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option >Especialidad</option>
                          {especialidades.map(esp => <option key={esp.idEspecialidad} value={esp.idEspecialidad}>{esp.nombreEspecialidad}</option>)}
                        </select>
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button type="submit" className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-dark-purple rounded-lg shadow-md hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-2 focus:ring-offset-green-200" >
                        Actualizar información
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )

}

