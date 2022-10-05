import React, { useRef, useEffect, useState } from 'react'
import NavBarEPSA from '../../../../Layout/NavBar/NavBarEPSA'
import { BiCheckCircle, BiXCircle } from 'react-icons/bi'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router'

export function ListadoHistoriaClinica() {
    const [info, setInfo] = useState([])
    const [history, setHistory] = useState([])

    const lista = useRef()
    const texto = useRef()

    const { identidad } = useParams()

    const estadoAct = useRef()

    const traerinfo = () => {
        axios.post('https://api.cruzpet.com:8443/v1.0/historias_clinicas/historiasmascotas', {
            numeroIdentidad: identidad
        }).then((response) => {
            console.log(response)
            console.log(response.data)

            if (response.data.length > 0) {
                setHistory(response.data)
            } else {
                // warnHistory()
            }

        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        traerinfo()
    }, [])

    const cambioEstado = (prop) => {
        let informacion = prop.target.value.split(",")
        console.log(informacion[0])
        axios.put("https://api.cruzpet.com:8443/v1.0/formulas/actualizarestado", {
            idFormula: informacion[1],
            estado: informacion[0]
        }).then((response) => {
            console.log(response)
        })
        //setEstado(prop.target.value)
    }


    return (
        <div>
            <NavBarEPSA />

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

            <div className="ml-20 md:container 2xl:mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="flex flex-col md:flex-row mb-1 sm:mb-0 justify-between w-full">
                        <h2 className="text-2xl leading-tight">
                            Historial clínico
                        </h2>
                        <div className="text-end">
                            <form className="flex flex-col md:flex-row w-full md:w-full max-w-2xl md:space-x-3 space-y-3 md:space-y-0 justify-center">
                                <div className="flex gap-2 relative">
                                    <input type="text" ref={texto} className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="Busqueda..." />
                                    <NavLink to={'/Historia/Clinica'}>
                                        <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-dark-purple rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-blue-200" type="submit">
                                            Historia Cliente
                                        </button>
                                    </NavLink>
                                </div>
                            </form>

                        </div>
                    </div>
                    {history.map(history => (
                        <div className="containter m-4 mx-auto px-20">
                            <div className="bg-white p-8 rounded-lg shadow-lg relative hover:shadow-2xl transition duration-500 my-2">
                                <h1 className="text-2xl text-gray-800 font-semibold mb-3">{history.motivoConsulta}</h1>
                                <p className=''>Fecha: {history.fecha.split('T')[0]}</p>
                                <p className=''>Hora: {history.hora}</p>
                                <p className=''>Peso: {history.peso} Kg</p>
                                <p className=''>Pulso: {history.pulso} Ppm</p>
                                <p className="text-gray-600 leading-6 tracking-normal">Descripción: {history.conclucion}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
