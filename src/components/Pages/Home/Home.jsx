import Header from '../../Layout/Header'
import { Footer } from '../../Layout/Footer'
import { CarouselHome } from '../../UI/CarouselHome'
import { CardHome } from '../../UI/CardHome'
import { Promociones } from '../../UI/Promociones'
import MarcasAliadas from '../../UI/MarcasAliadas'

import React from 'react'
import ReactPlayer from 'react-player'
import Maps from '../../UI/Maps'
import '../../../bootstrap.min.css'

export function Home() {
  return (
    <div> 
        <Header/>
        <CarouselHome/>

        {/* <h2 className='flex justify-center mt-5 w-100'>Cruz Pet</h2> */}

        <section data-aos='fade-left' className='grid justify-center gap-3 m-5 md:grid-cols-3 2xl:flex'>
          
        <div className="max-w-sm xl:ml-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-t-lg w-full" src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655914222/Other/estadisticas_arn9gm.png' alt=""/>
            <div className="p-3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Información en tiempo real</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Agilice tiempo y visualiza la información confiable y oportuna.</p>
            </div>
          </div>

          <div className="max-w-sm xl:ml-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-t-lg w-full" src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655914223/Other/lapiz_aq8hdq.png' alt=""/>
            <div className="p-3">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Historias Clínicas</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Gestione las historias clínicas de sus mascotas sin límites o restricciones.</p>
            </div>
          </div>

          <div className="max-w-sm xl:ml-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-t-lg w-full" src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655914223/Other/calendario_wbqqbr.png' alt=""/>
            <div className="p-3">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Agendamiento de Citas</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Agende y gestione las citas de tus mascotas en tiempo real.</p>
            </div>
          </div>
        </section>
        
        <section className='flex justify-center items-center flex-col'>
        <div className='flex justify-center px-3 sm:px-5 lg:px-20 2xl:px-44'>
          <div className="w-[320px] h-[180px] sm:w-[533px] sm:h-[300px] md:w-[747px] md:h-[420px] lg:w-[943px] lg:h-[530px] xl:w-[1066px] xl:h-[600px] 2xl:w-[1300px] 2xl:h-[733px]">
            <ReactPlayer className='video' data-aos='fade-up' url={'https://youtu.be/ucfRTve57f4'}
              width='100%'
              height='100%'
              controls
              playing
              muted />
            </div>
          </div>
        <div className='flex flex-col sm:flex-row justify-center gap-3 my-3'>
          <div className="bg-white dark:bg-gray-800 w-72 shadow-lg ml-auto rounded-xl p-4 md:w-96 lg:w-2/5 2xl:w-1/3">
            <p className="text-gray-600 m-0 dark:text-white">
              <span className="font-bold text-blue-800 text-lg">
                “
              </span>
              La gente que realmente aprecia a los animales siempre pregunta sus nombres 
              <span className="font-bold text-blue-800 text-lg">
                ”(Lilian Jackson Braun)
              </span>
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 w-72 shadow-lg mr-auto rounded-xl p-4 md:w-96 lg:w-2/5 2xl:w-1/3">
          <p className="text-gray-600 m-0 dark:text-white">
            <span className="font-bold text-blue-800 text-lg">
              “
            </span>
            Nuestros compañeros perfectos nunca tienen menos de cuatro patas
            <span className="font-bold text-blue-800 text-lg">
              ”(Colette)
            </span>
          </p>
          </div>
        </div>
        </section>

        <CardHome />
       

        <MarcasAliadas/>
        <Promociones/>

        <div style={{position: "relative",width: "80%",height: "430px", marginLeft:"10%"}} className="flex content-center">
          <Maps tamaño={100}/> 
        </div>

        <Footer/>
    </div>
  )
}
