import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthUser } from '../Helpers/AuthUser/AuthUser';
import { AiOutlineUser } from 'react-icons/ai'
import { BsFillCartFill } from "react-icons/bs";
import { Logout } from '../Helpers/Logout/Logout'
import { Role } from '../Helpers/AuthUser/Role'
import BtnAccept from '../UI/BtnAccept'
import axios from 'axios'
import Car from '../Pages/Others/Car';

export default function Header() {
  const currentUser = AuthUser()
  const [entrarServicios, setEntrarServicios] = useState("#")
  const userIsLoggedIn = AuthUser();
  const rolUser = localStorage.getItem("rolUser")
  const username = localStorage.getItem("username")

  const [showOptions, setShowOptions] = useState(false);
  const handleClick = () =>{
    setShowOptions(!showOptions);
  }

  const [showMenu, setMenu] = useState(false);
  const menuClick = () =>{
    setMenu(!showMenu);
  }

  const btnmobile=()=>{
    const mobilemenu = document.getElementById('mobile-menu')
    mobilemenu.classList.toggle('hidden')
  }

  useEffect(() => {
    
    if(rolUser === null){
      setEntrarServicios('/Login')
    }else{
      setEntrarServicios('/Servicios')
    }

  }, [])

  return (
    <div>
      <nav className="px-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700 whitenav">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to={"/"}>
            <img className='w-36 m-0 p-0' src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655908381/Logos/CruzPetA_ozyt3y.gif'/>
          </Link>

          <div className='flex items-center lg:hidden '>
            {
            userIsLoggedIn && rolUser === Role.Cliente ?
                  <div className="relative inline-block text-left">
                    <div className=''>
                      <button type="button" onClick={menuClick} className="flex items-center text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparents" id="menu-button" aria-expanded="true" aria-haspopup="true">
                        <img className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={localStorage.getItem("imagen")} alt=""></img>
                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                        </svg>
                      </button>
                    </div>

                    {showMenu && (
                      <div className="p-3 right-0 origin-top-right absolute mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[10000]" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                        <div role="none">
                          <div className="px-4 text-sm text-gray-900 dark:text-white">
                            <div>{username}</div>
                          </div>
                          <hr className='m-1'/>
                          <Link to={"/Perfil/Usuario"} className="block py-0.5 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
                            Perfil
                          </Link>
                          <Link to={"/Perfil/Mascota"} className="block py-0.5 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
                            Mascotas
                          </Link>
                          <hr className='m-1'/>
                          <Link to={"/login"} onClick={Logout} className="block py-0.5 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Cerrar Sesion</Link>
                          {/* <Link to={"/login"} onClick={Logout} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
                            Cerrar Sesion
                          </Link> */}
                        </div>
                      </div>
                    )}
                  </div>
            : ""
          }
          <button
            data-collapse-toggle="mobile-menu"
            type="button"
            onClick={btnmobile}
            className="inline-flex justify-center items-center mr-1 ml-3 text-gray-400 rounded-lg lg:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-500"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          </div>

          <div className="hidden w-full lg:block lg:w-auto text-center" id="mobile-menu">
            <ul className="flex flex-col lg:flex-row lg:space-x-8 lg:mt-0 lg:text-sm lg:font-medium">
              <li>
                <Link
                  to={"/"}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to={'/Servicios'}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  to={"/Contacto"}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  Contacto
                </Link>
              </li>
              <li className='flex items-center justify-center'>
                <Link to={'/Productos'} className="mr-2 block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                  Productos
                </Link>
              </li>
              <li>
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      onClick={handleClick}
                      className="flex items-center py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparents"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      Citas
                      <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {showOptions && (
                    <div
                      className="p-3 origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[10000]"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex="-1"
                    >
                      <div className="py-1" role="none">
                        <Link
                          to={"/Registro/Cita"}
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                        >
                          Pedir Cita
                        </Link>
                        <Link
                          to={"/Consultar/Cancelar/Cita"}
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                        >
                          Consultar o Cancelar Cita
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </li>
              {
                userIsLoggedIn ? ""
                : <li className="flex lg:hidden justify-center">
                    <Link to={"/Login"}>
                      {/* <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          Login
                        </span>
                      </button> */}
                      <BtnAccept text='Iniciar sesión'/>
                    </Link>
                  </li>
              } 
            </ul>
          </div>
          <div className="py-1 hidden lg:flex">
            {
              userIsLoggedIn ? ""
              : <Link to={"/Login"}>
                  {/* <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Login</span>
                  </button> */}
                  <BtnAccept text='Iniciar sesión'/>
                </Link>
            }

            <div>
              {
                userIsLoggedIn && rolUser === Role.Cliente ?
                      <div className="relative inline-block text-left w-24">
                        <div className=''>
                          <button type="button" onClick={menuClick} className="pt-2.5 flex items-center text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparents" id="menu-button" aria-expanded="true" aria-haspopup="true">
                            <img className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={localStorage.getItem("imagen")} alt=""></img>
                            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                            </svg>
                          </button>
                        </div>

                        {showMenu && (
                          <div className="p-3 right-0 origin-top-right absolute mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[10000]" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                            <div role="none">
                              <div className="px-4 text-sm text-gray-900 dark:text-white">
                                <div>{username}</div>
                              </div>
                              <hr className='m-1'/>
                              <Link to={"/Perfil/Usuario"} className="block py-0.5 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
                                Perfil
                              </Link>
                              <Link to={"/Perfil/Mascota"} className="block py-0.5 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
                                Mascotas
                              </Link>
                              <hr className='m-1'/>
                              <Link to={"/login"} onClick={Logout} className="block py-0.5 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Cerrar Sesion</Link>
                              {/* <Link to={"/login"} onClick={Logout} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
                                Cerrar Sesion
                              </Link> */}
                            </div>
                          </div>
                        )}
                      </div>
                : ""
              }
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
