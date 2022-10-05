import React from 'react'
import NavBarEPSA from '../../Layout/NavBar/NavBarEPSA'
import CardBarChart from '../../UI/CardBarChart'
import CardLineChart from '../../UI/CardLineChart'
import { NavLink } from 'react-router-dom'

export function Admin() {
  return (
    <div>
      <NavBarEPSA />

      <div className='ml-20'>

        <div className="w-full  flex flex-row items-center p-2 justify-between bg-dark-purple shadow-xs ">
          <div className="ml-8 text-lg text-white hidden md:flex">
          </div>
          <span className="w-full md:w-1/3 h-10 cursor-pointer text-sm rounded-full flex">
            <input type="search" name="serch" placeholder="Search" className="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none border-white" />
          </span>

          <div className="flex items-center mr-8 hidden md:flex">
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 m-3 gap-2'>
          <div className="w-70 lg:w-50 xl:w-50 xl:mb-0">
            <CardLineChart />
          </div>
          <div className="w-70 lg:w-50 hidden md:block xl:w-50 xl:mb-0">
            <CardBarChart />
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 my-2'>
          <div className="overflow-hidden shadow-lg rounded-lg h-100 w-grid-cols-1 sm:w-60 md:w-70 lg:w-80 xl:w-80 cursor-pointer m-auto ">
            <a href="#" className="w-full block h-full">
              <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1655903189/Imagenes/x28bdrykuujvkltaeoxr_botvh3.jpg" className="max-h-40 w-full object-cover" />
              <div className="bg-white dark:bg-gray-800 w-full p-4">
                <h5 className="text-black text-md font-medium">
                  Carnet de vacunacion
                </h5>
              </div>
            </a>
          </div>

          <div className="overflow-hidden shadow-lg rounded-lg h-100 w-grid-cols-1 sm:w-60 md:w-70 lg:w-80 xl:w-80 cursor-pointer m-auto ">
            <NavLink to={'/Historia/Clinica'} className="w-full block h-full">
              <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1655903190/Imagenes/pyusoqv6upuxu3ikqpjy_xxngqr.jpg" className="max-h-40 w-full object-cover" />
              <div className="bg-white dark:bg-gray-800 w-full p-4">
                <h5 className="text-black text-md font-medium">
                  Historia Clinica
                </h5>
              </div>
            </NavLink>
          </div>

          <div className="overflow-hidden shadow-lg rounded-lg h-100 w-grid-cols-1 sm:w-60 md:w-70 lg:w-80 xl:w-80 cursor-pointer m-auto ">
            <NavLink to={'/Formulas'} className="w-full block h-full">
              <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1655903188/Imagenes/nilh5f3iib0awzjotf6u_dl2p84.jpg" className="max-h-40 w-full object-cover" />
              <div className="bg-white dark:bg-gray-800 w-full p-4">
                <h5 className="text-black text-md font-medium">
                  Formulas
                </h5>
              </div>
            </NavLink>
          </div>

          <div className="overflow-hidden shadow-lg rounded-lg h-100 w-grid-cols-1 sm:w-60 md:w-70 lg:w-80 xl:w-80 cursor-pointer m-auto ">
            <NavLink to={'/Medicamentos'} className="w-full block h-full">
              <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1655903188/Imagenes/ajwqkc59zalo73d6xz9o_dqckdg.jpg" className="max-h-40 w-full object-cover" />
              <div className="bg-white dark:bg-gray-800 w-full p-4">
                <h5 className="text-black text-md font-medium">
                  Medicamentos
                </h5>
              </div>
            </NavLink>
          </div>

          <div className="overflow-hidden shadow-lg rounded-lg h-100 w-grid-cols-1 sm:w-60 md:w-70 lg:w-80 xl:w-80 cursor-pointer m-auto ">
            <NavLink to={'/Generos'} className="w-full block h-full">
              <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1655903189/Imagenes/dg8llrjeksmkralka7e7_ms3ogi.png" className="max-h-40 w-full object-cover" />
              <div className="bg-white dark:bg-gray-800 w-full p-4">
                <h5 className="text-black text-md font-medium">
                  Generos
                </h5>
              </div>
            </NavLink>
          </div>

          <div className="overflow-hidden shadow-lg rounded-lg h-100 w-grid-cols-1 sm:w-60 md:w-70 lg:w-80 xl:w-80 cursor-pointer m-auto ">
            <NavLink to={'/Planes'} className="w-full block h-full">
              <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1655903188/Imagenes/lp2uakfn0xv7m4pfaqcv_n0hcoj.jpg" className="max-h-40 w-full object-cover" />
              <div className="bg-white dark:bg-gray-800 w-full p-4">
                <h5 className="text-black text-md font-medium">
                  Planes
                </h5>
              </div>
            </NavLink>
          </div>

          <div className="overflow-hidden shadow-lg rounded-lg h-100 w-grid-cols-1 sm:w-60 md:w-70 lg:w-80 xl:w-80 cursor-pointer m-auto ">
            <NavLink to={'/Razas'} className="w-full block h-full">
              <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1655903188/Imagenes/h71ae9e4lrk9bl9vf8dr_qm79pq.jpg" className="max-h-40 w-full object-cover" />
              <div className="bg-white dark:bg-gray-800 w-full p-4">
                <h5 className="text-black text-md font-medium">
                  Razas
                </h5>
              </div>
            </NavLink>
          </div>

          <div className="overflow-hidden shadow-lg rounded-lg h-100 w-grid-cols-1 sm:w-60 md:w-70 lg:w-80 xl:w-80 cursor-pointer m-auto ">
            <NavLink to={'/Servicios/Epsa'} className="w-full block h-full">
              <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1655903188/Imagenes/ixwheudibyxcb8tm9rij_yr8whw.png" className="max-h-40 w-full object-cover" />
              <div className="bg-white dark:bg-gray-800 w-full p-4">
                <h5 className="text-black text-md font-medium">
                  Servicios
                </h5>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}
