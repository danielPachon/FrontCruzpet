import axios from "axios"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import NavBarEPSA from '../../../../Layout/NavBar/NavBarEPSA'

export const ActualizarVeterinarios = () =>{
    
    const[direccion, setDireccion] = useState("")
    const[estado, setEstado] =  useState("")
    const[barrio, setBarrio] = useState("")
    const[ciudad, setCiudad] = useState([])
    const[ciudades, setCiudades] = useState("")
    const[veterinario, setVeterinario] = useState([])
    const[departamentos, setDepartamentos] = useState("")
    const[listaDepartamentos, setListaDepartamentos] = useState([])
    const[nombreRuta, setNombreRuta] = useState("")
    const[nombreEspecialidad, setNombreEspecialidad] = useState("")
    const[fecha, setFecha] = useState("")
    const [ipsas, setIpsas] = useState("")
    const [listaIpsas, setListaIpsas] = useState([])
    const [especialidades, setEspecialidades] = useState("")
    const [listaEspecialidades, setListaEspecialidad] = useState([])

    const {cedula} = useParams()

    const cedulaVeterinarioNuevo = useRef()
    const nombresNuevo = useRef()
    const estadoNuevo = useRef()
    const apellidosNuevo = useRef()
    const fechaNacimientoNuevo = useRef()
    const celularNuevo = useRef()
    const nombreIpsaNuevo = useRef()
    const direccionCasaNuevo = useRef()
    const nombreBarrioNuevo = useRef()
    const nombreCiudadNuevo = useRef()
    const nombreDepartamentoNuevo = useRef()
    const especialidadNuevo = useRef()
  

    const navigate = useNavigate()

    const validarCampos = () => {

        let objetoClienteNuevo = new Object()

        if(cedulaVeterinarioNuevo.current.value != ""){
            axios.post("https://api.cruzpet.com:8443/v1.0/veterinarios/veterinariocedula", {
                cedVeterinario: cedulaVeterinarioNuevo.current.value
            }).then(() => {
                alert("error")
            }).catch(() => {
                objetoClienteNuevo.cedula = cedulaVeterinarioNuevo.current.value
            })
        }else{
            objetoClienteNuevo.cedula = cedulaVeterinarioNuevo.current.placeholder
        }

        if(nombresNuevo.current.value != ""){
            objetoClienteNuevo.nombres = nombresNuevo.current.value
        }else{
            objetoClienteNuevo.nombres = nombresNuevo.current.placeholder
        }

        if(apellidosNuevo.current.value != ""){
            objetoClienteNuevo.apellidos = apellidosNuevo.current.value
        }else{
            objetoClienteNuevo.apellidos = apellidosNuevo.current.placeholder
        }

        if(fechaNacimientoNuevo.current.value != ""){
            objetoClienteNuevo.fechaNacimiento = fechaNacimientoNuevo.current.value
        }else{
            objetoClienteNuevo.fechaNacimiento = fechaNacimientoNuevo.current.placeholder
        }

        if(celularNuevo.current.value != ""){
            objetoClienteNuevo.celular = celularNuevo.current.value
        }else{
            objetoClienteNuevo.celular = celularNuevo.current.placeholder
        }

        console.log(ipsas)
        axios.post("https://api.cruzpet.com:8443/v1.0/ipsas/traeripsanombre", {
          nombre: ipsas
        }).then((response) => {
          console.log(response.data.rut)
          objetoClienteNuevo.ipsa = response.data.rut
        })

        axios.post("https://api.cruzpet.com:8443/v1.0/especialidades/nombreespecialidad", {
          nombreEspecialidad: especialidades
        }).then((response) => {
          objetoClienteNuevo.especialidad = response.data.idEspecialidad
        }).catch(() => {
          alert("No existe la especialidad")
        })

        axios.post("https://api.cruzpet.com:8443/v1.0/departamentos/obtenerdepartamento", {
          nombreDepartamento: departamentos
        }).then((response) => {
          objetoClienteNuevo.nombreDepartamento = response.data.idDepartamento
          validarCiudad(objetoClienteNuevo)
        }).catch((response) => {
          console.log(response)
        })

    }

    const actualizarIpsa = (props) => {
      setIpsas(props.target.value)
    }
  
    const actualizarEspecialidad = (props) => {
      setEspecialidades(props.target.value)
    }

    const validarCiudad = (objeto) => {

        if(nombreCiudadNuevo.current.value != ""){
            axios.post("https://api.cruzpet.com:8443/v1.0/ciudades/nombreciudaddepartamento",{
                nombreCiudad:nombreCiudadNuevo.current.value,
                departamentoOrigen: {
                    idDepartamento: objeto.nombreDepartamento
                }
            }).then((response) => {
                objeto.nombreCiudad = response.data.idCiudad
                console.log(objeto.nombreCiudad)
                validarBarrio(objeto)
            })
        }else{
            axios.post("https://api.cruzpet.com:8443/v1.0/ciudades/nombreciudaddepartamento",{
                nombreCiudad:nombreCiudadNuevo.current.placeholder,
                departamentoOrigen: {
                    idDepartamento: objeto.nombreDepartamento
                }
            }).then((response) => {
                objeto.nombreCiudad = response.data.idCiudad
                validarBarrio(objeto)
            })
        }

    } 

    const validarBarrio  = (objeto) => { 

        console.log(objeto.nombreCiudad)
        console.log(nombreBarrioNuevo.current.value)
        if(nombreBarrioNuevo.current.value != ""){
            axios.post("https://api.cruzpet.com:8443/v1.0/barrios/mostrarbarriociudad", {
                nombreBarrio:nombreBarrioNuevo.current.value,
                ciudadOrigen:{
                    idCiudad:objeto.nombreCiudad
                }
            }).then((response) => {
                console.log(response)
                objeto.nombreBarrio = response.data.idBarrio
                valBarrio(objeto)
            }).catch(() => {
                axios.post("https://api.cruzpet.com:8443/v1.0/barrios/crear", {
                    nombreBarrio:nombreBarrioNuevo.current.value,
                    codigoPostal:342,
                    ciudadOrigen:{
                        idCiudad:objeto.nombreCiudad
                    },
                    administradorCreador: {
                        idAdministrador:4
                    }
                }).then((respon) => {
                    console.log(respon)
                    objeto.nombreBarrio = respon.data.idBarrio
                    valBarrio(objeto)
                })
            })
        }else{
            console.log("Entra")
            console.log(nombreBarrioNuevo.current.placeholder)
            axios.post("https://api.cruzpet.com:8443/v1.0/barrios/mostrarbarriociudad", {
                nombreBarrio:nombreBarrioNuevo.current.placeholder,
                ciudadOrigen:{
                    idCiudad:objeto.nombreCiudad
                }
            }).then((response) => {
                console.log(response)
                objeto.nombreBarrio = response.data.idBarrio
                valBarrio(objeto)
            }).catch(() => {
                axios.post("https://api.cruzpet.com:8443/v1.0/barrios/crear", {
                    nombreBarrio:nombreBarrioNuevo.current.placeholder,
                    codigoPostal:342,
                    ciudadOrigen:{
                        idCiudad:objeto.nombreCiudad
                    },
                    administradorCreador: {
                        idAdministrador:4
                    }
                }).then((respon) => {
                    console.log(respon)
                    objeto.nombreBarrio = respon.data.idBarrio
                    valBarrio(objeto)
                })         
            })
        }

    }


    const valBarrio = (objeto) => {

        if(direccionCasaNuevo.current.value != ""){
    
            axios.post("https://api.cruzpet.com:8443/v1.0/direcciones/traerdireccionnombre",{
                direccionCasa:direccionCasaNuevo.current.value,
                barrios: {
                    idBarrio:objeto.nombreBarrio
                }
            }).then((response) => {
                objeto.direccionCasa = response.data.idDireccion
                actualizar(objeto)
            }).catch(() => {
                axios.post("https://api.cruzpet.com:8443/v1.0/direcciones/crear",{
                    direccionCasa: direccionCasaNuevo.current.value,
                    barrios: {
                        idBarrio: objeto.nombreBarrio
                    },
                    administradorCreador:{
                        idAdministrador:4
                    }
                }).then((response) => {
                    objeto.direccionCasa = response.data.idDireccion
                    objeto.admin = 1
                    actualizar(objeto)
                })
            })

        }else{

            axios.post("https://api.cruzpet.com:8443/v1.0/direcciones/traerdireccionnombre",{
                direccionCasa:direccionCasaNuevo.current.placeholder,
                barrios: {
                    idBarrio:objeto.nombreBarrio
                }
            }).then((response) => {
                objeto.direccionCasa = response.data.idDireccion
                objeto.admin = 1
                actualizar(objeto)
            }).catch(() => {
                axios.post("https://api.cruzpet.com:8443/v1.0/direcciones/crear",{
                    direccionCasa: direccionCasaNuevo.current.placeholder,
                    barrios: {
                        idBarrio: objeto.nombreBarrio
                    },
                    administradorCreador:{
                        idAdministrador:4
                    }
                }).then((response) => {
                    objeto.direccionCasa = response.data.idDireccion
                    objeto.admin = 1
                    actualizar(objeto)
                })
            })

        }

    }

    const actualizar = (objeto) => {

        axios.put("https://api.cruzpet.com:8443/v1.0/veterinarios/actualizarsincontra", {
            cedVeterinario: objeto.cedula,
            nombres:objeto.nombres,
            apellidos:objeto.apellidos,
            fechaNacimiento:objeto.fechaNacimiento,
            celular:objeto.celular,
            estado:estado,
            foto:"https://res.cloudinary.com/dadzakyw1/image/upload/v1653492431/CruzPet/Logo/qudgawhv7brvahelwf4z.png",
            ipsaTrabajo:{
              rut:objeto.ipsa
            },
            especialidadVeterinario:{
              idEspecialidad:objeto.especialidad
            },
            direccion:{
              idDireccion:objeto.direccionCasa
            },
            administradorCreador:{
                idAdministrador: 1
            }
        }).then(() => {
          navigate("/VeterinarioEpsa")
        }).catch((response) => {
            console.log(response)
        })

        
        
    }

    useEffect(() => {

        axios.post("https://api.cruzpet.com:8443/v1.0/veterinarios/veterinariocedula", {
            cedVeterinario: cedula
        }).then((response) => {
            console.log(response)
            if(response.data.estado === "a"){
                setEstado("a")
            }else if(response.data.estado === "i") {

                setEstado("i")

            }
            setVeterinario(response.data)
            setNombreRuta(response.data.ipsaTrabajo.nombre)
            setNombreEspecialidad(response.data.especialidadVeterinario.nombreEspecialidad)
            setEspecialidades(response.data.especialidadVeterinario.nombreEspecialidad)
            setDepartamentos(response.data.direccion.barrios.ciudadOrigen.departamentoOrigen.nombreDepartamento)
            setCiudades(response.data.direccion.barrios.ciudadOrigen.nombreCiudad)
            setBarrio(response.data.direccion.barrios.nombreBarrio)
            setDireccion(response.data.direccion.direccionCasa)
            setIpsas(response.data.ipsaTrabajo.nombre)
            setFecha(response.data.fechaNacimiento.split("T")[0])
            axios.post("https://api.cruzpet.com:8443/v1.0/ciudades/ciudadesnombredepartamento", {
                departamentoOrigen: {
                    nombreDepartamento: response.data.direccion.barrios.ciudadOrigen.departamentoOrigen.nombreDepartamento
                }
            }).then((responses) => {
                setCiudad(responses.data)
            })
        })

        axios.get("https://api.cruzpet.com:8443/v1.0/departamentos/").then((response) => {
            setListaDepartamentos(response.data)
        })

        axios.get("https://api.cruzpet.com:8443/v1.0/ipsas/").then((response) => {
          setListaIpsas(response.data)
        })
    
        axios.get("https://api.cruzpet.com:8443/v1.0/especialidades/").then((response) => {
          setListaEspecialidad(response.data)
        })

    }, [cedula])


    useEffect(() => {
        axios.post("https://api.cruzpet.com:8443/v1.0/ciudades/ciudadesnombredepartamento",{
            departamentoOrigen: {
                nombreDepartamento: departamentos
            }
        }).then((response) => {
            console.log(response)
            setCiudad(response.data)
        })
    },[departamentos])

    const actulizarDepartamento = (props) => {
        setDepartamentos(props.target.value)
    }

    const actulizarCiudades = (props) => {
        setCiudades(props.target.value)
    }

    const cambioEstado = (prop) => {
      setEstado(prop.target.value)
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
                    <h1>Actualizar Informacion</h1>
                    <hr />
                  </div>
                  <div className="grid grid-cols-6 gap-6">

                    <div className="col-span-6 sm:col-span-1">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Tipo de Documento
                      </label>
                      <select id="country" name="country" autoComplete="country-name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>CC</option>
                        <option>TI</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        cedula Veterinario
                      </label>
                      <input type="text" ref={cedulaVeterinarioNuevo} placeholder={veterinario.cedVeterinario} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        Nombres
                      </label>
                      <input type="text" ref={nombresNuevo} placeholder={veterinario.nombres} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                        Apellidos
                      </label>
                      <input type="text" ref={apellidosNuevo} placeholder={veterinario.apellidos} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    {/* <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Correo Electronico
                      </label>
                      <input type="text" placeholder={cliente.email} ref={emailNuevo} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div> */}

                    <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Telefono
                      </label>
                      <input type="tel" ref={celularNuevo} placeholder={veterinario.celular} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Fecha Nacimiento
                      </label>
                      <input type="date" ref={fechaNacimientoNuevo} defaultValue={fecha} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Nombre Ipsa
                    </label>
                    <select
                      value={ipsas}
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={actualizarIpsa}
                      ref={nombreIpsaNuevo}
                    >
                      {
                        listaIpsas.map((response) =>
                          <option checked={response.nombre === nombreRuta ? true : false}>{response.nombre}</option>
                        )
                      }

                    </select>                  
                    </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Especialidad
                    </label>
                    <select
                      value={especialidades}
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={actualizarEspecialidad}
                      ref={especialidadNuevo}
                    >
                      {
                        listaEspecialidades.map((response) =>
                         <option selected={response.nombreEspecialidad === especialidades}>{response.nombreEspecialidad}</option> 
                        )
                      }

                    </select>                  </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                          Estado
                        </label>
                        <fieldset className="flex mt-2.5 gap-3">
                          <div className="flex items-center">
                            <input type="radio" id="activo" value="a" name="estado" ref={estadoNuevo} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" checked={estado === "a" ? true : false} onChange={cambioEstado}/>
                            <label for="activo" className="ml-3 block text-sm font-medium text-gray-700">Activo</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="inactivo" value="i" name="estado" ref={estadoNuevo} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" checked={estado === "i" ? true : false} onChange={cambioEstado}/>
                            <label for="inactivo" className="ml-3 block text-sm font-medium text-gray-700">Inactivo</label>
                          </div>
                        </fieldset>
                      </div>


                    <div className="col-span-6 sm:col-span-1">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Departamento
                      </label>
                      <select
                        value={departamentos}
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={actulizarDepartamento}
                        ref={nombreDepartamentoNuevo}
                      >
                        {
                          listaDepartamentos.map((response) =>
                            response.nombreDepartamento === departamentos ? <option select>{response.nombreDepartamento}</option> : <option>{response.nombreDepartamento}</option>
                          )
                        }

                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-1">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Ciudad
                      </label>
                      <select
                        value={ciudades}
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={actulizarCiudades}
                        ref={nombreCiudadNuevo}
                      >
                        {
                          ciudad.map((response) =>
                            response.nombreCiudad === ciudades ? <option select>{response.nombreCiudad}</option> : <option>{response.nombreCiudad}</option>
                          )
                        }

                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                        Direccion
                      </label>
                      <input type='text' placeholder={direccion} ref={direccionCasaNuevo} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        Barrio
                      </label>
                      <input type="text" placeholder={barrio} ref={nombreBarrioNuevo} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="button" onClick={() => navigate("/UsuariosEpsa")} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Cancelar
                  </button>
                  <button type="button" onClick={() => validarCampos()} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-dark-purple hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900">
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