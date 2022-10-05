import React, { Fragment, useState, useEffect } from 'react'
import NavBar from '../../../Layout/NavBar/NavBar'
import { useParams } from 'react-router'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { XIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'

export default function RegisterHistory() {

    const { identidad } = useParams()
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(true)
    const [statusCliente, setStatusCliente] = useState(false)
    const [formulas, setFormulas] = useState([])
    const [vacunas, setVacunas] = useState([])
    const [veterinarios, setVeterinarios] = useState([])
    const [formula, setFormula] = useState("")
    const [vacuna, setVacuna] = useState("")
    const [cedulaCliente, setCedulaCliente] = useState("")
    const [description, setDescription] = useState("")
    const [veterinario, setVeterinario] = useState("")
    const [motivoConsulta, setMotivoConsulta] = useState("")
    const [fecha, setFecha] = useState("")
    const [edad, setEdad] = useState("")
    const [hora, setHora] = useState("")
    const [peso, setPeso] = useState("")
    const [pulso, setPulso] = useState("")

    useEffect(() => {
        if (openModal === false && statusCliente === false) {

            const timer = setTimeout(() => {
                setOpenModal(true)
            }, 500);
            return () => clearTimeout(timer)
        }
    })

    useEffect(() => {
        axios.post('https://api.cruzpet.com:8443/v1.0/formulas/traerformulasmascota', {
            mascotaEntity: {
                numeroIdentidad: identidad
            }
        }).then((response) => {
            console.log(response.data)
            setFormulas(response.data)
            setCedulaCliente(response.data[0].mascotaEntity.clienteMascota.cedulaCliente)
            setEdad(response.data[0].mascotaEntity.edad)
        })

        axios.get('https://api.cruzpet.com:8443/v1.0/vacunas/').then((response) => {
            console.log(response.data)
            setVacunas(response.data)
        })
        axios.post('https://api.cruzpet.com:8443/v1.0/veterinarios/filtroipsas', {
            rut: localStorage.getItem('rut')
        }).then((response) => {
            console.log(response.data)
            setVeterinarios(response.data)
        })
    }, [])

    const createHistory = (e) => {
        e.preventDefault()
        if (formula !== '') {
            if (vacuna !== '') {
                if (veterinario !== '') {
                    axios.post('https://api.cruzpet.com:8443/v1.0/historias_clinicas/crear', {
                        edad: edad,
                        fecha: fecha,
                        hora: hora,
                        peso: peso,
                        pulso: pulso,
                        motivoConsulta: motivoConsulta,
                        conclucion: description,
                        ipsaHistoriaClin: {
                            rut: localStorage.getItem('rut')
                        },
                        historiaClinVeterinari: {
                            cedVeterinario: veterinario
                        },
                        historiaClinMascota: {
                            numeroIdentidad: identidad
                        },
                        historiaClinicaCliente: {
                            cedulaCliente: cedulaCliente
                        },
                        formula: [
                            {
                                idFormula: formula
                            }
                        ],
                        vacuna: {
                            idVacuna: vacuna
                        }
                    }).then((response) => {
                        console.log(response);
                        sucessHistory()
                        const timer = setTimeout(() => {
                            navigate('/Admin/Ipsa')
                        }, 2500);
                        return () => clearTimeout(timer)
                    })
                } else {
                    warnVet()
                }

            } else {
                warnVacuna()
            }

        } else {
            if (formulas.length > 0) {
                warnFormula()
            } else {
                infoFormula()
                navigate('/Admin/Ipsa')
            }
        }

    }

    const handleFormula = (e) => {
        setFormula(e.target.value)
    }

    const handleVacuna = (e) => {
        setVacuna(e.target.value)
    }

    const handleVet = (e) => {
        setVeterinario(e.target.value)
    }

    const infoFormula = () => toast.info('La mascota no tiene formulas registradas, por favor registra una.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
    
    const warnVet = () => toast.warn('Por favor selecciona un veterinario.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

    const warnVacuna = () => toast.warn('Por favor selecciona una vacuna.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

    const warnFormula = () => toast.warn('Por favor selecciona una formula.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

    const sucessHistory = () => toast.success('Se ha registrado la historia clínica.', {
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

                                    <form onSubmit={createHistory} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        <button
                                            type="button"
                                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                                            onClick={() => setOpenModal(false)}
                                        >
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                        <div className="flex items-center text-center justify-center px-4 py-3 border-b border-solid border-slate-200 rounded-t">
                                            <h3 className="text-2xl font-semibold">
                                                Registro de historial clínico
                                            </h3>
                                        </div>

                                        <div className="w-full px-4 py-1 pt-4 flex">
                                            <div className='w-full mx-1'>
                                                <div className="relative">
                                                    <input required type="number" id="edad_mascota" value={edad} onChange={e => setEdad(e.target.value)} className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                                    <label htmlFor="edad_mascota" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Edad de la mascota</label>
                                                </div>
                                            </div>
                                            <div className='w-full mx-1'>
                                                <div className="relative">
                                                    <input required type="date" id="fechaClinica" onChange={e => setFecha(e.target.value)} className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                                    <label htmlFor="fechaClinica" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Fecha Historia clínica</label>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="w-full px-4 py-1 flex">
                                            <div className='w-full mx-1'>
                                                <div className="relative">
                                                    <input required type="number" id="peso" onChange={e => setPeso(e.target.value)} className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                                    <label htmlFor="peso" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Peso</label>
                                                </div>
                                            </div>
                                            <div className='w-full mx-1'>
                                                <div className="relative">
                                                    <input required type="number" id="pulso" onChange={e => setPulso(e.target.value)} className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                                    <label htmlFor="pulso" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Pulso</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full px-4 py-1">
                                            <div className="relative">
                                                <input required type="text" id="motivoConsulta" onChange={e => setMotivoConsulta(e.target.value)} className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                                <label htmlFor="motivoConsulta" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Motivo de la consulta</label>
                                            </div>
                                        </div>
                                        <div className="w-full px-4 py-1">
                                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Descripción</label>
                                            <textarea id="message" required onChange={e => setDescription(e.target.value)} rows="4" className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Observaciones..."></textarea>
                                        </div>
                                        <div className="w-full px-4 py-1 flex">
                                            <div className='w-full mx-1'>
                                                <select id="formulas" onClick={handleFormula} onBlur={handleFormula} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value='' >Formulas</option>
                                                    {formulas.map(tipo => (
                                                        <option key={tipo.idFormula} value={tipo.idFormula} >{tipo.detallesFormulas}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='w-full mx-1'>
                                                <select id="vacuna" onClick={handleVacuna} onBlur={handleVacuna} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value='' >Vacunas</option>
                                                    {vacunas.map(vac => (<option key={vac.idVacuna} value={vac.idVacuna}>{vac.vacunasDetalles[0].nombreVacuna}</option>))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="w-full px-4 py-1 pb-4 flex">
                                            <div className='w-full mx-1'>
                                                <select id="veterinario" onClick={handleVet} onBlur={handleVet} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value='' >Veterinario</option>
                                                    {veterinarios.map(vet => (
                                                        <option key={vet.cedVeterinario} value={vet.cedVeterinario} >{vet.nombres + ' ' + vet.apellidos}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='w-full mx-1'>
                                                <div className="relative">
                                                    <input required type="time" id="hora" onChange={e => setHora(e.target.value)} className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                                    <label htmlFor="hora" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Hora</label>
                                                </div>
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
                                                    Registrar mascota
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
