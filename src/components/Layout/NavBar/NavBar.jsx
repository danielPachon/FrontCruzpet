import { useState, useEffect } from "react"
import { NavLink, useNavigate  } from "react-router-dom"
import axios from "axios"

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const [nombre, setNombre] = useState("")

  const Menus = [
    {id: 0, title: "Dashboard", src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1655903302/Iconos/k1pk3v9ew7uiptqqpvg2_oqscg5.png", to: '/Admin/Ipsa/' },
    {id: 1, title: "Veterinarios", src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1656084709/Iconos/icons8-veterinarian-male-24_dcciwc.png", to: '/Admin/Ipsa/veterinarians' },
    {id: 2, title: "Disponibilidades", src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1656083918/Iconos/icons8-24-hours-24_g9av3l.png", to: '/Admin/Ipsa/Availabilities' },
    {id: 3, title: "Registrar cita", src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1656084057/Iconos/icons8-appointments-24_c4ytf5.png", to: '/Admin/Ipsa/Register/Appointments' },
    {id: 4, title: 'Historia clínica', src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1656084184/Iconos/icons8-history-book-24_vaubya.png", to: '/Admin/Ipsa/Clinic/History'},
    {id: 5, title: 'Registrar mascota', src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1656084307/Iconos/icons8-mascotas-24_opj8he.png", to: '/Admin/Ipsa/Register/Pet'},
    {id: 6, title: "Citas médicas", src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1656085508/Iconos/icons8-planificador-24_uy2mwa.png", to: '/Admin/Ipsa/appointments' },
    {id: 7, title: "Productos", src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1655903302/Iconos/hnotjtxu4hqg0x372z2d_p0gcgz.png", to: '/Admin/Ipsa/Offers' },
    {id: 8, title: "Ajustes", src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1655903302/Iconos/g5iloshlnxpabzq4qsay_eq2djd.png", to: '/Admin/Ipsa/config' },
  ];

  useEffect(() => {
    axios.post('https://api.cruzpet.com:8443/v1.0/ipsas/ipsarut',{
      rut: localStorage.getItem('rut')
    }).then((response) => {
      setNombre(response.data.nombre)
    })
  },[])

  const handleSelect = (e) => {
    console.log(e.target.value)
    localStorage.setItem('color', parseInt(e.target.value))
  }

  let navigate = useNavigate()
  const handleCloseSS = (e) => {
    sessionStorage.clear()
    localStorage.clear()
    navigate('/')
    window.location.reload(true)
  }
    
  return (
    <div className="fixed h-screen flex z-[9999]">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-full p-4 pt-8 relative duration-300`}
      >
        <img
          src="https://res.cloudinary.com/dadzakyw1/image/upload/v1655903301/Iconos/cixvd0axlevfzaaf3wqn_bz1wir.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={localStorage.getItem('img')}
            className={`cursor-pointer w-12 duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            {nombre}
          </h1>
        </div>
        <ul className="md:pt-6 xl:pt-9">
          {Menus.map((Menu, index ) => (
            <NavLink to={Menu.to}
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${index === parseInt(localStorage.getItem('color')) && "bg-light-white"} ${open ? "mt-[1px] xl:mt-[5px]" : "mt-2"}
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                Menu.id === parseInt(localStorage.getItem('color')) ? "bg-light-white" : ""
              } `}
            >
              <img src={Menu.src} />
              <button value={Menu.id} onClick={handleSelect} className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </button>
            </NavLink>
          ))}
          <hr className={`${open ? "hidden" : "xl:flex 2xl:hidden  mt-5 bg-dark-purple"}`} />
          <NavLink to={'/'}
            onClick={handleCloseSS}
            className='flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2'>
              <img src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655903303/Iconos/tttdlxbpn905whevy5ks_vdgm6p.png' />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Cerrar sesión
              </span>
          </NavLink>
        </ul>
      </div>
    </div>
  )
}