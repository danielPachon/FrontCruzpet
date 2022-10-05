import React, { useState } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NotFound } from './components/Pages/Others/NotFound'
import { Home } from './components/Pages/Home/Home'
import { HomeIpsa } from './components/Pages/Home/HomeIpsa'
import { Services } from './components/Pages/Others/Services'
import Contact from './components/Pages/Others/Contact'
import LoginAndLogout from './components/Pages/Crud/LoginAndLogout'
import { RegisterCita } from './components/Pages/Crud/Create/RegisterCita'
import { ModifyCita } from './components/Pages/Crud/Modify/ModifyCita'
import User  from './components/Pages/Profile/User'
import Pet from './components/Pages/Profile/Pet'
import { Veterinary } from './components/Pages/Profile/Veterinary'
import { ClinicalRecord } from './components/Pages/Crud/Create/ClinicalRecord'
import { RegisterVeterinary } from './components/Pages/Crud/Create/RegisterVeterinary'
import { Admin } from './components/Pages/Others/Admin'
import { 
  PrivateRoute, 
  PrivateAdminRoute, 
  PrivateLogin, 
  PrivateVeterinaryRoute, 
  PrivateIpsaRoute, 
  PrivateHome,
} from './components/Helpers/PrivateRoute/PrivateRoute'
import Products from './components/Pages/Others/Products'
import { Config } from './components/Pages/Home/Ipsa/Config'
import { Offers } from './components/Pages/Home/Ipsa/Offers'
import { Veterinarians } from './components/Pages/Home/Ipsa/Veterinarians'
import Appointments from './components/Pages/Home/Ipsa/Appointments'
import Chat from './components/UI/Chat'
import FormularioSociales from './components/Pages/Crud/formularios/FormularioSociales'
import { gapi } from "gapi-script";
import FormularioCambioContra from './components/Pages/Crud/recuperar_contra/FormularioCambioContra'
import { UsuarioEpsa } from './components/Pages/Home/Epsa/Clientes/UsuarioEpsa'
import { UsuarioActualizarEpsa } from './components/Pages/Home/Epsa/Clientes/UsuarioActualizarEpsa'
import { UsuarioCrearEpsa } from './components/Pages/Home/Epsa/Clientes/UsuarioCrearEpsa'
import { ListadoVeterinarios } from './components/Pages/Home/Epsa/Veterinarios/ListadoVeterinarios'
import { ActualizarVeterinarios } from './components/Pages/Home/Epsa/Veterinarios/ActualizarVeterinarios'
import { HomeUbicacion } from './components/Pages/Home/Epsa/Ubicacion/HomeUbicacion'
import { ListadoBarrios } from './components/Pages/Home/Epsa/Ubicacion/Barrios/ListadoBarrios'
import { ListadoCiudades } from './components/Pages/Home/Epsa/Ubicacion/Ciudades/ListadoCiudades'
import { ListadoDepartamentos } from './components/Pages/Home/Epsa/Ubicacion/Departamentos/ListadoDepartamentos'
import { ListadoDirecciones } from './components/Pages/Home/Epsa/Ubicacion/Direcciones/ListadoDirecciones'
import { CrearVeterinarioEpsa } from './components/Pages/Home/Epsa/Veterinarios/CrearVeterinarioEpsa'
import { ListadoRazas } from './components/Pages/Home/Epsa/Other/Razas/ListadoRazas'
import { ListadoServicios } from './components/Pages/Home/Epsa/Other/Servicios/ListadoServicios'
import { ListadoGeneros } from './components/Pages/Home/Epsa/Other/Generos/ListadoGeneros'
import { ListadoMedicamentos } from './components/Pages/Home/Epsa/Other/Medicamentos/ListadoMedicamentos'
import { ListadoPlanes } from './components/Pages/Home/Epsa/Other/Planes/ListadoPlanes'
import { ListadoMascotas } from './components/Pages/Home/Epsa/Mascotas/ListadoMascotas'
import { EditarMascota } from './components/Pages/Home/Epsa/Mascotas/EditarMascota'
import { CrearMascota } from './components/Pages/Home/Epsa/Mascotas/CrearMascota'
import { EditarIpsas } from './components/Pages/Home/Epsa/IPSA/EditarIpsas'
import { ListadoIpsas } from './components/Pages/Home/Epsa/IPSA/ListadoIpsas'
import { ListadoFormulas } from './components/Pages/Home/Epsa/Other/Formulas/ListadoFormulas'
import { PerfilUsuario } from './components/Pages/Home/Epsa/Clientes/PerfilUsuario'
import { Other } from './components/Pages/Home/Epsa/Other/Other'
import { CrearIpsa } from './components/Pages/Home/Epsa/IPSA/CrearIpsa'
import { ActualizarBarrio } from './components/Pages/Home/Epsa/Ubicacion/Barrios/ActualizarBarrio'
import { CrearBarrio } from './components/Pages/Home/Epsa/Ubicacion/Barrios/CrearBarrio'
import { EditarCiudades } from './components/Pages/Home/Epsa/Ubicacion/Ciudades/EditarCiudades'
import { CrearCiudad } from './components/Pages/Home/Epsa/Ubicacion/Ciudades/CrearCiudad'
import { EditarDepartamento } from './components/Pages/Home/Epsa/Ubicacion/Departamentos/EditarDepartamento'
import { CrearDepartamento } from './components/Pages/Home/Epsa/Ubicacion/Departamentos/CrearDepartamento'
import RegisterPet from './components/Pages/Home/Ipsa/RegisterPet'
import { CrearDireccion } from './components/Pages/Home/Epsa/Ubicacion/Direcciones/CrearDireccion'
import { EmitirRecibo } from './components/Pages/Home/Epsa/Recibos/EmitirRecibo'
import ClinicHistory from './components/Pages/Home/Ipsa/ClinicHistory'
import { ConfigEPSA } from './components/Pages/Home/Epsa/ConfigEPSA'
import { ListadoAdmin } from './components/Pages/Home/Epsa/Admin/ListadoAdmin'
import RegAppt from './components/Pages/Home/Ipsa/RegAppt'
import Availabilities from './components/Pages/Home/Ipsa/Availabilities'
import { ActualizarAdmin } from './components/Pages/Home/Epsa/Admin/ActualizarAdmin'
import { CrearAdmin } from './components/Pages/Home/Epsa/Admin/CrearAdmin'
import { ListadoProductos } from './components/Pages/Home/Epsa/Productos/ListadoProductos'
import { ActualizarProducto } from './components/Pages/Home/Epsa/Productos/ActualizarProducto'
import { CrearProducto } from './components/Pages/Home/Epsa/Productos/CrearProducto'
import { EditarMedicamento } from './components/Pages/Home/Epsa/Other/Medicamentos/EditarMedicamento'
import { CrearMedicamento } from './components/Pages/Home/Epsa/Other/Medicamentos/CrearMedicamento'
import { EditarGenero } from './components/Pages/Home/Epsa/Other/Generos/EditarGenero'
import { CrearGenero } from './components/Pages/Home/Epsa/Other/Generos/CrearGenero'
import { EditarPlan } from './components/Pages/Home/Epsa/Other/Planes/EditarPlan'
import { CrearRaza } from './components/Pages/Home/Epsa/Other/Razas/CrearRaza'
import { EditarRaza } from './components/Pages/Home/Epsa/Other/Razas/EditarRaza'
import { EditarServicio } from './components/Pages/Home/Epsa/Other/Servicios/EditarServicio'
import { CrearServicio } from './components/Pages/Home/Epsa/Other/Servicios/CrearServicio'
import { ListadoTipoSangre } from './components/Pages/Home/Epsa/TipoSangre/ListadoTipoSangre'
import { EditarTipoSangre } from './components/Pages/Home/Epsa/TipoSangre/EditarTipoSangre'
import { CrearTipoSangre } from './components/Pages/Home/Epsa/TipoSangre/CrearTipoSangre'
import { ListadoTipoMascota } from './components/Pages/Home/Epsa/Tipo Mascota/ListadoTipoMascota'
import { EditarTipoMascotas } from './components/Pages/Home/Epsa/Tipo Mascota/EditarTipoMascota'
import { CrearTipoMascota } from './components/Pages/Home/Epsa/Tipo Mascota/CrearTipoMascota'
import { ListadoEspecialidades } from './components/Pages/Home/Epsa/Especialidades/ListadoEspecialidades'
import { EditarEspecialidad } from './components/Pages/Home/Epsa/Especialidades/EditarEspecialidad'
import { CrearEspecialidad } from './components/Pages/Home/Epsa/Especialidades/CrearEspecialidad'
import { ListadoBeneficios } from './components/Pages/Home/Epsa/Beneficios/ListadoBeneficios'
import { EditarBeneficio } from './components/Pages/Home/Epsa/Beneficios/EditarBeneficio'
import { CrearBeneficio } from './components/Pages/Home/Epsa/Beneficios/CrearBeneficio'
import { ListadoPost } from './components/Pages/Home/Epsa/Post/ListadoPost'
import { EditarPost } from './components/Pages/Home/Epsa/Post/EditarPost'
import { CrearPost } from './components/Pages/Home/Epsa/Post/CrearPost'
import { AjusteAdmin } from './components/Pages/Home/Epsa/Ajustes/AjusteAdmin'
import { MascotaCliente } from './components/Pages/Home/Epsa/Mascotas/MascotaCliente'
import { ListadoMascotaCliente } from './components/Pages/Home/Epsa/Mascotas/ListadoMascotaClietne'
import { ListadoMascotaFormulas } from './components/Pages/Home/Epsa/Other/Formulas/ListadoMascotasFormulas'
import { ClienteFormulas } from './components/Pages/Home/Epsa/Other/Formulas/ClienteFormulas'
import Vaccination from './components/Pages/Home/Ipsa/Vaccination'
import VaccinationCard from './components/Pages/Home/Ipsa/VaccinationCard'
import { Identificacion } from './components/Pages/Home/Epsa/Other/Identificacion/Identificacion'
import RegClinicHistory from './components/Pages/Home/Ipsa/RegClinicHistory'
import { BuscarHistoriaClinica } from './components/Pages/Home/Epsa/HistoriaClinica/BuscarHistoriaClinica'
import { ListadoMascotasUsuario } from './components/Pages/Home/Epsa/HistoriaClinica/ListadoMascotasUsuario'
import { ListadoHistoriaClinica } from './components/Pages/Home/Epsa/HistoriaClinica/ListadoHistoriaClinica'
import RegisterHistory from './components/Pages/Home/Ipsa/RegisterHistory'
import RegisterFormulas from './components/Pages/Home/Ipsa/RegisterFormulas'
import { ClienteIdentificacion } from './components/Pages/Home/Epsa/Other/Identificacion/ClienteIdentificacion'
import { ListadoMascotasIdentificacion } from './components/Pages/Home/Epsa/Other/Identificacion/ListadoMascotasIdentificacion'

