import axios from "axios"
import { useRef, useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import NavBarEPSA from "../../../../../Layout/NavBar/NavBarEPSA"

export const EditarPlan = () => {

  const [plan, setPlan] = useState("")
  const [listaBeneficiosConservados, setListaBeneficiosConservados] = useState([])
  const [quitarBeneficios, setQuitarBeneficios] = useState([])
  const [listaBeneficiosFaltantes, setListaBeneficiosFaltantes] = useState([])
  const [agregarBeneficios, setAgregarBeneficios] = useState([])

  const idAdmin = localStorage.getItem("idadmin")

  const { id } = useParams()

  const tituloPlanAct = useRef()
  const precioPlanAct = useRef()
  const contenidoPlanAct = useRef()


  const navigate = useNavigate()

  useEffect(() => {

    axios.get("https://api.cruzpet.com:8443/v1.0/planes/plan/" + id).then((response) => {
      console.log(response.data)
      setPlan(response.data)
    })

    axios.post("https://api.cruzpet.com:8443/v1.0/planes/traerbeneficiosconservados", {
      idPlan: id
    }).then((response) => {
      setListaBeneficiosConservados(response.data)
    })

    axios.post("https://api.cruzpet.com:8443/v1.0/planes/traerbeneficiosfaltante", {
      idPlan: id
    }).then((response) => {
      setListaBeneficiosFaltantes(response.data)
    })

  }, [id])

  const beneficiosQuitar = (prop) => {

    let arreglo = quitarBeneficios

    let existencia = false

    arreglo.forEach((response) => {
      if (response === prop.target.value) {
        existeQuitar(arreglo, prop.target.value)
        existencia = true
      }
    })

    if (existencia === false) {
      arreglo.push(prop.target.value)
    }

  }

  const existeQuitar = (arreglo, valor) => {
    setQuitarBeneficios(arreglo.filter((response) => response !== valor))
  }

  const beneficiosAgregar = (prop) => {

    let arreglo = agregarBeneficios

    let existencia = false

    arreglo.forEach((response) => {
      if (response === prop.target.value) {
        existeAgregar(arreglo, prop.target.value)
        existencia = true
      }
    })

    if (existencia === false) {
      arreglo.push(prop.target.value)
    }

  }

  const existeAgregar = (arreglo, valor) => {
    setAgregarBeneficios(arreglo.filter((response) => response !== valor))
  }



  const validarCampos = () => {

    let objetoPlan = new Object()

    if (precioPlanAct.current.value !== "") {

      objetoPlan.precioPlan = precioPlanAct.current.value

    } else {
      objetoPlan.precioPlan = precioPlanAct.current.placeholder

    }

    if (contenidoPlanAct.current.value !== "") {

      objetoPlan.contenidoPlan = contenidoPlanAct.current.value

    } else {
      objetoPlan.contenidoPlan = contenidoPlanAct.current.placeholder

    }

    if (tituloPlanAct.current.value !== "") {

      objetoPlan.tituloPlan = tituloPlanAct.current.value

    } else {
      objetoPlan.tituloPlan = tituloPlanAct.current.placeholder
    }

    actualizar(objetoPlan)
  }

  const actualizar = (objeto) => {
    if (quitarBeneficios.length !== 0 && agregarBeneficios.length !== 0) {
      let arregloaBeneficioQuitar = []
      let arregloBeneficioAgregar = []

      quitarBeneficios.forEach((response) => {
        let objetoBeneficio = { "idBeneficio": "" }
        objetoBeneficio.idBeneficio = parseInt(response)
        arregloaBeneficioQuitar.push(objetoBeneficio)

      })

      agregarBeneficios.forEach((response) => {
        let objetoBeneficio = { "idBeneficio": "" }
        objetoBeneficio.idBeneficio = parseInt(response)
        arregloBeneficioAgregar.push(objetoBeneficio)
      })

      axios.post("https://api.cruzpet.com:8443/v1.0/planes/quitarbeneficios", {
        idPlan: id,
        beneficiosEntity: arregloaBeneficioQuitar
      }).then((response) => {
        setTimeout(() => {
          axios.post("https://api.cruzpet.com:8443/v1.0/planes/agregarbeneficios", {
            idPlan: id,
            beneficiosEntity: arregloBeneficioAgregar
          }).then((response) => {
            console.log(response)
          })
        }, 2000)
      })
    } else if (quitarBeneficios.length !== 0) {
      let arregloaBeneficioQuitar = []
      quitarBeneficios.forEach((response) => {
        let objetoBeneficio = { "idBeneficio": "" }
        objetoBeneficio.idBeneficio = parseInt(response)
        arregloaBeneficioQuitar.push(objetoBeneficio)

      })
      axios.post("https://api.cruzpet.com:8443/v1.0/planes/quitarbeneficios", {
        idPlan: id,
        beneficiosEntity: arregloaBeneficioQuitar
      }).then((response) => {
        console.log(response)
      })


    } else if (agregarBeneficios.length !== 0) {
      let arregloBeneficioAgregar = []

      agregarBeneficios.forEach((response) => {
        let objetoBeneficio = { "idBeneficio": "" }
        objetoBeneficio.idBeneficio = parseInt(response)
        arregloBeneficioAgregar.push(objetoBeneficio)
      })

      axios.post("https://api.cruzpet.com:8443/v1.0/planes/agregarbeneficios", {
        idPlan: id,
        beneficiosEntity: arregloBeneficioAgregar
      }).then((response) => {
        console.log(response)
      })

    }


    setTimeout(() => {
      axios.put("https://api.cruzpet.com:8443/v1.0/planes/actualizarsinbeneficios", {
        idPlan: id,
        precio: objeto.precioPlan,
        contenidoplan: objeto.contenidoPlan,
        tituloPlan: objeto.tituloPlan,
        administradorCreador: {
          idAdministrador: idAdmin
        }
      }).then(() => {
        navigate("/Planes")
      })
    }, 2000)



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
                  <h1>Actualizar Plan</h1>
                  <hr />
                </div>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      Precio Plan
                    </label>
                    <input type="text" ref={precioPlanAct} placeholder={plan.precio} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      Contenido Plan
                    </label>
                    <input type="text" ref={contenidoPlanAct} placeholder={plan.contenidoplan} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      Titulo Plan
                    </label>
                    <input type="text" ref={tituloPlanAct} placeholder={plan.tituloPlan} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      Beneficios Conservados
                    </label>
                    <div className="flex flex-col gap-2">
                      {
                        listaBeneficiosConservados.map((responses) =>
                          <div>
                            <input type="checkbox" id={responses.idBeneficio} value={responses.idBeneficio} onChange={beneficiosQuitar} defaultChecked className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                            <label for={responses.idBeneficio} className='pl-1'>{responses.nombreBeneficio}</label>
                          </div>
                        )
                      }
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      Beneficios Faltantes
                    </label>
                    <div className="flex flex-col gap-2">
                      {
                        listaBeneficiosFaltantes.map((responses) =>
                          <div>
                            <input type="checkbox" id={responses.idBeneficio} value={responses.idBeneficio} onChange={beneficiosAgregar} className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded' />
                            <label for={responses.idBeneficio} className='pl-1'>{responses.nombreBeneficio}</label>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="button" onClick={() => navigate("/Planes")} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
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