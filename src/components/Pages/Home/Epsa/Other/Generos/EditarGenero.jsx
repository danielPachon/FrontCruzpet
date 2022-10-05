import axios from "axios"
import { useRef, useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import NavBarEPSA from "../../../../../Layout/NavBar/NavBarEPSA"

export const EditarGenero = () => {

    const [genero, setGenero] = useState("")

  const { id } = useParams()

  const nombreGeneroAct = useRef()

  const idAdministrador = localStorage.getItem("idadmin")

  const navigate = useNavigate()

  useEffect(() => {

        axios.post("https://api.cruzpet.com:8443/v1.0/generos/traergeneroid",{

            idGenero: id

        }).then((response) => {
            
            setGenero(response.data)
        })
   
  }, [id])

  const validarCampos = () => {
    if (nombreGeneroAct.current.value !== "") {

        actualizar(nombreGeneroAct.current.value)

    } else {
      actualizar(nombreGeneroAct.current.placeholder)
    }
  }

  const actualizar = (objeto) => {
    axios.put("https://api.cruzpet.com:8443/v1.0/generos/actualizar", {
      idGenero: id,
      genero: objeto,
      administradorCreador: {
        idAdministrador: idAdministrador
      }
    }).then(() => {
        navigate("/Generos")
    }).catch((response) => {
      console.log(response)
    })


  }

  return (
    <>

      <NavBarEPSA/>

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
                  <h1>Actualizar Departamento</h1>
                  <hr />
                </div>
                <div className="grid grid-cols-6 gap-6">
                </div>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      Nombre Departamento
                    </label>
                    <input type="text" ref={nombreGeneroAct} placeholder={genero.genero} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="button" onClick={() => navigate("/Generos")} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
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