function App() {
  React.useEffect(() => {
    Aos.init({duration:0 })
  },[]);

  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:"578406717752-v0931kq24j650p8ef7hm54pdrcd63ruk.apps.googleusercontent.com",
      plugin_name: "cruzpet"
    })
  })
  
  return (
    <div>
      <Chat/>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route element={PrivateRoute()}>
            <Route exact path="/Perfil/Usuario" element={<User/>}/>
            <Route exact path="/Perfil/Mascota" element={<Pet/>}/>
          </Route>
          <Route element={PrivateAdminRoute()}>
            <Route exact path="/Admin" element={<Admin/>}/>
            <Route exact path="/UsuariosEpsa" element={<UsuarioEpsa/>}/>
            <Route exact path='/VeterinarioEpsa' element={<ListadoVeterinarios/>}/>
            <Route exact path='/VeterinarioEpsa/crear' element={<CrearVeterinarioEpsa/>}/>
            <Route exact path="/Ubicacion" element={<HomeUbicacion/>}/>
            <Route exact path="/Barrios" element={<ListadoBarrios/>}/>
            <Route exact path="/Barrios/:id" element={<ActualizarBarrio/>}/>
            <Route exact path="/BarriosCrear/" element={<CrearBarrio/>}/>
            <Route exact path="/Ciudades" element={<ListadoCiudades/>}/>
            <Route exact path="/CrearCiudad" element={<CrearCiudad/>}/>
            <Route exact path="/Ciudades/:id" element={<EditarCiudades/>}/>
            <Route exact path="/Producto/:id" element={<ActualizarProducto/>}/>
            <Route exact path="/Departamentos" element={<ListadoDepartamentos/>}/>
            <Route exact path="/Departamentos/:id" element={<EditarDepartamento/>}/>
            <Route exact path="/DepartamentosCrear" element={<CrearDepartamento/>}/>
            <Route exact path="/Direcciones" element={<ListadoDirecciones/>}/>
            <Route exact path="/ListadoProductos" element={<ListadoProductos/>}/>
            <Route exact path="/CrearProducto" element={<CrearProducto/>}/>
            <Route exact path="/DireccionesCrear" element={<CrearDireccion/>}/>
            <Route exact path="/Razas" element={<ListadoRazas/>}/>
            <Route exact path="/Razas/Crear" element={<CrearRaza/>}/>
            <Route exact path="/Razas/Actualizar/:id" element={<EditarRaza/>}/>
            <Route exact path="/Servicios/Epsa" element={<ListadoServicios/>}/>
            <Route exact path="/Servicios/Epsa/:id" element={<EditarServicio/>}/>
            <Route exact path="/Servicios/Epsa/Crear" element={<CrearServicio/>}/>
            <Route exact path="/Generos" element={<ListadoGeneros/>}/>
            <Route exact path="/Generos/:id" element={<EditarGenero/>}/>
            <Route exact path="/Generos/Crear" element={<CrearGenero/>}/>
            <Route exact path="/Medicamentos/Crear" element={<CrearMedicamento/>}/>
            <Route exact path="/Medicamentos/:id" element={<EditarMedicamento/>}/>
            <Route exact path="/Medicamentos" element={<ListadoMedicamentos/>}/>
            <Route exact path="/Planes" element={<ListadoPlanes/>}/>
            <Route exact path="/Planes/:id" element={<EditarPlan/>}/>
            <Route exact path="/VeterinarioEpsa/:cedula" element={<ActualizarVeterinarios/>}/>
            <Route exact path="/UsuarioEpsa/:cedula" element={<UsuarioActualizarEpsa/>}/>
            <Route exact path="/PerfilUsuario/:cedula" element={<PerfilUsuario/>}/> 
            <Route exact path="/UsuarioEpsa/crear" element={<UsuarioCrearEpsa/>}/>
            <Route exact path="/Especialidad/Crear" element={<CrearEspecialidad/>}/>
            <Route exact path="/Especialidad/Act/:id" element={<EditarEspecialidad/>}/>
            <Route exact path="/ListadoEspecialidades" element={<ListadoEspecialidades/>}/>
            <Route exact path="/Formulas" element={<ListadoFormulas/>}/>
            <Route exact path="/EditarIpsa/:rut" element={<EditarIpsas/>}/>
            <Route exact path="/CrearIpsa" element={<CrearIpsa/>}/>
            <Route exact path="/MascotasEpsa" element={<ListadoMascotas/>}/>
            <Route exact path="/Otros" element={<Other/>}/>
            <Route exact path="/Recibos" element={<EmitirRecibo/>}/>
            <Route exact path="/MascotasEpsa/crear" element={<CrearMascota/>}/>
            <Route exact path="/MascotasEpsa/:identificacion" element={<EditarMascota/>}/>
            <Route exact path="/ListadoIpsa" element={<ListadoIpsas/>}/>
            <Route exact path="/EditarIpsa/:rut" element={<EditarIpsas/>}/>
            <Route exact path="/CrearIpsa" element={<CrearIpsa/>}/>
            <Route exact path="/MascotasEpsa" element={<ListadoMascotas/>}/>
            <Route exact path="/MascotasEpsa/Cliente" element={<MascotaCliente/>}/>
            <Route exact path="/MascotasEpsa/ClienteListado/:cedula" element={<ListadoMascotaCliente/>}/>
            <Route exact path="/Configuracion/EPSA" element={<ConfigEPSA/>}/>
            <Route exact path="/Otros" element={<Other/>}/>
            <Route exact path="/Recibos" element={<EmitirRecibo/>}/>
            <Route exact path="/MascotasEpsa/crear" element={<CrearMascota/>}/>
            <Route exact path="/Listado/Admins" element={<ListadoAdmin/>}/>
            <Route exact path="/Actualizar/Admins/:id" element={<ActualizarAdmin/>}/>
            <Route exact path="/Crear/Admins" element={<CrearAdmin/>}/>
            <Route exact path="/MascotasEpsa/:identificacion" element={<EditarMascota/>}/>
            <Route exact path="/TiposSangre/" element={<ListadoTipoSangre/>}/>
            <Route exact path="/TiposSangre/Editar/:id" element={<EditarTipoSangre/>}/>
            <Route exact path="/TiposSangre/Crear/" element={<CrearTipoSangre/>}/>
            <Route exact path="/TiposMascota/" element={<ListadoTipoMascota/>}/>
            <Route exact path="/TiposMascota/Editar/:id" element={<EditarTipoMascotas/>}/>
            <Route exact path="/TiposMascota/Crear/" element={<CrearTipoMascota/>}/>
            <Route exact path="/ListadoBeneficios" element={<ListadoBeneficios/>}/>
            <Route exact path="/Beneficio/Act/:id" element={<EditarBeneficio/>}/>
            <Route exact path="/Beneficio/Crear/" element={<CrearBeneficio/>}/>
            <Route exact path="/ListadoPosts" element={<ListadoPost/>}/>
            <Route exact path="/Post/Act/:id" element={<EditarPost/>}/>
            <Route exact path="/Post/Crear/" element={<CrearPost/>}/>
            <Route exact path="/Ajustes/:id" element={<AjusteAdmin/>}/>
            <Route exact path="/ListadoFormulas/:identidad" element={<ListadoFormulas/>}/>
            <Route exact path="/ListadoFormulas/Mascota/:cedula" element={<ListadoMascotaFormulas/>}/>
            <Route exact path="/ClienteFormulas" element={<ClienteFormulas/>}/>
            <Route exact path='/Historia/Clinica' element={<BuscarHistoriaClinica/>} />
            <Route exact path='/ListadoHistorias/Mascota/:cedula' element={<ListadoMascotasUsuario/>} />
            <Route exact path='/ListadoHistorias/:identidad' element={<ListadoHistoriaClinica/>} />
            <Route exact path='/ClienteIdentificacion' element={<ClienteIdentificacion/>} />
            <Route exact path='/ListadoMascotaIdentificacion/:cedula' element={<ListadoMascotasIdentificacion/>} />
            <Route exact path='/CarnetIdentificacion/:id' element={<Identificacion/>} />

          </Route>
          <Route element={PrivateVeterinaryRoute()}>
            <Route exact path="/Perfil/Veterinario" element={<Veterinary/>}/>
          </Route>
          <Route element={PrivateIpsaRoute()}>
            <Route exact path="/Registro_medico" element={<ClinicalRecord/>}/>
            <Route exact path="/Registro_Veterinario" element={<RegisterVeterinary/>}/>
            <Route exact path="/Veterinarios" element={<Veterinarians/>}/>
            <Route exact path="/Admin/Ipsa/offers" element={<Offers/>}/>
            <Route exact path="/Admin/Ipsa" element={<HomeIpsa/>}/>
            <Route exact path="/Admin/Ipsa/offers" element={<Offers/>}/>
            <Route exact path="/Admin/Ipsa/veterinarians" element={<Veterinarians/>}/>
            <Route exact path="/Admin/Ipsa/config" element={<Config/>}/>
            <Route exact path="/Admin/Ipsa/appointments" element={<Appointments/>}/>
            <Route exact path="/Admin/Ipsa/Register/Pet" element={<RegisterPet/>}/>
            <Route exact path="/Admin/Ipsa/Register/Clinic/History" element={<RegClinicHistory/>} />
            <Route exact path="/Admin/Ipsa/Clinic/History" element={<ClinicHistory/>}/>
            <Route exact path="/Admin/Ipsa/Register/Appointments" element={<RegAppt/>}/>
            <Route exact path="/Admin/Ipsa/Availabilities" element={<Availabilities/>}/>
            <Route exact path="/Admin/Ipsa/Vaccination" element={<Vaccination/>} /> 
            <Route exact path="/Admin/Ipsa/Vaccination/:cedula" element={<VaccinationCard/>} />
            <Route exact path="/Admin/Ipsa/Register/History/:identidad" element={<RegisterHistory/>} />
            <Route exact path="/Admin/Ipsa/Register/Formulas" element={<RegisterFormulas/>} />
          </Route>
          <Route element={PrivateLogin()}>
            <Route exact path="/Login" element={<LoginAndLogout/>}/>
            <Route exact path='/Login/complemento' element={<FormularioSociales/>}/>
          </Route>
          <Route element={PrivateHome()} >
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/Servicios" element={<Services/>}/>
            <Route exact path="/Contacto" element={<Contact/>}/>
          </Route>
          <Route exact path="/Login" element={<LoginAndLogout/>}/>
          <Route exact path='/encode/:code' element={<FormularioCambioContra/>}/>
          <Route exact path="/Servicios" element={<Services/>}/>
          <Route exact path="/Contacto" element={<Contact/>}/>
          <Route exact path="/Registro/Cita" element={<RegisterCita/>}/>
          <Route exact path="/Consultar/Cancelar/Cita" element={<ModifyCita/>}/>
          <Route exact path="/Productos" element={<Products/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;