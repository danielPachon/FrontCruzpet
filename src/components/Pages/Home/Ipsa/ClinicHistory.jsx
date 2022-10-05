import { Fragment, useState, useEffect } from 'react'
import NavBar from '../../../Layout/NavBar/NavBar'
import { useNavigate } from "react-router-dom"
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

export default function ClinicHistory() {

    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(true)
    const [cedulaCliente, setCedulaCliente] = useState("")
    const [statusCliente, setStatusCliente] = useState(false)
    const [mascotas, setMascotas] = useState([])
    const [history, setHistory] = useState([])
    const [estados, setEstados] = useState(0)

    localStorage.setItem("color", 4)
    

    const HomeIpsa = () => {
        localStorage.setItem("color", 0)
        navigate("/Admin/Ipsa/")
    }

    useEffect( () => {
        if (openModal === false && statusCliente === false ) {

            const timer = setTimeout(() => {
                setOpenModal(true)
            }, 500);
            return () => clearTimeout(timer)
        }
    })

    const estadoCero = () => setEstados(0)
    const estadoUno = () => setEstados(1)

    useEffect(() => {
        const mascotas = document.getElementById('contenedorMascotas')
        const historial = document.getElementById('contenedorHistory')

        if (estados === 0) {
            mascotas.classList.add('flex')
            mascotas.classList.remove('hidden')
            historial.classList.add('hidden')
            historial.classList.remove('flex')
        } else if (estados === 1) {
            mascotas.classList.remove('flex')
            mascotas.classList.add('hidden')
            historial.classList.remove('hidden')
            historial.classList.add('flex')
        }

    },[estados])

    const exitenciaCliente = (e) => {
        e.preventDefault()
        infoExistencia()
        axios.post('https://api.cruzpet.com:8443/v1.0/clientes/existenciacedula', {
            cedulaCliente: cedulaCliente
        }).then((response) => {

            if (response.status === 200) {
                axios.post('https://api.cruzpet.com:8443/v1.0/mascotas/mascotausuario', {
                    clienteMascota: {
                        cedulaCliente: cedulaCliente
                    }
                }).then((response) => {
                    if (response.data.length > 0) {
                        setStatusCliente(true)
                        setMascotas(response.data)
                        setOpenModal(false)
                    } else {
                        warnPet()
                        const timer = setTimeout(() => {
                            navigate('/Admin/Ipsa/register/pet')
                        }, 2500);
                        return () => clearTimeout(timer)
                    }
                })

            }

        }).catch((error) => {
            warnCedula()
        })
    }

    const handleHistory = async (e) => {
        e.preventDefault()
        console.log(e.target.value)
        axios.post('https://api.cruzpet.com:8443/v1.0/historias_clinicas/historiasmascotas', {
            numeroIdentidad: e.target.value
        }).then((response) => {
            console.log(response)
            console.log(response.data)

            if (response.data.length > 0) {
                setHistory(response.data)
                estadoUno()
            } else {
                warnHistory()
            }

        }).catch((error) => {
            console.log(error)
        })
    }

    const warnCedula = () => toast.warn('La cédula ingresada no existe.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

    const warnHistory = () => toast.warn('La mascota no presenta historial clínico.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

    const warnPet = () => toast.warn('El usuario no tiene mascotas registradas.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

    const infoExistencia = () => toast.info('Espera un momento...', {
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
            <div className="flex">
                <NavBar />
            </div>

            <div id='contenedorMascotas'>
                <div className="my-2 flex flex-row flex-wrap justify-center w-10/12 sm:w-full md:w-10/12 lg:w-11/12 h-full mx-8">
                    {mascotas.map(mascota =>
                        <div key={mascota.numeroIdentidad} className="bg-white w-full my-2 mx-1 sm:w-1/4 md:w-1/3 lg:w-1/3 md:max-w-screen-sm min-w-0 p-3 border rounded-lg overflow-hidden shadow-lg ">
                            <img className="w-1/2 lg:w-2/5 mx-auto  border shadow-lg rounded-full" src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655206316/CruzPet/FotosUsuarios/%D0%9A%D0%BE%D1%82%D1%8B_d7w8a0.jpg' />
                            <div className="px-6 py-2">
                                <div className="font-bold text-xl mb-2 text-center text-teal-800">{mascota.nombreMascota}</div>
                            </div>
                            <div className="justify-center text-center items-center">
                                <p className='text-base font-medium'>Dueño: {mascota.usuarioMascota.nombres + ' ' + mascota.usuarioMascota.apellidos}</p>
                                <p className='text-base font-medium'>Identidad: {mascota.numeroIdentidad}</p>
                                <p className='text-base font-medium'>Edad mascota: {mascota.edad}</p>
                                <p className='text-base font-medium'>Fecha de nacimiento: {mascota.fechaNacimiento.split('T')[0]}</p>
                                <p className='text-base font-medium'>Género: {mascota.generoMascota.genero === 'F' ? 'Femenino' : 'Masculino'}</p>
                                <p className='text-base font-medium'>Raza: {mascota.razaMascota.nombreRaza}</p>
                                <p className='text-base font-medium'>Tipo mascota: {mascota.tipoMascota.tipoMascota}</p>
                                <p className='text-base font-medium'>Grupo sanguíneo: {mascota.tipoSangreMascota.tipoSangre}</p>
                            </div>
                            <div className="flex justify-center items-center px-6 py-2">
                                <button type="button" value={mascota.numeroIdentidad} onClick={handleHistory} className="bg-white text-teal-800 font-semibold py-1 px-3 border border-gray-500 rounded-lg shadow-md">
                                    Historial clínico
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <div id='contenedorHistory' className="min-h-screen bg-gray-100 flex items-center justify-center ml-20">
                {history.map(history =>(
                    <div className="containter mx-auto px-20">
                        <div className="bg-white p-8 rounded-lg shadow-lg relative hover:shadow-2xl transition duration-500 my-2">
                            <h1 className="text-2xl text-gray-800 font-semibold mb-3">{history.motivoConsulta}</h1>
                            <p className=''>Fecha: {history.fecha.split('T')[0]}</p>
                            <p className=''>Hora: {history.hora}</p>
                            <p className=''>Peso: {history.peso} Kg</p>
                            <p className=''>Pulso: {history.pulso} Ppm</p>
                            <p className="text-gray-600 leading-6 tracking-normal">Descripción: {history.conclucion}</p>
                            <button onClick={estadoCero} className="py-2 px-4 mt-8 bg-indigo-600 text-white rounded-md shadow-xl">Volver</button>
                        </div>
                    </div>
                ))}
            </div>

            <Transition.Root show={openModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpenModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                    </Transition.Child>

                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-stretch md:items-center justify-center min-h-full text-center md:px-2 lg:px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                                enterTo="opacity-100 translate-y-0 md:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            >
                                <Dialog.Panel className="flex text-base text-left transform transition w-full md:max-w-2xl md:px-4 md:my-8 lg:max-w-3xl xl:max-w-xl 2xl:max-w-5xl">
                                    <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                        <div className='flex-col w-full'>
                                            <div className='flex-auto w-full px-8'>
                                                <h4>Ingresa el documento del cliente para consultar las historias clínicas</h4>
                                            </div>
                                            <div className="flex-row px-12 w-full my-6 justify-center items-center text-center">
                                                <div className="relative">
                                                    <input required onChange={e => setCedulaCliente(e.target.value)} type="text" id="documento" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                                    <label htmlFor="documento" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Número de Documento</label>
                                                </div>
                                            </div>
                                            <div className="flex justify-end px-10">
                                                <div className='mx-2'>
                                                    <div className='flex items-center justify-center bg-gradient-to-br from-red-400 to-red-600 hover:bg-gradient-to-tr focus:ring-4 focus:ring-green-200  hover:from-red-600 hover:to-red-400 rounded-lg w-auto'>
                                                        <button type="button" onClick={HomeIpsa} className="relative inline-flex items-center justify-center py-[9px] px-5 my-[0.125rem]  mx-[0.125rem] overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-white hover:bg-gradient-to-tr hover:from-red-600 hover:to-red-400 hover:text-white">
                                                            Cerrar
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='mx-2'>
                                                    <div className='flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-tr focus:ring-4 focus:ring-green-200  hover:from-blue-600 hover:to-green-400 rounded-lg w-auto'>
                                                        <button type="button" onClick={exitenciaCliente} className="relative inline-flex items-center justify-center py-[9px] px-5 my-[0.125rem]  mx-[0.125rem] overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-white hover:bg-gradient-to-tr hover:from-blue-600 hover:to-green-400 hover:text-white">
                                                            Consultar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}
