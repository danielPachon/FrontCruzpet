import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"

export default function NavBarEPSA() {
  const [open, setOpen] = useState(false)
  const [nombre, setNombre] = useState("CruzPet EPSA")
  const [imagen, setImagen] = useState("https://res.cloudinary.com/dadzakyw1/image/upload/v1655903473/Logos/jnte2qfqbihga2oifus3_yuzlet.png")

  const Menus = [
    { id: 0, title: "Dashboard", src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1655903303/Iconos/sl4awmnzyuo5xmsoz8mb_ogfn5o.png", to: '/Admin' },
    { id: 1, title: "Ubicacion", src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1655903302/Iconos/phgahoux288maiz7l9n7_wv5lza.png", to: '/Ubicacion' }, //Barrios, Ciudades, Departamento, Direcciones
    { id: 2, title: "Planes", src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1655903302/Iconos/amll72nngx2jjzeawta4_a8bkzw.png", to: '/Planes' }, //Beneficios
    { id: 3, title: "Productos", src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1655903302/Iconos/hnotjtxu4hqg0x372z2d_p0gcgz.png", to: '/ListadoProductos' },//Calificaciones
    { id: 4, title: "Clientes", src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1655903302/Iconos/ozkbqo8ptz2yndjrpnce_trdnqx.png", to: '/UsuariosEpsa' },//Mascota, Carnet de vacunacion, Historia Clinica, Formulas, Vacunas
    { id: 5, title: "Veterinarios", src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1655903302/Iconos/hckmvmdif6e5nqjngjbd_jsic63.png", to: '/VeterinarioEpsa' },//Especialidad
    { id: 6, title: "Citas", src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1655903303/Iconos/xradmfxrfkv0s3f7bwig_sdwiqi.png", to: '/Registrar/Citas/Usuario' },
    // { id: 7, title: "Recibos", src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1655903301/Iconos/debwnhk8z1j4hq70usnm_u40vtd.png", to: '/Recibos' },
    { id: 7, title: "IPSA", src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1655903302/Iconos/gcog7spq1afqhagnm0sj_mlexyo.png", to: '/ListadoIpsa' },
    { id: 8, title: "Post", src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1655903302/Iconos/c7rd12d2jteznnbbii2k_radrqg.png", to: '/ListadoPosts' },
    { id: 9, title: "Otros", src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1655903302/Iconos/dzrnla1x5nu5skrokzdt_vjga0i.png", to: '/Otros' },//TipoMascota, TipoSangre
    { id: 10, title: "Admins", src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1655903303/Iconos/vxlbj7wk1enzjd3v8ssk_m9ptyy.png", to: '/Listado/Admins' },
    { id: 11, title: "Ajustes", src: "https://res.cloudinary.com/dadzakyw1/image/upload/v1655903302/Iconos/g5iloshlnxpabzq4qsay_eq2djd.png", to: '/Configuracion/EPSA' },
  ];

  const handleSelect = (e) => {
    console.log(e.target.value)
  }

  const navigate = useNavigate()
  const handleCloseSS = (e) => {
    sessionStorage.clear()
    localStorage.clear()
    window.reload()
    navigate('/')
  }

  return (
    <div className="fixed flex z-[9999999]">
      <div
        className={` ${open ? "w-72" : "w-20 "
          } bg-dark-purple h-screen 2xl:h-screen p-4 pt-8 relative duration-300`}
      >
        <img
          src="https://res.cloudinary.com/dadzakyw1/image/upload/v1655903301/Iconos/cixvd0axlevfzaaf3wqn_bz1wir.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={imagen}
            className={`cursor-pointer w-12 duration-500 ${open && "rotate-[360deg]"
              }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
              }`}
          >
            {nombre}
          </h1>
        </div>
        <ul className="md:pt-6 xl:pt-9">
          {Menus.map((Menu, index) => (
            <NavLink to={Menu.to} value={index} onClick={handleSelect}
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${index === parseInt(localStorage.getItem('color')) && "bg-light-white"} ${open ? "mt-[1px] xl:mt-[5px]" : "mt-2"}
              ${Menu.gap ? "mt-9" : "mt-2"} ${Menu.id === parseInt(localStorage.getItem('color')) ? "bg-light-white" : ""
              } `}
            >
              <img src={Menu.src} />
              <span to={Menu.to} className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </NavLink>
          ))}
          {/* <hr className={`${open ? "hidden" : "xl:flex 2xl:hidden  mt-5 bg-dark-purple"}`} /> */}
          <NavLink to={'/'}
            onClick={handleCloseSS}
            className='flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2 '>
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