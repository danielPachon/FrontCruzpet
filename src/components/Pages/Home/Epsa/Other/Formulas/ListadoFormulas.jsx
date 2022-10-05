import React, { useRef, useEffect, useState } from 'react'
import NavBarEPSA from '../../../../../Layout/NavBar/NavBarEPSA'
import { BiCheckCircle, BiXCircle } from 'react-icons/bi'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router'

export function ListadoFormulas() {
  const [info, setInfo] = useState([])

  const lista = useRef()
  const texto = useRef()

  const {identidad} = useParams()

  const estadoAct = useRef()

  const traerinfo = () => {
    axios.post("https://api.cruzpet.com:8443/v1.0/formulas/traerformulasmascota",{
      mascotaEntity:{
        numeroIdentidad:identidad
      }
    }).then((response) => {
      setInfo(response.data)
    })
  }

  useEffect(() => {
    traerinfo()
  }, [])

  const cambioEstado = (prop) => {
    let informacion = prop.target.value.split(",")
    console.log(informacion[0])
    axios.put("https://api.cruzpet.com:8443/v1.0/formulas/actualizarestado", {
      idFormula: informacion[1],
      estado: informacion[0]
    }).then((response) => {
      console.log(response)
    })
    //setEstado(prop.target.value)
  }


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
              Formulas
            </h2>
            <div className="text-end">
              <form className="flex flex-col md:flex-row w-full md:w-full max-w-2xl md:space-x-3 space-y-3 md:space-y-0 justify-center">
                <div className="flex gap-2 relative">
                  <input type="text" ref={texto} className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="Busqueda..." />
                  <NavLink to={'/ClienteFormulas'}>
                    <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-dark-purple rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-blue-200" type="submit">
                      Formulas Cliente
                    </button>
                  </NavLink>
                </div>
              </form>

            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 md:px-4 sm:px-8 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <div className='grid justify-center gap-3 my-4 sm:flex sm:mx-3'>
                {info.map((item, index) => (
                  <div className="shadow-lg rounded-2xl w-64 p-4 bg-white relative overflow-hidden">
                    <img alt="moto" src="https://i0.wp.com/www.fundacionttm.org/wp-content/uploads/2016/11/Documento-R.png?fit=810%2C810&ssl=1" className="absolute -right-20 -bottom-8 h-40 w-40 mb-4" />
                    <div className="w-4/6">
                      <p className="text-gray-800 text-lg font-medium mb-2">
                        Formula Medica
                      </p>
                      <p className="text-gray-400 text-xs">
                        {item.detallesFormulas}
                      </p>
                      <p className="text-indigo-500 text-xl font-medium">
                        {item.fecha.split('T')[0]}
                      </p>
                      <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                      Estado
                    </label>
                    <fieldset className="flex mt-2.5 gap-3">
                      <div className="flex items-center">
                        <input type="radio" id={"activo" + item.idFormula} value={"a" + "," + item.idFormula} name={"estado" + item.idFormula} ref={estadoAct} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" defaultChecked={item.estado === 'a' ? true : false} onChange={cambioEstado}/> 
                        <label for={"activo" + item.idFormula} className="ml-3 block text-sm font-medium text-gray-700">Activo</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" id={"inactivo" + item.idFormula} value={"i" + "," + item.idFormula} name={"estado" + item.idFormula}  ref={estadoAct} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" defaultChecked={item.estado === 'i' ? true : false} onChange={cambioEstado}/>
                        <label for={"inactivo" + item.idFormula} className="ml-3 block text-sm font-medium text-gray-700">Inactivo</label>
                      </div>
                    </fieldset>
                    </div>
                    </div>
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
