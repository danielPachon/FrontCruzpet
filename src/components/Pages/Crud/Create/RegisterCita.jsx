import React, { useState, useEffect, useRef } from 'react'
import Header from '../../../Layout/Header'
import { Footer } from '../../../Layout/Footer'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import BtnAccept from '../../../UI/BtnAccept'
import Calendar from '../../../UI/Calendar/Calendar'
import moment from 'moment'
import ReactDOM from 'react-dom'
import ClipLoader from "react-spinners/ClipLoader"
import { useNavigate } from "react-router-dom"
import { AuthUser } from '../../../Helpers/AuthUser/AuthUser'

export function RegisterCita() {

  const currentUser = AuthUser()
  const [iconoBoton, setIconoBoton] = useState("Agregar")
  const botones = useRef(new Array())
  const [value, setValue] = useState(moment())
  const [estados, setEstados] = useState(0)
  const [display, setDisplay] = useState(0)
  const [rutIpsa, setRutIpsa] = useState("")
  const [documentoVet, setDocumentoVet] = useState("")
  const [fecha, setFecha] = useState("")
  const [numCedula, setNumCedula] = useState("")
  const [identidad, setIdentidad] = useState("")
  const [nombres, setNombres] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [correo, setCorreo] = useState("")
  const [celular, setCelular] = useState("")
  const [dpt, setDpt] = useState("")
  const [typeDoc, setTypeDoc] = useState("")
  const [ciudad, setCiudad] = useState("")
  const [hora, setHora] = useState("")
  const [idIntervalo, setIdIntervalo] = useState("")
  const [tramite, setTramite] = useState("")
  const [nomIpsa, setNomIpsa] = useState("")
  const [nomVet, setNomVet] = useState("")
  const [departamento, setDepartamento] = useState([])
  const [mascotas, setMascotas] = useState([])
  const [city, setCity] = useState([])
  const [dptIpsa, setDptIpsa] = useState([])
  const [veterinarians, setVeterinarians] = useState([])
  const [intervalos, setIntervalos] = useState([])

  const visualizar = () => setEstados(0)
  const esconder = () => setEstados(1)
  const mostrar = () => setEstados(2)

  useEffect(() => {

    const contenedorUno = document.getElementById('containerUno')
    const contenedorDos = document.getElementById('containerDos')
    const contenedorTres = document.getElementById('containerTres')
    // const check = document.getElementById('check')

    if (estados === 0) {
      // Contenedor Primera Pantalla
      contenedorUno.classList.remove('divdisable')
      // Contenedor Segunda Pantalla 
      contenedorDos.classList.remove('d-flex')
      contenedorDos.classList.add('divdisable')
      // Contenedor Tercera Pantalla
      contenedorTres.classList.remove('d-flex')
      contenedorTres.classList.add('divdisable')

    } else if (estados === 1) {
      // Contenedor Primera Pantalla
      contenedorUno.classList.remove('d-flex')
      contenedorUno.classList.add('divdisable')
      // Contenedor Segunda Pantalla
      contenedorDos.classList.remove('divdisable')
      // Contenedor Tercera Pantalla
      contenedorTres.classList.remove('d-flex')
      contenedorTres.classList.add('divdisable')
    } else if (estados === 2) {
      // Contenedor Primera Pantalla
      contenedorUno.classList.remove('d-flex')
      contenedorUno.classList.add('divdisable')
      // Contenedor Segunda Pantalla
      contenedorDos.classList.remove('d-flex')
      contenedorDos.classList.add('divdisable')
      // Contenedor Tercera Pantalla
      contenedorTres.classList.remove('divdisable')
    }
  }, [estados])

  const retroceder = () => setDisplay(0)
  const avanzar = () => setDisplay(1)
  const continuar = () => setDisplay(2)
  const proceder = () => setDisplay(3)

  useEffect(() => {

    const cardvet = document.getElementById('cardvet')
    const cardipsas = document.getElementById('cardipsas')
    const calendar = document.getElementById('calendario')
    const intevals = document.getElementById('intevals')

    if (display === 0) {
      cardipsas.classList.add('hidden')
      calendar.classList.add('flex')
      calendar.classList.remove('hidden')
      cardvet.classList.add('hidden')
      intevals.classList.add('hidden')
    } else if (display === 1) {
      cardipsas.classList.add('flex')
      cardipsas.classList.remove('hidden')
      calendar.classList.add('hidden')
      cardvet.classList.add('hidden')
      intevals.classList.add('hidden')
    } else if (display === 2) {
      cardipsas.classList.add('hidden')
      calendar.classList.add('hidden')
      cardvet.classList.add('flex')
      cardvet.classList.remove('hidden')
      intevals.classList.add('hidden')
    } else if (display === 3) {
      cardipsas.classList.add('hidden')
      calendar.classList.add('hidden')
      cardvet.classList.add('hidden')
      intevals.classList.add('flex')
      intevals.classList.remove('hidden')
    }

  }, [display])

  // const fechaComoCadena = "2022-05-29 23:37:22"; // día lunes
  const dias = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  const dateTime = new Date(value._d)
  const day = dateTime.getDate()
  const month = '0' + parseInt(dateTime.getMonth() + 1)
  const year = dateTime.getFullYear()
  const fechita = month + '-' + day + '-' + year
  const numeroDia = new Date(fechita + ' 00:00:00').getDay();
  const nombreDia = dias[numeroDia];

  useEffect(() => {
    const fechita = year + '-' + month + '-' + day
    setFecha(fechita)
  })

  useEffect(() => {
    if (currentUser === true && localStorage.getItem('rolUser') === 'Cliente') {
      esconder()
      axios.post('https://api.cruzpet.com:8443/v1.0/clientes/buscarcliente', {
        username: localStorage.getItem('username')
      }).then((response) => {
        setNumCedula(response.data.cedulaUsuario)
        setTypeDoc(response.data.tipoDocumento)
        axios.post('https://api.cruzpet.com:8443/v1.0/clientes/traercedula', {
          cedulaCliente: response.data.cedulaUsuario
        }).then((response) => {
          setNombres(response.data.nombres)
          setApellidos(response.data.apellidos)
          setCorreo(response.data.email)
          getDepart()
          // getPetUser()

        })
        axios.post('https://api.cruzpet.com:8443/v1.0/mascotas/mascotausuario', {
          clienteMascota: {
            cedulaCliente: response.data.cedulaUsuario
          }
        }).then((response) => {
          setMascotas(response.data)
        })
      })
    }
  }, [])

  const valAppointment = (e) => {
    e.preventDefault();

    if (rutIpsa === '') {
      warnIpsaVet()
    } else if (tramite === '') {
      warnTramite()
    } else if (documentoVet === '') {
      warnDniVet()
    } else {
      postAppointment()
    }
  }

  const postAppointment = (e) => {

    axios.post('https://api.cruzpet.com:8443/v1.0/disponibilidades/actualizarestadointervalo', {
      idIntervalo: idIntervalo,
      estado: "i"
    })

    axios.post('https://api.cruzpet.com:8443/v1.0/citas/crear', {
      estadoCita: "a",
      fecha: fecha,
      hora: hora,
      email: correo,
      telefono: celular,
      tipoTramite: tramite,
      ipsaPropetaria: {
        rut: rutIpsa
      },
      citaVeterinario: {
        cedVeterinario: documentoVet
      },
      usuarioCita: {
        cedulaCliente: numCedula
      },
      citaMascota: {
        numeroIdentidad: identidad
      },
      citaDepartamento: {
        idDepartamento: dpt
      },
      citaCiudad: {
        idCiudad: ciudad
      },
      tipoDocumentoClientes: typeDoc
    }).then((response) => {
      if (response.status === 201) {
        window.location.reload(true)
        notifyAppoiment()
      } else {
      }
    }).catch((error) => {
      errorAppoiment()
    })

  }

  const valCeduser = async (e) => {

    const urlCedata = await fetch("https://api.cruzpet.com:8443/v1.0/clientes/existenciacedula", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': 'https://localhost:8080',
      },
      body: JSON.stringify({
        cedulaCliente: numCedula
      }),
    })

    if (urlCedata.status !== 200) {
      warnCed()
    }

  }

  const getCedata = async (e) => {
    e.preventDefault()

    const urlCedata = await fetch("https://api.cruzpet.com:8443/v1.0/clientes/traercedula", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': 'https://localhost:8080',
      },
      body: JSON.stringify({
        cedulaCliente: numCedula
      }),
    })
    valCeduser()
    try {
      const data = await urlCedata.json()
      setNombres(data.nombres)
      setApellidos(data.apellidos)
      setCorreo(data.email)

      if (data.tipoDocumento === typeDoc) {
        esconder()
        getPetUser()
        getDepart()
      } else {
        warnTyDoc()
      }

    } catch (error) {
    }
  }

  let navigate = useNavigate()

  const valDatos = async (e) => {
    e.preventDefault()

    if (celular.length == 7 || celular.length == 10) {
      if (dpt !== '' && ciudad !== '') {
        if (mascotas.length > 0) {
          if (identidad === '') {
            warnSelPet()
          } else {
            mostrar()
          }
        } else {
          if (currentUser === true) {
            warnPetsLogged()
            const timer = setTimeout(() => {
              navigate('/Perfil/Mascota')
            }, 4000);
            return () => clearTimeout(timer)
          } else {
            warnPets()
            const timer = setTimeout(() => {
              navigate('/login')
            }, 4000);
            return () => clearTimeout(timer)
          }
        }
      } else {
        warnDpt()
      }

    } else {
      warnCel()
    }

  }

  const getPetUser = async (e) => {

    const urlPetuser = await fetch("https://api.cruzpet.com:8443/v1.0/mascotas/mascotausuario", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': 'https://localhost:8080'
      },
      body: JSON.stringify({
        clienteMascota: {
          cedulaCliente: numCedula
        }
      }),
    })

    try {
      const data = await urlPetuser.json()
      setMascotas(data)

    } catch (error) {

    }

  }

  const getCity = async (e) => {

    const urlCity = await fetch("https://api.cruzpet.com:8443/v1.0/ciudades/ciudadesdepartamento", {
      method: "POST",

      headers: {

        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': 'https://localhost:8080'
      },
      body: JSON.stringify({
        departamentoOrigen: {
          idDepartamento: dpt
        }
      }),
    })

    try {
      const data = await urlCity.json()
      setCity(data)

    } catch (error) {

    }

  }

  const getDptIpsa = async (e) => {

    const urlDptIpsa = await fetch("https://api.cruzpet.com:8443/v1.0/ipsas/traeripsasdepartamento", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': 'https://localhost:8080'
      },
      body: JSON.stringify({
        direccionIpsa: {
          barrios: {
            ciudadOrigen: {
              departamentoOrigen: {
                nombreDepartamento: "Quindío"
              }
            }
          }
        }
      }),
    })

    try {
      const data = await urlDptIpsa.json()
      setDptIpsa(data)

    } catch (error) {

    }

  }

  const getDepart = async (e) => {
    axios({
      method: 'get',
      url: 'https://api.cruzpet.com:8443/v1.0/departamentos/',
    })
      .then(function (response) {
        setDepartamento(response.data)
        getCity()
      });

  }

  const searchVet = (e) => {

    const Array = [e.target.value]
    const arreglo = Array[0].split(',')
    setRutIpsa(arreglo[0])
    setNomIpsa(arreglo[1])
    const dateTime = new Date(value._d)
    let day = dateTime.getDate()
    const month = '0' + parseInt(dateTime.getMonth() + 1)
    const year = dateTime.getFullYear()
    if (day <= 9) {
      day = '0' + dateTime.getDate()
    }

    axios.post('https://api.cruzpet.com:8443/v1.0/disponibilidades/disponiblidaddiamesyearrut', {
      diaDisponibilidad: day,
      mesDisponibilidad: month,
      yearDisponibilidad: year,
      ipsafk: {
        rut: arreglo[0]
      }
    }).then(function (response) {
      if (response.data.length > 0) {
        setVeterinarians(response.data)
        continuar()
      } else {
        infoVet()
      }
    })

  }

  const searchIntervals = (e) => {

    const Array = [e.target.value]
    const arreglo = Array[0].split(',')
    setDocumentoVet(arreglo[0])
    setNomVet(arreglo[1])
    const dateTime = new Date(value._d)
    let day = dateTime.getDate()
    const month = '0' + parseInt(dateTime.getMonth() + 1)
    const year = dateTime.getFullYear()
    if (day <= 9) {
      day = '0' + dateTime.getDate()
    }

    axios.post('https://api.cruzpet.com:8443/v1.0/disponibilidades/disponiblidaddveterinario', {
      disponibilidadEntity: {
        diaDisponibilidad: day,
        mesDisponibilidad: month,
        yearDisponibilidad: year,
        ipsafk: {
          rut: rutIpsa
        }
      },
      veterinarioEntity: {
        cedVeterinario: arreglo[0]
      }

    }).then(function (response) {
      if (response.data.length > 0) {
        let ultimo = response.data.pop()
        setIntervalos(ultimo.disponibilidadEntity.intervalos)
        proceder()
      } else {
        infoInter()
      }
    })
  }

  const boton = useRef()

  const searchDate = (e) => {

    const dateTime = new Date(value._d)
    let day = dateTime.getDate()
    const month = '0' + parseInt(dateTime.getMonth() + 1)
    const year = dateTime.getFullYear()
    if (day <= 9) {
      day = '0' + dateTime.getDate()
    }

    let i = boton.current
    ReactDOM.render(<ClipLoader color='blue' size={20} />, i)
    setIconoBoton(<ClipLoader color='blue' size={20} />)

    axios.post('https://api.cruzpet.com:8443/v1.0/disponibilidades/disponiblidaddiamesyear', {
      diaDisponibilidad: day,
      mesDisponibilidad: month,
      yearDisponibilidad: year
    }).then((response) => {
      if (response.data.length > 0) {
        getDptIpsa()
        avanzar()
        ReactDOM.render(<p>Seleccionar fecha</p>, i)
      } else {
        infoIpsas()
      }
    })

  }

  const handleChange = (event) => {
    setDpt(event.target.value)
    getCity()
  }

  const handleCity = (event) => {
    setCiudad(event.target.value)
  }

  const handlePet = (event) => {
    setIdentidad(event.target.value)
  }

  const handleProcedure = (event) => {
    setTramite(event.target.value)
  }

  const handleTypeDoc = (event) => {
    setTypeDoc(event.target.value)
  }

  const handleHora = (e) => {
    const Array = [e.target.value]
    const arreglo = Array[0].split(',')
    setIdIntervalo(arreglo[0])
    setHora(arreglo[1])
  }

  const notifyAppoiment = () => toast.success('Has agendado una cita exitosamente.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const errorAppoiment = () => toast.error('Por favor selecciona un veterinario.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const warnDniVet = () => toast.warn('Por favor selecciona un veterinario.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const warnPets = () => toast.warn('No tienes mascotas registradas. Inicia sesión y registra por lo menos una mascota.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const warnPetsLogged = () => toast.warn('Registra por lo menos una mascota para agendar citas.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const warnSelPet = () => toast.warn('Por favor selecciona una de tus mascotas.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const warnIpsaVet = () => toast.warn('Por favor selecciona una veterinaria.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const infoIpsas = () => toast.info('No se encuentran disponibilidades para el día seleccionado.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const infoVet = () => toast.info('No se encuentran disponibilidades para la veterinaria seleccionada.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const infoInter = () => toast.info('No se encuentran disponibilidades para el veterinario seleccionada.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const warnTramite = () => toast.warn('Por favor selecciona el tipo de tramite.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const warnCed = () => toast.warn('La cédula ingresada no se encuentra registrada.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const warnDpt = () => toast.warn('Porfavor seleccione un departamento y una ciudad.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const warnTyDoc = () => toast.warn('El tipo de documento no coincide con el número de documento.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const warnCel = () => toast.warn('El telefono celular debe tener 7 o 10 dígitos.', {
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
      <Header />
      <ToastContainer
        autoClose={3000}
        position="top-right"
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
            <h2 className=" text-xl sm:text-3xl md:4xl lg:text-5xl ">Ingresa los siguientes datos para agendar tu cita</h2>
          </div>
          <div className="text-center mx-4 sm:px-10">
            <p className="mx-4 sm:mx-20 md:text-lg lg:text-xl">Los campos señalados con asterisco (*) son de carácter obligatorio.</p>
            <p className="mx-4 sm:mx-20 md:text-lg lg:text-xl">Revisa muy bien los datos antes de finalizar, recuerda que los datos que estás registrando son los que Cruz Pet tomará para tramitar tu solicitud.</p>
          </div>
          <div className="mx-2 sm:px-20 lg:px-12 lg:flex lg:w-full">
            <div className="mx-4 lg:text-center lg:w-full my-2">
              <select onClick={handleTypeDoc} onChange={handleTypeDoc} id="documents" className="block py-2.5 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value=""  >Tipo de documento</option>
                <option value="cc" >Cédula de Ciudadanía</option>
                <option value="ti" >Tarjeta de Identidad</option>
              </select>
            </div>
            <div className="mx-4 lg:text-center lg:w-full my-2">
              <div className='relative'>
                <input type="number" id="num_cedula" required onChange={e => setNumCedula(e.target.value)} placeholder=" " className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                <label htmlFor="num_cedula" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Número de documento *</label>
              </div>
            </div>
          </div>
          <div className="my-2">
            <div className="flex justify-center">
              <BtnAccept text='Validar' />
            </div>
            <div className="flex text-center justify-center items-center mx-4">
              <NavLink to='/' className='mx-4 hover:underline text-black sm:w-50 sm:text-lg'>Ir al Inicio</NavLink>
            </div>
          </div>
        </form>
      </section>

      {/* Segunda Pantalla */}
      <section className='sm:mx-10 md:mx-20 lg:mx-26 xl:mx-40 2xl:mx-56'>
        <div className="lg:p-8 relative m-4 h-full flex flex-col min-w-0 bg-white bg-clip-border border-1 border-solid rounded shadow-sm sm:m-8" id="containerDos">
          <div className='flex mx-4 justify-center items-center text-center'>
            <h2 className="text-xl sm:text-3xl md:4xl lg:text-5xl">Selecciona tu mascota e ingresa los siguientes datos</h2>
          </div>
          <div className="sm:mx-20">
            <form onSubmit={valDatos} className="mx-2 my-2">
              <div className="lg:flex lg:w-full">
                <div className="mx-4 lg:w-full my-2">
                  <select onClick={handlePet} onBlur={handlePet} className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" >Selecciona tu mascota</option>
                    {mascotas.map(pet => (
                      <option key={pet.numeroIdentidad} value={pet.numeroIdentidad} >{pet.nombreMascota}</option>
                    ))}
                  </select>
                </div>
                <div className="mx-4 lg:w-full my-2">
                  <div className="relative">
                    <label htmlFor="disabled_outlined" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Número de Identidad</label>
                    <input type="text" value={identidad} id="disabled_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                  </div>
                </div>
              </div>
              <div className="lg:flex lg:w-full">
                <div className="mx-4 lg:w-full my-2">
                  <div className="relative">
                    <label htmlFor="disabled_outlined" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nombre del Dueño</label>
                    <input type="text" value={nombres + " " + apellidos} id="disabled_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                  </div>
                </div>
                <div className="mx-4 lg:w-full my-2">
                  <div className='relative'>
                    <input type="number" id="num_celular" required onChange={e => setCelular(e.target.value)} placeholder=" " className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                    <label htmlFor="num_celular" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Telefono celular *</label>
                  </div>
                </div>
              </div>
              <div className="lg:flex lg:w-full">
                <div className="mx-4 lg:w-full my-2">
                  <select onClick={handleChange} onBlur={handleChange} className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" >Selecciona un departamento</option>
                    {departamento.map(dptmt => <option key={dptmt.idDepartamento} value={dptmt.idDepartamento} >{dptmt.nombreDepartamento}</option>)}
                  </select>
                </div>
                <div className="mx-4 lg:w-full my-2">
                  <select onClick={handleCity} onBlur={handleCity} className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" >Selecciona una ciudad</option>
                    {city.map(city => <option key={city.idCiudad} value={city.idCiudad} >{city.nombreCiudad}</option>)}
                  </select>
                </div>
              </div>
              <div className="lg:flex lg:w-50 lg:mx-32 my-2">
                <div className="mx-4 lg:w-full">
                  <div className="relative">
                    <input type="email" id="email" onChange={e => setCorreo(e.target.value)} value={correo} placeholder=" " className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                    <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Correo eléctronico *</label>
                  </div>
                </div>
              </div>

              <div className="text-center mx-4">
                <div className="mx-2 my-4">
                  <p className='text-xs md:text-sm lg:text-base'>Autorizo mi consentimiento previo, expreso e informado a CRUZ PET para que recolecte, utilice, circule, almacene, transfiera,
                    transmita, suprima, o realice cualquier operación sobre mi información (Datos Personales), de acuerdo con lo establecido
                    en la Política de tratamiento de datos personales disponible en cualquiera de sus sedes, y en su página web www.CruzPet.com.co para
                    cualquier finalidad que se derive de la naturaleza jurídica y objeto social de CRUZ PET.</p>
                </div>
                <div className="xl:flex te xt-center justify-center items-center">
                  <div className="flex items-center">
                    <input required id="check" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="link-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Acepto la política de tratamiento de datos personales. <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Términos y condiciones</a></label>
                  </div>
                </div>
              </div>
              <div className="mx-4 my-4 flex justify-center ">
                <div className='flex mx-0.5 sm:mx-2'>
                  <div className='flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-tr focus:ring-4 focus:ring-green-200  hover:from-blue-600 hover:to-green-400 rounded-lg w-auto'>
                    <button type="submit" className="relative inline-flex items-center justify-center py-[9px] px-5 my-[0.125rem]  mx-[0.125rem] overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-white hover:bg-gradient-to-tr hover:from-blue-600 hover:to-green-400 hover:text-white">
                      Solicitar
                    </button>
                  </div>
                </div>
                <div className='flex mx-0.5 sm:mx-3'>
                  <div className='flex items-center justify-center bg-gradient-to-br from-red-400 to-red-600 hover:bg-gradient-to-tr focus:ring-4 focus:ring-green-200  hover:from-red-600 hover:to-red-400 rounded-lg w-auto'>
                    <button type="button" onClick={visualizar} className="relative inline-flex items-center justify-center py-[9px] px-5 my-[0.125rem]  mx-[0.125rem] overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-white hover:bg-gradient-to-tr hover:from-red-600 hover:to-red-400 hover:text-white">
                      Volver
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Tercera Pantalla */}
      <section className='sm:mx-10 md:mx-20 lg:mx-26 xl:mx-8 2xl:mx-8'>
        <div className='lg:p-8 relative m-4 flex flex-col min-w-0 bg-white bg-clip-border border-1 border-solid rounded shadow-sm sm:m-8' id="containerTres">
          <div className="sm:mx-10 my-2">
            <div className='flex mx-4 justify-center items-center text-center'>
              <h2 className="text-xl sm:text-3xl md:text-4xl">Selecciona una fecha en el calendario y elije los demás datos para agendar tu cita</h2>
            </div>
          </div>
          <form onSubmit={valAppointment} className="xl:flex xl:w-full">
            <div id='calendario' className="flex-col w-full my-4">
              <div className='flex justify-end'>
                <div className='flex items-center justify-center'>
                  <div className='flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-tr focus:ring-4 focus:ring-green-200  hover:from-blue-600 hover:to-green-400 rounded-lg w-auto'>
                    <button type="button" ref={boton} onClick={searchDate} className="relative inline-flex items-center justify-center py-[9px] px-5 my-[0.125rem]  mx-[0.125rem] overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-white hover:bg-gradient-to-tr hover:from-blue-600 hover:to-green-400 hover:text-white">
                      Seleccionar fecha
                    </button>
                  </div>
                </div>
              </div>
              <div className='sm:mx-20 xl:mx-0 xl:flex xl:w-full my-1'>
                <Calendar value={value} onChange={setValue} />
              </div>
            </div>
            <div id='cardipsas' className="flex-col w-full">
              <div className="flex justify-end">
                <button type='button' className='mx-20' onClick={retroceder}>Volver al calendario</button>
              </div>
              <div className="bg-white w-full flex">
                <div className="w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">

                  <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 xl:gap-x-8">
                    {dptIpsa.map((ipsa) => (
                      <a key={ipsa.rut} className="group">
                        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={ipsa.logoIpsa}
                            alt={ipsa.nombre}
                            className="w-full h-full object-center object-cover group-hover:opacity-75"
                          />
                          <button value={ipsa.rut + ',' + ipsa.nombre} onClick={searchVet} type="button" className="w-full h-full border-transparent rounded-md font-medium	group-hover:opacity-300  text-transparent hover:text-slate-900 ">Ver veterinarios disponibles</button>
                        </div>
                        <p className="w-full mx-8 mt-1 text-lg font-medium text-gray-900">{ipsa.nombre}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div id='cardvet' className="flex-col w-full">
              <div className='flex justify-end'>
                <button type="button" onClick={avanzar} className='mx-20'>Volver a las veterinarias</button>
              </div>
              <div className="bg-white w-full flex">
                <div className="w-full mx-auto py-2 px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-wrap gap-x-6 xl:gap-x-8 justify-center items-center text-center">
                    {veterinarians.map((vet) => (
                      <div key={vet.veterinarioEntity.cedVeterinario} className="text-center group p-2 items-center relative m-1.5 flex flex-col min-w-0 bg-white bg-clip-border border-1 border-solid shadow-sm rounded-xl justify-center overflow-hidden">
                        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden ">
                          <img
                            src={vet.veterinarioEntity.foto}
                            alt={vet.veterinarioEntity.nombres}
                            className="w-full h-full object-center object-cover group-hover:opacity-75"
                          />
                          <button value={vet.veterinarioEntity.cedVeterinario + ',' + vet.veterinarioEntity.nombres} onClick={searchIntervals} type="button" className="w-full h-full border-transparent rounded-md font-medium	group-hover:opacity-300  text-transparent hover:text-slate-900 ">Ver veterinarios disponibles</button>
                        </div>
                        <p className="w-full mx-8 mt-1 text-lg font-medium text-gray-900">{vet.veterinarioEntity.nombres + ' ' + vet.veterinarioEntity.apellidos}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div id='intevals' className="flex-col w-full">
              <div className='flex justify-end'>
                <button type="button" onClick={continuar} className='mx-20'>Volver a los veterinarios</button>
              </div>
              <div className="w-full sm:mx-10 xl:mx-0 flex flex-col flex-wrap">
                <div className='mx-4 my-2 flex flex-wrap justify-center'>
                  {intervalos.map(disp => (disp.estadoIntervalo === 'a' ?
                    <div className="p-2 items-center relative m-1.5 flex flex-col min-w-0 bg-white bg-clip-border border-1 border-solid shadow-sm rounded-xl justify-center overflow-hidden">
                      <div className="">
                        {nombreDia}
                      </div>
                      <div className="justify-center flex-col items-center text-center">
                        <div className="" id='timeInterval' key={disp.idIntervalo} value={disp.tiempoIntervalo}>{fecha}<br />{disp.tiempoIntervalo}</div>
                        <button type="button" value={disp.idIntervalo + ',' + disp.tiempoIntervalo} onClick={handleHora} className="flex btn">Seleccionar</button>
                      </div>
                    </div>
                    : ""
                  ))}
                </div>
              </div>
            </div>
            <div className='sm:mx-20 xl:mx-0 xl:flex xl:w-8/12	'>
              <div className="mx-2 xl:my-6 px-3 lg:px-0 xl:w-full	">
                <div className="lg:flex lg:w-full">
                  <div className="lg:mr-2 lg:w-full mt-3">
                    <div className="relative">
                      <label htmlFor="disabled_outlined" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Fecha</label>
                      <input type="date" value={fecha} id="disabled_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                    </div>
                  </div>
                  <div className="lg:ml-2 lg:w-full mt-3">
                    <div className="relative">
                      <label htmlFor="disabled_outlined" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Hora</label>
                      <input type="time" value={hora} id="disabled_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                    </div>
                  </div>
                </div>
                <div className="lg:flex lg:w-full">
                  <div className="lg:mr-2 lg:w-full mt-3">
                    <div className="relative">
                      <label htmlFor="disabled_outlined" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Veterinario</label>
                      <input type="text" value={nomVet} id="disabled_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                    </div>
                  </div>
                  <div className="lg:ml-2 lg:w-full mt-3">
                    <div className="relative">
                      <label htmlFor="disabled_outlined" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Veterinaria</label>
                      <input type="text" value={nomIpsa} id="disabled_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                    </div>
                  </div>
                </div>
                <div className="lg:flex lg:w-full">
                  <div className="lg:mr-2 lg:w-full">
                    <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Tramite *</label>
                    <select onClick={handleProcedure} onBlur={handleProcedure} id="regional" className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value=""  >Seleccione</option>
                      <option value="Cita" >Cita</option>
                      <option value="Documentos" >Documentos</option>
                    </select>
                  </div>
                  <div className="lg:ml-2 lg:w-full">
                    <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Regional *</label>
                    <select id="regional" disabled className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="Quindío" >Quindío</option>
                    </select>
                  </div>
                </div>
                <div className='flex justify-center my-4 w-full'>
                  <div className='flex mx-0.5 sm:mx-2'>
                    <div className='flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-tr focus:ring-4 focus:ring-green-200  hover:from-blue-600 hover:to-green-400 rounded-lg w-auto'>
                      <button type="submit" className="relative inline-flex items-center justify-center py-[9px] px-5 my-[0.125rem]  mx-[0.125rem] overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-white hover:bg-gradient-to-tr hover:from-blue-600 hover:to-green-400 hover:text-white">
                        Solicitar
                      </button>
                    </div>
                  </div>
                  <div className='flex mx-0.5 sm:mx-3'>
                    <div className='flex items-center justify-center bg-gradient-to-br from-red-400 to-red-600 hover:bg-gradient-to-tr focus:ring-4 focus:ring-green-200  hover:from-red-600 hover:to-red-400 rounded-lg w-auto'>
                      <button type="button" onClick={esconder} className="relative inline-flex items-center justify-center py-[9px] px-5 my-[0.125rem]  mx-[0.125rem] overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-white hover:bg-gradient-to-tr hover:from-red-600 hover:to-red-400 hover:text-white">
                        Volver
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
}