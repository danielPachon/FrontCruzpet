import React, {useState} from 'react'
import NavBarEPSA from '../../../../Layout/NavBar/NavBarEPSA'
import { useNavigate, useParams } from "react-router"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"

export function EmitirRecibo() {
  const [department, setDepartament] = useState([])
  const [city, setCity] = useState([])

  const navigate = useNavigate()

  const getCity = async (e) => {
    e.preventDefault()
    if (e.target.value !== '') {
      const urlCity = await fetch("https://api.cruzpet.com:8443/v1.0/ciudades/ciudadesdepartamento", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          departamentoOrigen: {
            idDepartamento: e.target.value
          }
        }),
      })
      try {
        const data = await urlCity.json()
        if (data.length >= 0) {
          setCity(data)
        }
      } catch (error) {

      }
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

      <div className="mt-5 ml-24 mr-4 sm:mt-0 border-2 rounded-md">
        <div className="md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div>
                  <h1>Crear Factura</h1>
                  <hr />
                </div>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      Tipo de Documento
                    </label>
                    <select type="text" className="truncate whitespace-nowrap bg-gray-50 border border-gray-300 text-gray-900 mb-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value=''>CC</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      Documento Cliente
                    </label>
                    <input type="text" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      Nombres Cliente
                    </label>
                    <input type="text" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                      Apellidos Cliente
                    </label>
                    <input type="text" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                      Correo Electronico
                    </label>
                    <input type="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                      Telefono
                    </label>
                    <input type="tel" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                      Fecha
                    </label>
                    <input type="date" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Departamento
                    </label>
                    <select type="text" onClick={getCity} onBlur={getCity} name="contact_department" className="truncate whitespace-nowrap bg-gray-50 border border-gray-300 text-gray-900 mb-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value=''>Departamento</option>
                      {department.map(dptmt => (<option key={dptmt.idDepartamento} value={dptmt.idDepartamento} >{dptmt.nombreDepartamento}</option>))}
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Ciudad
                    </label>
                    <select type="text" required name="contact_city" className="bg-gray-50 border border-gray-300 text-gray-900 mb-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option>Ciudad</option>
                      {city.map(city => (<option key={city.idCiudad} value={city.nombreCiudad} >{city.nombreCiudad}</option>))}
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                      Direccion
                    </label>
                    <input type="text" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
                <hr />
                <div className="-mx-4 sm:-mx-8 md:px-4 sm:px-8 overflow-x-auto">
                  <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                            Numero Articulo
                          </th>
                          <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                            Descripcion
                          </th>
                          <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                            Precio Unitario
                          </th>
                          <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                            Cantidad
                          </th>
                          <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                            Precio Total
                          </th>
                        </tr>
                      </thead>
                        <tbody>
                          <tr>
                            <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                              <div className="flex items-center">
                                <div className="flex-shrink-0">
                                  <a href="#" className="block relative">
                                    <img alt="Photo" src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655397696/CruzPet/Iconos/dnds2rxqdr4wmh1uqecp.png' className="mx-auto object-cover rounded-full h-10 w-10 " />
                                  </a>
                                </div>
                                <div className="ml-3">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    Carnet de Identificacion
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                              Carnet de Identificacion
                              </p>
                            </td>
                            <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                20.000
                              </p>
                            </td>
                            <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                              <input type="number" name="" id="" min="1" max="50" placeholder='1'/>
                              </p>
                            </td>
                            <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                              20.000
                            </td>
                          </tr>
                        </tbody>
                    </table>
                    <p>Precio total</p>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="submit" onClick={() => navigate("/UsuariosEpsa")} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Cancelar
                </button>
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-dark-purple hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900">
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
