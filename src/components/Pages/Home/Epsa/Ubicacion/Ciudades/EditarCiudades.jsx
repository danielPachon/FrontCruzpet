import axios from "axios"
import { useRef, useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import NavBarEPSA from "../../../../../Layout/NavBar/NavBarEPSA"

export const EditarCiudades = () => {

  const [departamentos, setDepartamentos] = useState([])
  const [departamento, setDepartamento] = useState("")
  const [ciudad, setCiudad] = useState("")

  const { id } = useParams()

  const nombreCiudadAct = useRef()
  const departamentoAct = useRef()

  const navigate = useNavigate()

  useEffect(() => {

    axios.post("https://api.cruzpet.com:8443/v1.0/ciudades/traerciudadid", {

      idCiudad: id

    }).then((response) => {

      setDepartamento(response.data.departamentoOrigen.nombreDepartamento)
      setCiudad(response.data)

    })

    axios.get("https://api.cruzpet.com:8443/v1.0/departamentos/").then((response) => {
      setDepartamentos(response.data)
    })

  }, [id])

  const actulizarDepartamento = (props) => {
    setDepartamento(props.target.value)
  }

  const validarCampos = () => {
    let objetoCiudadNuevo = new Object()

    if (departamentoAct.current.value !== "") {
      axios.post("https://api.cruzpet.com:8443/v1.0/departamentos/obtenerdepartamento", {
        nombreDepartamento: departamentoAct.current.value
      }).then((response) => {
        objetoCiudadNuevo.nombreDepartamento = response.data.idDepartamento
        validarCiudad(objetoCiudadNuevo)
      })
    } else {
      axios.post("https://api.cruzpet.com:8443/v1.0/departamentos/obtenerdepartamento", {
        nombreDepartamento: departamentoAct.current.placeholder
      }).then((response) => {
        objetoCiudadNuevo.nombreDepartamento = response.data.idDepartamento
        validarCiudad(objetoCiudadNuevo)
      })
    }
  }

  const validarCiudad = (objeto) => {

    if (nombreCiudadAct.current.value !== "") {
      axios.post("https://api.cruzpet.com:8443/v1.0/ciudades/nombreciudaddepartamento", {
        nombreCiudad: nombreCiudadAct.current.value,
        departamentoOrigen: {
          idDepartamento: objeto.nombreDepartamento
        }
      }).then(() => {
        alert("El nombre de la ciudad no esta disponible")
      }).catch(() => {
        objeto.nombreCiudad = nombreCiudadAct.current.value
        actualizar(objeto)
      })
    } else {
      objeto.nombreCiudad = nombreCiudadAct.current.placeholder
      actualizar(objeto)
    }

  }

  const actualizar = (objeto) => {
    console.log(objeto.nombreBarrio)
    axios.put("https://api.cruzpet.com:8443/v1.0/ciudades/actualizar", {
      idCiudad: id,
      nombreCiudad: objeto.nombreCiudad,
      departamentoOrigen: {
        idDepartamento: objeto.nombreDepartamento
      },
      administradorCreador: {
        idAdministrador: 1
      }
    }).then(() => {
      navigate("/Ciudades")
    }).catch((response) => {
      console.log(response)
    })


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
                  <h1>Actualizar Ciudad</h1>
                  <hr />
                </div>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      Nombre Ciudad
                    </label>
                    <input type="text" ref={nombreCiudadAct} placeholder={ciudad.nombreCiudad} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
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
                          response.nombreDepartamento === departamentos ? <option select>{response.nombreDepartamento}</option> : <option>{response.nombreDepartamento}</option>
                        )
                      }

                    </select>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="button" onClick={() => navigate("/Ciudades/")} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
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