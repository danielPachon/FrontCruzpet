import axios from "axios"
import { useRef, useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import NavBarEPSA from "../../../../Layout/NavBar/NavBarEPSA"

export const EditarTipoSangre = () => {

    const [tipoSangre, setTipoSangre] = useState("")
    const [listaTipoMascotas, setListaTipoMascota] = useState([])
    const [tipoMascota, setTipoMascota] = useState("")

    const tipoMascotaAct = useRef()

    const { id } = useParams()
  
    const nombreTipoSangreAct = useRef()

    const idAdmin = localStorage.getItem("idadmin")
  
    const navigate = useNavigate()

    const actualizarTipoMascota = (prop) => {
        setTipoMascota(prop.target.value)
      }
  
    useEffect(() => {
  
          axios.post("https://api.cruzpet.com:8443/v1.0/tipossangre/obtenertiposangreid",{
  
            idTipoSangre: id
  
          }).then((response) => {
              
            setTipoSangre(response.data)
            setTipoMascota(response.data.tipoMascotaEntity.tipoMascota)
          })
          axios.get("https://api.cruzpet.com:8443/v1.0/tipos_mascotas/").then((response) => {
            setListaTipoMascota(response.data)
        })
          
    }, [id])
  
    const validarCampos = () => {
        let objetoTipoSangre = new Object()

      if (nombreTipoSangreAct.current.value !== "") {
        
        objetoTipoSangre.nombreTipoSangre = nombreTipoSangreAct.current.value
        
      } else {

        objetoTipoSangre.nombreTipoSangre = nombreTipoSangreAct.current.placeholder

      }

      axios.post("https://api.cruzpet.com:8443/v1.0/tipos_mascotas/traernombre", {
        tipoMascota:tipoMascota
    }).then((response) => {
        actualizar(objetoTipoSangre, response.data.idTipoMascota)

    })
    }
  
    const actualizar = (objeto, idTipoMascota) => {
      axios.put("https://api.cruzpet.com:8443/v1.0/tipossangre/actualizar", {
        idTipoSangre: id,
        tipoSangre: objeto.nombreTipoSangre,
        tipoMascotaEntity: {
            idTipoMascota:idTipoMascota
        },
        administradorCreador: {
          idAdministrador: idAdmin
        }
      }).then(() => {
        navigate("/TiposSangre")
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
                    <h1>Crear Tipo Mascota</h1>
                    <hr />
                  </div>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        Nombre Tipo Sangre
                      </label>
                      <input type="text" ref={nombreTipoSangreAct} placeholder={tipoSangre.tipoSangre} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div className="grid grid-cols-6 gap-6">
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
                           <option select={response.tipoMascota === tipoMascota}>{response.tipoMascota}</option> 
                        )
                      }

                    </select>                    </div>
                  </div>
                  </div>
                </div>
  
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="button" onClick={() => navigate("/TiposSangre/")} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
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