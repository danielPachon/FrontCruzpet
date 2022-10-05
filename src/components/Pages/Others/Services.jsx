import React, {useEffect, useState}from 'react'
import Header from '../../Layout/Header'
import { Footer } from '../../Layout/Footer'
import { MetodosPgo } from '../../UI/MetodosPgo'
import axios from 'axios'
import { BiCheckCircle, BiXCircle } from 'react-icons/bi'
import { useNavigate } from 'react-router'

export function Services() {
  const [plan, setPlan] = useState([])

  useEffect(()=>{
    getPlanes()
  },[])

  const getPlanes =() =>{
    axios({
      method: 'get',
      url: 'https://api.cruzpet.com:8443/v1.0/planes/',
    })
      .then(function (response) {
        setPlan(response.data.map(items => items))
      });
  }

  return (
    <div>
      <Header/>      
      <section className='py-3 pt-0'>
        <div className='grid justify-center gap-3 my-4 sm:flex sm:mx-3'>
          {plan.map((item, index) => (
            <div key={item.idPlan} className="shadow-lg rounded-2xl w-64 lg:w-[30%] xl:w-[27%] 2xl:w-[22%] bg-white dark:bg-gray-800 p-4 text-black lg:w-74">
              <p className="text-black dark:text-gray-50 text-xl font-medium mb-4">
                  {item.tituloPlan}
              </p>
              <p className="text-black dark:text-white text-3xl font-bold">
                  {'$'+item.precio}
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
                    <div className='flex text-center items-center w-8 h-8'>{ite.estado.includes('a') ? <BiCheckCircle className='text-green-400 text-2xl'/> : <BiXCircle className='text-red-500 text-2xl'/>}</div>
                    {/* {icono} */}
                    <p>{ite.nombreBeneficio}</p>
                  </li>
                )}
              </ul>
              <MetodosPgo precio={item.precio+'00'}/>
            </div>
          ))}
        </div>

        <div id='pagos'className='grid grid-cols-2 justify-center justify-items-center gap-3 md:grid-cols-3 xl:grid-cols-3 xl:px-20 2xl:grid-cols-3 2xl:px-64'>
            <div className="overflow-hidden shadow-lg rounded-lg h-100 w-40 sm:w-60 md:w-70 lg:w-80 xl:w-80cursor-pointer m-auto ">
                {/* <a href="#" className="w-full block h-full"> */}
                    <img alt="blog photo" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1656629333/Imagenes/Guarderia_tntwev.jpg" className="max-h-40 w-full object-cover"/>
                    <div className="bg-white dark:bg-gray-800 w-full p-4">
                        <h5 className="text-black text-md font-medium">
                            Guarderia
                        </h5>
                    </div>
                {/* </a> */}
            </div>
            <div className="overflow-hidden shadow-lg rounded-lg h-100 w-40 sm:w-60 md:w-70 lg:w-80 xl:w-80cursor-pointer m-auto ">
                {/* <a href="#" className="w-full block h-full"> */}
                    <img alt="blog photo" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1656629333/Imagenes/Paseador_de_perros_lvil0t.jpg" className="max-h-40 w-full object-cover"/>
                    <div className="bg-white dark:bg-gray-800 w-full p-4">
                        <h5 className="text-black text-md font-medium">
                            Paseador
                        </h5>
                    </div>
                {/* </a> */}
            </div>
            <div className="overflow-hidden shadow-lg rounded-lg h-100 w-40 sm:w-60 md:w-70 lg:w-80 xl:w-80cursor-pointer m-auto ">
                {/* <a href="#" className="w-full block h-full"> */}
                    <img alt="blog photo" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1656629333/Imagenes/spaMascota_tizog1.jpg" className="max-h-40 w-full object-cover"/>
                    <div className="bg-white dark:bg-gray-800 w-full p-4">
                        <h5 className="text-black text-md font-medium">
                            Spa Canino
                        </h5>
                    </div>
                {/* </a> */}
            </div>
            <div className="overflow-hidden shadow-lg rounded-lg h-100 w-40 sm:w-60 md:w-70 lg:w-80 xl:w-80cursor-pointer m-auto ">
                {/* <a href="#" className="w-full block h-full"> */}
                    <img alt="blog photo" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1656629333/Imagenes/entrenador_wye5cz.jpg" className="max-h-40 w-full object-cover"/>
                    <div className="bg-white dark:bg-gray-800 w-full p-4">
                        <h5 className="text-black text-md font-medium">
                            Entrenador
                        </h5>
                    </div>
                {/* </a> */}
            </div>
            <div className="overflow-hidden shadow-lg rounded-lg h-100 w-40 sm:w-60 md:w-70 lg:w-80 xl:w-80cursor-pointer m-auto ">
                {/* <a href="#" className="w-full block h-full"> */}
                    <img alt="blog photo" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1656629333/Imagenes/virtual_miybsv.jpg" className="max-h-40 w-full object-cover"/>
                    <div className="bg-white dark:bg-gray-800 w-full p-4">
                        <h5 className="text-black text-md font-medium">
                            Entrenador Virtual
                        </h5>
                    </div>
                {/* </a> */}
            </div>
            <div className="overflow-hidden shadow-lg rounded-lg h-100 w-40 sm:w-60 md:w-70 lg:w-80 xl:w-80cursor-pointer m-auto ">
                {/* <a href="#" className="w-full block h-full"> */}
                    <img alt="blog photo" src="https://res.cloudinary.com/dadzakyw1/image/upload/v1656629333/Imagenes/photoBestFriendPlan_ussrn1.jpg" className="max-h-40 w-full object-cover"/>
                    <div className="bg-white dark:bg-gray-800 w-full p-4">
                        <h5 className="text-black text-md font-medium">
                            Servicios Funebres
                        </h5>
                    </div>
                {/* </a> */}
            </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}
