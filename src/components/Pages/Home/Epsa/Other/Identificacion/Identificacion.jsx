import React from 'react'
import NavBarEPSA from '../../../../../Layout/NavBar/NavBarEPSA'
import { useBarcode } from 'react-barcodes'
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useState } from 'react';

export function Identificacion() {

  const {id} = useParams()

  const [identificacion, setIdentificacion] =  useState("") 
  const [fecha, setFecha] = useState("")
  const [numeroIdentificacion, setNumeroIdentificacion] = useState("")
  const [usuarioEncargado, setUsuarioEncargado] = useState("")
  const [nombreMascota, setNombreMascota] = useState("")
  const [tipoSangre, setTipoSangre] = useState("")
  const [genero, setGenero] = useState("")

  useEffect(() => {

    axios.post("https://api.cruzpet.com:8443/v1.0/carnetidentificacion/traercarnetidentificacionid",{
      mascota:{
        numeroIdentidad: id
      }
    }).then((response) => {

      setIdentificacion(response.data)
      setFecha(response.data.mascota.fechaNacimiento.split("T")[0])
      setNumeroIdentificacion(response.data.mascota.numeroIdentidad)
      setUsuarioEncargado(response.data.mascota.clienteMascota.cedulaCliente)
      setNombreMascota(response.data.mascota.nombreMascota)
      setTipoSangre(response.data.tipoSangre.tipoSangre)
      setGenero(response.data.genero.genero)

    })


  },[])

  const { inputRef } = useBarcode({
    value: 'CruzPet - 1538194308',
    options: {
      background: 'transparent',
      height:'90%',
    }
  });
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
              Generar Carnet de Identificacion
            </h2>
          </div>
          <div className="-mx-4 sm:-mx-8 md:px-4 sm:px-8 overflow-x-auto">
            <div className="flex gap-3 min-w-full shadow rounded-lg overflow-hidden">
              <section id='delantero' className='bg-gray-300 boder-2 pt-1 w-max shadow rounded-lg overflow-hidden'>
                <h4 className='text-center text-lg m-0 p-0'>DOCUMENTO DE IDENTIDAD</h4>
                <h4 className='text-center text-lg m-0 p-0'>CEDULA ANIMAL</h4>

                <div className='flex gap-2'>
                  <div className='ml-4 my-3'>
                    <div className='pt-1'>
                      <label className='text-gray-800'>Numero Documento</label>
                      <p className='text-black'>{numeroIdentificacion}</p>
                    </div>
                    <div className='pt-1'>
                      <label className='text-gray-800'>Documento Acudiente</label>
                      <p className='text-black'>{usuarioEncargado}</p>
                    </div>
                    <div className='pt-1'>
                      <label className='text-gray-800'>NOMBRE</label>
                      <p className='text-black'>{nombreMascota}</p>
                    </div>
                    <div className='flex flex-col items-center w-max mx-12 mt-3'>
                      <label>__________________________________</label>
                      <p>Firma Del Acudiente</p>
                    </div>
                  </div>
                  <div className='w-32 h-40 mr-5 mt-4 ml-[-50px]'>
                    <img className='w-full h-40 object-cover' src="https://www.abc.es/xlsemanal/wp-content/uploads/sites/5/2022/04/perros-expresiones-faciales-fingir-caras-humanos2.jpg" />
                  </div>
                </div>

              </section>

              <section id='trasero' className='bg-gray-300 boder-2 flex flex-col w-max shadow rounded-lg overflow-hidden'>
                <div className='flex'>
                  <div className='w-32 h-40 mx-3 mt-3'>
                    <img className='w-full h-40 object-cover' src="https://www.abc.es/xlsemanal/wp-content/uploads/sites/5/2022/04/perros-expresiones-faciales-fingir-caras-humanos2.jpg" />
                  </div>

                  <div className='mt-2 mr-5 ml-0.5'>
                    <div className='pt-1 flex'>
                      <label className='text-gray-800 text-md'>FECHA DE NACIMIENTO</label>
                      <p className='text-black pl-3 text-sm'>{fecha}</p>
                    </div>
                    <div className='pt-1'>
                      <p className='text-black text-sm'>{identificacion.lugarNacimiento}</p>
                      <label className='text-gray-800 text-sm'>LUGAR DE NACIMIENTO</label>
                    </div>

                    <div className='flex items-center justify-center gap-5'>
                      <div className='pt-1 flex flex-col items-center justify-center'>
                        <p className='text-black'>{identificacion.estatura}</p>
                        <label className='text-gray-800 text-sm'>ESTATURA</label>
                      </div>
                      <div className='pt-1 flex flex-col items-center justify-center'>
                        <p className='text-black'>{tipoSangre}</p>
                        <label className='text-gray-800 text-sm'>RH</label>
                      </div>
                      <div className='pt-1 flex flex-col items-center justify-center'>
                        <p className='text-black'>{genero}</p>
                        <label className='text-gray-800 text-sm'>SEXO</label>
                      </div>
                    </div>

                    <div className='pt-1'>
                      <p className='text-black text-sm'>17/07/2022 CALARCAR-QUINDIO</p>
                      <label className='text-gray-800 text-sm'>FECHA Y LUGAR DE EXPEDICION</label>
                    </div>
                  </div>
                </div>

                <div className='flex justify-center '>
                  <svg ref={inputRef} />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
