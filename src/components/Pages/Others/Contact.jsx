import React, { useState, useEffect } from 'react'
import Header from '../../Layout/Header'
import { Footer } from '../../Layout/Footer'
import emailjs from '@emailjs/browser'
import MapsEpsa from '../../UI/MapsEpsa'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { Button } from 'flowbite-react'

export default function Contact() {

  const [department, setDepartament] = useState([])
  const [city, setCity] = useState([])
  const [button, setButton] = useState(true)

  const getDepart = async () => {
    axios({
      method: 'get',
      url: 'https://api.cruzpet.com:8443/v1.0/departamentos/',
    })
    .then(function (response) {
      setDepartament(response.data)
    })
  }

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

  useEffect(()=>{
    getDepart()
  },[])

  const sendEmail = (event) => {
    event.preventDefault()
    emailjs.sendForm('service_whzfby6', 'template_usv6jlv', event.target, 'xvRDf7DeXShe8Od_F')
    .then(response => response)
    .catch(error => error)
    notifySend()
    event.target.reset()
  }

  const notifySend = () => toast.success('Su mensaje ha sido enviado.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  return (
    <>
    <Header/>
    <body>
      <section className="py-5 px-3 w-full">
      <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        <div className="relative flex flex-col min-w-0 bg-white bg-clip-border border-1 border-solid rounded shadow-sm">
          <div className="flex">
            <div className="block w-100 sm:flex sm:flex-auto md:w-80 pt-2 px-4">
              <div className='w-100 mr-12 sm:mr-0 md:mr-4'>
              <div className="mb-1 pt-6">
                <h3><i className="fa fa-envelope"></i> Contactanos</h3>
              </div>
              <form onSubmit={sendEmail} >
                  <div className="grid md:grid-cols-2 md:gap-2">
                    <div className="w-auto pb-2">
                    <div className="relative">
                      <input type="text" id="form-contact-name" name="contact_name" required className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlFor="form-contact-name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Nombre</label>
                    </div>
                  </div>
                  <div className="w-auto pb-2">
                    <div className="relative">
                      <input type="email" id="form-contact-email" required name="contact_email" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlFor="form-contact-email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Email</label>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-2">
                  <div className="w-auto pb-2">
                    <div className="relative">
                      <input type="number" id="form-contact-phone" name="contact_phone" required className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlFor="form-contact-phone" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Telefono celular</label>
                    </div>
                  </div>
                  <div className="w-auto pb-2 grid md:grid-cols-2 md:gap-2">
                    <select type="text" onClick={getCity} onBlur={getCity} name="contact_department" className="truncate whitespace-nowrap bg-gray-50 border border-gray-300 text-gray-900 mb-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value=''>Departamento</option>
                      {department.map(dptmt => (<option key={dptmt.idDepartamento} value={dptmt.idDepartamento} >{dptmt.nombreDepartamento}</option>))}
                    </select>
                    <select type="text" required name="contact_city" className="bg-gray-50 border border-gray-300 text-gray-900 mb-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option>Ciudad</option>
                      {city.map(city => (<option key={city.idCiudad} value={city.nombreCiudad} >{city.nombreCiudad}</option>))}
                    </select>
                  </div>
                </div>

                <div className="grid">
                  <div className="w-auto">
                    <div className='flex flex-col items-center content-center '>
                      <textarea type="text" required id="form-contact-message" className="form-control md-textarea resize-none" name="contact_message" rows="7" placeholder='Mensaje/Peticion'></textarea>
                      <div className="mt-4">
                        <Button type="submit" onMouseEnter={()=>setButton(false)} onMouseLeave={()=>setButton(true)} outline={button} gradientDuoTone="greenToBlue">
                          Enviar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>                     
              </form>
              </div>
              
              <div className="map hidden md:flex relative w-4/5 h-100 border border-solid m-2">
                <MapsEpsa tamaño={100}/> 
              </div>
            </div>
          </div>

          <div>
            <div className="card-body contact hr-light text-center">
            <hr className="hr-light mb-3 mt-1"/>
              <div className="mb-3">
                <h3>Información de Contacto</h3>
              </div>

              <ul className="sm:grid sm:grid-cols-3">
                <li className='sm:w-full'>
                  <i className="fas fa-map-marker-alt"></i>
                  <p className='p-0 m-0 sm:hidden'>Calarca-Quindio</p>
                  <p className='sm:hidden'>Cra 26 N-32 34</p>
                  <p className='hidden sm:flex justify-center content-center'>Calarca-Quindio,Cra 26 N-32 34</p>
                </li>

                <li className='sm:w-full'>
                  <i className="fa fa-phone"></i>
                  <p>+57 3133620744</p>
                </li>

                <li className='sm:w-full'>
                  <i className="fa fa-envelope"></i>
                  <p>Cruzpet@Cruzpet.com</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </body>

    <div className='sm:absolute 2xl:bottom-0 2xl:left-0 w-100 '>
      <Footer/>
    </div>
    </>
  )
}
