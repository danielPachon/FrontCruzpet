
import axios from "axios"
import { useRef, useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import NavBarEPSA from "../../../../Layout/NavBar/NavBarEPSA"


export const CrearProducto = () => {

    const [producto, setProducto] = useState("")
    const [estado, setEstado] = useState("")
    const [ipsa, setIpsa] = useState("")
    const [listaIpsas, setListaIpsas] = useState([])
  
    const nombreProductoAct = useRef()
    const precioProductoAct = useRef()
    const estadoAct = useRef()
    const ipsaAct = useRef()
    const totalCalificacionAct = useRef()

    const idAdministrador = localStorage.getItem("idadmin")
  
    const navigate = useNavigate()

    useEffect(() => {

      axios.get("https://api.cruzpet.com:8443/v1.0/ipsas/").then((response) => {

        setListaIpsas(response.data)

      })
 
}, [])

    
    const validarCampos = () => {
    
      

      let objetoProducto = new Object()
  
      if(nombreProductoAct.current.value !== ""){
        objetoProducto.nombreProducto = nombreProductoAct.current.value
      }else{
        objetoProducto.nombreProducto = nombreProductoAct.current.placeholder
      }
  
      if(precioProductoAct.current.value !== ""){
        objetoProducto.precioProducto = precioProductoAct.current.value
      }else{
        objetoProducto.precioProducto = precioProductoAct.current.placeholder
      }

      if(totalCalificacionAct.current.value !== ""){
        objetoProducto.totalCalificacion = totalCalificacionAct.current.value
  
      }else{
        objetoProducto.totalCalificacion = totalCalificacionAct.current.placeholder
  
      }
  
      if(estado == null){
        alert("No se selecciono ningun estado")
      }else{
        crear(objetoProducto)
      }
    }
  
    const crear = (objeto) => {
      axios.post("https://api.cruzpet.com:8443/v1.0/productos/crear", {
        nombreProducto: objeto.nombreProducto,
        precioproducto:objeto.precioProducto,
        rutaImagen: "https://res.cloudinary.com/dadzakyw1/image/upload/v1653576061/CruzPet/Productos/ksmlcoot3rqvw5zccwin.jpg",
        estado:estado,
        totalCalificacion: objeto.totalCalificacion,
        calificacion: [],
        administradorCreador: {
          idAdministrador: idAdministrador
        },
        ipsaEntity: {
          rut:ipsa
        }
      }).then(() => {
        navigate("/ListadoProductos")
      }).catch((response) => {
        console.log(response)
      })
  
    }
  
    const cambioEstado = (prop) => {
      setEstado(prop.target.value)
    }

    const actualizarIpsa = (prop) => {
  
      setIpsa(prop.target.value)

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
                    <h1>Crear Producto</h1>
                    <hr />
                  </div>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        Nombre Producto
                      </label>
                      <input type="text" ref={nombreProductoAct}  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        Precio Producto
                      </label>
                      <input type="text" ref={precioProductoAct} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>    
                  <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      Total Calificacion
                    </label>
                    <input type="text" ref={totalCalificacionAct} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>                         
                  <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Estado
                      </label>
                      <fieldset className="flex mt-2.5 gap-3">
                        <div className="flex items-center">
                          <input type="radio" id="activo" value="a" name="estado" ref={estadoAct} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" onChange={cambioEstado}/> 
                          <label for="activo" className="ml-3 block text-sm font-medium text-gray-700">Activo</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="inactivo" value="i" name="estado"  ref={estadoAct} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" onChange={cambioEstado}/>
                          <label for="inactivo" className="ml-3 block text-sm font-medium text-gray-700">Inactivo</label>
                        </div>
                      </fieldset>
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        Ipsas
                      </label>
                      <select
                      value={ipsa}
                      onChange={actualizarIpsa}
                      ref={ipsaAct}
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      {
                        listaIpsas.map((response) =>
                        
                           <option>{response.rut}</option> 
                        )
                      }

                    </select>                    </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="button" onClick={() => navigate("/ListadoProductos/")} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
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