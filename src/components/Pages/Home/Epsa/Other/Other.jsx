import React from 'react'
import NavBarEPSA from '../../../../Layout/NavBar/NavBarEPSA'
import { NavLink } from 'react-router-dom'

export function Other() {
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

      <div className='grid grid-cols-3 ml-24'>

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 my-2'>
          <div className="overflow-hidden shadow-lg rounded-lg h-100 w-grid-cols-1 sm:w-60 md:w-70 lg:w-80 xl:w-80 cursor-pointer m-auto ">
            <NavLink to={'/MascotasEpsa'} className="w-full block h-full">
              <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1656630978/Imagenes/mascota_ahets0.jpg" className="max-h-40 w-full object-cover" />
              <div className="bg-white dark:bg-gray-800 w-full p-4">
                <h5 className="text-black text-md font-medium">
                  Mascotas
                </h5>
              </div>
            </NavLink>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 my-2'>
          <div className="overflow-hidden shadow-lg rounded-lg h-100 w-grid-cols-1 sm:w-60 md:w-70 lg:w-80 xl:w-80 cursor-pointer m-auto ">
            <NavLink to={'/TiposMascota/'} className="w-full block h-full">
              <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1656631500/Imagenes/tippet_trzuih.webp" className="max-h-40 w-full object-cover" />
              <div className="bg-white dark:bg-gray-800 w-full p-4">
                <h5 className="text-black text-md font-medium">
                  Tipo Mascotas
                </h5>
              </div>
            </NavLink>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 my-2'>
          <div className="overflow-hidden shadow-lg rounded-lg h-100 w-grid-cols-1 sm:w-60 md:w-70 lg:w-80 xl:w-80 cursor-pointer m-auto ">
            <NavLink to={'/TiposSangre/'} className="w-full block h-full">
              <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1656631673/Imagenes/tipfloot_ivfih4.jpg" className="max-h-40 w-full object-cover" />
              <div className="bg-white dark:bg-gray-800 w-full p-4">
                <h5 className="text-black text-md font-medium">
                  Tipo Sangre
                </h5>
              </div>
            </NavLink>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 my-2'>
          <div className="overflow-hidden shadow-lg rounded-lg h-100 w-grid-cols-1 sm:w-60 md:w-70 lg:w-80 xl:w-80 cursor-pointer m-auto ">
            <NavLink to={'/ListadoBeneficios'} className="w-full block h-full">
              <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1656632113/Imagenes/Beneficios-y-riesgos-del-internet_uy402y.jpg" className="max-h-40 w-full object-cover" />
              <div className="bg-white dark:bg-gray-800 w-full p-4">
                <h5 className="text-black text-md font-medium">
                  Beneficios
                </h5>
              </div>
            </NavLink>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 my-2'>
          <div className="overflow-hidden shadow-lg rounded-lg h-100 w-grid-cols-1 sm:w-60 md:w-70 lg:w-80 xl:w-80 cursor-pointer m-auto ">
            <NavLink to={'/ListadoEspecialidades'} className="w-full block h-full">
              <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1656632170/Imagenes/sadas_rkbihu.jpg" className="max-h-40 w-full object-cover" />
              <div className="bg-white dark:bg-gray-800 w-full p-4">
                <h5 className="text-black text-md font-medium">
                  Especialidades
                </h5>
              </div>
            </NavLink>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 my-2'>
          <div className="overflow-hidden shadow-lg rounded-lg h-100 w-grid-cols-1 sm:w-60 md:w-70 lg:w-80 xl:w-80 cursor-pointer m-auto ">
            <NavLink to={'/CarnetIdentificacion'} className="w-full block h-full">
              <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1656632354/Imagenes/1_3_o1jszr.jpg" className="max-h-40 w-full object-cover" />
              <div className="bg-white dark:bg-gray-800 w-full p-4">
                <h5 className="text-black text-md font-medium">
                  Carnet De Identificacion
                </h5>
              </div>
            </NavLink>
          </div>
        </div>

      </div>
    </div>
  )
}
