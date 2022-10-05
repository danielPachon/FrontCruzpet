import axios from "axios"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import NavBarEPSA from "../../../../Layout/NavBar/NavBarEPSA"

export const CrearVeterinarioEpsa = () => {

  const [direccion, setDireccion] = useState("")
  const [barrio, setBarrio] = useState("")
  const [ciudad, setCiudad] = useState([])
  const[estado, setEstado] =  useState("")
  const [ciudades, setCiudades] = useState("")
  const [veterinario, setVeterinario] = useState([])
  const [departamentos, setDepartamentos] = useState("")
  const [ipsas, setIpsas] = useState("")
  const [listaIpsas, setListaIpsas] = useState([])
  const [especialidades, setEspecialidades] = useState("")
  const [listaEspecialidades, setListaEspecialidad] = useState([])
  const [listaDepartamentos, setListaDepartamentos] = useState([])


  const cedulaVeterinarioNuevo = useRef()
  const nombresNuevo = useRef()
  const apellidosNuevo = useRef()
  const fechaNacimientoNuevo = useRef()
  const celularNuevo = useRef()
  const nombreIpsaNuevo = useRef()
  const estadoNuevo = useRef()
  const direccionCasaNuevo = useRef()
  const nombreBarrioNuevo = useRef()
  const nombreCiudadNuevo = useRef()
  const nombreDepartamentoNuevo = useRef()
  const especialidadNuevo = useRef()
  const passwordNuevo = useRef()

  const navigate = useNavigate()

  const validarCampos = () => {

    let objetoClienteNuevo = new Object()

    if (cedulaVeterinarioNuevo.current.value != "") {
      axios.post("https://api.cruzpet.com:8443/v1.0/veterinarios/veterinariocedula", {
        cedVeterinario: cedulaVeterinarioNuevo.current.value
      }).then((r) => {
        if(r.data != ""){
          alert("Cedula existente")
        }else if(r.data == ""){
          objetoClienteNuevo.cedula = cedulaVeterinarioNuevo.current.value
        }
      }).catch(() => {
        objetoClienteNuevo.cedula = cedulaVeterinarioNuevo.current.value
      })
    } else {
      alert("Campo cedula esta vacio")
    }

    if (nombresNuevo.current.value != "") {
      objetoClienteNuevo.nombres = nombresNuevo.current.value
    } else {
      alert("Campo nombre esta vacio")
    }

    if (apellidosNuevo.current.value != "") {
      objetoClienteNuevo.apellidos = apellidosNuevo.current.value
    } else {
      alert("Campo apellidos esta vacio")
    }

    if (fechaNacimientoNuevo.current.value != "") {
      objetoClienteNuevo.fechaNacimiento = fechaNacimientoNuevo.current.value
    } else {
      alert("Campo fecha nacimiento esta vacio")
    }

    console.log(celularNuevo.current.value)
    if (celularNuevo.current.value != "") {
      objetoClienteNuevo.celular = celularNuevo.current.value
    } else {
      alert("Campo celular esta vacio")
    }

      axios.post("https://api.cruzpet.com:8443/v1.0/ipsas/traeripsanombre", {
        nombre: ipsas
      }).then((response) => {
        objetoClienteNuevo.ipsa = response.data.rut
      })

      axios.post("https://api.cruzpet.com:8443/v1.0/especialidades/nombreespecialidad", {
        nombreEspecialidad: especialidades
      }).then((response) => {
        objetoClienteNuevo.especialidad = response.data.idEspecialidad
      }).catch(() => {
        alert("No existe la especialidad")
      })


    if (estadoNuevo.current.checked == false) {
      objetoClienteNuevo.estado = "a"
    } else if (estadoNuevo.current.checked == true) {
      objetoClienteNuevo.estado = "i"
    } else {
      alert("No se a seleccionando ninguno")
    }

      axios.post("https://api.cruzpet.com:8443/v1.0/departamentos/obtenerdepartamento", {
        nombreDepartamento: departamentos
      }).then((response) => {
        objetoClienteNuevo.nombreDepartamento = response.data.idDepartamento
        validarCiudad(objetoClienteNuevo)
      }).catch((response) => {
        console.log(response)
      })
    
    

  }

  
  const cambioEstado = (prop) => {
    setEstado(prop.target.value)
  }

  const validarCiudad = (objeto) => {
        
    console.log(nombreCiudadNuevo.current.value)    
    if (nombreCiudadNuevo.current.value != "") {
      axios.post("https://api.cruzpet.com:8443/v1.0/ciudades/nombreciudaddepartamento", {
        nombreCiudad: nombreCiudadNuevo.current.value,
        departamentoOrigen: {
          idDepartamento: objeto.nombreDepartamento
        }
      }).then((response) => {
        objeto.nombreCiudad = response.data.idCiudad
        validarBarrio(objeto)
      }).catch((response) => {
        console.log(response)
      })
    }

  }

  const validarBarrio = (objeto) => {

    console.log(nombreBarrioNuevo.current.value)
    console.log(objeto.nombreCiudad)
    if (nombreBarrioNuevo.current.value != "") {
      axios.post("https://api.cruzpet.com:8443/v1.0/barrios/mostrarbarriociudad", {
        nombreBarrio: nombreBarrioNuevo.current.value,
        ciudadOrigen: {
          idCiudad: objeto.nombreCiudad
        }
      }).then((response) => {
        console.log(response)
        objeto.nombreBarrio = response.data.idBarrio
        valBarrio(objeto)
      }).catch(() => {
        axios.post("https://api.cruzpet.com:8443/v1.0/barrios/crear", {
          nombreBarrio: nombreBarrioNuevo.current.value,
          codigoPostal: 342,
          ciudadOrigen: {
            idCiudad: objeto.nombreCiudad
          },
          administradorCreador: {
            idAdministrador: 1
          }
        }).then((respon) => {
          console.log(respon)
          objeto.nombreBarrio = respon.data.idBarrio
          valBarrio(objeto)
        })
      })
    } else {
      alert("El campo barrio esta vacio")
    }

  }


  const valBarrio = (objeto) => {

    if (direccionCasaNuevo.current.value != "") {

      console.log(direccionCasaNuevo.current.value)
      console.log(objeto.nombreBarrio)
      axios.post("https://api.cruzpet.com:8443/v1.0/direcciones/traerdireccionnombre", {
        direccionCasa: direccionCasaNuevo.current.value,
        barrios: {
          idBarrio: objeto.nombreBarrio
        }
      }).then((response) => {
        objeto.direccionCasa = response.data.idDireccion
        objeto.admin = 1
        crearVeterinario(objeto)
      }).catch(() => {
        axios.post("https://api.cruzpet.com:8443/v1.0/direcciones/crear", {
          direccionCasa: direccionCasaNuevo.current.value,
          barrios: {
            idBarrio: objeto.nombreBarrio
          },
          administradorCreador: {
            idAdministrador: 1
          }
        }).then((response) => {
          objeto.direccionCasa = response.data.idDireccion
          objeto.admin = 1
          crearVeterinario(objeto)
        })
      })

    } else {
      alert("El campo direccion esta vacio")
    }

  }


  useEffect(() => {
    axios.post("https://api.cruzpet.com:8443/v1.0/ciudades/ciudadesnombredepartamento", {
      departamentoOrigen: {
        nombreDepartamento: departamentos
      }
    }).then((response) => {
      console.log(response)
      setCiudad(response.data)
    })
  }, [departamentos])

  const actulizarDepartamento = (props) => {
    setDepartamentos(props.target.value)
  }

  const actulizarCiudades = (props) => {
    setCiudades(props.target.value)
  }

  
  const actualizarIpsa = (props) => {
    setIpsas(props.target.value)
  }

  const actualizarEspecialidad = (props) => {
    setEspecialidades(props.target.value)
  }

  const crearVeterinario = (objeto) => {
    axios.post("https://api.cruzpet.com:8443/v1.0/veterinarios/crear", {
        cedVeterinario: objeto.cedula,
        nombres: objeto.nombres,
        apellidos: objeto.apellidos,
        fechaNacimiento: objeto.fechaNacimiento,
        celular: objeto.celular,
        estado: estado,
        foto: "https://res.cloudinary.com/dadzakyw1/image/upload/v1653492431/CruzPet/Logo/qudgawhv7brvahelwf4z.png",
        passwordVeterinario: objeto.cedula,
        ipsaTrabajo: {
          rut: objeto.ipsa
        },
        especialidadVeterinario: {
          idEspecialidad: objeto.especialidad
        },
        direccion: {
          idDireccion: objeto.direccionCasa
        },
        administradorCreador: {
          idAdministrador: 1
        }
      }).then(() => {
        navigate("/VeterinarioEpsa")
      }).catch((response) => {
        console.log(response)
      })
  }

  useEffect(() => {

    axios.get("https://api.cruzpet.com:8443/v1.0/departamentos/").then((response) => {
      setListaDepartamentos(response.data)
      axios.post("https://api.cruzpet.com:8443/v1.0/ciudades/ciudadesnombredepartamento", {
      departamentoOrigen: {
        nombreDepartamento: response.data[0].nombreDepartamento
      }
    }).then((responses) => {
      console.log(responses)
      setCiudad(responses.data)
    })
    })

    axios.get("https://api.cruzpet.com:8443/v1.0/ipsas/").then((response) => {
      setListaIpsas(response.data)
    })

    axios.get("https://api.cruzpet.com:8443/v1.0/especialidades/").then((response) => {
      setListaEspecialidad(response.data)
    })
    
  },[])

  useEffect(() => {
    axios.post("https://api.cruzpet.com:8443/v1.0/ciudades/ciudadesnombredepartamento", {
      departamentoOrigen: {
        nombreDepartamento: departamentos
      }
    }).then((response) => {
      console.log(response)
      setCiudad(response.data)
    })
  }, [departamentos])

  return (
    <>
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

      <div className="mt-5 ml-24 mr-4 sm:mt-0 border-2 rounded-md">
        <div className="md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div>
                  <h1>Crear Cliente</h1>
                  <hr />
                </div>
                <div className="grid grid-cols-6 gap-6">

                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Tipo de Documento
                    </label>
                    <select id="country" name="country" autoComplete="country-name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option>CC</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      Cedula Veterinario
                    </label>
                    <input type="text" ref={cedulaVeterinarioNuevo} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      Nombres
                    </label>
                    <input type="text" ref={nombresNuevo} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                      Apellidos 
                    </label>
                    <input type="text" ref={apellidosNuevo} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Fecha de nacimiento
                    </label>
                    <input type="date" ref={fechaNacimientoNuevo} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Telefono
                    </label>
                    <input type="tel" ref={celularNuevo} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
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
                          <option>{response.nombre}</option>
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
                          <option>{response.nombreEspecialidad}</option>
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
                          <option>{response.nombreCiudad}</option>
                        )
                      }

                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                      Direccion
                    </label>
                    <input type='text' ref={direccionCasaNuevo} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      Barrio
                    </label>
                    <input type="text" ref={nombreBarrioNuevo} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="button" onClick={() => navigate("/VeterinarioEpsa")} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Cancelar
                </button>
                <button type="button" onClick={() => validarCampos()} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-dark-purple hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900">
                  Crear
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </>
  )

}