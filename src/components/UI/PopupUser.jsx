import React, {useState, useEffect } from "react";
import { Button } from 'flowbite-react'
import axios from 'axios';
import PwdRequisite from '../Helpers/PwdRequisite/PwdRequisite'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import { Modal } from 'react-bootstrap'
import { Logout } from '../Helpers/Logout/Logout'

export default function Popup() {

  const [showModal, setShowModal] = React.useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [shpss, setShpss] = useState()
  const [shpssTwo, setShpssTwo] = useState()
  const [btn, setBtn] = useState(true)
  const [btnTwo, setBtnTwo] = useState(true)
  const [button, setButton] = useState(true)
  const [cedulaCliente, setCedulaCliente] = useState("")
  const [email, setEmail] = useState("")
  const [nombres, setNombres] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [tipoDocumento, setTipoDocumento] = useState("")
  const [tipoDoc, setTipoDoc] = useState("")
  const [username, setUsername] = useState("")
  const [telefono, setTelefono] = useState("")
  const [password, setPassword] = useState("")
  const [passwordNew, setPasswordNew] = useState("")
  const [passwordNewTwo, setPasswordNewTwo] = useState("")

  useEffect(() => {
    axios.post("https://api.cruzpet.com:8443/v1.0/clientes/buscarcliente",{
    username: localStorage.getItem("username"),
    })
    .then(function(resp){
      setCedulaCliente(resp.data.cedulaUsuario)
      setEmail(resp.data.email)
      setNombres(resp.data.nombres)
      setApellidos(resp.data.apellidos)
      setUsername(resp.data.username)
      setTelefono(resp.data.telefono)
      setTipoDoc(resp.data.tipoDocumento)

      if(resp.data.tipoDocumento === 'ti'){
        setTipoDocumento('Tarjeta de Identidad')
      }else if(resp.data.tipoDocumento === 'cc'){
        setTipoDocumento('Cedula de Ciudadanía')
      }
    })
  },[])

  const verificarInfo = (e) => {
    e.preventDefault()

    if (passwordNew === passwordNewTwo) {  
      setPassword(passwordNewTwo)
      setShowMenu(true)
    } else {
      warnPassword()
    }

  }

  const actualizarInfo = async (e) => {
    e.preventDefault()

    const updateUser = {
      cedulaCliente: cedulaCliente,
      nombres: nombres,
      apellidos: apellidos,
      username: username,
      email: email,
      password: password,
      tipoDocumento: tipoDoc,
      telefono: telefono
    }

    try {
      await axios.put(`https://api.cruzpet.com:8443/v1.0/clientes/actualizar`, updateUser, {
        
      headers: {
          "Content-Type": "application/json",
        },
      })
      registroUsuario()
      setShowModal(false)
      setShowMenu(false)
      
      const timer = setTimeout(() => { 
        Logout()
      }, 2000);
      return () => clearTimeout(timer);

    } catch (err) {
        
    }

  }

  function mostrarContrasena () {

    const tipoUno = document.getElementById("passwordOne")
    if(tipoUno.type == "password"){
      tipoUno.type = "text"
      setShpss(true)
    }else{
      tipoUno.type = "password"
      setShpss(false)
    }

  }

  function mostrarContrasenaTwo () {

    const tipoDos = document.getElementById("passwordTwo")

    if(tipoDos.type == "password"){
      tipoDos.type = "text"
      setShpssTwo(true)
    }else{
      tipoDos.type = "password"
      setShpssTwo(false)
    }

  }

  const warnPassword = () => toast.warn('Las contraseñas ingresadas no son iguales.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const registroUsuario = () => toast.success('Información actualizada correctamente.', {
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
      <Button onClick={() => setShowModal(true)} className='mb-2 relative inline-flex items-center justify-center' type="submit" onMouseEnter={()=>setBtn(false)} onMouseLeave={()=>setBtn(true)} outline={btn} gradientDuoTone="greenToBlue">
        Actualizar información
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
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-center py-3 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Datos Personales
                  </h3>
                </div>
                {/*body*/}
                <form onSubmit={verificarInfo} className="relative p-6 flex-auto">
                  <div className="relative my-1">
                    <input type="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="email"  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Correo electrónico</label>
                  </div>
                  <div className="flex w-full">
                    <div className="w-full relative mr-1 my-1">
                      <input type="text" disabled value={tipoDocumento} id="documents" className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlFor="documents"  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Tipo Documento</label>
                    </div>
                    <div className="relative w-full ml-1 my-1">
                      <input type="text" disabled id="numberdoc" value={cedulaCliente} className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlFor="numberdoc"  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">N° Documento</label>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="w-full relative mr-1 my-1">
                      <input type="text" id="name" value={nombres} disabled className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlFor="name"  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Nombres</label>
                    </div>
                    <div className="relative w-full ml-1 my-1">
                      <input type="text" id="lastname" value={apellidos} disabled className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlFor="lastname"  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Apellidos</label>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="w-full relative mr-1 my-1">
                      <input type="text" autoComplete='off' maxLength="15" id="username" required value={username} onChange={e => setUsername(e.target.value)} className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlFor="username" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Nombre Usuario</label>
                    </div>
                    <div className="relative w-full ml-1 my-1">
                      <input type="text" autoComplete='off' id="cellphone" required value={telefono} onChange={e => setTelefono(e.target.value)} className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlFor="cellphone"  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Número Telefono</label>
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
                      shpss ? <button type="button" className="block px-2.5 pb-2 w-20 text-center justify-center items-center flex-col pt-3 text-sm text-gray-900 bg-transparent rounded-r-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onClick={mostrarContrasena}><FaRegEye/></button>
                      : <button type="button" className="block px-2.5 pb-2 w-20 text-center justify-center items-center flex-col pt-3 text-sm text-gray-900 bg-transparent rounded-r-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onClick={mostrarContrasena}><FaRegEyeSlash/></button>
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
                      shpssTwo ? <button type="button" className="block px-2.5 pb-2 w-20 text-center justify-center items-center flex-col pt-3 text-sm text-gray-900 bg-transparent rounded-r-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onClick={mostrarContrasenaTwo}><FaRegEye/></button>
                      : <button type="button" className="block px-2.5 pb-2 w-20 text-center justify-center items-center flex-col pt-3 text-sm text-gray-900 bg-transparent rounded-r-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onClick={mostrarContrasenaTwo}><FaRegEyeSlash/></button>
                    }
                  </div>
                  <div className="w-full">
                    <PwdRequisite password={passwordNew} />
                  </div>
                  <div className="pt-4 flex items-center justify-end border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 text-sm outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cerrar
                    </button>
                    <Button type="submit" onMouseEnter={()=>setButton(false)} onMouseLeave={()=>setButton(true)} outline={button} gradientDuoTone="greenToBlue">
                      Actualizar información
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {showMenu ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <Modal.Dialog id="viewDialog">
              <Modal.Header  >
                <Modal.Title>Actualizar información</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>¿Estas seguro que quieres <br/>actualizar tu información?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button type="button" onClick={() => setShowMenu(false)} onMouseEnter={()=>setBtn(false)} onMouseLeave={()=>setBtn(true)} onMouseDown={()=>setBtn(true)} outline={btn} gradientDuoTone="pinkToOrange">Cancelar</Button>
                <Button type="submit" onClick={actualizarInfo} onMouseEnter={()=>setBtnTwo(false)} onMouseLeave={()=>setBtnTwo(true)} outline={btnTwo} gradientDuoTone="greenToBlue">Confirmar</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}