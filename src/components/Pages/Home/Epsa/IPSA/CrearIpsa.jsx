
import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import NavBarEPSA from "../../../../Layout/NavBar/NavBarEPSA"
import axios from "axios"
import { useNavigate, useParams } from "react-router"

export const CrearIpsa = () => {

  const navigate = useNavigate()

  const [ipsaNuevo, setIpsaNuevo] = useState("")
  const [estado, setEstado] = useState("")
  const [departamentos, setDepartamentos] = useState("")
  const [ciudades, setCiudades] = useState("")
  const [barrios, setBarrios] = useState("")
  const [direcciones, setDirecciones] = useState("")
  const [listaDepartamentos, setListaDepartamentos] = useState([])
  const [ciudad, setCiudad] = useState([])

  const rutAct = useRef()
  const nombreAct = useRef()
  const estadoAct = useRef()
  const departamentoAct = useRef()
  const ciudadAct = useRef()
  const barrioAct = useRef()
  const direccionAct = useRef()
  const passwordNuevo = useRef()
  const idAdmin = localStorage.getItem("idadmin")

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

  }, [])

  const validarCampos = () => {

    let objetoIpsaNuevo = new Object()

    if (rutAct.current.value !== "") {
      axios.post("https://api.cruzpet.com:8443/v1.0/ipsas/ipsarut", {
        rut: rutAct.current.value
      }).then(() => {
        alert("error")
      }).catch(() => {
        objetoIpsaNuevo.rut = rutAct.current.value
      })
    } else {
      alert("El campo del rut esta vacio")
    }

    if (nombreAct.current.value !== "") {
      objetoIpsaNuevo.nombreIpsa = nombreAct.current.value
    } else {
      alert("El campo del nombre esta vacio")
    }

    if (estadoAct.current.checked === false) {
      objetoIpsaNuevo.estado = "a"
    } else if (estadoAct.current.checked === true) {
      objetoIpsaNuevo.estado = "i"
    } else {
      alert("No se escogio ninguno")
    }


    if (departamentoAct.current.value !== "") {
      axios.post("https://api.cruzpet.com:8443/v1.0/departamentos/obtenerdepartamento", {
        nombreDepartamento: departamentoAct.current.value
      }).then((response) => {
        objetoIpsaNuevo.nombreDepartamento = response.data.idDepartamento
        validarCiudad(objetoIpsaNuevo)
      })
    } else {
      alert("No se selecciono ningun departamento")
    }
  }

  const validarCiudad = (objeto) => {

    if (ciudadAct.current.value !== "") {
      console.log(objeto.nombreDepartamento)
      console.log(ciudadAct.current.value)
      axios.post("https://api.cruzpet.com:8443/v1.0/ciudades/nombreciudaddepartamento", {
        nombreCiudad: ciudadAct.current.value,
        departamentoOrigen: {
          idDepartamento: objeto.nombreDepartamento
        }
      }).then((response) => {
        objeto.nombreCiudad = response.data.idCiudad
        validarBarrio(objeto)
      })
    } else {
      alert("No se selecciono ninguna ciudad")
    }

  }

  const actulizarDepartamento = (props) => {
    setDepartamentos(props.target.value)
  }

  const actulizarCiudades = (props) => {
    setCiudades(props.target.value)
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

  const crear = (objeto) => {
    axios.post("https://api.cruzpet.com:8443/v1.0/ipsas/crear", {
      rut: objeto.rut,
      nombre: objeto.nombreIpsa,
      estado: objeto.estado,
      logoIpsa: "https://res.cloudinary.com/dadzakyw1/image/upload/v1653492431/CruzPet/Logo/qudgawhv7brvahelwf4z.png",
      passwordIpsa: objeto.rut,
      direccionIpsa: {
        idDireccion: objeto.direccionCasa
      },
      administradorCreador: {
        idAdministrador: idAdmin
      }
    }).then(() => {
      navigate("/ListadoIpsa")
    }).catch((response) => {
      console.log(response)
    })

  }

  const validarBarrio = (objeto) => {

    if (barrioAct.current.value !== "") {
      axios.post("https://api.cruzpet.com:8443/v1.0/barrios/mostrarbarriociudad", {
        nombreBarrio: barrioAct.current.value,
        ciudadOrigen: {
          idCiudad: objeto.nombreCiudad
        }
      }).then((response) => {
        console.log(response)
        objeto.nombreBarrio = response.data.idBarrio
        valBarrio(objeto)
      }).catch(() => {
        axios.post("https://api.cruzpet.com:8443/v1.0/barrios/crear", {
          nombreBarrio: barrioAct.current.value,
          codigoPostal: 342,
          ciudadOrigen: {
            idCiudad: objeto.nombreCiudad
          },
          administradorCreador: {
            idAdministrador: idAdmin
          }
        }).then((respon) => {
          console.log(respon)
          objeto.nombreBarrio = respon.data.idBarrio
          valBarrio(objeto)
        })
      })
    } else {
      alert("No se escribio ningun barrio")
    }

  }


  const valBarrio = (objeto) => {

    if (direccionAct.current.value !== "") {

      axios.post("https://api.cruzpet.com:8443/v1.0/direcciones/traerdireccionnombre", {
        direccionCasa: direccionAct.current.value,
        barrios: {
          idBarrio: objeto.nombreBarrio
        }
      }).then((response) => {
        objeto.direccionCasa = response.data.idDireccion
        crear(objeto)
      }).catch(() => {
        axios.post("https://api.cruzpet.com:8443/v1.0/direcciones/crear", {
          direccionCasa: direccionAct.current.value,
          barrios: {
            idBarrio: objeto.nombreBarrio
          },
          administradorCreador: {
            idAdministrador: idAdmin
          }
        }).then((response) => {
          objeto.direccionCasa = response.data.idDireccion
          objeto.admin = idAdmin
          crear(objeto)
        })
      })

    } else {

      alert("No se escribio ninguna direccion")

    }

  }

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
                  <h1>Crear IPSA</h1>
                  <hr />
                </div>
                <div className="grid grid-cols-6 gap-6">

                  <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      Rut
                    </label>
                    <input type="text" ref={rutAct} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      Nombres
                    </label>
                    <input type="text" ref={nombreAct} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                      Estado
                    </label>
                    <fieldset className="flex mt-2.5 gap-3">
                      <div className="flex items-center">
                        {estado === "activo" ? <input type="radio" id="activo" value="activo" name="estado" checked ref={estadoAct} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" /> : <input type="radio" id="activo" value="activo" name="estado" ref={estadoAct} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />}
                        <label for="activo" className="ml-3 block text-sm font-medium text-gray-700">Activo</label>
                      </div>
                      <div className="flex items-center">
                        {estado === "inactivo" ? <input type="radio" id="inactivo" value="inactivo" name="estado" checked ref={estadoAct} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" /> : <input type="radio" id="inactivo" value="inactivo" name="estado" ref={estadoAct} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />}
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
                      ref={departamentoAct}
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
                      ref={ciudadAct}
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
                    <input type='text' ref={direccionAct} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      Barrio
                    </label>
                    <input type="text" ref={barrioAct} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="button" onClick={() => navigate("/ListadoIpsa")} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
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