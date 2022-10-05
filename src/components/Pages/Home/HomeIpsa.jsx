import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import CardLineChart from "../../UI/CardLineChart";
import CardBarChart from "../../UI/CardBarChart";
import Navbar from '../../Layout/NavBar/NavBar'

export function HomeIpsa() {

  localStorage.setItem("color", 0)

  return (
    <div>
      <Navbar/>
      
      <div className='ml-20 pt-3'>
        <div className='grid grid-cols-1 lg:grid-cols-2 mx-3 gap-2'>
          <div className="w-70 lg:w-50 xl:w-50 xl:mb-0">
            <CardLineChart />
          </div>
          <div className="w-70 lg:w-50 hidden md:block xl:w-50 xl:mb-0">
            <CardBarChart />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 my-2 mx-5'>
        <div className="overflow-hidden shadow-lg rounded-lg h-100 w-grid-cols-1 sm:w-60 md:w-70 lg:w-80 xl:w-80 cursor-pointer m-auto ">
          <NavLink to={'/Admin/Ipsa/Vaccination'} className="w-full block h-full">
            <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1655903189/Imagenes/x28bdrykuujvkltaeoxr_botvh3.jpg" className="max-h-40 w-full object-cover" />
            <div className="bg-white dark:bg-gray-800 w-full p-4">
              <h5 className="text-black text-md font-medium">
                Carnet de vacunacion
              </h5>
            </div>
          </NavLink>
        </div>

        {/* <div className="overflow-hidden shadow-lg rounded-lg h-100 w-grid-cols-1 sm:w-60 md:w-70 lg:w-80 xl:w-80 cursor-pointer m-auto ">
          <a href="#" className="w-full block h-full">
            <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1656085255/Imagenes/como-se-liquida-la-nomina_qltzj1.png" className="max-h-40 w-full object-cover" />
            <div className="bg-white dark:bg-gray-800 w-full p-4">
              <h5 className="text-black text-md font-medium">
                Emitir Recibos
              </h5>
            </div>
          </a>
        </div> */}

        <div className="overflow-hidden shadow-lg rounded-lg h-100 w-grid-cols-1 sm:w-60 md:w-70 lg:w-80 xl:w-80 cursor-pointer m-auto ">
          <NavLink to={'/Admin/Ipsa/Register/Pet'} className="w-full block h-full">
            <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1656085133/Imagenes/REGISTRO-ONLINE_m261ki.png" className="max-h-40 w-full object-cover" />
            <div className="bg-white dark:bg-gray-800 w-full p-4">
              <h5 className="text-black text-md font-medium">
                Registro Mascotas
              </h5>
            </div>
          </NavLink>
        </div>

        <div className="overflow-hidden shadow-lg rounded-lg h-100 w-grid-cols-1 sm:w-60 md:w-70 lg:w-80 xl:w-80 cursor-pointer m-auto ">
          <NavLink to={'/Admin/Ipsa/Clinic/History'} className="w-full block h-full">
            <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1656630037/Imagenes/54516803-mascota-icono-de-registros-m%C3%A9dicos-vector-plana-dise%C3%B1o-de-la-sombra-larga-_k2zrpq.webp" className="max-h-40 w-full object-cover" />
            <div className="bg-white dark:bg-gray-800 w-full p-4">
              <h5 className="text-black text-md font-medium">
                Historia Clinica
              </h5>
            </div>
          </NavLink>
        </div>

        <div className="overflow-hidden shadow-lg rounded-lg h-100 w-grid-cols-1 sm:w-60 md:w-70 lg:w-80 xl:w-80 cursor-pointer m-auto ">
          <NavLink to={'/Admin/Ipsa/Register/Clinic/History'} className="w-full block h-full">
            <img alt="" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1656085207/Imagenes/Historia-cli%CC%81nica-AngioSur_izixom.jpg" className="max-h-40 w-full object-cover" />
            <div className="bg-white dark:bg-gray-800 w-full p-4">
              <h5 className="text-black text-md font-medium">
                Registrar Historia Clinica
              </h5>
            </div>
          </NavLink>
        </div>

        <div className="overflow-hidden shadow-lg rounded-lg h-100 w-grid-cols-1 sm:w-60 md:w-70 lg:w-80 xl:w-80 cursor-pointer m-auto ">
          <NavLink to={'/Admin/Ipsa/Register/Formulas'} className="w-full block h-full">
            <img alt="" src="https://web.recorvet.com/wp-content/uploads/2020/08/formula.png" className="max-h-40 w-full object-cover" />
            <div className="bg-white dark:bg-gray-800 w-full p-4">
              <h5 className="text-black text-md font-medium">
                Registrar formulas
              </h5>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  )
}