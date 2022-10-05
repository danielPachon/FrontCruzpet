import React, { Fragment, useState, useEffect } from 'react'
import NavBar from '../../../Layout/NavBar/NavBar'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'

export default function Availabilities() {

  localStorage.setItem("color", 2)
  const [openModal, setOpenModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [disponibilidades, setDisponibilidades] = useState([])
  const [fecha, setFecha] = useState("")
  const [horaEntrada, setHoraEntrada] = useState("")
  const [horaSalida, setHoraSalida] = useState("")
  const [idDisponibilidad, setIdDisponibilidad] = useState("")
  const [cedVeterinario, setCedVeterinario] = useState("")

  useEffect(() => {
    axios.post('https://api.cruzpet.com:8443/v1.0/disponibilidades/disponibilidadrut', {
      ipsafk: {
        rut: localStorage.getItem('rut'),
      }
    }).then((response) => {
      setDisponibilidades(response.data)
    })
  }, [])

  const deleteAvailability = (e) => {

    axios.delete('https://api.cruzpet.com:8443/v1.0/disponibilidades/eliminar/' + e.target.value).then((response) => {
      deletAvailability()
      console.log(response)
      const timer = setTimeout(() => {
        window.location.reload()
      }, 3000);
      return () => clearTimeout(timer)
    })

  }

  const regAvailability = (e) => {
    e.preventDefault()

    const Array = [fecha]
    const splitDate = Array[0].split('-')
    let yearDisponibilidad = splitDate[0]
    let mesDisponibilidad = splitDate[1]
    let diaDisponibilidad = splitDate[2]

    axios.post('https://api.cruzpet.com:8443/v1.0/disponibilidades/crear', {
      diaDisponibilidad: diaDisponibilidad,
      mesDisponibilidad: mesDisponibilidad,
      yearDisponibilidad: yearDisponibilidad,
      horaEntrada: horaEntrada,
      horaSalida: horaSalida,
      estado: "a",
      ipsafk: {
        rut: localStorage.getItem("rut")
      }
    }).then((response) => {
      successAvailability()
      setOpenModal(false)
      const timer = setTimeout(() => {
        window.location.reload()
      }, 3000);
      return () => clearTimeout(timer)
    }).catch((err) => {
      errorAvailability()
    })
  }

  const relateAvailability = (e) => {
    e.preventDefault()

    axios.post('https://api.cruzpet.com:8443/v1.0/veterinarios/veterinariocedula', {
      cedVeterinario: cedVeterinario
    }).then((response) => {
      if (response.data === '') {
        console.log("entraa")
        infoVeterinary()
      } else {
        axios.post('https://api.cruzpet.com:8443/v1.0/veterinariosdisponibilidades/crear', {
          disponibilidadEntity: {
            idDisponibilidad: idDisponibilidad
          },
          veterinarioEntity: {
            cedVeterinario: cedVeterinario
          }
        }).then((response) => {
          axios.post('https://api.cruzpet.com:8443/v1.0/disponibilidades/actualizarestadodisponibilidad', {
            idDisponibilidad: idDisponibilidad,
            estado: "i"
          }).then((response) => {
            successRelate()
            setShowModal(false)
            const timer = setTimeout(() => {
              window.location.reload()
            }, 3000);
            return () => clearTimeout(timer)
          }).catch((error) => {
            errorRelate()
          })
        })
      }
    })



    // axios.post('/api/',{
    //   disponibilidadEntity:{
    //     idDisponibilidad: idDisponibilidad
    //   },
    //   veterinarioEntity: {
    //     cedVeterinario: "2222"
    //   },
    //   estado:"i"
    // })
  }

  const handleID = (e) => {
    setIdDisponibilidad(e.target.value)
  }

  const successAvailability = () => toast.success('Se han creado las disponibilidades.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const successRelate = () => toast.success('La relación ha sido asignada al veterinario.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const errorRelate = () => toast.error('No se pudo relacionar las disponibilidades.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const errorAvailability = () => toast.error('No se pudo crear las disponibilidades.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const deletAvailability = () => toast.success('Se eliminó la disponibilidad.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const infoVeterinary = () => toast.info('No existe un veterinario con el documento ingresado.', {
    position: "top-right",
    autoClose: 3000,
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
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <NavBar />

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
            <h2 className="text-2xl leading-tight">
              Disponibilidades
            </h2>
            <div className="text-end">
              <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-2xl md:space-x-3 space-y-3 md:space-y-0 justify-center">
                <div className="flex relative">
                  <input type="text" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="Busqueda..." />
                </div>
                <button type='button' onClick={() => setOpenModal(true)} className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-dark-purple rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-blue-200">
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
                      Fecha
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Hora Entrada
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Hora Salida
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Relacionar disponibilidad
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                    </th>
                  </tr>
                </thead>
                {disponibilidades.map(dispo => (
                  dispo.estado === 'a' ?
                    <tbody>
                      <tr key={dispo.idDisponibilidad}>
                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {dispo.diaDisponibilidad + '/' + dispo.mesDisponibilidad + '/' + dispo.yearDisponibilidad}
                            </p>
                          </div>
                        </td>
                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {dispo.horaEntrada}
                          </p>
                        </td>
                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {dispo.horaSalida}
                          </p>
                        </td>

                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                          <button value={dispo.idDisponibilidad} onMouseDown={handleID} onClick={() => setShowModal(true)} className="text-dark-purple hover:text-blue-900">Relacionar</button>
                        </td>
                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                          <button value={dispo.idDisponibilidad} onClick={deleteAvailability} className="text-dark-purple hover:text-blue-900">
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    </tbody>
                    : ""
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
      {openModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <form onSubmit={regAvailability} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center text-center justify-center px-4 py-3 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Ingresa los siguientes datos
                  </h3>
                </div>
                {/*body*/}
                <div className="w-full my-1 px-4 py-1 flex">
                  <div className='w-full mx-1'>
                    <div className="relative">
                      <input required type="date" id="fecha" onChange={e => setFecha(e.target.value)} className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlFor="fecha" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Fecha</label>
                    </div>
                  </div>
                </div>
                <div className="w-full my-1 px-4 py-1 flex">
                  <div className='w-full mx-1'>
                    <div className="relative">
                      <input required type="time" onChange={e => setHoraEntrada(e.target.value)} id="horaEntrada" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlFor="horaEntrada" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Hora de entrada</label>
                    </div>
                  </div>
                </div>
                <div className="w-full my-1 px-4 py-1 flex">
                  <div className='w-full mx-1'>
                    <div className="relative">
                      <input required type="time" id="horaSalida" onChange={e => setHoraSalida(e.target.value)} className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlFor="horaSalida" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Hora de salida</label>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setOpenModal(false)}
                  >
                    Cerrar
                  </button>
                  <button className='mb-2' type="submit">
                    Crear disponibilidades
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <Transition.Root show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowModal}>
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
                  <form onSubmit={relateAvailability} className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <div className='flex-col w-full'>
                      <div className='flex-auto w-full px-8'>
                        <h4>Ingresa el documento del veterinario al cual se le asignará las disponibilidades</h4>
                      </div>
                      <div className="flex-row px-12 w-full my-6 justify-center items-center text-center">
                        <div className="relative">
                          <input required type="text" onChange={e => setCedVeterinario(e.target.value)} id="documento" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                          <label htmlFor="documento" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Número de Documento</label>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 px-10">
                        <button type="button" onClick={() => setOpenModal(false)} className="flex-shrink-0 px-4 py-2 w-full text-base font-semibold text-white bg-red-700 rounded-lg shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2 focus:ring-offset-red-200">
                          Cerrar
                        </button>
                        <button type="submit" className="flex-shrink-0 px-4 py-2 w-full text-base font-semibold text-white bg-dark-purple rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-blue-200">
                          Relacionar
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
