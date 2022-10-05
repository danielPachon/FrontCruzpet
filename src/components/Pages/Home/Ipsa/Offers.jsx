import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../../Layout/NavBar/NavBar'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { Button } from 'flowbite-react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { fetchPhotos, openUploadWidget } from '../../../../cloudinaryservice'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export const Offers = () => {

  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [productos, setProductos] = useState([])
  const [btn, setBtn] = useState(true)
  const [btnTwo, setBtnTwo] = useState(true)
  const [showModal, setShowModal] = React.useState(false)
  const [idProduct, setIdProduct] = useState("")
  const [nombreProducto, setNombreProducto] = useState("")
  const [nuevoNombreProducto, setNuevoNombreProducto] = useState("")
  const [precioProducto, setPrecioProducto] = useState("")
  const [nuevoPrecioProducto, setNuevoPrecioProducto] = useState("")
  const [urlImage, setUrlImage] = useState("")
  const [totalCalificacion, setTotalCalificacion] = useState("")
  const [calificacion, setCalificacion] = useState([])

  localStorage.setItem("color", 7)

  useEffect(() => {
    axios.get('https://api.cruzpet.com:8443/v1.0/productos/').then(response => {
      setProductos(response.data.map(item => item))
    })
  })

  const eliminarProducto = (e) => {
    e.preventDefault()
    axios.delete('https://api.cruzpet.com:8443/v1.0/productos/eliminar/'+idProduct).then(response => {
      setShowModal(false)
      successDelete()
    })
  }

  const beginUpload = tag => {
    const uploadOptions = {
      cloudName: "dadzakyw1",
      tags: [tag, 'anImage'],
      uploadPreset: "productos"
    };
    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        if (photos.event === 'success') {
          const url = photos.info.url
          setUrlImage(url)
        }
      } else {

      }
    })
  }

  useEffect(() => {
    fetchPhotos("image", setUrlImage)
  }, [3])

  const getProductSelection = (e) => {
    setIdProduct(e.target.value)
    axios.get('https://api.cruzpet.com:8443/v1.0/productos/' + e.target.value)
      .then(response => {
        setNombreProducto(response.data.nombreProducto)
        setPrecioProducto(response.data.precioproducto)
        setUrlImage(response.data.rutaImagen)
        setTotalCalificacion(response.data.totalCalificacion)
        setCalificacion(response.data.calificacion)
      })
  }

  const CreateProduct = (e) => {
    e.preventDefault()
    console.log(nuevoNombreProducto)
    console.log(parseInt(nuevoPrecioProducto))

    axios.post(`https://api.cruzpet.com:8443/v1.0/productos/crear`, {
      rutaImagen: urlImage,
      nombreProducto: nuevoNombreProducto,
      precioproducto: nuevoPrecioProducto,
      calificacion: [],
      administradorCreador: null,
      ipsaEntity: {
        rut: localStorage.getItem("rut")
      },
      estado: "a"
    }).then(response => {
      console.log(response)
      successCreate()
      setOpenModal(false)
      // const timer = setTimeout(() => {
      //   window.location.reload()
      // }, 2500);
      // return () => clearTimeout(timer)
    })

  }

  const ActualizarProducto = (e) => {
    e.preventDefault()
    const updateInfo = {
      idProducto: idProduct,
      rutaImagen: urlImage,
      nombreProducto: nombreProducto,
      precioproducto: precioProducto,
      totalCalificacion: totalCalificacion,
      calificacion: [
        {
          idCalificacion: 6,
          numeroCalificacion: 0
        }
      ],
      administradorCreador: null,
      ipsaEntity: {
        rut: localStorage.getItem('rut')
      },
      estado: "a"
    }

    axios.put(`https://api.cruzpet.com:8443/v1.0/productos/actualizar`, updateInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      successUpdate()
      setOpen(false)
      // const timer = setTimeout(() => {
      //   window.location.reload()
      // }, 2500)
      // return () => clearTimeout(timer)
    })

  }

  const successDelete = () => toast.success('El producto se ha eliminado correctamente.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const successUpdate = () => toast.success('El producto se ha actualizado correctamente.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const successCreate = () => toast.success('El producto se ha creado correctamente.', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const handleID = (e) => {
    setIdProduct(e.target.value)
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Navbar />

      <div className="ml-20 md:container 2xl:mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex flex-col md:flex-row mb-1 sm:mb-0 justify-between w-full">
            <h2 className="text-2xl leading-tight">
              Productos
            </h2>
            <div className="text-end">
              <div className="flex flex-col md:flex-row w-full md:w-full max-w-2xl md:space-x-3 space-y-3 md:space-y-0 justify-center">
                <div className="flex relative">
                  <input type="text" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" placeholder="Busqueda..." />
                </div>

                <a>
                  <button type="button" onClick={() => setOpenModal(true)} className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-dark-purple rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-blue-200">
                    Crear
                  </button>
                </a>
              </div>

            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 md:px-4 sm:px-8 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <div className="grid px-1 gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:mx-4 xl:grid-cols-4 m-3 2xl:grid-cols-6">
                {productos.map((item, index) => (
                  <div key={item.idProducto} className=" bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <Link to={""}>
                      <img className="p-8 rounded" src={item.rutaImagen} alt="product image" />
                    </Link>
                    <div className="px-5 pb-5">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 truncate whitespace-nowrap overflow-hidden dark:text-white">{item.nombreProducto}</h5>
                      <div className="flex items-center mt-2.5 mb-2">
                        {item.totalCalificacion > 0 ?
                          Array.from({ length: (item.totalCalificacion).toFixed(2) }).map(estrella => (
                            <div>
                              <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            </div>
                          ))
                          : ""}
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{item.totalCalificacion != 'NaN' ? item.totalCalificacion : "0"}</span>
                      </div>
                      <div className="flex justify-center items-center gap-3 2xl:flex-col">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{"$" + item.precioproducto}</span>
                      </div>
                      <div className="flex flex-col justify-center items-center my-2 gap-1">
                        <button type="button" value={item.idProducto} onMouseDown={getProductSelection} onClick={() => setOpen(true)} className="flex-shrink-0 px-4 py-2 w-full text-base font-semibold text-white bg-dark-purple rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-blue-200">
                          Actualizar
                        </button>
                        <button type="button" value={item.idProducto} onMouseDown={handleID} onClick={() => setShowModal(true)} className="flex-shrink-0 px-4 py-2 w-full text-base font-semibold text-white bg-red-700 rounded-lg shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2 focus:ring-offset-red-200">
                          Eliminar
                        </button>
                        {showModal ? (
                          <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                              <Modal.Dialog>
                                <Modal.Header>
                                  <Modal.Title>Eliminar Producto</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <p>¿Estas seguro que quieres eliminar el producto?</p>
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button type="button" onClick={() => setShowModal(false)} onMouseEnter={() => setBtn(false)} onMouseLeave={() => setBtn(true)} onMouseDown={() => setBtn(true)} outline={btn} gradientDuoTone="pinkToOrange">Cerrar</Button>
                                  <Button type="button" onClick={eliminarProducto} onMouseEnter={() => setBtnTwo(false)} onMouseLeave={() => setBtnTwo(true)} outline={btnTwo} gradientDuoTone="greenToBlue">Confirmar</Button>
                                </Modal.Footer>
                              </Modal.Dialog>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-stretch md:items-center justify-center min-h-full text-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex text-base text-left transform transition w-full md:max-w-2xl md:px-4 md:my-8 lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
                  <div className="w-full rounded-xl relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                      onClick={() => setOpen(false)}
                    >
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="w-full grid grid-cols-1 gap-y-8 gap-x-9 items-start sm:grid-cols-8">
                      <button className='relative aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-3' onClick={() => beginUpload("image")}>
                        <img src={urlImage} alt={nombreProducto} className="z-50 object-center object-cover opacity-1 transition-opacity hover:opacity-50" />
                        <p className='font-bold text-black-800'>Cambiar imagen</p>
                      </button>
                      <div className="sm:col-span-5">
                        <h2 className="text-2xl font-extrabold text-gray-900">{nombreProducto}</h2>
                        <section aria-labelledby="options-heading">
                          <p className="text-2xl text-gray-900">${precioProducto}</p>
                          <form className='w-full'>
                            {/* Sizes */}
                            <div className="w-full mt-4">
                              <div className="flex items-center justify-between">
                                <a href="#" htmlFor="name" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                  ¡Modifica tu producto!
                                </a>
                              </div>

                              <RadioGroup className="w-full mt-4">
                                <div className="w-full flex my-3">
                                  <div className='flex w-full'>
                                    <div className="w-full flex relative">
                                      <input type="text" id="name" value={nombreProducto} onChange={e => setNombreProducto(e.target.value)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                      <label htmlFor="name" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nombre del producto</label>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-full flex my-3">
                                  <div className='flex w-full'>
                                    <div className="w-full flex relative">
                                      <input type="number" id="price" value={precioProducto} onChange={e => setPrecioProducto(e.target.value)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                      <label htmlFor="price" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Precio del producto</label>
                                    </div>
                                  </div>
                                </div>
                              </RadioGroup>
                            </div>
                            <button type="button" onClick={ActualizarProducto} className="flex-shrink-0 px-4 py-2 w-full text-base font-semibold text-white bg-dark-purple rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-blue-200">
                              Actualizar
                            </button>

                          </form>
                        </section>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={openModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-stretch md:items-center justify-center min-h-full text-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex text-base text-left transform transition w-full md:max-w-2xl md:px-4 md:my-8 lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
                  <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                      onClick={() => setOpenModal(false)}
                    >
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="w-full grid grid-cols-1 gap-y-8 gap-x-12 items-start sm:grid-cols-9">
                      <button className='relative aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-3' onClick={() => beginUpload("image")}>
                        <img src={urlImage} alt='' className="z-50 object-center object-cover opacity-1 transition-opacity hover:opacity-50" />
                        <p className='font-bold text-black-800'>Cambiar imagen</p>
                      </button>
                      <div className="sm:col-span-5">
                        <h2 className="text-2xl font-extrabold text-gray-900" >{nuevoNombreProducto}</h2>
                        <section aria-labelledby="options-heading">
                          <p className="text-2xl text-gray-900">${nuevoPrecioProducto}</p>
                          <form className='w-full'>
                            {/* Sizes */}
                            <div className="w-full mt-4">
                              <div className="flex items-center justify-between">
                                <a href="#" htmlFor="name" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                  ¡Añade tu producto!
                                </a>
                              </div>

                              <RadioGroup className="w-full mt-4">
                                <div className="w-full flex my-3">
                                  <div className='flex w-full'>
                                    <div className="w-full flex relative">
                                      <input type="text" id="name" onChange={e => setNuevoNombreProducto(e.target.value)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                      <label htmlFor="name" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nombre del producto</label>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-full flex my-3">
                                  <div className='flex w-full'>
                                    <div className="w-full flex relative">
                                      <input type="number" id="price" onChange={e => setNuevoPrecioProducto(e.target.value)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                      <label htmlFor="price" className="absolute text-sm text-gray-400 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Precio del producto</label>
                                    </div>
                                  </div>
                                </div>
                              </RadioGroup>
                            </div>
                            <div className='w-full flex items-center justify-center mt-6 px-8'>
                              <div className='flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-tr focus:ring-4 focus:ring-green-200  hover:from-blue-600 hover:to-green-400 rounded-lg w-auto'>
                                <button type="submit" onClick={CreateProduct} className="relative inline-flex items-center justify-center py-[9px] px-5 my-[0.125rem]  mx-[0.125rem] overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-white hover:bg-gradient-to-tr hover:from-blue-600 hover:to-green-400 hover:text-white">
                                  Crear
                                </button>
                              </div>
                            </div>
                          </form>
                        </section>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

