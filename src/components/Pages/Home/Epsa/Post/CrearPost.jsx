import NavBarEPSA from "../../../../Layout/NavBar/NavBarEPSA"
import axios from "axios"
import { useRef, useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"

export const CrearPost = () => {


    const [estado, setEstado] = useState("")
  
    const tituloPostAct = useRef()
    const fechaPostAct = useRef()
    const cuerpoPostAct = useRef()
    const tipoPostAct = useRef()
    const cedulaPostAct = useRef()
    const estadoPostAct = useRef()
    
    const idAdmin = localStorage.getItem("idadmin")
  
    const navigate = useNavigate()

    const cambioEstado = (prop) => {
        setEstado(prop.target.value)
      }
  
    const validarCampos = () => {
        let objetoPost = new Object()

      if (tituloPostAct.current.value !== "") {
        
        objetoPost.tituloPost = tituloPostAct.current.value
        
      } else {

        objetoPost.tituloPost = tituloPostAct.current.placeholder

      }

      if (cuerpoPostAct.current.value !== "") {
        
        objetoPost.cuerpoPost = cuerpoPostAct.current.value
        
      } else {

        objetoPost.cuerpoPost = cuerpoPostAct.current.placeholder

      }

      if(tipoPostAct.current.value !== ""){
            objetoPost.tipoPost = tipoPostAct.current.value

        }else{
            objetoPost.tipoPost = tipoPostAct.current.placeholder

        }

      if (cedulaPostAct.current.value !== "") {
        
        crear(objetoPost,cedulaPostAct.current.value) 
        
      } else {

        crear(objetoPost,cedulaPostAct.current.placeholder) 

      }

    }
  
    const crear = (objeto, cedula) => {

        if(cedula == "N/A"){
            axios.post("https://api.cruzpet.com:8443/v1.0/posts/crear", {
                idPost: 0,
                tituloPost: objeto.tituloPost,
                fechaPost: fechaPostAct.current.value,
                cuerpoPost: objeto.cuerpoPost,
                imagen:"https://res.cloudinary.com/dadzakyw1/image/upload/v1653492431/CruzPet/Logo/qudgawhv7brvahelwf4z.png",
                tipoPost: objeto.tipoPost,
                estado: estado,
                cedulaCliente: null,
                administradorCreador: {
                  idAdministrador: idAdmin
                }
              }).then(() => {
                
                navigate("/ListadoPosts/")
              }).catch((response) => {
                console.log(response)
              })
        }else{
            axios.post("https://api.cruzpet.com:8443/v1.0/posts/crear", {
                idPost: 0,
                tituloPost: objeto.tituloPost,
                fechaPost: fechaPostAct.current.value,
                cuerpoPost: objeto.cuerpoPost,
                tipoPost: objeto.tipoPost,
                estado: estado,
                imagen:"https://res.cloudinary.com/dadzakyw1/image/upload/v1653492431/CruzPet/Logo/qudgawhv7brvahelwf4z.png",
                cedulaCliente: {
                    cedulaCliente: cedula
                },
                administradorCreador: {
                  idAdministrador: idAdmin
                }
              }).then(() => {
                navigate("/ListadoPosts/")
              }).catch((response) => {
                console.log(response)
              })
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
                    <h1>Crear Posts</h1>
                    <hr />
                  </div>
                  <div className="grid grid-cols-6 gap-6">
  
                    <div className="col-span-6 sm:col-span-1">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Titulo de Post
                      </label>
                      <input type="text" ref={tituloPostAct} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
  
                    <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Cuerpo Post
                      </label>
                      <input type="text" ref={cuerpoPostAct} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
  
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        Tipo Post
                      </label>
                      <select id="country" name="country" ref={tipoPostAct} autoComplete="country-name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>E</option>
                        <option>N</option>
                        <option>C</option>
                      </select>
                    </div>
  
                    <div className="col-span-6 sm:col-span-1">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Cedula Usuario
                      </label>
                      <input type="text" ref={cedulaPostAct} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
  
                    <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Fecha Post
                      </label>
                      <input type="date" ref={fechaPostAct} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
  
                    <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Estado
                      </label>
                      <fieldset className="flex mt-2.5 gap-3">
                        <div className="flex items-center">
                          <input type="radio" id="activo" value="a" name="estado" ref={estadoPostAct} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" checked={estado === 'a' ? true : false} onChange={cambioEstado}/> 
                          <label for="activo" className="ml-3 block text-sm font-medium text-gray-700">Activo</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="inactivo" value="i" name="estado"  ref={estadoPostAct} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" checked={estado === 'i' ? true : false} onChange={cambioEstado}/>
                          <label for="inactivo" className="ml-3 block text-sm font-medium text-gray-700">Inactivo</label>
                        </div>
                      </fieldset>
                    </div>
  
                  </div>
                </div>
  
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="button" onClick={() => navigate("/ListadoPosts")} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
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