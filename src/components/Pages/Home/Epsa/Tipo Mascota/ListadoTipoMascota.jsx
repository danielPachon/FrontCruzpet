import React, { useRef, useEffect, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import axios from 'axios'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'
import NavBarEPSA from '../../../../Layout/NavBar/NavBarEPSA'

export const ListadoTipoMascota = () => {

    const [tiposMascota, setTiposMascota] = useState([])
    const [pagina, setPagina] = useState("")
  
    const navigate = useNavigate()
  
    const lista = useRef()
    const texto = useRef()
  
    const traerTiposMascotas = () => {
      axios.get(`https://api.cruzpet.com:8443/v1.0/tipos_mascotas/tipomascotapaginador?size=6&page=${pagina}`).then((response) => {
        setTiposMascota(response.data.content)
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
      navigate("/TiposMascota/Editar/" + prop)
    }
  
    const eliminar = (prop) => {
 
        axios.delete("https://api.cruzpet.com:8443/v1.0/tipos_mascotas/eliminar/" + prop).then(() => {
            traerTiposMascotas()
        })

    }
  
    useEffect(() => {
        traerTiposMascotas()
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
                Tipos Mascota
              </h2>
              <div className="text-end">
                <form className="flex flex-col md:flex-row w-full md:w-full max-w-2xl md:space-x-3 space-y-3 md:space-y-0 justify-center">
                  <NavLink to={'//TiposMascota/Crear/'}>
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
                        Tipo Mascota
                      </th>
                      <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      </th>
                      <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      </th>
                    </tr>
                  </thead>
                  {tiposMascota.map((response) =>
                    <tbody>
                      <tr>
                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {response.tipoMascota}
                              </p>
                            </div>
                          </div>
                        </td>
  
                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                          <a onClick={() => actualizar(response.idTipoMascota)} className="text-dark-purple hover:text-blue-900">
                            Editar
                          </a>
                        </td>
                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                          <a onClick={() => eliminar(response.idTipoMascota)} className="text-dark-purple hover:text-blue-900">
                            Eliminar
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

}