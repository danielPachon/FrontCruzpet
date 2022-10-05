import React from 'react'
import { BsInstagram, BsFacebook, BsTwitter } from 'react-icons/bs';

export function Footer() {
  return ( 
    <footer className="p-3 bg-light dark:bg-gray-800 text-2 text-gray-500 dark:text-gray-200 transition-colors duration-200">
        <div className="flex flex-col">
            <div className="sm:mt-4 xl:mt-4 md:mt-0 flex flex-col md:flex-row">
                <nav className="hidden md:flex flex-col justify-center md:items-end md:pl-8 md:w-52">
                    {/* <a aria-current="page" href="#" className="hover:text-gray-700 dark:hover:text-white">
                        FAQ
                    </a> */}
                    {/* <a aria-current="page" href="#" className="hover:text-gray-700 dark:hover:text-white">
                        Registro Ipsa 
                    </a> */}
                    <a aria-current="page" href="../../assets/GuiaUsuario.pdf" download className="hover:text-gray-700 dark:hover:text-white">
                        Guia de Usuario
                    </a>
                </nav>
                <div className="md:hidden mx-auto w-11 h-px rounded-full">
                </div>

                <div className="md:mt-0 flex-1 flex items-center justify-center md:border-r border-gray-100 lg:w-100">
                    <a className="m-2 hover:text-primary-gray-20" href="#">
                        <BsInstagram/>
                    </a>
                    <a className="m-2 hover:text-primary-gray-20" href="#">
                        <BsFacebook/>
                    </a>
                    <a className="m-2 hover:text-primary-gray-20" href="#">
                        <BsTwitter/>
                    </a>
                </div>

                <div className="md:hidden mx-auto w-11 h-px rounded-full md:w-52">
                </div>

                <div className="flex gap-1 justify-center md:items-start md:pr-8 md:flex-col text-black">
                    <span className="">
                        © 2022 
                    </span>
                    <span className="md:mt-1">
                        Created by
                        <a className="underline hover:text-primary-gray-20" href="#">
                            Grupo Adsi
                        </a>
                    </span>
                </div>
            </div>
        </div>
    </footer>
  )
}
