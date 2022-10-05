import React, { useState, useEffect } from 'react'
import Navbar from '../../../Layout/NavBar/NavBar'
import moment from 'moment'
import Calendar from '../Ipsa/Calendar/Calendar'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

export default function Appointments() {
  const [value, setValue] = useState(moment())
  const [citas, setCitas] = useState([])

  localStorage.setItem("color", 6)

  const getAppot = () => {

    const selectedDate = new Date(value._d)
    const fecha = selectedDate.getFullYear() + '-' + '0' + parseInt(selectedDate.getMonth() + 1) + '-'
    let valFecha = parseInt(0)
    if (selectedDate.getDate() <= 9) {
      valFecha = '0' + selectedDate.getDate()
    } else {
      valFecha = selectedDate.getDate()
    }
    console.log(valFecha)
    axios.post('https://api.cruzpet.com:8443/v1.0/citas/citasfecharut', {
      fecha: fecha + valFecha,
      ipsaPropetaria: {
        rut: localStorage.getItem('rut')
      }
    }).then(response => {
      console.log(response.data)
      if (response.data.length > 0) {
        setCitas(response.data)
      } else {
        infoCitas()
      }
    })
  }

  const enableAppt = (e) => {
    console.log(e.target.value)

    axios.post('https://api.cruzpet.com:8443/v1.0/citas/actualizarestado', {
      idCita: e.target.value,
      estadoCita: "a"
    }).then((response) => {
      console.log(response)
      getAppot()
    })
  }

  const disableAppt = (e) => {
    console.log(e.target.value)
    axios.post('https://api.cruzpet.com:8443/v1.0/citas/actualizarestado', {
      idCita: e.target.value,
      estadoCita: "i"
    }).then((response) => {
      console.log(response)
      getAppot()
    })
  }

  const infoCitas = () => toast.warn('El día seleccionado no presenta citas registradas.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  return (
    <div>
      <ToastContainer
        autoClose={3000}
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex">
        <Navbar />
      </div>
      <div className='flex w-full mt-8 justify-center items-center text-center'>
        <div className='w-3/5'>
          <div className='flex justify-end'>
            <button onClick={getAppot}>Buscar citas</button>
          </div>
          <Calendar value={value} onChange={setValue} />
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Hora
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Usuario
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Mascota
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Tramite
                    </th>
                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {citas.map(usuario => (
                    <tr>
                      <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {usuario.hora}
                        </p>
                      </td>
                      <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <a href="#" className="block relative">
                              <img alt="profil" src={usuario.usuarioCita.imagenCliente} className="mx-auto object-cover rounded-full h-10 w-10 " />
                            </a>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {usuario.usuarioCita.nombres + ' ' + usuario.usuarioCita.apellidos}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {usuario.citaMascota.nombreMascota}
                        </p>
                      </td>
                      <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {usuario.tipoTramite}
                        </p>
                      </td>
                      {usuario.estadoCita === 'a' ?
                        <td className="px-4 py-3 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                            </span>
                            <button value={usuario.idCita} onClick={disableAppt} className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              {usuario.estadoCita === 'a' ? "Activo" : "Inactivo"}
                            </button>
                          </span>
                        </td>
                        :
                        <td className="px-4 py-3 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                            <span aria-hidden="true" className="absolute inset-0 bg-red-200 opacity-50 rounded-full">
                            </span>
                            <button value={usuario.idCita} onClick={enableAppt} className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                              {usuario.estadoCita === 'a' ? "Activo" : "Inactivo"}
                            </button>
                          </span>
                        </td>
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}