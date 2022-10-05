import React, { useEffect, useState, useRef, createRef } from 'react'
import ReactDOM from 'react-dom'
import Header from '../../Layout/Header'
import { Footer } from '../../Layout/Footer'
import { Link } from 'react-router-dom'
import Car from './Car'
import { CarouselProducts } from '../../UI/CarouselProducts'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";
import { AuthUser } from '../../Helpers/AuthUser/AuthUser'
import { useNavigate } from 'react-router'
import UserContext from './context/UserContext'
import { color } from '@cloudinary/url-gen/qualifiers/background'

export default function Products() {
  const [producto, setProducto] = useState([])
  const [productoAlt, setProductoAlt] = useState([])
  const username = localStorage.getItem("username")
  const [carnumber, setCarnumber] = useState('')
  const currentUser = AuthUser()
  const [id, setId] = useState(0)
  const [iconoBoton, setIconoBoton] = useState("Agregar")
  const botones = useRef(new Array())
  const [retorno, setRetorno] = useState()
  const navigate = useNavigate()

  axios.post("https://api.cruzpet.com:8443/v1.0/clientes/buscarcliente", {
    username: username,
  }).then(function (resp) {
    console.log(resp.data)
    setCarnumber(resp.data.compras.idCompra)
  })

  const getProductos = () => {
    axios({
      method: 'get',
      url: 'https://api.cruzpet.com:8443/v1.0/productos/',
    })
      .then(function (response) {
        setProducto(response.data)
        setProductoAlt(response.data)
      });
  }

  const mostarId = async (e) => {

    if (currentUser === false) {
      navigate(`/Login`)
    } else {

      const Array = [e.target.value]
      const nuevo = Array[0].split(',')
      let i = botones.current[nuevo[1]]
      ReactDOM.render(<ClipLoader color='blue' size={20} />, i)

      setRetorno(1)

      setIconoBoton(<ClipLoader color='blue' size={20} />)
      await axios.put(`https://api.cruzpet.com:8443/v1.0/compras/actualizarcontenido`, {
        idCompra: carnumber,
        comprasProductos: [
          {
            idProducto: nuevo[0]
          }
        ]
      }).then(function (resp) {
        setId(nuevo[0])
        setTimeout(() => {
          ReactDOM.render(<p>Agregar</p>, i)
        }, 2000)
      })

    }

  }

  async function letras(event) {
    console.log(event.target.value)
    await axios.post('https://api.cruzpet.com:8443/v1.0/productos/productopalabraclave/' + event.target.value, {
    }).then((response) => {
      if (event.target.value === '') {
        setProducto(productoAlt)
      } else {
        setProducto(response.data)
      }
    }).catch((error) => {
    })
  }

  useEffect(() => {
    getProductos()
  }, [])

  const userData = {
    idMandar: id
  }

  return (
    <UserContext.Provider value={userData}>
      <div>
        <Header />
        <CarouselProducts />
        <section className='flex flex-column my-5' data-aos='fade-up-left'>
          <header className="w-full dark:bg-gray-700 items-center h-16 rounded-2xl z-40">
            <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
              <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
                <div className="container relative left-0 z-50 flex w-full  h-full">
                  <div className="relative flex items-center w-full lg:w-2/5 h-full group">
                    <div className="absolute z-50 flex items-center justify-center w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
                      <svg fill="none" className="relative w-5 h-5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">
                        </path>
                      </svg>
                    </div>
                    <svg className="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z">
                      </path>
                    </svg>
                    <input type="text" className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-black" placeholder="Busca un producto" onChange={letras} />
                  </div>
                </div>
                <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
                  <Car />
                </div>
              </div>
            </div>
          </header>

          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:mx-4 xl:grid-cols-4 m-3 2xl:grid-cols-6">
            {producto.map((item, index) => (
              <div key={item.idProducto} className=" bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <Link to={""}>
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
                  <div className="flex justify-center items-center gap-3 2xl:flex-col">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{"$" + item.precioproducto}</span>
                  </div>
                  <div className="flex justify-center my-2">
                    <div className='flex items-center justify-center'>
                      <div className='flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-tr focus:ring-4 focus:ring-green-200  hover:from-blue-600 hover:to-green-400 rounded-lg w-auto'>
                        <button type="button" value={item.idProducto + "," + index} onClick={mostarId} ref={(elemnt) => botones.current[index] = elemnt} className="relative inline-flex items-center justify-center py-[9px] px-5 my-[0.125rem]  mx-[0.125rem] overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-white hover:bg-gradient-to-tr hover:from-blue-600 hover:to-green-400 hover:text-white">
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Footer />
      </div>
    </UserContext.Provider>
  )
}
