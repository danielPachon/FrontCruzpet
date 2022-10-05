import React from 'react'

export function NotFound() {
  return (
    
    <div className='bg-white overflow-hidden h-full p-0 m-0 text-sm leading-none'> 
                  
          <header >
            <img className='w-full h-1' src="https://1.bp.blogspot.com/-gxsOcYWghHA/Xp_izTh4sFI/AAAAAAAAU8s/y637Fwg99qAuzW9na_NT_uApny8Vce95gCEwYBhgL/s1600/header-footer-gradient-bg.png" alt="" />
          </header>
          
          <div className="lamp__wrap">
            <div className="lamp">
              <div className="cable"></div>
              <div className="cover"></div>
              <div className="in-cover">
                <div className="bulb"></div>
              </div>
              <div className="light"></div>
            </div>
          </div>
          
          <section className='min-h-screen relative pt-40 box-border w-full h-full text-center mt-4 
          2xl:pt-60
          xl:pt-56
          lg:pt-52
          md:pt-64
          sm:pt-48
          ' >
            
            <div className='obsolute top-2/4 left-2/4 w-full'>
              <div className='text-center'>
                <h1 className='text-white font-sans font-black uppercase tracking-widest text-7xl pb-10 max-w-screen-lg m-auto' >Page Not Found</h1>
                <p className='text-white fon-sans leading-10 text-lg max-w-2xl m-auto'>We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our.</p>
              </div>
            </div>
          
          </section>
    </div>
  )
}