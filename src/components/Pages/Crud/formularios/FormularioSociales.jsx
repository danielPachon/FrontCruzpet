import { useState } from "react";
import { toast } from "react-toastify";
import Header from "../../../Layout/Header";
import PwdRequisite from '../../../Helpers/PwdRequisite/PwdRequisite'
import BtnAccept from "../../../UI/BtnAccept";
import axios from 'axios'
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function FormularioSociales() {

    const [correo, setCorreo] = useState("")
    const [numeroDocumento, setNumeroDocumento] = useState("")
    const [tipoDocumento, setTipoDocumento] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [nombres, setNombres] = useState("")
    const [usuarios, setUsuarios] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [imagenes, setImagenes] = useState("")
    const [telefono, setTelefono] = useState("")

    useEffect(() => {
        if(localStorage.getItem("tokenFacebook") !== null){
            
            axios.post('https://api.cruzpet.com:8443/v1.0/oauth/facebook',{
                value: localStorage.getItem("tokenFacebook")
              }).then((response) => {
                setCorreo(response.data.email)
                setNombres(response.data.firstName)
                setApellidos(response.data.lastName)
                setUsuarios(response.data.firstName)
                setImagenes(response.data.extraData.picture.data.url)
                
            })
            
           
        }else{
            axios.post('https://api.cruzpet.com:8443/v1.0/oauth/google',{
                value:localStorage.getItem("tokenGoogle")
            }).then((response) => {
                
                setCorreo(response.data.email)
                setNombres(response.data.given_name)
                setApellidos(response.data.family_name)
                setUsuarios(response.data.name)
                setImagenes(response.data.picture)
                
            })
        }
    }, [])

    const warnCedula = () => toast.warn('El número de documento ingresado ya se encuentra registrado.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    

      const validateTelefone = async (e) => {
        e.preventDefault()
        
        if(e == null){
        }
      }

      const handleTipoDocumento = (event) => {
        setTipoDocumento(event.target.value)
      }

    const register = (e) => {
        e.preventDefault()
        axios.post('https://api.cruzpet.com:8443/v1.0/clientes/existenciacedula',{
            cedulaCliente: numeroDocumento
          }).then(() => {
            warnCedula()
        }).catch(() => {
            axios.post("https://api.cruzpet.com:8443/v1.0/clientes/crear", {
                cedulaCliente : numeroDocumento, 
                username : usuarios,
                email : correo,
                telefono : telefono,
                nombres : nombres,
                apellidos : apellidos,
                estado: "a",
                imagenCliente: imagenes,
                password: password,
                tipoDocumento: tipoDocumento,
                administradorCreador: null,
                direccion: {
                    idDireccion: 1
                }
            }).then((response) => {
                console.log(response)
                if(response.data.length > 10){
                    axios.post("https://api.cruzpet.com:8443/v1.0/clientes/buscarclienteemail", {
                        email : correo
                    }).then((responses) => {
                        window.location.reload(true)
                        localStorage.setItem("pets", responses.data.cantidadMascota)
                        localStorage.setItem("rolUser", "Cliente")
                        localStorage.setItem("username", usuarios)
                        localStorage.setItem("img", imagenes)
                        navigate('/')
                    })
                }
            }).catch((responses) => {
                console.log(responses)
            })
        })
    }
    
    return (
        <>
            <Header/>
            <form onSubmit={register} className="resize-none bg-white flex items-center justify-center flex-col pt-0 pb-0 px-4 h-full text-center">

                <div className="flex w-full ">
                    <div className='sm:w-full mr-1'>
                        <div className='relative'>
                        <select onClick={handleTipoDocumento} onBlur={handleTipoDocumento} id="small" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pb-2 pt-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {/* <option value="" >Tipo Documento</option> */}
                            <option value="cc" >Cédula de ciudadanía</option>
                            <option value="ti" >Tarjeta de identidad</option>
                        </select>
                        </div>
                    </div>
                    <div className='sm:w-full ml-1'>
                        <div className="relative">
                        <input type="text" id='numeroDocumento' className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                            autoComplete="off"
                            required
                            onChange={e => setNumeroDocumento(e.target.value)}
                        />
                        <label htmlFor="numeroDocumento" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">N° Documento</label>
                        </div>
                    </div>
                </div>
                <div className="flex w-full ">
                    <div className='sm:w-full ml-1'>
                        <div className="relative">
                        <input type="text" id='numeroTelefono' className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                            autoComplete="off"
                            required
                            onChange={e => setTelefono(e.target.value)}
                            onBlur={validateTelefone}
                        />
                        <label htmlFor="numeroTelefono" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Telefono</label>
                        </div>
                    </div>
                </div>
                <div className="w-full text-center">
                    <div className="mb-2">
                        <div className="relative">
                        <input type="text" id='password' className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
                            autoComplete="off"
                            required
                            onChange={e => setPassword(e.target.value)}
                            minLength="8"
                        />
                        <label htmlFor='password' className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">Contraseña</label>
                        </div>
                    </div>
                    <PwdRequisite password={password} />
                </div>
                <button>Registrarse</button>
            </form>

        </>
    
    )

}
