import axios from "axios"
import { useRef, useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import NavBarEPSA from "../../../../Layout/NavBar/NavBarEPSA"

export const CrearTipoSangre = () => {

    const [tipoSangre, setTipoSangre] = useState("")
    const [listaTipoMascotas, setListaTipoMascota] = useState([])
    const [tipoMascota, setTipoMascota] = useState("Perro")

    const tipoMascotaAct = useRef()
  
    const nombreTipoSangreAct = useRef()

    const idAdmin = localStorage.getItem("idadmin")
  
    const navigate = useNavigate()

    const actualizarTipoMascota = (prop) => {
        setTipoMascota(prop.target.value)
      }
  
    useEffect(() => {
  
          axios.get("https://api.cruzpet.com:8443/v1.0/tipos_mascotas/").then((response) => {
            setListaTipoMascota(response.data)
        })
          
    }, [])
  
    const validarCampos = () => {
        let objetoTipoSangre = new Object()

      if (nombreTipoSangreAct.current.value !== "") {
        
        objetoTipoSangre.nombreTipoSangre = nombreTipoSangreAct.current.value
        
      } else {

        alert("El campo del nombre de la sangre no se escribio")

      }

      axios.post("https://api.cruzpet.com:8443/v1.0/tipos_mascotas/traernombre", {
        tipoMascota:tipoMascota
    }).then((response) => {
        crear(objetoTipoSangre, response.data.idTipoMascota)

    })
    }
  
    const crear = (objeto, idTipoMascota) => {
      console.log(objeto.nombreTipoSangre)
      console.log(idTipoMascota)
      axios.post("https://api.cruzpet.com:8443/v1.0/tipossangre/crear", {
        tipoSangre: objeto.nombreTipoSangre,
        tipoMascotaEntity: {
            idTipoMascota:idTipoMascota
        },
        administradorCreador: {
          idAdministrador: idAdmin
        }
      }).then(() => {
        setTimeout(() => {
         navigate("/TiposSangre")
        },2000)
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
                    <h1>Crear Tipo Sangre</h1>
                    <hr />
                  </div>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        Nombre Tipo Sangre
                      </label>
                      <input type="text" ref={nombreTipoSangreAct} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        Tipo Mascota
                      </label>
                      <select
                      value={tipoMascota}
                      onChange={actualizarTipoMascota}
                      ref={tipoMascotaAct}
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      {
                        listaTipoMascotas.map((response) =>
                           <option>{response.tipoMascota}</option> 
                        )
                      }

                    </select>                    
                    </div>
                  </div>
                </div>
  
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="button" onClick={() => navigate("/TiposSangre/")} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Cancelar
                  </button>
                  <button type="button" onClick={validarCampos} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-dark-purple hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900">
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