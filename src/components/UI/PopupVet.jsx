import React, { useState, useEffect } from "react"
import { Button } from 'flowbite-react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'

export default function PopupVet() {

  const [button, setButton] = useState(true)
  const [btn, setBtn] = useState(true)
  const [showModal, setShowModal] = React.useState(false)
  const [edadMascota, setEdadMascota] = useState("")
  const [nombreMascota, setNombreMascota] = useState("")
  const [nacimientoMascota, setNacimientoMascota] = useState("")
  const [genero, setGenero] = useState("")
  const [tipo, setTipo] = useState("")
  const [cedulaCliente, setCedulaCliente] = useState("")
  const [sanguineo, setSanguineo] = useState("")
  const [raza, setRaza] = useState("")
  const [razaMascota, setRazaMascota] = useState([])
  const [tipoMascota, setTipoMascota] = useState([])
  const [generoMascota, setGeneroMascota] = useState([])
  const [sangreMascota, setSangreMascota] = useState([])
  const username = localStorage.getItem("username")
  const [Mascotas, setMascotas] = useState([])
  const [LenMascotas, setLenMascotas] = useState([])
  

  useEffect(() => {

    axios.post("https://api.cruzpet.com:8443/v1.0/clientes/buscarcliente",{
      username: username,
    }).then(function(resp){
      setCedulaCliente(resp.data.cedulaUsuario)
    })

  },[])

  useEffect(() => {
    axios.get('https://api.cruzpet.com:8443/v1.0/generos/').then(response => {
        setGeneroMascota(response.data)
      })
  },[])

  useEffect(() => {
    axios.get('https://api.cruzpet.com:8443/v1.0/razas/').then(response => {
        setRazaMascota(response.data)
      })
  },[])

  useEffect(() => {
    axios.get('https://api.cruzpet.com:8443/v1.0/tipos_mascotas/').then(response => {
        setTipoMascota(response.data)
      })
  },[])

  const registrarMascota = (e) => {
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
    } else if (tipo === '') {
      tipoM()
    } else if (sanguineo === '') {
      sanguineoM()
    } else {
      axios.post('https://api.cruzpet.com:8443/v1.0/mascotas/crear',{
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
        imagenMascota: "https://res.cloudinary.com/dadzakyw1/image/upload/v1653492431/CruzPet/Logo/qudgawhv7brvahelwf4z.png",
        administradorCreador: null
      }).then((response) => {
          registroM()
          setShowModal(false)
        }). catch((error) => {
      })
    }
  }

  const obtenerSangre = (e) => {
    // e.preventDefault()
    axios.post('https://api.cruzpet.com:8443/v1.0/tipossangre/traertipomascota',{
      tipoMascotaEntity: {
        idTipoMascota: tipo
      }
    }).then((response) => {
        if (response.status === 200 && response.data.length > 0) {
          setSangreMascota(response.data)
        } else {
          setSangreMascota([])
        }
      }). catch((error) => {
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

  const sanguineoM = () => toast.warn('Selecciona el grupo sanguíneo de tu mascota.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const registroM = () => toast.success('Tu mascota ha sido registrada.', {
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
      <Button onClick={() => setShowModal(true)} className='mb-2' type="submit" onMouseEnter={()=>setBtn(false)} onMouseLeave={()=>setBtn(true)} outline={btn} gradientDuoTone="greenToBlue">
        Agregar Mascota
      </Button>
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
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <form onSubmit={registrarMascota} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
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
                        <input required onChange={e => setEdadMascota(e.target.value)} type="number" id="edad_mascota" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="edad_mascota" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Edad</label>
                      </div>
                    </div>
                    <div className='w-3/5 mx-1'>
                      <div className="relative">
                        <input required onChange={e => setNombreMascota(e.target.value)} type="text" id="nombre_mascota" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="nombre_mascota" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Nombre Mascota</label>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-4 py-1 flex">
                    <div className='w-full mx-1'>
                      <div className="relative">
                        <input required onChange={e => setNacimientoMascota(e.target.value)} type="date" id="fecha_nacimiento" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="fecha_nacimiento" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Fecha nacimiento</label>
                      </div>
                    </div>
                    <div className='w-full mx-1'>
                      <div className="relative">
                        <input required type="text" value={cedulaCliente} disabled id="num_documento" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="num_documento" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">N° Documento</label>
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
                      {/* <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label> */}
                      <select required onClick={handleTipo} onBlur={handleTipo} id="type_pet" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option  >Tipo de mascota</option>
                        {tipoMascota.map(tipo => (
                          <option key={tipo.idTipoMascota} value={tipo.idTipoMascota} >{tipo.tipoMascota}</option>
                        ))}
                      </select>
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
                    <Button className='mb-2' type="submit" onMouseEnter={()=>setButton(false)} onMouseLeave={()=>setButton(true)} outline={button} gradientDuoTone="greenToBlue">
                      Registrar mascota
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}