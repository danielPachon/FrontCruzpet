import React,{useState, useRef, useEffect} from 'react'
import { useNavigate } from "react-router"
import NavBarEPSA from '../../../../Layout/NavBar/NavBarEPSA'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export function ListadoAdmin() {
  const [admins, setAdmins] = useState([])

  const texto = useRef()

  const navigate = useNavigate()

  const traerAdmis = () => {
    axios.get('https://api.cruzpet.com:8443/v1.0/administradores/').then((response) => {
      setAdmins(response.data)
    })
  }

  const actualizar = (props) => {
    navigate("/Actualizar/Admins/" + props)
  }
  useEffect(() => {
    traerAdmis()
  }, [])

  const buscador = async (event) => {
    if(event.target.value !== ""){
      await axios.post("https://api.cruzpet.com:8443/v1.0/administradores/administradorid", {
        idAdministrador: event.target.value
      }).then((response) => {
        if(response.data !== ""){
          let listadoAdmins = []
          listadoAdmins.push(response.data)
          setAdmins(listadoAdmins)
        }else{
          traerAdmis() 
        }
      }).catch(() => {
        traerAdmis() 
      })
    }else{
      traerAdmis()
    } 
  }

  return (
    <div>
      <NavBarEPSA/>

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

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
            <h2 className="text-2xl leading-tight">
              Admis
            </h2>
            <div className="text-end">
              <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-2xl md:space-x-3 space-y-3 md:space-y-0 justify-center">
                <div className="flex relative">
                  <input type="text" ref={texto} className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="Busqueda..." onChange={buscador} />
                </div>
                <NavLink to={'/Crear/Admins'}>
                  <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-dark-purple rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-blue-200" type="submit">
                    Crear
                  </button>
                </NavLink>
              </form>

            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Nombre
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Email
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Rol
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Estado
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                    </th>
                  </tr>
                </thead>
                {admins.map((response) =>
                  <tbody>
                    <tr>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <a href="#" className="block relative">
                              <img alt="Photo" src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655903473/Logos/jnte2qfqbihga2oifus3_yuzlet.png' className="mx-auto object-cover rounded-full h-10 w-10 " />
                            </a>
                          </div>
                          <div className="ml-3">
                            <a href="" className="text-gray-900 whitespace-no-wrap">
                              {response.nombreAdministrador}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {response.correAdministrador}
                        </p>
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Admin
                        </p>
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {response.estado}
                        </p>
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                        <a onClick={() => actualizar(response.idAdministrador)}  href="#" className="text-dark-purple hover:text-blue-900">
                          Editar
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
