import React, { useRef, useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import Chat from '../../../UI/Chat'
import { useReactToPrint } from "react-to-print"
import axios from "axios"
import { BsPrinter } from 'react-icons/bs'

export default function VaccinationCard() {

    const { cedula } = useParams()
    const componentRef = useRef();
    const navigate = useNavigate()
    const [mascotas, setMascotas] = useState([])
    const [vacunacion, setVacunacion] = useState([])

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        axios.get('https://api.cruzpet.com:8443/v1.0/mascotas/individual/' + cedula).then((response) => {
            setMascotas(response.data)
            axios.post('https://api.cruzpet.com:8443/v1.0/carnetvacunacion/carnetmascota', {
                mascota: {
                    numeroIdentidad: cedula
                }
            }).then((response) => {
                console.log(response.data)
                setVacunacion(response.data.vacunaAplicadaEntity)
            })
            if (response.data.length == 0) {
                navigate('/Admin/Ipsa/Vaccination/')
            }
        })
    }, [])

    return (
        mascotas != '' ?
            <div>
                <div className="flex w-full justify-start text-start items-start m-4 px-20">
                    <div className="w-full">
                        <button type="button" onClick={() => navigate('/Admin/Ipsa/Vaccination/')}>Volver</button>
                    </div>
                    <div className="w-full justify-center items-center">
                        <button onClick={handlePrint} className="print__button"><BsPrinter /></button>
                    </div>
                </div>
                <div ref={componentRef} className='flex w-full m-2'>
                    <div className='w-3/5'>
                        <div className='mx-4 my-2'>
                            <div className='flex text-end justify-end items-end mx-4'>
                                <h3 className='uppercase text-cyan-500 w-2/5'>Datos de la mascota</h3>
                            </div>
                            <div className="relative my-1.5">
                                <input type="text" id="identidad" value={mascotas.numeroIdentidad} className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="identidad" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Identidad</label>
                            </div>
                            <div className="relative my-1.5">
                                <input type="text" id="nombreMascota" value={mascotas.nombreMascota} className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="nombreMascota" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Nombre</label>
                            </div>
                            <div className="relative my-1.5">
                                <input type="text" id="raza" value={mascotas.razaMascota.nombreRaza} className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="raza" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Raza</label>
                            </div>
                            <div className="relative my-1.5">
                                <input type="date" id="fechaNacimiento" value={mascotas.fechaNacimiento.split("T")[0]} className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="fechaNacimiento" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Fecha de nacimiento</label>
                            </div>
                            <div className="relative my-1.5">
                                <input type="text" id="color" value='' className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="color" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Color</label>
                            </div>
                            <div className="relative my-1.5">
                                <input type="text" id="sexo" value={mascotas.generoMascota.genero === 'F' ? "Femenino" : "Masculino"} className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="sexo" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Sexo</label>
                            </div>
                        </div>
                        <div className='mx-4 my-2'>
                            <div className='bg-cyan-600 text-center rounded-lg'>
                                <h3 className='uppercase text-white'>Identificación propietario</h3>
                            </div>
                            <div className="relative my-1.5">
                                <input type="text" id="nombreCliente" value={mascotas.usuarioMascota.nombres + ' ' + mascotas.usuarioMascota.apellidos} className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="nombreCliente" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Nombre</label>
                            </div>
                            <div className="relative my-1.5">
                                <input type="text" id="telefono" value={mascotas.usuarioMascota.telefono} className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="telefono" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Telefono</label>
                            </div>
                            <div className="relative my-1.5">
                                <input type="text" id="direccion" value="" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="direccion" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Dirección</label>
                            </div>
                            <div className='justify-center text-center mt-24'>
                                <hr className='h-0.5 bg-black'></hr>
                                <p className='text-black font-bold'>Firma responsable</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full m-2'>
                        <div className='w-full'>
                            <div className='flex w-full items-center'>
                                <div className='w-full'>
                                    <div className='h-0.5 bg-black'></div>
                                </div>
                                <div className='w-full px-4'>
                                    <h3>Vacunas</h3>
                                </div>
                            </div>
                            {vacunacion.map(el =>
                                <div className='flex w-full my-2'>
                                    <div className='w-full'>
                                        <div className='w-full'>
                                            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fecha de vacunación</label>
                                            <div className='flex'>
                                                <div className='flex pr-12'>
                                                    <input type="text" value={el.fecha.split('T')[0].split('-')[2]} placeholder='Día' id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-l bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                    <input type="text" value={el.fecha.split('T')[0].split('-')[1]} placeholder='Mes' id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                    <input type="text" value={el.fecha.split('T')[0].split('-')[0]} placeholder='Año' id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-r bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full'>
                                            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fecha de revacunación</label>
                                            <div className='flex'>
                                                <div className='flex pr-12'>
                                                    <input type="text" value={el.fechaRepeticion.split('T')[0].split('-')[2]} placeholder='Día' id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-l bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                    <input type="text" value={el.fechaRepeticion.split('T')[0].split('-')[1]} placeholder='Mes' id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                    <input type="text" value={el.fechaRepeticion.split('T')[0].split('-')[0]} placeholder='Año' id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-r bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full text-center justify-center items-center pr-10 mt-16'>
                                            <hr className='h-0.5 bg-black'></hr>
                                            <p className='text-black font-bold'>Firma</p>
                                        </div>
                                    </div>
                                    <div className='w-full pr-8'>
                                        <textarea id="message" rows="6" className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mensaje...">{el.vacunasEntity.vacunasDetalles.map(vac => <p>{vac.nombreVacuna}</p>)}</textarea>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
            : ""

    )
}
