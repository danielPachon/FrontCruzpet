import React,{ useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './index.css'
import Header from '../../Layout/Header'
import { Footer } from '../../Layout/Footer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import jwt from "jwt-decode"
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import axios from 'axios'
import PwdRequisite from '../../Helpers/PwdRequisite/PwdRequisite'
import { Role } from '../../Helpers/AuthUser/Role'
import { Button } from 'flowbite-react'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'; 
import FormularioCorreo from './recuperar_contra/FormularioCorreo'


export default function LoginAndLogout() {

  const [transform, setTransform] = useState(0)
  const [button, setButton] = useState(true)
  const [btn, setBtn] = useState(true)
  const [btn1, setBtn1] = useState(true)
  const [btn2, setBtn2] = useState(true)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [correAdministrador, setCorreAdministrador] = useState("")
  const [passwordAdministrador, setPasswordAdministrador] = useState("")
  const [correoVeterinario, setcorreoVeterinario] = useState("")
  const [passwordVeterinario, setPasswordVeterinario] = useState("")
  const [correoIpsa, setCorreoIpsa] = useState("")
  const [passwordIpsa, setPasswordIpsa] = useState("")
  const [nombres, setNombres] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [numeroDocumento, setNumeroDocumento] = useState("")
  const [tipoDocumento, setTipoDocumento] = useState("")
  const [correo, setCorreo] = useState("")
  const [shpss, setShpss] = useState()


  const validateEmail = async (e) => {
    e.preventDefault()
    
    const urlValEmail = await fetch("https://api.cruzpet.com:8443/v1.0/clientes/existenciaemail", {
      method: "POST",
      
      headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify({
        email: correo
      }),
    })

    if (urlValEmail.status === 200){
      warnEmail()
    }else if(urlValEmail.status === 400){
    }
  }

  const redireccionarRegistro = () => {
    navigate("/Login/complemento")
  }

  const validateDoc = async (e) => {
    e.preventDefault()
    
    const urlValEmail = await fetch("https://api.cruzpet.com:8443/v1.0/clientes/existenciacedula", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify({
        cedulaCliente: numeroDocumento
      }),
    })

    if (urlValEmail.status === 200){
      warnCedula()
    }
  }

  const register = (e) => {
    e.preventDefault()
    const username = correo.split('@')[0]

    if(tipoDocumento === '') {
      warnTypeDocumento()
    } else {
      axios.post('https://api.cruzpet.com:8443/v1.0/clientes/crear',{
      cedulaCliente : numeroDocumento, 
      username : username,
      email : correo,
      telefono : "",
      nombres : nombres,
      apellidos : apellidos,
      estado: "a",
      imagenCliente: "https://res.cloudinary.com/dadzakyw1/image/upload/v1656626730/Perfil%20de%20usuario/persona_aleatoria_yv37zj.png",
      password: password,
      planes: null,
      tipoDocumento: tipoDocumento,
      administradorCreador: null,
      direccion: null
    }).then((response) => {
      window.location.reload(true)
      notifyRegister()
      }). catch((error) => {
        errorRegister()
    })
    }

  }

const newLogin = async (e) => {
  e.preventDefault()
  email.toLowerCase()
  const mail = email.split('@')

  if('@'+mail[1]!=='@cruzpet.com'){
    const urlCliente = await fetch("https://api.cruzpet.com:8443/v1.0/clientes/login", {
    method: "POST",
      headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
  if (urlCliente.status != 500) {
    try { 
      const data = await urlCliente.json()
      const token = await data.token
      const decoded = await jwt(token)
      const rolUser = await decoded.informacion.authorities[0].authority
      const username = await decoded.informacion.usernames
      const img = await decoded.informacion.imagenCliente
      const pets = await decoded.informacion.cantidadMascota

      localStorage.setItem("rolUser", rolUser)
      localStorage.setItem("username", username)
      localStorage.setItem("imagen", img)
      localStorage.setItem("pets", pets)
      rolUser === Role.Cliente ? navigate('/') :
      alert("Datos Invalidos, inténtalo de nuevo")
      window.location.reload(false)

    } catch (error) {
      errorLogin()
    }
    e.target.reset()}
  }else{
    const urlAdministradores = await fetch("https://api.cruzpet.com:8443/v1.0/administradores/login", {
    method: "POST",
      headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correAdministrador,
      passwordAdministrador,
    }),
  })

  // const urlVeterinarios = await fetch("https://api.cruzpet.com:8443/v1.0/veterinarios/login", {
  //   method: "POST",
  //     headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     correoVeterinario,
  //     passwordVeterinario,
  //   }),
  // })

  const urlIpsas = await fetch("https://api.cruzpet.com:8443/v1.0/ipsas/login", {
    method: "POST",
      headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correoIpsa,
      passwordIpsa,
    }),
  })

  if (urlAdministradores.status != 500) {
    try { 
      const data = await urlAdministradores.json()
      const token = await data.token
      const decoded = await jwt(token)
      const rolUser = await decoded.informacion.authorities[0].authority
      const idAdministrador = await decoded.informacion.idAdministrador
      localStorage.setItem("idadmin", idAdministrador)
      localStorage.setItem("rolUser", rolUser)
      rolUser === Role.Admin ? navigate('/admin') :
      alert("Datos Invalidos, inténtalo de nuevo")
      window.location.reload(false)

    } catch (error) {
      errorLogin()
    }
    e.target.reset()
  } else if (urlIpsas.status != 500) {
    try { 
      const data = await urlIpsas.json()
      const token = await data.token
      const decoded = await jwt(token)
      const rolUser = await decoded.informacion.authorities[0].authority
      const rut = await decoded.informacion.rut
      const img = await decoded.informacion.logoIpsa
      
      localStorage.setItem("rolUser", rolUser)
      localStorage.setItem("rut", rut)
      localStorage.setItem("img", img)
      rolUser === Role.Ipsa ? navigate('/Admin/Ipsa') :
      alert("Datos Invalidos, inténtalo de nuevo")
      window.location.reload(false)

    } catch (error) {
      errorLogin()
    }
    e.target.reset()
  } 
  // else if (urlVeterinarios.status != 500) {
  //   try { 
  //     const data = await urlVeterinarios.json()
  //     const token = await data.token
  //     const decoded = await jwt(token)
  //     const rolUser = await decoded.informacion.authorities[0].authority

  //     localStorage.setItem("rolUser", rolUser)
  //     rolUser == Role.Veterinario ? navigate('/Veterinarios') :
  //     alert("Datos Invalidos, inténtalo de nuevo")
  //     window.location.reload(false)

  //   } catch (error) {
  //     errorLogin()
  //   }
  //   e.target.reset()
  // }
  }
}

  function mostrarContrasenaTwo(){
    const tipo = document.getElementById("password")
    if(tipo.type == "password"){
      tipo.type = "text"
      setShpss(true)
    }else{
      tipo.type = "password"
      setShpss(false)
    }
  }

  function mostrarContrasena(){
    const tipo = document.getElementById("loginpassword")
    if(tipo.type == "password"){
      tipo.type = "text"
      setShpss(true)
    }else{
      tipo.type = "password"
      setShpss(false)
    }
  }

  const notifyRegister = () => toast.success('Usuario registrado', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const errorLogin = () => toast.error('No se pudo encontrar una cuenta que coincida con esas credenciales.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const errorRegister = () => toast.error('No se completó el registro, por favor comprueba los datos ingresados.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const warnEmail = () => toast.warn('El correo electrónico ingresado ya se encuentra registrado.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const warnTypeDocumento = () => toast.warn('Por favor selecciona un tipo de documento.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const warnCedula = () => toast.warn('El número de documento ingresado ya se encuentra registrado.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const signInButton = () => setTransform(0)
  const signUpButton = () => setTransform(1)
  
  useEffect(()=>{
    const container = document.getElementById('container')
    
      if (transform === 0) {
        // Inicia en el formulario de Login
        container.classList.remove("right-panel-active")
      } else if (transform === 1) {
        container.classList.add("right-panel-active")
      }

  }, [transform])

  const registrarFacebook = (response) => {
    axios.post('https://api.cruzpet.com:8443/v1.0/oauth/facebook',{
            value: response.accessToken
          }).then((response) => {
            existenciaEmail(response.data.email)  
          })
    localStorage.setItem("tokenFacebook", response.accessToken)
  }

  const registrarGoogle = (response) => {
    axios.post('https://api.cruzpet.com:8443/v1.0/oauth/google',{
      value: response.tokenId
    }).then((response) => {
      existenciaEmail(response)  
    })
    localStorage.setItem("tokenGoogle", response.tokenId)  
  }

  const loginFacebook = (responses) => {
    axios.post('https://api.cruzpet.com:8443/v1.0/oauth/facebook',{
            value: responses.accessToken
          }).then((response) => {
            nuevoInicioLoginSocial(response.data.email, "facebook", responses)  
          })
  }

  const loginGoogle = (responses) => {
    axios.post('https://api.cruzpet.com:8443/v1.0/oauth/google',{
      value: responses.tokenId
    }).then((response) => {
      nuevoInicioLoginSocial(response.data.email, "google", responses)  
    })
  }

  const nuevoInicioLoginSocial = (response, social, token) => {    
    axios.post('https://api.cruzpet.com:8443/v1.0/clientes/existenciaemail',{
      email: response
    }).then(() => {
    
          axios.post('https://api.cruzpet.com:8443/v1.0/clientes/buscarclienteemail', {
            email: response
          }).then((response) => {
            localStorage.setItem("rolUser", "Cliente")
            localStorage.setItem("username", response.data.username)
            localStorage.setItem("img", response.data.imagenUsuario)
            localStorage.setItem("pets", response.data.cantidadMascota)
            navigate('/')
            window.location.reload(false)
          })
        
    }).catch(() => {
      if(social == "google"){
        registrarGoogle(token)
      }else{
        registrarFacebook(token)
      }
    })  
  }

  const existenciaEmail = async(response) => {
    const urlValEmail = await fetch("https://api.cruzpet.com:8443/v1.0/clientes/existenciaemail", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify({
        email: response
      }),
    })

    if (urlValEmail.status === 200){
      warnEmail()
    }else if(urlValEmail.status === 400){
      redireccionarRegistro()
    }  
  }

  const handleTipoDocumento = (event) => {
    setTipoDocumento(event.target.value)
  }

  return (
    <>
      <Header />
      <div className="flex justify-center items-center flex-col font-Montserrat">
        <div className="divcontainer relative m-4 flex flex-col min-w-0 bg-white bg-clip-border border-1 border-solid shadow-sm rounded-xl justify-center overflow-hidden w-11/12 max-w-full min-h-[35rem]
        sm:w-10/12
        md:w-10/12
        lg:w-10/12
        lg:min-h-[40rem]
        xl:w-10/12
        xl:min-h-[40rem]
        2xl:w-10/12
        2xl:min-h-[40rem]"
          id="container">
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
          <div className="absolute h-full w-full left-0 transition ease-in-out duration-700 lg:w-1/2 lg:left-2/4 sign-up-container">
              <form onSubmit={register} className="resize-none bg-white flex items-center justify-center flex-col pt-0 pb-0 px-4 h-full text-center">
                <h1 className="font-bold m-0 text-4xl sm:text-5xl" >Crear una cuenta</h1>
                <div className="social-container my-2.5">
                  <FacebookLogin
                    appId="5456436304409164"
                    autoLoad={false}
                    textButton=""
                    cssClass='iconoFacebook'
                    icon={
                      <a className="rounded-full inline-flex items-center justify-center m-1.5 h-10 w-10 social text-slate-700 text-sm no-underline mt-3">
                        <FaFacebookF/>
                      </a>
                    }
                    callback={registrarFacebook} />
                  
                  {/*<a className="rounded-full inline-flex items-center	justify-center m-1.5 h-10 w-10 social text-slate-700 text-sm no-underline mt-3"><FaLinkedinIn/></a>*/}
        
                  <a className="rounded-full inline-flex items-center	justify-center m-1.5 h-10 w-10 social text-slate-700 text-sm no-underline mt-3">   
                    <GoogleLogin 
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} 
                      onSuccess={registrarGoogle}
                      render ={renderProps => (
                          <FaGoogle onClick={renderProps.onClick} disabled={renderProps.disabled}/>
                      )}
                      cookiePolicy={'single_host_origin'}/>
                  </a>
                </div>
                <span className="text-xs sm:text-base">o usa tu correo electrónico para registrarse</span>
                <div className='w-full my-2'>
                  <div className="relative">
                    <input type="email" id='email' className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                      autoComplete="off"
                      required
                      onChange={e => setCorreo(e.target.value)}
                      onBlur={validateEmail}
                    />
                    <label htmlFor='email' className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Correo electrónico</label>
                  </div>
                </div>
                <div className="flex w-full ">
                  <div className='sm:w-full mr-1'>
                    <div className='relative'>
                      <select onClick={handleTipoDocumento} onBlur={handleTipoDocumento} id="small" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pb-2 pt-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" >Tipo Documento</option>
                        <option value="cc" >Cédula de ciudadanía</option>
                        <option value="ti" >Tarjeta de identidad</option>
                      </select>
                    </div>
                  </div>
                  <div className='sm:w-full ml-1'>
                    <div className="relative">
                      <input type="text" id='numeroDocumento' className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                        autoComplete="off"
                        required
                        onChange={e => setNumeroDocumento(e.target.value)}
                        onBlur={validateDoc}
                      />
                      <label htmlFor="numeroDocumento" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">N° Documento</label>
                    </div>
                  </div>
                </div>
                <div className="flex w-100">
                  <div className="sm:w-full mr-1 my-2">
                    <div className="relative">
                      <input type="text" id='nombres' className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                        autoComplete="off"
                        required
                        onChange={e => setNombres(e.target.value)}
                      />
                      <label htmlFor='nombres' className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Nombres</label>
                    </div>
                  </div>
                  <div className="sm:w-full ml-1 my-2">
                    <div className="relative">
                      <input type="text" id='apellidos' className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                        autoComplete="off"
                        required
                        onChange={e => setApellidos(e.target.value)}
                      />
                      <label htmlFor='apellidos' className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Apellidos</label>
                    </div>
                  </div>
                </div>
                <div className="w-full text-center">
                  <div className="flex w-full mb-2">
                    <div className='w-full relative'>
                      <input type="password" required placeholder=" " id="password" className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-l-lg border-1 border-gray-300 border-r-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                      autoComplete="off"
                      onChange={(e) => setPassword(e.target.value)}
                      minLength="8"
                      />
                      <label htmlFor='password' className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Contraseña</label>
                    </div>
                    {
                      shpss ? <button type="button" className="block px-2.5 pb-2 w-20 text-center justify-center items-center flex-col pt-3 text-sm text-gray-900 bg-transparent rounded-r-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onClick={mostrarContrasenaTwo}><FaRegEye/></button>
                      : <button type="button" className="block px-2.5 pb-2 w-20 text-center justify-center items-center flex-col pt-3 text-sm text-gray-900 bg-transparent rounded-r-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onClick={mostrarContrasenaTwo}><FaRegEyeSlash/></button>
                    }
                  </div>
                  <PwdRequisite password={password} />
                </div>
                <div className="flex w-full sm:px-12">
              </div>
              <Button type="submit"  onMouseEnter={()=>setButton(false)} onMouseLeave={()=>setButton(true)} outline={button} gradientDuoTone="greenToBlue">
              ㅤRegistrarseㅤ
              </Button>
                <div className="lg:hidden mt-3">
                  <Button type="button" onClick={signInButton} onMouseEnter={()=>setBtn(false)} onMouseLeave={()=>setBtn(true)} outline={btn} gradientDuoTone="greenToBlue">
                ㅤIniciar sesiónㅤ
                </Button>
                </div>
              </form>
          </div>

          <div className="absolute h-full w-full transition ease-in-out duration-700 sign-in-container">  
            <form onSubmit={newLogin} className="resize-none bg-white flex items-center justify-center flex-col pt-0 pb-0 px-4 h-full text-center
                lg:w-6/12">
              <h1 className="font-bold m-0 text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl" >Iniciar sesión</h1>
              <div className="social-container">
                {/*<a className="rounded-full inline-flex items-center justify-center m-1.5 h-10 w-10 social text-slate-700 text-sm no-underline mt-3"><FaFacebookF/></a>*/}
                  <FacebookLogin
                  appId="5456436304409164"
                  autoLoad={false}
                  textButton=""
                  cssClass='iconoFacebook'
                  icon={
                    <a className="rounded-full inline-flex items-center justify-center m-1.5 h-10 w-10 social text-slate-700 text-sm no-underline mt-3">
                      <FaFacebookF/>
                    </a>
                  }
                  callback={loginFacebook} />
                {/*<a className="rounded-full inline-flex items-center	justify-center m-1.5 h-10 w-10 social text-slate-700 text-sm no-underline mt-3"><FaLinkedinIn/></a>*/}

                
                {/*<a className="rounded-full inline-flex items-center	justify-center m-1.5 h-10 w-10 social text-slate-700 text-sm no-underline mt-3"><FaGoogle/></a>*/}
                <a className="rounded-full inline-flex items-center	justify-center m-1.5 h-10 w-10 social text-slate-700 text-sm no-underline mt-3">   
                  <GoogleLogin 
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} 
                    onSuccess={loginGoogle}
                    render ={renderProps => (
                        <FaGoogle onClick={renderProps.onClick} disabled={renderProps.disabled}/>
                    )}
                    cookiePolicy={'single_host_origin'}/>
                </a>
              </div>
              <span className="text-xs sm:text-base">o usa tu cuenta</span>
              <div className="flex w-full my-2 sm:px-12">
                <div className='w-full relative'>
                  <input type="email" required placeholder=" " id="loginemail" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setCorreAdministrador(e.target.value)
                    setcorreoVeterinario(e.target.value)
                    setCorreoIpsa(e.target.value)
                  }}
                  />
                  <label htmlFor='loginemail' className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Correo electrónico</label>
                </div>
              </div>
              <div className="flex w-full sm:px-12">
                <div className='w-full relative'>
                  <input type="password" required placeholder=" " id="loginpassword" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-l-lg border-1 border-gray-300 border-r-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setPasswordAdministrador(e.target.value)
                    setPasswordVeterinario(e.target.value)
                    setPasswordIpsa(e.target.value)
                  }}
                  />
                  <label htmlFor='loginpassword' className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Contraseña</label>
                </div>
                {
                  shpss ? <button type="button" className="block px-2.5 pb-2.5 w-20 text-center justify-center items-center flex-col pt-4 text-sm text-gray-900 bg-transparent rounded-r-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onClick={mostrarContrasena}><FaRegEye/></button>
                  : <button type="button" className="block px-2.5 pb-2.5 w-20 text-center justify-center items-center flex-col pt-4 text-sm text-gray-900 bg-transparent rounded-r-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onClick={mostrarContrasena}><FaRegEyeSlash/></button>
                }
              </div>
              <FormularioCorreo />
              <div className="mt-2">
                <Button type="submit"  onMouseEnter={()=>setButton(false)} onMouseLeave={()=>setButton(true)} outline={button} gradientDuoTone="greenToBlue">
                  Iniciar sesión
                </Button>
              </div>
              <div className="lg:hidden mt-3">
                <Button type="button" onClick={signUpButton} onMouseEnter={()=>setBtn(false)} onMouseLeave={()=>setBtn(true)} outline={btn} gradientDuoTone="greenToBlue">
                  Registrarse
                </Button>
              </div>
            </form>
          </div>
          <div className="lg:absolute left-2/4 w-3/6 h-full overflow-hidden z-[100] overlay-container">
            <div className="left-[-100%] relative h-full w-[200%] text-white bg-cover bg-no-repeat overlay">
              <div className="absolute flex items-center justify-center flex-col text-center h-full w-1/2 p-20 overlay-panel overlay-left">
                <h1 className="font-bold m-0 text-6xl" >¡Bienvenido de nuevo!</h1>
                <p className="text-sm font-hairline leading-5 tracking-wide ml-0 mt-4 mb-8 mr-0 " >Para mantenerse conectado con nosotros, inicie sesión con su información personal</p>
                <Button type="submit" onClick={signInButton} onMouseEnter={()=>setBtn2(false)} onMouseLeave={()=>setBtn2(true)} outline={btn2} gradientDuoTone="greenToBlue">
                  Iniciar sesión
                </Button>
              </div>

              <div className="overflow:hidden absolute flex items-center justify-center flex-col text-center h-full w-1/2 p-20 overlay-panel overlay-right lg:absolute ">
                <h1 className="font-bold m-0 text-6xl" >¡Hola, Amigo!</h1>
                <p className="text-sm font-hairline leading-5 tracking-wide ml-0 mt-4 mb-8 mr-0 " >Ingresa tus datos personales y comienza tu viaje con nosotros</p>
                <Button type="button" onClick={signUpButton} onMouseEnter={()=>setBtn1(false)} onMouseLeave={()=>setBtn1(true)} outline={btn1} gradientDuoTone="greenToBlue">
                  Registrarse
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='sm:absolute bottom-0 left-0 w-100 '>
      </div>
    </>
  )
}

