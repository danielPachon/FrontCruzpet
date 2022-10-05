import { useRef } from "react"
import { useNavigate, useParams } from "react-router"
import NavBarEPSA from "../../../../Layout/NavBar/NavBarEPSA"


const { default: axios } = require("axios")
const { useEffect, useState } = require("react")

export const UsuarioActualizarEpsa = () => {

    const[cliente, setCliente] = useState("")
    const[estado, setEstado] =  useState("")
    const[direccion, setDireccion] = useState("")
    const[barrio, setBarrio] = useState("")
    const[departamentos, setDepartamentos] = useState("")
    const[listaDepartamentos, setListaDepartamentos] = useState([])
    const[listaCiudad, setListaCiudad] = useState([])
    const[ciudades, setCiudades] = useState("")
    const[planSeleccionado, setPlanSeleccionado] = useState("")
    const[errores, setErrores] = useState(0)
    const[finalizador, setFinalizador] = useState(0)

    const {cedula} = useParams()

    const cedulaNueva = useRef()
    const planNuevo = useRef()
    const usernameNuevo = useRef()
    const emailNuevo = useRef()
    const telefonoNuevo = useRef()
    const estadoNuevo = useRef()
    const direccionCasaNuevo = useRef()
    const nombreNuevo = useRef()
    const apellidosNuevo = useRef()
    const nombreBarrioNuevo = useRef()
    const nombreCiudadNuevo = useRef()
    const tipoDocumentoNuevo = useRef()
    const nombreDepartamentoNuevo = useRef()

    const navigate = useNavigate()


    useEffect(() => {

        axios.get("https://api.cruzpet.com:8443/v1.0/departamentos/").then((response) => {
          setListaDepartamentos(response.data)
         })

        axios.post("https://api.cruzpet.com:8443/v1.0/clientes/traercedula", {

            cedulaCliente:cedula


        }).then((response) => {
            if(response.data.estado === "a"){
                setEstado("a")
            }else if(response.data.estado === "i") {

                setEstado("i")

            }

            let objeto = response.data
        
            setCliente(objeto)

            let direcciones = objeto.direccion

            setDireccion(direcciones)

            let barrios = direcciones.barrios

            setBarrio(barrios)

            let ciudades = barrios.ciudadOrigen

            setCiudades(ciudades)

            let departamentos = ciudades.departamentoOrigen

            setDepartamentos(departamentos.nombreDepartamento)

            axios.post("https://api.cruzpet.com:8443/v1.0/ciudades/ciudadesnombredepartamento", {
                departamentoOrigen: {
                    nombreDepartamento: departamentos.nombreDepartamento
                }
            }).then((responses) => {
                setListaCiudad(responses.data)
            })
        
            let planes = objeto.planes
            
            if(planes == null){
                setPlanSeleccionado("N/A")
            }else{
                setPlanSeleccionado(planes.tituloPlan)
            }

        })

    }, [cedula])

    const validarCampos = (event) => {
        let objetoClienteNuevo = new Object()

        if(cedulaNueva.current.value != ""){
            axios.post("https://api.cruzpet.com:8443/v1.0/clientes/existenciacedula",{
                cedulaCliente:cedulaNueva.current.value
            }).then(() => {
                alert("La cedula ya existe")
                objetoClienteNuevo.cedula = null
            }).catch(() => {
                objetoClienteNuevo.cedula = cedulaNueva.current.value
            })
        }else{
            objetoClienteNuevo.cedula = cedulaNueva.current.placeholder
        }
    
        if(usernameNuevo.current.value != ""){
            axios.post("https://api.cruzpet.com:8443/v1.0/clientes/buscarcliente", {
                username: usernameNuevo.current.value
            }).then(() =>{
                alert("El username ya esta ocupado")
                objetoClienteNuevo.username = null
            }).catch(()=> {
                objetoClienteNuevo.usernameViejo = usernameNuevo.current.value
                objetoClienteNuevo.username = usernameNuevo.current.value
            })
        }else{
            objetoClienteNuevo.username = usernameNuevo.current.placeholder
        }

        if(emailNuevo.current.value != ""){
            axios.post("https://api.cruzpet.com:8443/v1.0/clientes/existenciaemail", {
                email:emailNuevo.current.value
            }).then(() => {
                alert("El email no esta disponible")
                objetoClienteNuevo.email = null
            }).catch(() => {
                objetoClienteNuevo.email = emailNuevo.current.value
            })
        }else{
            objetoClienteNuevo.email = emailNuevo.current.placeholder
        }

        if(telefonoNuevo.current.value != ""){
            objetoClienteNuevo.telefono = telefonoNuevo.current.value
        }else{
            objetoClienteNuevo.telefono = telefonoNuevo.current.placeholder
        }
        
        if(nombreNuevo.current.value != ""){

            objetoClienteNuevo.nombre = nombreNuevo.current.value

        }else{

            objetoClienteNuevo.nombre = nombreNuevo.current.placeholder

        }


        if(apellidosNuevo.current.value != ""){

            objetoClienteNuevo.apellidos =apellidosNuevo.current.value

        }else{

            objetoClienteNuevo.apellidos =apellidosNuevo.current.placeholder

        }
        console.log(planSeleccionado)
        axios.post("https://api.cruzpet.com:8443/v1.0/planes/traerplannombre",{
          tituloPlan:planSeleccionado
        }).then((response) => {
          console.log(response.data.idPlan)
          objetoClienteNuevo.plan = response.data.idPlan
        })

        objetoClienteNuevo.tipoDocumento = tipoDocumentoNuevo.current.value

            axios.post("https://api.cruzpet.com:8443/v1.0/departamentos/obtenerdepartamento", {
                nombreDepartamento: nombreDepartamentoNuevo.current.value
            }).then((response) => {
                validarCiudad(objetoClienteNuevo,response.data.idDepartamento)
            })      
    }

    const validarCiudad = (objeto, idDepartamento) => {
      
            axios.post("https://api.cruzpet.com:8443/v1.0/ciudades/nombreciudaddepartamento",{
                nombreCiudad:nombreCiudadNuevo.current.value,
                departamentoOrigen: {
                    idDepartamento: idDepartamento
                }
            }).then((response) => {
                console.log(response.data)
                objeto.nombreCiudad = response.data.idCiudad
                validarBarrio(objeto)
            })

    } 

    const validarBarrio = (objeto) => { 
        if(nombreBarrioNuevo.current.value != ""){
            axios.post("https://api.cruzpet.com:8443/v1.0/barrios/mostrarbarriociudad", {
                nombreBarrio:nombreBarrioNuevo.current.value,
                ciudadOrigen:{
                    idCiudad:objeto.nombreCiudad
                }
            }).then((response) => {
                console.log(response.data.idBarrio)
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
                    objeto.nombreBarrio = respon.data.idBarrio
                    valBarrio(objeto)
                })
            })
        }else{
            console.log(objeto.nombreCiudad)
            axios.post("https://api.cruzpet.com:8443/v1.0/barrios/mostrarbarriociudad", {
                nombreBarrio:nombreBarrioNuevo.current.placeholder,
                ciudadOrigen:{
                    idCiudad:objeto.nombreCiudad
                }
            }).then((response) => {
                console.log(response.data.idBarrio)
                objeto.nombreBarrio = response.data.idBarrio
                valBarrio(objeto)
            }).catch(() => {
                console.log(nombreBarrioNuevo.current.placeholder)
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

    const valBarrio = (objeto, idBarrio) => {

        if(direccionCasaNuevo.current.value != ""){
            console.log(objeto.nombreBarrio)
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
            console.log(objeto.nombreBarrio)
            axios.post("https://api.cruzpet.com:8443/v1.0/direcciones/traerdireccionnombre",{
                direccionCasa:direccionCasaNuevo.current.placeholder,
                barrios: {
                    idBarrio:objeto.nombreBarrio
                }
            }).then((response) => {
                objeto.direccionCasa = response.data.idDireccion
                objeto.admin = 4
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
                    objeto.admin = 4
                    actualizar(objeto)
                })
            })

        }

    }

    const actualizar = (objeto) => {

        if(objeto.plan == null){
            axios.post("https://api.cruzpet.com:8443/v1.0/clientes/actualizartodoepsa", {
            cedulaCliente: objeto.cedula,
            planes: null,
            username:objeto.username,
            email:objeto.email,
            telefono:objeto.telefono,
            nombres: objeto.nombre,
            apellidos: objeto.apellidos,
            estado:estado,
            direccion:{
                idDireccion: objeto.direccionCasa
            },
            tipoDocumento: objeto.tipoDocumento,
            administradorCreador:{
                idAdministrador: objeto.admin
            }
        }).then((response) => {
            navigate("/UsuariosEpsa")
        }).catch((response) => {
            console.log(response)
        })
        }else{
            axios.post("https://api.cruzpet.com:8443/v1.0/clientes/actualizartodoepsa", {
            cedulaCliente: objeto.cedula,
            planes:{
                idPlan: objeto.plan
            },
            username:objeto.username,
            email:objeto.email,
            telefono:objeto.telefono,
            nombres: objeto.nombre,
            apellidos: objeto.apellidos,
            estado:estado,
            direccion:{
                idDireccion: objeto.direccionCasa
            },
            tipoDocumento: objeto.tipoDocumento,
            administradorCreador:{
                idAdministrador: objeto.admin
            }
        }).then(() => {
            navigate("/UsuariosEpsa")
        }).catch((response) => {
            console.log(response)
        })
        }
        
        
    }

      useEffect(() => {
        axios.post("https://api.cruzpet.com:8443/v1.0/ciudades/ciudadesnombredepartamento",{
            departamentoOrigen: {
                nombreDepartamento: departamentos
            }
        }).then((response) => {
            setListaCiudad(response.data)
        })
    },[departamentos])

    const actulizarDepartamento = (props) => {
        setDepartamentos(props.target.value)
    }

    const actulizarCiudades = (props) => {
        setCiudades(props.target.value)
    }

    const cambioPlan = (prop) => {
      setPlanSeleccionado(prop.target.value)
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
                        <select id="country" name="country" autoComplete="country-name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" ref={tipoDocumentoNuevo}>
                          <option>CC</option>
                          <option>TI</option>
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          Cedula
                        </label>
                        <input type="text" placeholder={cliente.cedulaCliente} ref={cedulaNueva} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                      </div>
                      
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                          Nombres
                        </label>
                        <input type="text" placeholder={cliente.nombres} ref={nombreNuevo} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                          Apellidos
                        </label>
                        <input type="text" placeholder={cliente.apellidos} ref={apellidosNuevo} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                          Correo Electronico
                        </label>
                        <input type="text" placeholder={cliente.email} ref={emailNuevo} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Telefono
                        </label>
                        <input type="tel" placeholder={cliente.telefono} ref={telefonoNuevo} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                          Username
                        </label>
                        <input type="text" placeholder={cliente.username} ref={usernameNuevo} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                      </div>

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
                        autoComplete="departamento-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={actulizarDepartamento}
                        ref={nombreDepartamentoNuevo}
                      >
                        {
                          listaDepartamentos.map((response) =>

                            <option select={String(response.nombreDepartamento) === String(departamentos)}>{response.nombreDepartamento}</option> 
                            
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
                          listaCiudad.map((response) =>
                            response.nombreCiudad === ciudades ? <option select>{response.nombreCiudad}</option> : <option>{response.nombreCiudad}</option>
                          )
                        }

                      </select>
                    </div>
                      <div className="col-span-6 sm:col-span-2">
                        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                          Direccion
                        </label>
                        <input type='text' placeholder={direccion.direccionCasa} ref={direccionCasaNuevo} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          Barrio
                        </label>
                        <input type="text" placeholder={barrio.nombreBarrio} ref={nombreBarrioNuevo} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                          Plan
                        </label>
                        <fieldset className="flex mt-2.5 gap-3">
                        <div className="flex items-center">
                          <input type="radio" id="basico" value="Basico" name="planes" ref={planNuevo} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" checked={planSeleccionado === "Basico" ? true : false} onChange={cambioPlan}/>
                          <label for="basico" className="ml-3 block text-sm font-medium text-gray-700">Basico</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="estandar" value="Estandar" name="planes" ref={planNuevo} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" checked={planSeleccionado === "Estandar" ? true : false} onChange={cambioPlan}/>
                          <label for="estandar" className="ml-3 block text-sm font-medium text-gray-700">Estandar</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="premium" value="Premium" name="planes" ref={planNuevo} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" checked={planSeleccionado === "Premium" ? true : false} onChange={cambioPlan}/>
                          <label for="premium" className="ml-3 block text-sm font-medium text-gray-700">Premium</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="n/a" value="N/A" name="n/a" ref={planNuevo} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" checked={planSeleccionado === "N/A" ? true : false} onChange={cambioPlan}/>
                          <label for="n/a" className="ml-3 block text-sm font-medium text-gray-700">N/A</label>
                        </div>
                        </fieldset>
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