import axios from "axios"
import React, { useRef, useEffect } from "react"
import { useNavigate } from "react-router"
import Header from '../../../Layout/Header'
import { Footer } from '../../../Layout/Footer'
import { ToastContainer, toast } from 'react-toastify'

const FormularioCambioContra = () => {
    const campoContra = useRef()
    const navigate = useNavigate()

    useEffect(() => {
       
      if(localStorage.getItem("url") == undefined || localStorage.getItem("url") == null){
        navigate("*")
      }else{
        setTimeout(() => {
            localStorage.clear()
            navigate("*")
        }, 900000)
      }

    }, [])

    const actualizarContra = () => {
        axios.put("https://api.cruzpet.com:8443/v1.0/clientes/actualizarcontrasena", {
            email: localStorage.getItem("email"),
            password: campoContra.current.value
        }).then(() => {
            localStorage.clear()
            successPass()
            const timer = setTimeout(() => {
              navigate('/')
              window.location.reload()
            }, 3000);
            return () => clearTimeout(timer)
        }).catch(() => {
          errorPass()
        })
    }

    const successPass = () => toast.success('Has modificado tu contraseña.', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

    const errorPass = () => toast.success('No se procesó el cambio de contraseña.', {
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
        <Header/>
        <form  className="resize-none bg-white flex items-center justify-center flex-col py-72 px-80 h-full text-center">
            <span className="text-xs sm:text-base">Ingresa tu nueva contraseña</span>
            <div className='w-full my-2'>
            <div className="relative">
            <input type="text" ref={campoContra} className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                autoComplete="off"
                />
            <label htmlFor='text' className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Nueva contraseña</label>
            </div>
            </div>
            <div className='flex items-center justify-center'>
              <div className='flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-tr focus:ring-4 focus:ring-green-200  hover:from-blue-600 hover:to-green-400 rounded-lg w-auto'>
                <button type="button" onClick={() => actualizarContra()} className="relative inline-flex items-center justify-center py-[9px] px-5 my-[0.125rem]  mx-[0.125rem] overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-white hover:bg-gradient-to-tr hover:from-blue-600 hover:to-green-400 hover:text-white">
                  Actualizar
                </button>
              </div>
            </div>
        </form>
        <div className='sm:absolute bottom-0 left-0 w-100 '>
          <Footer/>
        </div>
      </>
    )
}

export default FormularioCambioContra