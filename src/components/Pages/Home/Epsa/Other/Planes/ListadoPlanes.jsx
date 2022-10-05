import React, { useRef, useEffect, useState } from 'react'
import NavBarEPSA from '../../../../../Layout/NavBar/NavBarEPSA'
import { BiCheckCircle, BiXCircle } from 'react-icons/bi'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'

export function ListadoPlanes() {
  const [info, setInfo] = useState([])

  const lista = useRef()
  const texto = useRef()

  const navigate = useNavigate()

  const traerinfo = () => {
    axios.get("https://api.cruzpet.com:8443/v1.0/planes/").then((response) => {
      setInfo(response.data)
      console.log(response.data)
    })
  }

  useEffect(() => {
    traerinfo()
  }, [])
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
              Planes
            </h2>
          </div>
          <div className="-mx-4 sm:-mx-8 md:px-4 sm:px-8 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <div className='grid justify-center gap-3 my-4 sm:flex sm:mx-3'>
                {info.map((item, index) => (
                  <div key={item.idPlan} className="shadow-lg rounded-2xl w-64 lg:w-[30%] xl:w-[27%] 2xl:w-[22%] bg-white dark:bg-gray-800 p-4 text-black lg:w-74">
                    <p className="text-black dark:text-gray-50 text-xl font-medium mb-4">
                      {item.tituloPlan}
                    </p>
                    <p className="text-black dark:text-white text-3xl font-bold">
                      {'$' + item.precio}
                      <span className="text-black text-sm">
                        / mensual
                      </span>
                    </p>
                    <p className="text-black dark:text-gray-100  text-xs mt-4">
                      Alquiere tu plan y haz de tu mejor compañero una gran experiencia.
                    </p>
                    <ul className="text-sm text-black dark:text-gray-100 w-full sm:p-0 mt-6 mb-6">
                      {item.beneficiosEntity.map(ite =>
                        <li key={ite.idBeneficio} className="flex items-center ">
                          <div className='flex text-center items-center w-8 h-8'>{ite.estado.includes('a') ? <BiCheckCircle className='text-green-400 text-2xl' /> : <BiXCircle className='text-red-500 text-2xl' />}</div>
                          {/* {icono} */}
                          <p>{ite.nombreBeneficio}</p>
                        </li>
                      )}
                    </ul>

                    <button type='button' onClick={() => navigate("/Planes/" + item.idPlan)} className="flex-shrink-0 w-full px-4 py-2 text-base font-semibold text-white bg-dark-purple rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-blue-200">
                      Actualizar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
