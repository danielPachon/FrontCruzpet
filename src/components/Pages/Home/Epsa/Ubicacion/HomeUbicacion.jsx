import React from 'react'
import NavBarEPSA from '../../../../Layout/NavBar/NavBarEPSA'
import { NavLink } from 'react-router-dom'

export const HomeUbicacion = () => {
  return (
    <body className=''>
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

      <div className='ml-20 lg:ml-24 2xl:ml-10 mt-3 h-[830px]'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mr-2 gap-3'>
          <div className="overflow-hidden shadow-lg rounded-lg h-100 w-60 sm:w-60 md:w-70 lg:w-80 xl:w-80cursor-pointer m-auto ">
            <NavLink to={'/Barrios'} className="w-full block h-full">
              <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1655903191/Imagenes/wrpkhgh5hist9lh3yod6_wyoasz.webp" className="max-h-40 w-full object-cover" />
              <div className="bg-white dark:bg-gray-800 w-full p-4">
                <h5 className="text-black text-md font-medium">
                  Barrios
                </h5>
              </div>
            </NavLink>
          </div>

          <div className="overflow-hidden shadow-lg rounded-lg h-100 w-60 sm:w-60 md:w-70 lg:w-80 xl:w-80cursor-pointer m-auto ">
            <NavLink to={'/Ciudades'} className="w-full block h-full">
              <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1655903191/Imagenes/ozwpelqrqf16xuy6wsbf_obrthj.jpg" className="max-h-40 w-full object-cover" />
              <div className="bg-white dark:bg-gray-800 w-full p-4">
                <h5 className="text-black text-md font-medium">
                  Ciudades
                </h5>
              </div>
            </NavLink>
          </div>

          <div className="overflow-hidden shadow-lg rounded-lg h-100 w-60 sm:w-60 md:w-70 lg:w-80 xl:w-80cursor-pointer m-auto ">
            <NavLink to={'/Departamentos'} className="w-full block h-full">
              <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1655903188/Imagenes/hmoenf90ft6y7ixvfwlu_ogtujt.jpg" className="max-h-40 w-full object-cover" />
              <div className="bg-white dark:bg-gray-800 w-full p-4">
                <h5 className="text-black text-md font-medium">
                  Departamentos
                </h5>
              </div>
            </NavLink>
          </div>

          <div className="overflow-hidden shadow-lg rounded-lg h-100 w-60 sm:w-60 md:w-70 lg:w-80 xl:w-80cursor-pointer m-auto ">
            <NavLink to={'/Direcciones'} className="w-full block h-full">
              <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1655903191/Imagenes/pvwhj5x3j9lv5l1745ec_ttnmxf.jpg" className="max-h-40 w-full object-cover" />
              <div className="bg-white dark:bg-gray-800 w-full p-4">
                <h5 className="text-black text-md font-medium">
                  Direcciones
                </h5>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </body>
  )
}