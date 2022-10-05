import React, { useRef, useEffect, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import axios from 'axios'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'
import NavBarEPSA from '../../../../Layout/NavBar/NavBarEPSA'

export const ListadoProductos = () => {

  const [productos, setProductos] = useState([])
  const [creador, setCreador] = useState([])
  const [pagina, setPagina] = useState("")

  const navigate = useNavigate()

  const texto = useRef()

  const traerDepartamentos = () => {
    axios.get(`https://api.cruzpet.com:8443/v1.0/productos/productospaginador?size=6&page=${pagina}`).then((response) => {
      let creadores = []
      response.data.content.forEach((response) => {
        if (response.administradorCreador !== null && response.ipsaEntity !== null) {
          creadores.push("Rut EPSA:" + response.ipsaEntity.rut + "Y Id Admin MD:" + response.administradorCreador.idAdministrador)
        } else if (response.administradorCreador === null && response.ipsaEntity === null) {
          creadores.push("N/A")
        } else if (response.administradorCreador === null) {

          creadores.push("Rut EPSA:" + response.ipsaEntity.rut)

        } else {
          creadores.push("Id Admin:" + response.administradorCreador.idAdministrador)

        }
      })
      setCreador(creadores)
      setProductos(response.data.content)

    })
  }

  const paginar = (numero) => {
    setPagina(numero)
  }

  const paginarDelante = (numero) => {
    console.log(numero)
    setPagina(pagina + numero)
  }

  const paginarAtras = (numero) => {
    if (pagina === 0) {
      setPagina(pagina)
    } else {
      setPagina(pagina - numero)
    }
  }

  const actualizar = (prop) => {
    navigate("/Producto/" + prop)
  }

  useEffect(() => {
    traerDepartamentos()
  }, [pagina])

  return (
    <div>
      <NavBarEPSA />

      <div className='ml-20'>
        <div className="w-full flex flex-row items-center p-2 justify-between bg-dark-purple shadow-xs ">
          <div className="ml-8 text-lg text-white hidden md:flex">
          </div>
          <span className="w-full md:w-1/3 h-10 cursor-pointer text-sm rounded-full flex">
            <input type="search" name="serch" placeholder="Search" className="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none border-white" />
          </span>

          <div className="flex items-center mr-8 hidden md:flex">
          </div>
        </div>
      </div>

      <div className="ml-20 md:container 2xl:mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex flex-col md:flex-row mb-1 sm:mb-0 justify-between w-full">
            <h2 className="text-2xl leading-tight">
              Productos
            </h2>
            <div className="text-end">
              <form className="flex flex-col md:flex-row w-full md:w-full max-w-2xl md:space-x-3 space-y-3 md:space-y-0 justify-center">
                <div className="flex relative">
                  <input type="text" ref={texto} className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="Busqueda..." />
                </div>
                <NavLink to={'/CrearProducto'}>
                  <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-dark-purple rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-blue-200" type="submit">
                    Crear
                  </button>
                </NavLink>
              </form>

            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 md:px-4 sm:px-8 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Nombre Producto
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Precio Producto
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Total Calificacion
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Creador
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Estado
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                    </th>
                  </tr>
                </thead>
                {productos.map((response, index) =>
                  <tbody>
                    <tr>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <a href="#" className="block relative">
                              <img alt="Photo" src={response.rutaImagen} className="mx-auto object-cover rounded-full h-10 w-10 " />
                            </a>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {response.nombreProducto}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {response.precioproducto}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {response.totalCalificacion}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {creador[index]}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {response.estado}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                        <a onClick={() => actualizar(response.idProducto)} className="text-dark-purple hover:text-blue-900">
                          Editar
                        </a>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
              <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                <div className="flex items-center">
                  <button type="button" onClick={() => paginarAtras(1)} className="w-full p-[12px] border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                    <MdKeyboardArrowLeft />
                  </button>
                  <button type="button" onClick={() => paginar(0)} className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 ">
                    1
                  </button>
                  <button type="button" onClick={() => paginar(1)} className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                    2
                  </button>
                  <button type="button" onClick={() => paginar(2)} className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100">
                    3
                  </button>
                  <button type="button" onClick={() => paginar(3)} className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                    4
                  </button>
                  <button type="button" onClick={() => paginarDelante(1)} className="w-full p-[12px] border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100">
                    <MdKeyboardArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}