import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import BtnAccept from '../UI/BtnAccept'
import { AuthUser } from '../Helpers/AuthUser/AuthUser'
import { useNavigate } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import ReactDOM from 'react-dom'

export function Promociones() {

  const currentUser = AuthUser()
  const navigate = useNavigate()
  const botones = useRef(new Array())

  const username = localStorage.getItem("username")
  const [carnumber, setCarnumber] = useState('')
  const [producto, setProducto] = useState([])


  axios.post("https://api.cruzpet.com:8443/v1.0/clientes/buscarcliente", {
    username: username,
  }).then(function (resp) {
    setCarnumber(resp.data.compras.idCompra)
  })

  useEffect(() => {
    getProductos()
  }, [])
  const getProductos = () => {
    axios({
      method: 'get',
      url: 'https://api.cruzpet.com:8443/v1.0/productos/',
    }).then(function (response) {
      const limit = 6
      setProducto(response.data.slice(0, limit))
    });
  }

  const spinner = (e) => {

    if (currentUser == false) {

      navigate('/Login')

    } else {

      const Array = [e.target.value]
      const nuevo = Array[0].split(',')
      let i = botones.current[nuevo[1]]
      ReactDOM.render(<ClipLoader color='blue' size={20} />, i)

      axios.put(`https://api.cruzpet.com:8443/v1.0/compras/actualizarcontenido`, {
        idCompra: carnumber,
        comprasProductos: [
          {
            idProducto: nuevo[0]
          }
        ]
      }).then(function (resp) {
        setTimeout(() => {
          ReactDOM.render(<p>Agregar</p>, i)
        }, 2000)
      })
    }

  }

  return (
    <div>
      <section className='flex flex-column my-5' data-aos='fade-up-left'>
        <h2 className='flex justify-center'>¡Más valoradas!</h2>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:mx-4 xl:grid-cols-4 m-3 2xl:grid-cols-6">

          {producto.map((item, index) => (
            <div key={item.idProducto} className=" bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <Link to={"#"}>
                <img className="p-8 rounded" src={item.rutaImagen} alt="product image" />
              </Link>
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 truncate whitespace-nowrap overflow-hidden dark:text-white">{item.nombreProducto}</h5>
                <div className="flex items-center mt-2.5 mb-2">

                  {item.totalCalificacion > 0 ?
                    Array.from({ length: (item.totalCalificacion).toFixed(2) }).map(estrella => (
                      <div>
                        <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                      </div>
                    ))
                    : ""}
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{item.totalCalificacion != 'NaN' ? item.totalCalificacion : "0"}</span>
                </div>
                <div className="flex justify-between items-center gap-3 flex-col">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{"$" + item.precioproducto}</span>
                  <div className='flex items-center justify-center'>
                    <div className='flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-tr focus:ring-4 focus:ring-green-200  hover:from-blue-600 hover:to-green-400 rounded-lg w-auto'>
                      <button className="relative inline-flex items-center justify-center py-[9px] px-5 my-[0.125rem]  mx-[0.125rem] overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-white hover:bg-gradient-to-tr hover:from-blue-600 hover:to-green-400 hover:text-white" value={item.idProducto + "," + index} onClick={spinner} ref={(element) => botones.current[index] = element}>
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-center mt-3'>
          <Link to={"/Productos"}>Ver más...</Link>
        </div>
      </section>
    </div>
  )
}
