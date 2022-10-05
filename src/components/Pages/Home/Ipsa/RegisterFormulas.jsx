import { Fragment, useState, useEffect } from 'react'
import NavBar from '../../../Layout/NavBar/NavBar'
import { useNavigate } from "react-router-dom"
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { XIcon } from '@heroicons/react/outline'

export default function RegisterFormulas() {

    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [cedulaCliente, setCedulaCliente] = useState("")
    const [identidad, setIdentidad] = useState("")
    const [medicamento, setMedicamento] = useState("")
    const [fecha, setFecha] = useState("")
    const [detallesFormula, setDetallesFormula] = useState("")
    const [statusCliente, setStatusCliente] = useState(false)
    const [mascotas, setMascotas] = useState([])
    const [medicamentos, setMedicamentos] = useState([])

    useEffect(() => {
        if (openModal === false && statusCliente === false) {

            const timer = setTimeout(() => {
                setOpenModal(true)
            }, 500);
            return () => clearTimeout(timer)
        }
    })

    useEffect(() => {
        if (statusCliente === true) {
            const timer = setTimeout(() => {
                setShowModal(true)
            }, 500);
            return () => clearTimeout(timer)
        }
    })

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
                        console.log(response.data)
                        setStatusCliente(true)
                        setMascotas(response.data)
                        setOpenModal(false)
                        setShowModal(true)

                        axios.get('https://api.cruzpet.com:8443/v1.0/medicamentos/').then((response) => {
                            setMedicamentos(response.data)
                        })

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

    const createFormula = (e) => {
        e.preventDefault()
        if (medicamento !== '') {
            if (identidad !== '') {
                axios.post('https://api.cruzpet.com:8443/v1.0/formulas/crear', {
                    fecha: fecha,
                    detallesFormulas: detallesFormula,
                    medicamento: [
                        {
                            idMedicamento: medicamento
                        }
                    ],
                    mascotaEntity: {
                        numeroIdentidad: identidad
                    },
                    estado: "a"
                }).then((response) => {
                    successFormula()
                    const timer = setTimeout(() => {
                        navigate('/Admin/Ipsa')
                        window.location.reload()
                    }, 2500);
                    return () => clearTimeout(timer)
                })
            } else {
                warnIdentidad()
            }
        } else {
            warnMedicamento()
        }

    }

    const HomeIpsa = () => {
        localStorage.setItem("color", 0)
        navigate("/Admin/Ipsa/")
    }

    const handlePet = (e) => {
        setIdentidad(e.target.value)
    }

    const handleMedicament = (e) => {
        setMedicamento(e.target.value)
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
    
    const warnIdentidad = () => toast.warn('Por favor selecciona una mascota.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

    const warnMedicamento = () => toast.warn('Por favor selecciona un medicamento.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

    const successFormula = () => toast.success('Se ha registrado una nueva formula para la mascota.', {
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
            <NavBar />
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
                                                <h4>Ingresa el documento del cliente</h4>
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
            <Transition.Root show={showModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setShowModal}>
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

                                    <form onSubmit={createFormula} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        <button
                                            type="button"
                                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                        <div className="flex items-center text-center justify-center px-4 py-3 border-b border-solid border-slate-200 rounded-t">
                                            <h3 className="text-2xl font-semibold">
                                                Registro de formula para la mascota
                                            </h3>
                                        </div>
                                        <div className="w-full px-4 pt-4 py-1 flex">
                                            <div className='w-full mx-1'>
                                                <div className="relative">
                                                    <input required type="date" id="fecha" onChange={e => setFecha(e.target.value)} className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                                    <label htmlFor="fecha" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Fecha</label>
                                                </div>
                                            </div>
                                            <div className='w-full mx-1'>
                                                <div className="relative">
                                                    <input required type="text" id="detallesFormula" onChange={e => setDetallesFormula(e.target.value)} className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                                    <label htmlFor="detallesFormula" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Detalles de la formula</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full px-4 py-1 pb-4 flex">
                                            <div className='w-full mx-1'>
                                                <select id="veterinario" onClick={handleMedicament} onBlur={handleMedicament} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value='' >Medicamento</option>
                                                    {medicamentos.map(mdc => (
                                                        <option key={mdc.idMedicamento} value={mdc.idMedicamento} >{mdc.nombreMedicamento}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='w-full mx-1'>
                                                <select id="veterinario" onClick={handlePet} onBlur={handlePet} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value='' >Mascota</option>
                                                    {mascotas.map(mct => (
                                                        <option key={mct.numeroIdentidad} value={mct.numeroIdentidad} >{mct.nombreMascota}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                            <button
                                                className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => navigate('/Admin/Ipsa')}
                                            >
                                                Cerrar
                                            </button>
                                            <div className='flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-tr focus:ring-4 focus:ring-green-200  hover:from-blue-600 hover:to-green-400 rounded-lg w-auto'>
                                                <button type="submit" className="relative inline-flex items-center justify-center py-[9px] px-5 my-[0.125rem]  mx-[0.125rem] overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-white hover:bg-gradient-to-tr hover:from-blue-600 hover:to-green-400 hover:text-white">
                                                    Registrar formula
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}
