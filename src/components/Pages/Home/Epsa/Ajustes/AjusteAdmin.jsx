import axios from "axios"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import NavBarEPSA from "../../../../Layout/NavBar/NavBarEPSA"

export const AjusteAdmin = () => {
    const[estado, setEstado] =  useState("")
    const[admin, setAdmin] = useState([])

    const {id} = useParams()

    const nombreAdminNuevo = useRef()
    const estadoNuevo = useRef()
    const correoAdminNuevo = useRef()

    const cambioEstado = (prop) => {
        setEstado(prop.target.value)
      }

    useEffect(() => {

        axios.post("https://api.cruzpet.com:8443/v1.0/administradores/administradorid",{
            idAdministrador: id
        }).then((response) => {
            setAdmin(response.data)
            setEstado(response.data.estado)
        })

    },[id])

    const validarCampos = (event) => {
        let objetoAdminNuevo = new Object()

        console.log("Entra")

        if(correoAdminNuevo.current.value !== ""){

            axios.post("https://api.cruzpet.com:8443/v1.0/administradores/existenciaemail",{
                email: correoAdminNuevo.current.value
            }).then(() => {

                alert("El correo existe")

            }).catch(() => {

                objetoAdminNuevo.correo = correoAdminNuevo.current.value
                actualizar(objetoAdminNuevo)

            })

        }else{
            objetoAdminNuevo.correo = correoAdminNuevo.current.placeholder
            actualizar(objetoAdminNuevo)
        }
        
    }

    const actualizar = (objeto) => {

        console.log("Aqui")
        axios.put("https://api.cruzpet.com:8443/v1.0/administradores/actualizar", {
            idAdministrador: id, 
            nombreAdministrador: nombreAdminNuevo.current.value,
            correAdministrador: objeto.correo,
            estado: estado
        }).then(() =>{
            navigate("/Listado/Admins")
        })

    }

    const navigate = useNavigate()

    return(

        <>

            <NavBarEPSA/>

            <div className='ml-20'>
            <div class="w-full flex flex-row items-center p-2 justify-between bg-dark-purple shadow-xs ">
                <div class="ml-8 text-lg text-white hidden md:flex">
                </div>
                <span class="w-full md:w-1/3 h-10 cursor-pointer text-sm rounded-full flex">
                <input type="search" name="serch" placeholder="Search" class="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none border-white"/>
                </span>
                
                <div class="flex items-center mr-8 hidden md:flex">  
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


                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        Nombre Administrador
                        </label>
                        <input type="text" ref={nombreAdminNuevo} placeholder={admin.nombreAdministrador} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                        Correo Administrador
                        </label>
                        <input type="text" ref={correoAdminNuevo} placeholder={admin.correAdministrador} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
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

                    </div>
            
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="button" onClick={() => navigate("/Listado/Admins")} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
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