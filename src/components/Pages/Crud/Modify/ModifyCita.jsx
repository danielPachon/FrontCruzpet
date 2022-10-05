import React, { useState, useEffect } from 'react'
import Header from '../../../Layout/Header'
import { Footer } from '../../../Layout/Footer'
import { NavLink } from 'react-router-dom'
import { GrNotes } from 'react-icons/gr'
import { Container, Row, Col, Form, Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import { Button } from 'flowbite-react'
import axios from 'axios'
import { set } from 'date-fns/esm'
import { AuthUser } from '../../../Helpers/AuthUser/AuthUser'

export function ModifyCita() {

  const [button, setButton] = useState(true)
  const [btn, setBtn] = useState(true)
  const [btnTwo, setBtnTwo] = useState(true)
  const [transform, setTransform] = useState(0)
  const [showModal, setShowModal] = React.useState(false)
  const currentUser = AuthUser()
  const [cedula, setCedula] = useState("")
  const [typeDoc, setTypeDoc] = useState("")
  const [valores, setValores] = useState([])
  const [nombresCliente, setNombresCliente] = useState("")
  const [nombreMascota, setNombreMascota] = useState("")
  const [identidadMascota, setIdentidadMascota] = useState("")
  const [nombreIpsa, setNombreIpsa] = useState("")
  const [fecha, setFecha] = useState("")
  const [hora, setHora] = useState("")
  const [nombresVeterinario, setNombresVeterinario] = useState("")
  const [ciudad, setCiudad] = useState("")
  const [departamento, setDepartamento] = useState("")
  const [estadoCita, setEstadoCita] = useState("")
  const [tramite, setTramite] = useState("")
  const [email, setEmail] = useState("")
  const [idCita, setIdCita] = useState("")
  const [docVet, setDocVet] = useState("")
  const [rut, setRut] = useState("")
  const [citas, setCitas] = useState([])
  const [citasTwo, setCitasTwo] = useState([])

  const logicBtnOne = () => setTransform(0)
  const logicBtnTwo = () => setTransform(1)

  useEffect(() => {

    const contenedorUno = document.getElementById('containerUno')
    const contenedorDos = document.getElementById('containerDos')

    if (transform === 0) {
      // Contenedor Primera Pantalla
      contenedorUno.classList.remove('divdisable')
      // Contenedor Segunda Pantalla 
      contenedorDos.classList.remove('d-flex')
      contenedorDos.classList.add('divdisable')
    } else if (transform === 1) {
      // Contenedor Primera Pantalla
      contenedorUno.classList.remove('d-flex')
      contenedorUno.classList.add('divdisable')
      // Contenedor Segunda Pantalla
      contenedorDos.classList.remove('divdisable')
    }
  }, [transform])

  const valCeduser = async (e) => {
    // e.preventDefault()
    const urlCedata = await fetch("https://api.cruzpet.com:8443/v1.0/clientes/existenciacedula", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cedulaCliente: cedula
      }),
    })

    if (urlCedata.status !== 200) {
      warnCed()
    }

  }

  useEffect(() => {
    if (currentUser === true && localStorage.getItem('rolUser') === 'Cliente') {
      logicBtnTwo()
      axios.post('https://api.cruzpet.com:8443/v1.0/clientes/buscarcliente', {
        username: localStorage.getItem('username')
      }).then((response) => {
        setCedula(response.data.cedulaUsuario)
        setTypeDoc(response.data.tipoDocumento)
        let cedulaUser = response.data.cedulaUsuario
        axios.post('https://api.cruzpet.com:8443/v1.0/citas/citasusuario', {
          cedulaCliente: cedulaUser
        }).then((response) => {
          setCitasTwo(response.data)
          const datacita = response.data.pop()
          setCitas(datacita)
          setNombresCliente(datacita.citaMascota.clienteMascota.nombres + ' ' + datacita.citaMascota.clienteMascota.apellidos)
          setNombreMascota(datacita.citaMascota.nombreMascota)
          setIdentidadMascota(datacita.citaMascota.numeroIdentidad)
          setNombreIpsa(datacita.ipsaPropetaria.nombre)
          setFecha(datacita.fecha)
          setHora(datacita.hora)
          setNombresVeterinario(datacita.citaVeterinario.nombres + ' ' + datacita.citaVeterinario.apellidos)
          setCiudad(datacita.citaCiudad.nombreCiudad)
          setDepartamento(datacita.citaDepartamento.nombreDepartamento)
          setEstadoCita(datacita.estadoCita)
          setTramite(datacita.tipoTramite)
          setEmail(datacita.email)
        })
      })
    }
  }, [])

  const foundAppt = async (e) => {
    setIdCita(e.target.value)
    const urlAppt = await fetch("https://api.cruzpet.com:8443/v1.0/citas/citasidcita", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idCita: e.target.value
      }),
    })
    try {
      const data = await urlAppt.json()
      setDocVet(data.citaVeterinario.cedVeterinario)
      setRut(data.ipsaPropetaria.rut)
      setNombresCliente(data.citaMascota.clienteMascota.nombres + ' ' + data.citaMascota.clienteMascota.apellidos)
      setNombreMascota(data.citaMascota.nombreMascota)
      setIdentidadMascota(data.citaMascota.numeroIdentidad)
      setNombreIpsa(data.ipsaPropetaria.nombre)
      setFecha(data.fecha)
      setHora(data.hora)
      setNombresVeterinario(data.citaVeterinario.nombres + ' ' + data.citaVeterinario.apellidos)
      setCiudad(data.citaCiudad.nombreCiudad)
      setDepartamento(data.citaDepartamento.nombreDepartamento)
      setEstadoCita(data.estadoCita)
      setTramite(data.tipoTramite)
      setEmail(data.email)

    } catch (error) {
    }

  }

  const getCedata = async (e) => {
    e.preventDefault()

    const urlCedata = await fetch("https://api.cruzpet.com:8443/v1.0/clientes/traercedula", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cedulaCliente: cedula
      }),
    })

    const urlCita = await fetch("https://api.cruzpet.com:8443/v1.0/citas/citasusuario", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cedulaCliente: cedula
      }),
    })
    valCeduser()
    try {
      const data = await urlCedata.json()
      const datoscita = await urlCita.json()
      setCitasTwo(datoscita)
      const datacita = datoscita.pop()
      setCitas(datacita)
      setNombresCliente(datacita.citaMascota.clienteMascota.nombres + ' ' + datacita.citaMascota.clienteMascota.apellidos)
      setNombreMascota(datacita.citaMascota.nombreMascota)
      setIdentidadMascota(datacita.citaMascota.numeroIdentidad)
      setNombreIpsa(datacita.ipsaPropetaria.nombre)
      setFecha(datacita.fecha)
      setHora(datacita.hora)
      setNombresVeterinario(datacita.citaVeterinario.nombres + ' ' + datacita.citaVeterinario.apellidos)
      setCiudad(datacita.citaCiudad.nombreCiudad)
      setDepartamento(datacita.citaDepartamento.nombreDepartamento)
      setEstadoCita(datacita.estadoCita)
      setTramite(datacita.tipoTramite)
      setEmail(datacita.email)
      if (data.tipoDocumento === typeDoc) {
        if (datoscita.length > 0) {
          logicBtnTwo()
        } else {
          infoCita()
        }
      } else {
        warnTyDoc()
      }

    } catch (error) {
    }
  }

  async function cancelarCita() {

    const cancelAppot = {
      idCita: idCita,
      estadoCita: "i",
      fecha: fecha,
      hora: hora,
      ipsaPropetaria: {
        rut: rut
      },
      citaVeterinario: {
        cedVeterinario: docVet
      },
      clienteCita: {
        cedulaCliente: cedula
      },
      citaMascota: {
        numeroIdentidad: identidadMascota
      },
      tipoDocumento: typeDoc
    }
    try {
      await axios.put(`https://api.cruzpet.com:8443/v1.0/citas/actualizar`, cancelAppot, {

      }).then((response) => {
        successUpdate()
        setShowModal(false)
        const timer = setTimeout(() => {
          window.location.reload()
        }, 3000);
        return () => clearTimeout(timer)
      })

    } catch (err) {
    }

  }

  const handleTypeDoc = (event) => {
    setTypeDoc(event.target.value)
  }

  const handleDatos = (event) => {
    const Array = [event.target.value]
    const nuevo = Array[0].split(',')
    setValores(nuevo)
    setShowModal(true)
  }

  const successUpdate = () => toast.success('La cita seleccionada se ha cancelado.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const warnCed = () => toast.warn('La cédula ingresada no se encuentra registrada', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const warnTyDoc = () => toast.warn('El tipo de documento no coincide con el número de documento', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const infoCita = () => toast.info('El usuario no tiene aún citas agendadas.', {
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
      {/* Primer Pantalla */}
      <section className='sm:mx-10 md:mx-20 lg:mx-26 xl:mx-40 2xl:mx-56'>
        <form onSubmit={getCedata} className="lg:p-8 relative m-4 flex flex-col min-w-0 bg-white bg-clip-border border-1 border-solid rounded shadow-sm sm:m-8" id="containerUno">
          <div className='mx-4 my-2 text-center'>
            <h2 className="text-xl sm:text-3xl md:4xl lg:text-5xl">Ingresa los siguientes datos para consultar o cancelar tu cita</h2>
          </div>
          <div className=" text-center mx-4 my-2 sm:px-10">
            <p className="mx-4 sm:mx-20 md:text-lg lg:text-xl">Los campos señalados con asterisco (*) son de carácter obligatorio.</p>
            <p className="mx-4 sm:mx-20 md:text-lg lg:text-xl">Revisa muy bien los datos antes de finalizar, recuerda que los datos que estás registrando son los que Cruz Pet tomará para tramitar tu solicitud.</p>
          </div>
          <div className="mx-2 sm:px-20 lg:px-12 lg:flex lg:w-full">
            <div className="mx-4 lg:text-center lg:w-full my-2">
              <select id="documents" onClick={handleTypeDoc} onChange={handleTypeDoc} className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value=""  >Tipo de documento</option>
                <option value="cc" >Cédula de Ciudadanía</option>
                <option value="ti" >Tarjeta de Identidad</option>
              </select>
            </div>
            <div className="mx-4 lg:text-center lg:w-full my-2">
              <div className='relative'>
                <input type="number" id="cedula" required onChange={e => setCedula(e.target.value)} placeholder=" " className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                <label htmlFor="cedula" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Número de documento *</label>
              </div>
            </div>
          </div>
          <div className="pb-8 my-2">
            <div className="flex justify-center">
              <Button className='mb-2' type="submit" onMouseEnter={() => setButton(false)} onMouseLeave={() => setButton(true)} outline={button} gradientDuoTone="greenToBlue">
                ㅤㅤㅤㅤㅤValidarㅤㅤㅤㅤㅤ
              </Button>
            </div>
            <div className="flex text-center justify-center items-center mx-4">
              <NavLink to='/' className='mx-4 hover:underline text-black sm:w-50 sm:text-lg'>Ir al Inicio</NavLink>
            </div>
          </div>
        </form>
      </section>


      {/* Segunda Pantalla */}
      <section className='sm:mx-10 md:mx-20 lg:mx-26 xl:mx-40 2xl:mx-56'>
        <div id="containerDos">
          <div className="mx-4 lg:w-2/5 my-2">
            <select onClick={foundAppt} onBlur={foundAppt} className="block py-2 px-3 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" >Selecciona una de tus citas agendadas</option>
              {citasTwo.map(cita => <option key={cita.idCita} id={cita.idCita} value={cita.idCita} >Fecha: {cita.fecha} / Tramite: {cita.tipoTramite}</option>)}
            </select>
          </div>
          <div className="lg:p-8 relative h-full flex flex-col min-w-0 bg-white bg-clip-border border-1 border-solid rounded shadow-sm">
            <div className="sm:mx-20 lg:mx-0">
              <form className="mx-2 my-2">
                <div className="lg:flex lg:w-full">
                  <div className="mx-4 lg:w-full my-1">
                    <div className="relative">
                      <label htmlFor="nombreDueño" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nombre del Dueño</label>
                      <input type="text" id="nombreDueño" value={nombresCliente} className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                    </div>
                  </div>
                  <div className="mx-4 lg:w-full my-1">
                    <div className="relative">
                      <label htmlFor="nombreMascota" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nombre de la Mascota</label>
                      <input type="text" id="nombreMascota" value={nombreMascota} className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                    </div>
                  </div>
                  <div className="mx-4 lg:w-full my-1">
                    <div className="relative">
                      <label htmlFor="idMascota" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Identidad de la Mascota</label>
                      <input type="text" id="idMascota" value={identidadMascota} className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                    </div>
                  </div>
                </div>
                <div className="lg:flex lg:w-full">
                  <div className="mx-4 lg:w-full my-1">
                    <div className="relative">
                      <label htmlFor="veterinaria" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Veterinaria</label>
                      <input type="text" id="veterinaria" value={nombreIpsa} className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                    </div>
                  </div>
                  <div className="mx-4 lg:w-full my-1">
                    <div className="relative">
                      <label htmlFor="fecha" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Fecha</label>
                      <input type="date" id="fecha" value={fecha} className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                    </div>
                  </div>
                  <div className="mx-4 lg:w-full my-1">
                    <div className="relative">
                      <label htmlFor="hora" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Hora</label>
                      <input type="time" id="hora" value={hora} className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                    </div>
                  </div>
                </div>
                <div className="lg:flex lg:w-full">
                  <div className="mx-4 lg:w-full my-1">
                    <div className="relative">
                      <label htmlFor="veterinario" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Veterinario</label>
                      <input type="text" id="veterinario" value={nombresVeterinario} className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                    </div>
                  </div>
                  <div className="mx-4 lg:w-full my-1">
                    <div className="relative">
                      <label htmlFor="ciudad" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Ciudad</label>
                      <input type="text" id="ciudad" value={ciudad} className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                    </div>
                  </div>
                  <div className="mx-4 lg:w-full my-1">
                    <div className="relative">
                      <label htmlFor="departamento" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Departamento</label>
                      <input type="text" id="departamento" value={departamento} className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                    </div>
                  </div>
                </div>
                <div className="lg:flex lg:w-full">
                  <div className="mx-4 lg:w-full my-1">
                    <div className="relative">
                      <label htmlFor="estadoCita" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Estado de la Cita</label>
                      <input type="text" id="estadoCita" value={estadoCita.includes('a') ? "Activa" : "Inactiva"} className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                    </div>
                  </div>
                  <div className="mx-4 lg:w-full my-1">
                    <div className="relative">
                      <label htmlFor="tramite" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Trámite</label>
                      <input type="text" id="tramite" value={tramite} className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                    </div>
                  </div>
                  <div className="mx-4 lg:w-full my-1">
                    <div className="relative">
                      <label htmlFor="correo" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Correo Electrónico</label>
                      <input type="email" id="correo" value={email} className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                    </div>
                  </div>
                </div>
                <div className="mx-4 my-4 flex justify-center ">
                  <div className='flex mx-0.5 sm:mx-3'>
                    <div className='flex items-center justify-center bg-gradient-to-br from-red-400 to-red-600 hover:bg-gradient-to-tr focus:ring-4 focus:ring-green-200  hover:from-red-600 hover:to-red-400 rounded-lg w-auto'>
                      <button type="button" onClick={handleDatos} className="relative inline-flex items-center justify-center py-[9px] px-5 my-[0.125rem]  mx-[0.125rem] overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-white hover:bg-gradient-to-tr hover:from-red-600 hover:to-red-400 hover:text-white">
                        Cancelar
                      </button>
                    </div>
                  </div>
                  <div className='flex mx-0.5 sm:mx-2'>
                    <div className='flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-tr focus:ring-4 focus:ring-green-200  hover:from-blue-600 hover:to-green-400 rounded-lg w-auto'>
                      <button type="button" onClick={logicBtnOne} className="relative inline-flex items-center justify-center py-[9px] px-5 my-[0.125rem]  mx-[0.125rem] overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-white hover:bg-gradient-to-tr hover:from-blue-600 hover:to-green-400 hover:text-white">
                        Volver
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Cancelar Cita</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>¿Seguro que quieres cancelar tu cita?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button type="button" onClick={() => setShowModal(false)} onMouseEnter={() => setBtn(false)} onMouseLeave={() => setBtn(true)} onMouseDown={() => setBtn(true)} outline={btn} gradientDuoTone="pinkToOrange">Cerrar</Button>
                <Button type="button" onClick={cancelarCita} onMouseEnter={() => setBtnTwo(false)} onMouseLeave={() => setBtnTwo(true)} outline={btnTwo} gradientDuoTone="greenToBlue">Confirmar</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <Footer />
    </div>
  )
}
