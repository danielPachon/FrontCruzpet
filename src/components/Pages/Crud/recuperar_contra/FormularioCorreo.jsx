import React, { useRef, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"
import { ToastContainer, toast } from 'react-toastify'

const FormularioCorreo = () =>{
    const campoCorreo = useRef()
    const navigate = useNavigate()
    const [showModal, setShowModal] = React.useState(false)

    const enviarEmail = () => {
      let cadena = "";
      let contenido = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for(let i = 0; i<50; i++){
        cadena += contenido.charAt(Math.floor(Math.random() * contenido.length))
      }

      axios.post('https://api.cruzpet.com:8443/v1.0/clientes/existenciaemail',{
        email: campoCorreo.current.value
      }).then(() => {
        axios.post("https://api.cruzpet.com:8443/v1.0/clientes/buscarclienteemail", {
          email: campoCorreo.current.value
        }).then((responses) => {
          axios.post("https://api.cruzpet.com:8443/v1.0/email/send-html", {
            mailTo: responses.data.email,
            userName: responses.data.username,
            passwordEncript: cadena
          }).then(() => {
            let i = responses.data.email
            localStorage.setItem("email", i)
            localStorage.setItem("url", "http://localhost:3000/encode/" + cadena)
            successEmail()
            const timer = setTimeout(() => {
              window.location.reload()
            }, 3000);
            return () => clearTimeout(timer)
          }).catch(() => {
            errorMsg()
          })
        }).catch(() => {
          errorMsg()
        })
      }).catch(() => {
        warnEmail()
      })
    }

    const successEmail = () => toast.success('Se ha enviado la recuperación de contraseña a tu correo.', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

    const errorMsg = () => toast.error('No pudo realizar la recuperación.', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

    const warnEmail = () => toast.warn('El correo no existe.', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

    return(
      <>
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
      <button type="button" className='mt-2' onClick={() => setShowModal(true)}>Olvidé mi contraseña</button>
        {showModal ? (
          <form className="absolute z-[9999] resize-none bg-white flex items-center justify-center flex-col pt-0 pb-0 px-4 h-full text-center w-full lg:w-80 xl:w-1/2">
            <h1 className="font-bold m-0 text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">Recuperar Contraseña</h1>
            <div className='w-full my-2'>
              <div className="relative">
                <input required type="email" id='email-1' ref={campoCorreo} className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " autoComplete="off"/>
                <label htmlFor='email-1' className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Correo electrónico</label>
              </div>        
            </div>
            <div className="grid grid-colums-1 gap-2">
              <div className='flex items-center justify-center'>
                <div className='flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-tr focus:ring-4 focus:ring-green-200  hover:from-blue-600 hover:to-green-400 rounded-lg w-auto'>
                  <button type="button" onClick={() => enviarEmail()} className="relative inline-flex items-center justify-center py-[9px] px-5 my-[0.125rem]  mx-[0.125rem] overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-white hover:bg-gradient-to-tr hover:from-blue-600 hover:to-green-400 hover:text-white">
                    Enviar
                  </button>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <div className='flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-tr focus:ring-4 focus:ring-green-200  hover:from-blue-600 hover:to-green-400 rounded-lg w-auto'>
                  <button onClick={() => setShowModal(false)} className="relative inline-flex items-center justify-center py-[9px] px-5 my-[0.125rem]  mx-[0.125rem] overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-white hover:bg-gradient-to-tr hover:from-blue-600 hover:to-green-400 hover:text-white">
                    Volver
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : null}
      </>
    )

}

export default FormularioCorreo