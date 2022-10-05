import React, { useEffect, useState } from 'react'
import Header from '../../Layout/Header'
import { Footer } from '../../Layout/Footer'
import PopupPet from '../../UI/PopupPet'
import axios from 'axios'
import { Button } from 'flowbite-react'
import { ToastContainer, toast } from 'react-toastify'

export default function Pet() {

  const [showModal, setShowModal] = React.useState(false)
  const [cedulaCliente, setCedulaCliente] = useState("")
  const [nombreMascota, setNombreMascota] = useState("")
  const [mascotas, setMascotas] = useState([])
  const username = localStorage.getItem("username")
  const [button, setButton] = useState(true)
  const [btn, setBtn] = useState(true)
  const [edadMascota, setEdadMascota] = useState("")
  const [nacimientoMascota, setNacimientoMascota] = useState("")
  const [genero, setGenero] = useState("")
  const [sanguineo, setSanguineo] = useState("")
  const [raza, setRaza] = useState("")
  const [idMascota, setIdMascota] = useState("")
  const [identidadMascota, setIdentidadMascota] = useState("")
  const [razaMascota, setRazaMascota] = useState([])
  const [tipoMascota, setTipoMascota] = useState([])
  const [generoMascota, setGeneroMascota] = useState([])
  const [sangreMascota, setSangreMascota] = useState([])

  useEffect(() => {

    axios.post("https://api.cruzpet.com:8443/v1.0/clientes/buscarcliente", {
      username: username,
    }).then(function (resp) {
      setCedulaCliente(resp.data.cedulaUsuario)
    })

  }, [])

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

  useEffect(async () => {
    const TraerMascotas = {
      "clienteMascota": {
        "cedulaCliente": cedulaCliente
      }
    }
    try {
      await axios.post(`https://api.cruzpet.com:8443/v1.0/mascotas/mascotausuario`, TraerMascotas, {

        headers: {
          "Content-Type": "application/json",
        },
      }).then(item => {
        setMascotas(item.data)
      })
    } catch (err) {
    }

  }, [cedulaCliente])

  const handleClick = (e) => {
    axios.get("https://api.cruzpet.com:8443/v1.0/mascotas/individual/" + e.target.value, {
    }).then(function (resp) {
      setNombreMascota(resp.data.nombreMascota)
      setEdadMascota(resp.data.edad)
      setTipoMascota(resp.data.tipoMascota.tipoMascota)
      setIdentidadMascota(resp.data.numeroIdentidad)
      setIdMascota(resp.data.tipoMascota.idTipoMascota)
      setNacimientoMascota(resp.data.fechaNacimiento.split("T")[0])

      axios.post('https://api.cruzpet.com:8443/v1.0/tipossangre/traertipomascota', {
        tipoMascotaEntity: {
          idTipoMascota: resp.data.tipoMascota.idTipoMascota
        }
      }).then((response) => {
        setSangreMascota(response.data)
      }).catch((error) => {
      })
    })
  }

  const actualizarMascota = async (e) => {
    e.preventDefault()

    if (edadMascota === '') {
      edadM()
    } else if (nombreMascota === '') {
      nombreM()
    } else if (nacimientoMascota === '') {
      fechaM()
    } else if (raza === '') {
      razaM()
    } else if (genero === '') {
      generoM()
    } else if (sanguineo === '') {
      sanguineoM()
    } else {

      const updatePet = {
        numeroIdentidad: identidadMascota,
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
          idTipoMascota: idMascota
        },
        generoMascota: {
          idGenero: genero
        },
        tipoSangreMascota: {
          idTipoSangre: sanguineo
        },
        imagenMascota: "https://res.cloudinary.com/dadzakyw1/image/upload/v1653492431/CruzPet/Logo/qudgawhv7brvahelwf4z.png",
        administradorCreador: null
      }

      try {
        await axios.put(`https://api.cruzpet.com:8443/v1.0/mascotas/actualizar`, updatePet, {

          headers: {
            "Content-Type": "application/json",
          },
        })
        registroM()
        setShowModal(false)

        const timer = setTimeout(() => {
          window.location.reload()
        }, 1000);
        return () => clearTimeout(timer);

      } catch (err) {
      }
    }
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

  const sanguineoM = () => toast.warn('Selecciona el grupo sanguíneo de tu mascota.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const registroM = () => toast.success('Los datos de la mascota han sido actualizados.', {
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
      <Header />
      <div className="w-full justify-center text-center item-center flex">
        <PopupPet />
      </div>
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
      <div className='min-h-[440px]'>
        <div className="my-2 flex flex-row flex-wrap justify-center w-10/12 sm:w-full md:w-10/12 lg:w-11/12 h-full mx-8">
          {mascotas.map(mascota =>
            <div key={mascota.numeroIdentidad} className="bg-white w-full my-2 mx-1 sm:w-1/4 md:w-1/3 lg:w-1/3 md:max-w-screen-sm min-w-0 p-3 border rounded-lg overflow-hidden shadow-lg ">
              <img className="w-1/2 lg:w-2/5 mx-auto  border shadow-lg rounded-full" src={mascota.imagenMascota} />
              <div className="px-6 py-2">
                <div className="font-bold text-xl mb-2 text-center text-teal-800">{mascota.nombreMascota}</div>
              </div>
              <div className="justify-center text-center items-center">
                <p className='text-base font-medium'>Dueño: {mascota.usuarioMascota.nombres + ' ' + mascota.usuarioMascota.apellidos}</p>
                <p className='text-base font-medium'>Identidad: {mascota.numeroIdentidad}</p>
                <p className='text-base font-medium'>Edad mascota: {mascota.edad}</p>
                <p className='text-base font-medium'>Fecha de nacimiento: {mascota.fechaNacimiento.split('T')[0]}</p>
                <p className='text-base font-medium'>Género: {mascota.generoMascota.genero === 'F' ? 'Femenino' : 'Masculino'}</p>
                <p className='text-base font-medium'>Raza: {mascota.razaMascota.nombreRaza}</p>
                <p className='text-base font-medium'>Tipo mascota: {mascota.tipoMascota.tipoMascota}</p>
                <p className='text-base font-medium'>Grupo sanguíneo: {mascota.tipoSangreMascota.tipoSangre}</p>
              </div>
              <div className="flex justify-center items-center px-6 py-2">
                <button value={mascota.numeroIdentidad} onMouseDown={handleClick} onClick={() => setShowModal(true)} className="bg-white text-teal-800 font-semibold py-1 px-3 border border-gray-500 rounded-lg shadow-md">
                  Actualizar información
                </button>
              </div>
            </div>
          )}

        </div>
        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <form onSubmit={actualizarMascota} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-center text-center justify-center px-4 py-3 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">
                      Ingresa los siguientes datos de tu mascota
                    </h3>
                  </div>
                  {/*body*/}
                  <div className="w-full px-4 py-1 pt-4 flex">
                    <div className='w-2/5 mx-1'>
                      <div className="relative">
                        <input disabled required value={edadMascota} type="number" id="edad_mascota" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="edad_mascota" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Edad</label>
                      </div>
                    </div>
                    <div className='w-3/5 mx-1'>
                      <div className="relative">
                        <input disabled required value={nombreMascota} type="text" id="nombre_mascota" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="nombre_mascota" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Nombre Mascota</label>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-4 py-1 flex">
                    <div className='w-full mx-1'>
                      <div className="relative">
                        <input disabled required value={nacimientoMascota} type="date" id="fecha_nacimiento" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="fecha_nacimiento" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Fecha nacimiento</label>
                      </div>
                    </div>
                    <div className='w-full mx-1'>
                      <div className="relative">
                        <input required type="text" value={identidadMascota} disabled id="num_documento" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="num_documento" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Identidad mascota</label>
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
                      <div className="relative">
                        <input disabled required value={tipoMascota} type="text" id="type_pet" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="type_pet" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Tipo mascota</label>
                      </div>
                    </div>
                    <div className='w-full mx-1'>
                      {/* <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label> */}
                      <select required onClick={handleSangre} onBlur={handleSangre} id="type_blood" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option  >Tipo de sangre</option>
                        {sangreMascota.map(sangre => (<option key={sangre.idTipoSangre} value={sangre.idTipoSangre}>{sangre.tipoSangre}</option>))}
                      </select>
                    </div>
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
                      Actualizar información
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}

      </div>

      <Footer />
    </div>
  )
}
