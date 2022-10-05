import React, {useEffect, useState, useRef, Fragment}from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { BsFillCartFill, BsX} from "react-icons/bs";
import axios from 'axios';
import useUser from './hooks/useUser';
import { NavLink }  from 'react-router-dom'
import { useNavigate } from 'react-router'
import { AuthUser } from '../../Helpers/AuthUser/AuthUser';
import { MetodosPgo } from '../../UI/MetodosPgo';

export default function Car() {
  const [showModal, setShowModal] = React.useState(true);
  const [button, setButton] = useState(true)
  const [carnumber, setCarnumber] = useState('')
  const currentUser = AuthUser()
  const [car, setCar] = useState([])
  const [len, setLen] = useState('')
  const [cantidad, setCantidad] = useState([])
  const [total, setTotal] = useState([])
  const [recargar, setRecarga] = useState(0)
  const [totalSinPunto, setTotalSinPunto] = useState("")
  const [navegacion, setNavegacion] = useState("#")
  const [numero, setNumero] = useState('')
  const [cantAumento, setCantAumento] = useState()
  const [cantdecremento, setCantDecremento] = useState()
  const [cantidadesAumento, setCantidadesAumento] = useState(new Array())
  const [cantidadesDecremento, setCantidadesDecremento] = useState(new Array())
  const [el, setEl] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  
  const cant = useRef(new Array())

  const cartas = useRef()

  const username = localStorage.getItem("username") 

  const {idMandar} = useUser()
  
  const deleteProduct = async (id, index) => {
    const formatoPeso = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    })
   await axios.post("https://api.cruzpet.com:8443/v1.0/compras/eliminarproducto",{
      idCompra:carnumber,
      comprasProductos:[
        {
          idProducto:id
        }
      ]
    }).then(function(resp){
      setRecarga(1)
      setRecarga(0)
      axios.post("https://api.cruzpet.com:8443/v1.0/compras/mostrartotalsinpunto",{
      idCompra:carnumber,
    }).then(function(resp){

      setTotalSinPunto(resp.data)
      setTotal(formatoPeso.format(resp.data))
    })
    })
    
  }

  useEffect(()=>{
    axios.post("https://api.cruzpet.com:8443/v1.0/clientes/buscarcliente",{
        username:username,
    }).then(function(resp){
      setCarnumber(resp.data.compras.idCompra)
    })
  


    const formatoPeso = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    })


    axios.post("https://api.cruzpet.com:8443/v1.0/compras/mostrartotalsinpunto",{
      idCompra:carnumber,
    }).then(function(resp){

      setTotalSinPunto(resp.data)
      setTotal(formatoPeso.format(resp.data))
    })

  },[carnumber, el, username, open])


  const aumentar = async (e, valor) => {
    setNumero(e.target.value)

    const Array = [e.target.value]

    const nuevo = Array[0].split(',')

    let i = cant.current[nuevo[1]]

    i.textContent = parseInt(i.textContent) + 1

    let contenido = i.textContent
    
    let array = cantidadesAumento

    let encontrado = false;

    for(let i = 0; i < array.length; i++){
      if(array[i][0] === nuevo[0]){
        array[i] = [nuevo[0], contenido]
        encontrado=true
        setCantidadesAumento(array)
        break
      }
    }

    if(encontrado === false){
      array.push([nuevo[0], contenido])
      setCantidadesAumento(array)
    } 

    setTotalSinPunto(totalSinPunto + parseInt(nuevo[2]))

    const formatoPeso = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    })

    setTotal(formatoPeso.format(totalSinPunto + parseInt(nuevo[2])))

    setCantAumento(1)
   
  }

  const reducir = (e) => {

    setNumero(e.target.value)

    const Array = [e.target.value]

    const nuevo = Array[0].split(',')

    let i = cant.current[nuevo[1]]

    if(parseInt(i.textContent) == 1){
      i.textContent = i.textContent
    }else{
      i.textContent = parseInt(i.textContent) - 1
      setTotalSinPunto(totalSinPunto - parseInt(nuevo[2]))

      const formatoPeso = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      })
  
      setTotal(formatoPeso.format(totalSinPunto - parseInt(nuevo[2])))
    }

    let contenido = i.textContent
    
    let array = cantidadesDecremento

    let encontrado = false;

    for(let i = 0; i < array.length; i++){
      if(array[i][0] === nuevo[0]){
        array[i] = [nuevo[0], contenido]
        encontrado=true
        setCantidadesDecremento(array)
        break
      }
    }

    if(encontrado === false){
      array.push([nuevo[0], contenido])
      setCantidadesDecremento(array)
    } 

    setCantDecremento(1)
  }

  useEffect(() => {

    console.log("Entra")

    if(open === false){

      if(cantAumento !== undefined && cantdecremento !== undefined){
        console.log("Entra uno")

        cantidadesAumento.forEach((responses, index) => {
          axios.post("https://api.cruzpet.com:8443/v1.0/compras/aumentar", {
          idCompra:carnumber,
          cantidadCompras:parseInt(responses[1]),
          comprasProductos:[
            {
              idProducto:responses[0]
            }
          ]    
        }).then(() =>  {
          cantidadesDecremento.forEach((responses, index) => {
            axios.post("https://api.cruzpet.com:8443/v1.0/compras/reducir", {
            idCompra:carnumber,
            cantidadCompras:parseInt(responses[1]),
            comprasProductos:[
              {
                idProducto:responses[0]
              }
            ]    
          }).then((response) =>  {
                setRecarga(1)
                setRecarga(0)
                setCantDecremento()
                setCantAumento()
              })
            })
          })
        })  
      }else if(cantAumento !== undefined){
        console.log("Entra dos")
        cantidadesAumento.forEach((responses, index) => {
          console.log(responses[1])
          axios.post("https://api.cruzpet.com:8443/v1.0/compras/aumentar", {
          idCompra:carnumber,
          cantidadCompras:parseInt(responses[1]),
          comprasProductos:[
            {
              idProducto:responses[0]
            }
          ]    
        }).then((response) =>  {
          setCantidadesAumento(cantidadesAumento.splice(0, index))
          setRecarga(1)
          setRecarga(0)
          setCantAumento()
          })
        })
      }else if(cantdecremento !== undefined){
        console.log("Entra tres")
        cantidadesDecremento.forEach((responses, index) => {
          axios.post("https://api.cruzpet.com:8443/v1.0/compras/reducir", {
          idCompra:carnumber,
          cantidadCompras:parseInt(responses[1]),
          comprasProductos:[
            {
              idProducto:responses[0]
            }
          ]    
        }).then((response) =>  {
            setCantDecremento(cantidadesAumento.splice(0, index))
            setRecarga(1)
            setRecarga(0)
            setCantDecremento()
        })
        })
      }else{
        console.log("Afuera")
      }
    }

  }, [open])


  useEffect(() => {
    let datos = []
     axios.post("https://api.cruzpet.com:8443/v1.0/compras/carritocliente", {
      idCompra:carnumber
    }).then((response) =>  {
      response.data.comprasProductos.map(item  => {

          /////
          axios.post("https://api.cruzpet.com:8443/v1.0/compras/cantidad", {
            idCompra:carnumber,
            comprasProductos:[
              {
                idProducto:item.idProducto
        
              }
            ]    
          }).then((response) =>  {
              item.cantidad = response.data.cantidad
              datos.push(item)
            })
        ///
        })
      
        setTimeout(()=> {
          setCar(datos)
          setLen(response.data.comprasProductos.length)
          setCantidad(response.data.cantidades)
        }, 2000)
    })
  }, [carnumber, idMandar, recargar])

  async function credenciales(){

    if(currentUser === true){
      setOpen(true)
    }else{
      navigate(`/Login`)
    }
  }

  const vaciarCarrito = async(props) => {

    axios.post("https://api.cruzpet.com:8443/v1.0/compras/eliminarcontenidocarrito", {
      idCompra:carnumber,
    }).then(() =>  {
      setRecarga(1)
      setRecarga(0)
      setTotal(0)
    })

  }

  return (
    <>

      <button onClick={() => credenciales()}>
        <BsFillCartFill className='text-xl'/>
      </button>

    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child as={Fragment} enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-500 sm:duration-700" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900"> Carrito de Compras</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={() => setOpen(false)}>
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8" ref={cartas}>
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {car.map((item, index) => (
                              <li key={item.idProducto} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img src={item.rutaImagen} alt={'img'} className="h-full w-full object-cover object-center"/>
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <p>{item.nombreProducto}</p>
                                      <p className="ml-4">{item.precioproducto}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className='w-auto flex flex-row border-2 rounded-md'>
                                      <button className='px-2' value={item.idProducto + "," + index + "," + item.precioproducto}  onClick={aumentar}>+</button>
                                      <p className='px-2 border-x-2' ref={(element) => cant.current[index] = element}>{item.cantidad}</p>
                                      <button className='px-2' value={item.idProducto+ "," + index + "," + item.precioproducto} onClick={reducir}>-</button>
                                    </div>

                                    <div className="flex">
                                      <button type="button" className="font-medium text-green-400 hover:text-green-500" onClick={() => deleteProduct(item.idProducto, index)}>
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{total}</p>
                        
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Envío e impuestos calculados al finalizar la compra.</p>
                      <div className="mt-6">
                        <MetodosPgo precio={total}/>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          o{' '}
                          <button
                            type="button"
                            className="font-medium text-green-400 hover:text-green-500"
                            onClick={vaciarCarrito}
                          >
                            Vaciar Carrito de Compra<span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  )
}