import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import NavBarEPSA from "../../../../Layout/NavBar/NavBarEPSA"
import axios from "axios"
import { useNavigate, useParams } from "react-router"


export const EditarMascota = () => {

  const navigate = useNavigate()

  const [mascotaAct, setMascotaAct] = useState("")
  const [estado, setEstado] = useState("")
  const [raza, setRaza] = useState("")
  const [tipoMascota, setTipoMascota] = useState("")
  const [tipoSangreMascota, setTipoSangreMascota] = useState("")
  const [generoMascota, setGeneroMascota] = useState("")
  const [imagenMascota, setImagenMascota] = useState("")
  const [listaRazas, setListaRazas] = useState([])
  const [listaTipoMascotas, setListaTipoMascota] = useState([])
  const [listaGeneroMascotas, setListaGeneroMascotas] = useState([])
  const [listaTipoSangreMascotas, setListaTipoSangreMascotas] = useState([])
  const [cedulaPropietario, setCedulaPropietario] = useState("")
  const [fecha, setFecha] = useState("")

  const numeroIdentidadAct = useRef()
  const edadAct = useRef()
  const nombreMascotaAct = useRef()
  const fechaNacimientoAct = useRef()
  const estadoAct = useRef()
  const razaMascotaAct = useRef()
  const tipoMascotaAct = useRef()
  const cedulaPropietarioAct = useRef()
  const tipoSangreMascotaAct = useRef()
  const generoMascotaAct = useRef()

  const idAdministrador = localStorage.getItem("idadmin")

  const { identificacion } = useParams()

  useEffect(() => {

    console.log(identificacion)
    axios.get("https://api.cruzpet.com:8443/v1.0/mascotas/individual/" + identificacion).then((response) => {
      setMascotaAct(response.data)
      setEstado(response.data.estado)
      setRaza(response.data.razaMascota.nombreRaza)

      axios.post("https://api.cruzpet.com:8443/v1.0/tipossangre/traertipomascota", {
        tipoMascotaEntity: {
          idTipoMascota: response.data.razaMascota.tipoMascotaEntity.idTipoMascota
        }
      }).then((response) => {
        setListaTipoSangreMascotas(response.data)
      })

      axios.post("https://api.cruzpet.com:8443/v1.0/razas/traerrazaidtipo",{
        tipoMascotaEntity: {
          idTipoMascota: response.data.razaMascota.tipoMascotaEntity.idTipoMascota
        }
      }).then((response) => {
        setListaRazas(response.data)
      })

      setTipoSangreMascota(response.data.tipoSangreMascota.tipoSangre)
      setGeneroMascota(response.data.generoMascota.genero)
      setTipoMascota(response.data.tipoMascota.tipoMascota)
      setCedulaPropietario(response.data.usuarioMascota.cedulaCliente)
      setImagenMascota(response.data.imagenMascota)
      setFecha(response.data.fechaNacimiento.split('T')[0])
    })

  
    axios.get("https://api.cruzpet.com:8443/v1.0/tipos_mascotas/").then((response) => {
      setListaTipoMascota(response.data)
    })

    axios.get("https://api.cruzpet.com:8443/v1.0/generos/").then((response) => {
      setListaGeneroMascotas(response.data)
    })

  }, [identificacion])

  const actualizarRaza = (prop) => {

    setRaza(prop.target.value)

  }

  const actualizarTipoMascota = (prop) => {
    setTipoMascota(prop.target.value)
    axios.post("https://api.cruzpet.com:8443/v1.0/tipos_mascotas/traernombre", {
      tipoMascota: prop.target.value
    }).then((response) => {
      axios.post("https://api.cruzpet.com:8443/v1.0/tipossangre/traertipomascota", {
        tipoMascotaEntity: {
          idTipoMascota: response.data.idTipoMascota
        }
      }).then((response) => {
        setListaTipoSangreMascotas(response.data)
      })

      axios.post("https://api.cruzpet.com:8443/v1.0/razas/traerrazaidtipo",{
        tipoMascotaEntity: {
          idTipoMascota: response.data.idTipoMascota
        }
      }).then((response) => {
        setListaRazas(response.data)
      })
    })
  }

  const actualizarGeneroMascota = (prop) => {
    setGeneroMascota(prop.target.value)
  }

  const actualizarTipoSangreMascota = (props) => {
    setTipoSangreMascota(props.target.value)
  }

  const validarCampos = () => {

    let objetoMascota = new Object()

    if (numeroIdentidadAct.current.value !== "") {
      axios.post("https://api.cruzpet.com:8443/v1.0/mascotas/existenciamascota", {
        numeroIdentidad: numeroIdentidadAct.current.value
      }).then(() => {
        alert("El numero de indentidad existe")
      }).catch(() => {
        objetoMascota.numeroIdentidad = numeroIdentidadAct.current.value
      })
    } else {
      objetoMascota.numeroIdentidad = numeroIdentidadAct.current.placeholder
    }

    if (edadAct.current.value !== "") {
      objetoMascota.edad = edadAct.current.value
    } else {
      objetoMascota.edad = edadAct.current.placeholder
    }

    if (nombreMascotaAct.current.value !== "") {

      objetoMascota.nombreMascota = nombreMascotaAct.current.value
    } else {
      objetoMascota.nombreMascota = nombreMascotaAct.current.placeholder
    }

    if (fechaNacimientoAct.current.value !== "") {
      objetoMascota.fechaNacimiento = fechaNacimientoAct.current.value
    } else {
      objetoMascota.fechaNacimiento = fechaNacimientoAct.current.placeholder
    }

    objetoMascota.estado = estado

    actualizarCedulaPropietario(objetoMascota)

  }

  const actualizarCedulaPropietario = (objeto) => {
    
    if (cedulaPropietarioAct.current.value !== "") {
      axios.post("https://api.cruzpet.com:8443/v1.0/clientes/traercedula", {
        cedulaCliente: cedulaPropietarioAct.current.value
      }).then(() => {
        actualizarRazaMascota(objeto, cedulaPropietarioAct.current.value)
      }).catch(() => {
        alert("El propietario no se encuentra registrado")
      })
    }else {
      console.log(cedulaPropietarioAct.current.placeholder)
      actualizarRazaMascota(objeto, cedulaPropietarioAct.current.placeholder)
    }
  }

  const actualizarRazaMascota = (objeto, cedulaPropietario) => {
    objeto.cedulaPropietario = cedulaPropietario
    axios.post("https://api.cruzpet.com:8443/v1.0/razas/traerrazanombre", {
      nombreRaza: razaMascotaAct.current.value
    }).then((response) => {
      actualizarTipoMascotas(objeto, response.data.idRaza)
    })
  }

  const actualizarTipoMascotas = (objeto, idRaza) => {
    objeto.idRaza = idRaza
    axios.post("https://api.cruzpet.com:8443/v1.0/tipos_mascotas/traernombre", {
      tipoMascota: tipoMascotaAct.current.value
    }).then((response) => {
      actualizarTipoSangresMascota(objeto, response.data.idTipoMascota)
    })
  }

  const actualizarTipoSangresMascota = (objeto, idTipoMascota) => {
    objeto.idTipoMascota = idTipoMascota
    axios.post("https://api.cruzpet.com:8443/v1.0/tipossangre/traertipomascotanombre", {
      tipoSangre: tipoSangreMascotaAct.current.value
    }).then((response) => {
      actualizarGenero(objeto, response.data.idTipoSangre)
    })
  }

  const actualizarGenero = (objeto, idTipoSangre) =>{
    objeto.idTipoSangre = idTipoSangre
    axios.post("https://api.cruzpet.com:8443/v1.0/generos/traergeneronombre", {
      genero: generoMascotaAct.current.value
    }).then((response) => {
      actualizarMascota(objeto, response.data.idGenero)
    })
  }

  const actualizarMascota = (objetoMascota, idGenero) => {
    console.log(objetoMascota.cedulaPropietario)
    axios.put("https://api.cruzpet.com:8443/v1.0/mascotas/actualizar", {
      numeroIdentidad: objetoMascota.numeroIdentidad,
      edad: objetoMascota.edad,
      nombreMascota: objetoMascota.nombreMascota,
      fechaNacimiento: objetoMascota.fechaNacimiento,
      estado: objetoMascota.estado,
      razaMascota: {
        idRaza: objetoMascota.idRaza
      },
      clienteMascota: {
        cedulaCliente: objetoMascota.cedulaPropietario
      },
      tipoMascota: {
        idTipoMascota: objetoMascota.idTipoMascota
      },
      generoMascota: {
        idGenero: idGenero
      },
      tipoSangreMascota: {
        idTipoSangre: objetoMascota.idTipoSangre
      },
      imagenMascota: imagenMascota,
      administradorCreador: {
        idAdministrador: idAdministrador
      }
    }).then(() => {
      navigate("/MascotasEpsa")
    }).catch((response) => {
      console.log(response)
    })
  }

  const cambioEstado = (prop) => {
    setEstado(prop.target.value)
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
                  <h1>Actualizar Mascota</h1>
                  <hr />
                </div>
                <div className="grid grid-cols-6 gap-6">

                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Tipo de Documento
                    </label>
                    <input disabled type="text" placeholder="CC" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      Cedula
                    </label>
                    <input type="text" disabled ref={numeroIdentidadAct} placeholder={mascotaAct.numeroIdentidad} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      Nombres
                    </label>
                    <input type="text" ref={nombreMascotaAct} placeholder={mascotaAct.nombreMascota} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                      Edad
                    </label>
                    <input type="text" ref={edadAct} placeholder={mascotaAct.edad} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Cedula Propietario
                    </label>
                    <input type="tel" ref={cedulaPropietarioAct} placeholder={cedulaPropietario} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                      Fecha de Nacimiento
                    </label>
                    <input type="date" ref={fechaNacimientoAct} defaultValue={fecha} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-1">
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                      Estado
                    </label>
                    <fieldset className="flex mt-2.5 gap-3">
                      <div className="flex items-center">
                        <input type="radio" id="activo" value="a" name="estado" ref={estadoAct} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" checked={estado === 'a' ? true : false} onChange={cambioEstado}/> 
                        <label for="activo" className="ml-3 block text-sm font-medium text-gray-700">Activo</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" id="inactivo" value="i" name="estado"  ref={estadoAct} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" checked={estado === 'i' ? true : false} onChange={cambioEstado}/>
                        <label for="inactivo" className="ml-3 block text-sm font-medium text-gray-700">Inactivo</label>
                      </div>
                    </fieldset>
                  </div>

                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
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

                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Raza Mascota
                    </label>
                    <select
                      value={raza}
                      onChange={actualizarRaza}
                      ref={razaMascotaAct}
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      {
                        listaRazas.map((response) =>
                           <option select={response.nombreRaza === raza}>{response.nombreRaza}</option> 
                        )
                      }
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-1">
                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                      Genero Mascota
                    </label>
                    <select
                      value={generoMascota}
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={actualizarGeneroMascota}
                      ref={generoMascotaAct}
                    >
                      {
                        listaGeneroMascotas.map((response) =>
                          <option select={response.genero === generoMascota}>{response.genero}</option> 
                        )
                      }

                    </select>                  
                    </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-1">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      Tipo Sangre
                    </label>
                    <select
                      value={tipoSangreMascota}
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={actualizarTipoSangreMascota}
                      ref={tipoSangreMascotaAct}
                    >
                      {
                        listaTipoSangreMascotas.map((response) =>
                          <option select={response.tipoSangre === tipoSangreMascota}>{response.tipoSangre}</option> 
                        )
                      }

                    </select>                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="button" onClick={() => navigate("/UsuariosEpsa")} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
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