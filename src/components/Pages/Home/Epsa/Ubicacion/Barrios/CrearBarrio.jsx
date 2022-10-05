import axios from "axios"
import { useRef, useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import NavBarEPSA from "../../../../../Layout/NavBar/NavBarEPSA"


export const CrearBarrio = () => {

    const [barrio, setBarrio] = useState("")
    const [departamentos, setDepartamentos] = useState([])
    const [departamento, setDepartamento] = useState("")
    const [ciudad, setCiudad] = useState("")
    const [ciudades, setCiudades] = useState([])

    const nombreBarrioAct = useRef()
    const codigoPostalAct = useRef()
    const departamentoAct = useRef()
    const ciudadAct = useRef()

    const navigate = useNavigate()

    useEffect(() => {
        axios.get("https://api.cruzpet.com:8443/v1.0/departamentos/").then((response) => {
            setDepartamentos(response.data)
        })

        axios.post("https://api.cruzpet.com:8443/v1.0/ciudades/ciudadesdepartamento",{
            departamentoOrigen: {
                idDepartamento: 1
            }
        }).then((response) => {
            setCiudades(response.data)
        })
    },[])

    const actulizarDepartamento = (props) => {
        setDepartamento(props.target.value)
    }

    const actulizarCiudades = (props) => {
        setCiudad(props.target.value)
    }

    const validarCampos = () => {
        let objetoBarrioNuevo = new Object()

        if(departamentoAct.current.value !== ""){
            axios.post("https://api.cruzpet.com:8443/v1.0/departamentos/obtenerdepartamento", {
                nombreDepartamento: departamentoAct.current.value
            }).then((response) => {
                objetoBarrioNuevo.nombreDepartamento = response.data.idDepartamento
                validarCiudad(objetoBarrioNuevo)
            })
        }else{
            console.log("No se selecciono ningun departamento")
        }
    }

    const validarCiudad = (objeto) => {

        if(ciudadAct.current.value !== ""){
            axios.post("https://api.cruzpet.com:8443/v1.0/ciudades/nombreciudaddepartamento",{
                nombreCiudad:ciudadAct.current.value,
                departamentoOrigen: {
                    idDepartamento: objeto.nombreDepartamento
                }
            }).then((response) => {
                objeto.nombreCiudad = response.data.idCiudad
                validarBarrio(objeto)
            })
        }else{
           console.log("No se selecciono ninguna ciudad")
        }

    }

    const validarBarrio  = (objeto) => { 

        if(nombreBarrioAct.current.value !== ""){
            axios.post("https://api.cruzpet.com:8443/v1.0/barrios/mostrarbarriociudad", {
                nombreBarrio:nombreBarrioAct.current.value,
                ciudadOrigen:{
                    idCiudad:objeto.nombreCiudad
                }
            }).then(() => {
                alert("El barrio ya existe en el departamento")
            }).catch(() => {
                objeto.nombreBarrio = nombreBarrioAct.current.value
                validarCodigoPostal(objeto)
            })
        }else{
            console.log("El campo del nombre de barrio esta vacio")
        }
    }

    const validarCodigoPostal = (objeto) => {
        console.log(objeto.nombreBarrio)
        if(codigoPostalAct.current.value !== ""){
            objeto.codigoPostal = codigoPostalAct.current.value
        }else{
            console.log("El campo del codigo postal del barrio esta vacio")
        }

        crear(objeto)
    }

    useEffect(() => {
        axios.post("https://api.cruzpet.com:8443/v1.0/ciudades/ciudadesnombredepartamento",{
            departamentoOrigen: {
                nombreDepartamento: departamento
            }
        }).then((response) => {
            console.log(response)
            setCiudades(response.data)
        })
    },[departamento])

    const crear = (objeto) => {
        console.log(objeto.nombreBarrio)
        axios.post("https://api.cruzpet.com:8443/v1.0/barrios/crear", {
            nombreBarrio:objeto.nombreBarrio,
            codigoPostal:objeto.codigoPostal,
            ciudadOrigen: {
                idCiudad: objeto.nombreCiudad
            },
            administradorCreador: {
                idAdministrador: 1
            }
        }).then(() => {
            navigate("/Barrios")
        }).catch((response) => {
            console.log(response)
        })
    }

    return(
        <>

            <NavBarEPSA/>

            <div className='ml-20'>
            <div className="w-full flex flex-row items-center p-2 justify-between bg-dark-purple shadow-xs ">
                <div className="ml-8 text-lg text-white hidden md:flex">
                </div>
                <span className="w-full md:w-1/3 h-10 cursor-pointer text-sm rounded-full flex">
                <input type="search" name="serch" placeholder="Search" className="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none border-white"/>
                </span>
                
                <div className="flex items-center mr-8 hidden md:flex">  
                </div>
            </div>
            </div>

        <div className="mt-5 ml-24 mr-4 sm:mt-0 border-2 rounded-md">
          <div className="md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div>
                    <h1>Crear Barrio</h1>
                    <hr />
                  </div>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        Nombre Barrio
                      </label>
                      <input type="text" ref={nombreBarrioAct} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                        Codigo Postal
                      </label>
                      <input type="text" ref={codigoPostalAct} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div className="col-span-6 sm:col-span-1">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Departamento
                      </label>
                      <select
                        value={departamento}
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={actulizarDepartamento}
                        ref={departamentoAct}
                      >
                        {
                          departamentos.map((response) =>
                            <option>{response.nombreDepartamento}</option>
                          )
                        }

                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-1">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Ciudad
                      </label>
                      <select
                        value={ciudad}
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={actulizarCiudades}
                        ref={ciudadAct}
                      >
                        {
                          ciudades.map((response) =>
                            response.nombreCiudad === ciudades ? <option select>{response.nombreCiudad}</option> : <option>{response.nombreCiudad}</option>
                          )
                        }

                      </select>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="button" onClick={() => navigate("/Barrios")} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Cancelar
                  </button>
                  <button type="button" onClick={validarCampos} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-dark-purple hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900">
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        </>
    )
} 