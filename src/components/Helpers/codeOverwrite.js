/* Preventing the default action of the enter key. */
window.addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
        event.preventDefault()
    }
}, false)

const urls = () => {
  const urlClientes = await fetch("https://api.cruzpet.com:8443/v1.0/clientes/login", {
  method: "POST",
  
      headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
      email,
      password,
  }),
})
  
const urlAdministradores = await fetch("https://api.cruzpet.com:8443/v1.0/administradores/login", {
  method: "POST",
  
      headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
      correAdministrador,
      passwordAdministrador,
  }),
})

const urlVeterinarios = await fetch("https://api.cruzpet.com:8443/v1.0/veterinarios/login", {
  method: "POST",
  
      headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
      correoVeterinario,
      passwordVeterinario,
  }),
})
  
const urlIpsas = await fetch("https://api.cruzpet.com:8443/v1.0/ipsas/login", {
  method: "POST",
  
      headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
      correoIpsa,
      passwordIpsa,
  }),
})

}

const trash = () => {
  <div className="w-full sm:mx-10 xl:mx-0 flex flex-col flex-wrap">
    <div className='mx-4 my-6 flex flex-wrap justify-center'> 
      {/* <Calendar/> */}
      {disponibilidad.map(disp =>   
        <div className="time-card">
          <div className="day-div">
            {nombreDia}
          </div>
          <div className="main-div">
            <div className="month-year-div" id='timeInterval' key={disp.idIntervalo} value={disp.tiempoIntervalo} onClick={handleFecha} >{fecha}<br/>{disp.tiempoIntervalo}</div>
            <button type="button" value={disp.tiempoIntervalo} onClick={handleFecha} className="flex btn">Agendar</button>
          </div>
        </div>
      )}
    </div>
  </div>

  

}

const trash2 = () => {
  <div className="lg:flex lg:w-full">
    <div className="lg:mr-2 lg:w-full my-2">
      <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Veterinario *</label>
      <select id="large" onChange={handleVeterinary} onBlur={handleVeterinary} className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option  value="" >Seleccione</option>
        {ipsaVet.map(vet => <option key={vet.cedVeterinario} value={vet.cedVeterinario} >{vet.nombres+" "+vet.apellidos}</option>)}
      </select>
    </div>
    <div className="lg:ml-2 lg:w-full my-2">
      <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Veterinaria *</label>
      <select id="large" className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value={rutIpsa}  >{nombreIpsa}</option>
        {dptIpsa.map(ipsa => <option key={ipsa.rut} value={ipsa.rut} >{ipsa.nombre}</option>)}
      </select>
    </div>
  </div>
}

const trash3 = () => {
  // import FullCalendar from '@fullcalendar/react' // must go before plugins
// import dayGridPlugin from '@fullcalendar/daygrid'
// import AddEventModal from './AddEventModal'
// import axios from 'axios'
// import moment from 'moment'
// import esLocale from '@fullcalendar/core/locales/es'
// import listPlugin from '@fullcalendar/list'

// export default function Appointments () {

//   // const [modalOpen, setModalOpen] = useState(false)
//   const [title, setTitle] = useState("")
//   const [fecha, setFecha] = useState("")
//   const [datos, setDatos] = useState([])
//   const [events, setEvents] = useState([])
//   const calendarRef = useRef(null)

//   // const onEventAdded = (event) => {
//   //   let calendarApi = calendarRef.current.getApi()
//   //   calendarApi.AddEvent(event)
//   // }

//   // async function handleEventAdd (data) {
//   //   await axios.post("", data.event)
//   // }
  
//   async function handleDatesSet (data) {
//     const response = await axios.get("https://api.cruzpet.com:8443/v1.0/citas/")
//     setDatos(response.data)
//     console.log(response.data)
//     console.log("nombreMascota", response.data[0].citaMascota.nombreMascota)
//     setTitle(response.data[0].citaMascota.nombreMascota)
//     console.log("fecha", response.data[0].fecha)
//     setFecha(response.data[0].fecha)
//     console.log("fecha2", response.data[0].fecha.split('T')[0])
//   }
  

//   return (
//     <div>
//       <Navbar/>
//       {/* <button onClick={() => setModalOpen(false)}>Agregar Evento</button> */}
//       <div style={{ postion: 'relative', zIndex: 0, width: '100%', height: '100%', padding: '2rem'}}>
//         <FullCalendar
//           ref={calendarRef}
//           locale={esLocale}
//           plugins={[ dayGridPlugin ]}
//           initialView="dayGrid"
//           // eventAdd={(event) => handleEventAdd(event)}
//           // events = {events}
//           datesSet={(date) => handleDatesSet(date)}
//           timeZone='COT'
//           events={[
//             { title: title, start: '2022-05-22', editable: true },
//             { title: title, start: fecha, editable: true }
//           ]}
//           height={550}
//           />
//       </div>
//       {/* <AddEventModal 
//           isOpen={modalOpen}
//           onClose={() => setModalOpen(false)}
//           onEventAdded={event => onEventAdded(event)}
//         /> */}
//     </div>
//   )
// }
//   // events: [
//   //   {
//   //     title: 'BCH237',
//   //     start: '2019-08-12T10:30:00',
//   //     end: '2019-08-12T11:30:00',
//   //     extendedProps: {
//   //       department: 'BioChemistry'
//   //     },
//   //     description: 'Lecture'
//   //   }
//   //   // more events ...
//   // ]
}

const trash4 = () => {
  // export default class Appointments extends React.Component {
//   // const calendarRef = useRef(null)
//   calendarRef = React.createRef()
  
//   render() {
    
//     // const [modalOpen, setModalOpen] = useState(false)
    
//     return (
//       <div>
//           <Navbar/>
//           {/* <button onClick={() => setModalOpen(true)}>Agregar Evento</button> */}
//           <div>
//             <FullCalendar
//               ref={this.calendarRef}
//               plugins={[ dayGridPlugin ]}
//               initialView="dayGridMonth"
//               // eventAdd={(event) => handleEventAdd(event)}
//               // dateSet={(date)}
//               events={[
//                 { title: 'event 1', date: '2022-05-22' },
//                 { title: 'event 2', date: '2022-05-22' }
//               ]}
//               height={600}
//             />
//           </div>
//           {/* <AddEventModal 
//             isOpen={modalOpen}
//             onClose={() => setModalOpen(false)}
//             onEventAdded={event => onEventAdded(event)}
//           /> */}
//       </div>
//     )
//   }
// }
}

// const trash5 = () => {
//   <div id='Months' className="hidden w-full my-12 justify-center text-center item-center h-full flex-wrap">
//               <label htmlFor="large" className="w-full block mb-2 text-1xl font-medium text-gray-900 dark:text-gray-400">Selecciona un mes del calendario</label>
//               <button type="button" value='01' onClick={getMonth} onMouseDown={e => setMonth(e.target.value)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Enero</button>
//               <button type="button" value='02' onClick={getMonth} onMouseDown={e => setMonth(e.target.value)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Febrero</button>
//               <button type="button" value='03' onClick={getMonth} onMouseDown={e => setMonth(e.target.value)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Marzo</button>
//               <button type="button" value='04' onClick={getMonth} onMouseDown={e => setMonth(e.target.value)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Abril</button>
//               <button type="button" value='05' onClick={getMonth} onMouseDown={e => setMonth(e.target.value)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Mayo</button>
//               <button type="button" value='06' onClick={getMonth} onMouseDown={e => setMonth(e.target.value)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Junio</button>
//               <button type="button" value='07' onClick={getMonth} onMouseDown={e => setMonth(e.target.value)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Julio</button>
//               <button type="button" value='08' onClick={getMonth} onMouseDown={e => setMonth(e.target.value)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Agosto</button>
//               <button type="button" value='09' onClick={getMonth} onMouseDown={e => setMonth(e.target.value)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Septiembre</button>
//               <button type="button" value='10' onClick={getMonth} onMouseDown={e => setMonth(e.target.value)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Octubre</button>
//               <button type="button" value='11' onClick={getMonth} onMouseDown={e => setMonth(e.target.value)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Noviembre</button>
//               <button type="button" value='12' onClick={getMonth} onMouseDown={e => setMonth(e.target.value)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Diciembre</button>
//             </div>
//             <div id='Days' className="hidden w-full my-12 justify-center text-center h-full flex-wrap">
//               <label className='w-1/5 flex justify-end text-1xl font-medium text-gray-900 dark:text-gray-400"'>Mes: {mes}</label>
//               <label htmlFor="large" className="w-3/5 block mb-2 text-1xl font-medium text-gray-900 dark:text-gray-400">Selecciona un día del calendario</label>
//               <button type="button" onClick={estadoCero} className='w-1/5 flex justify-start text-1xl font-medium text-gray-900 dark:text-gray-400"'>Volver</button>
//               <div className="w-3/5">
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='01' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='01' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">1</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='02' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='02' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">2</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='03' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='03' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">3</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='04' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='04' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">4</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='05' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='05' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">5</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='06' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='06' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">6</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='07' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='07' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">7</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='08' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='08' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">8</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='09' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='09' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">9</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='10' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='10' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">10</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='11' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='11' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">11</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='12' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='12' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">12</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='13' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='13' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">13</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='14' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='14' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">14</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='15' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='15' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">15</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='16' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='16' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">16</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='17' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='17' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">17</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='18' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='18' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">18</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='19' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='19' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">19</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='20' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='20' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">20</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='21' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='21' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">21</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='22' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='22' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">22</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='23' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='23' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">23</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='24' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='24' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">24</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='25' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='25' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">25</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='26' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='26' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">26</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='27' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='27' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">27</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='28' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='28' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">28</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='29' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='29' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">29</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='30' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='30' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">30</button></button>
//                 <button onClick={getDayMonth} onMouseDown={e => setDay(e.target.value)} type="button" value='31' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border--600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><button type="button" value='31' className="w-8 h-8 justify-center text-center flex items-center text-1xl font-bold">31</button></button>
//               </div>
//             </div>
//             <div id='Cards' className="hidden w-full justify-center text-center h-full flex-wrap">
//               <div className="w-full my-8 sm:mx-10 xl:mx-0 flex flex-col flex-between">
//                 <div className='w-full flex'>
//                   <label className='w-1/5 flex justify-end text-1xl font-medium text-gray-900 dark:text-gray-400"'>{fecha}</label>
//                   <label htmlFor="large" className="w-3/5 block mb-2 text-1xl font-medium text-gray-900 dark:text-gray-400">Selecciona un horario disponible</label>
//                   <button type="button" onClick={estadoUno} className='w-1/5 flex justify-start text-1xl font-medium text-gray-900 dark:text-gray-400"'>Volver</button>
//                 </div>
//                 <div className='my-6 flex flex-wrap justify-center'>
//                   {disponibilidad.map(disp =>
//                     <div className="time-card w-4/12 sm:w-3/12 lg:w-2/12 m-1">
//                       <div className="p-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
//                         <p className="w-full font-normal text-gray-700 dark:text-gray-400">{disp.tiempoIntervalo}</p>
//                         <button type="button" value={disp.tiempoIntervalo+','+nombreVet+','+nombreIpsa} onMouseDown={handleFecha} onClick={() => setShowModal(true)} className="flex btn">Ver</button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
// }

const hoal = () => {
  
                
              
                {/* <div className="lg:flex lg:w-full">
                  <div className="lg:mr-2 lg:w-full">
                    <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Tramite *</label>
                    <select onClick={handleProcedure} onBlur={handleProcedure} id="regional" className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value=""  >Seleccione</option>
                      <option value="Cita" >Cita</option>
                      <option value="Documentos" >Documentos</option>
                    </select>
                  </div>
                  <div className="lg:ml-2 lg:w-full">
                    <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Regional *</label>
                    <select id="regional" disabled className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option  value="Quindío" >Quindío</option>
                    </select>
                    
                  </div>
                </div> */}
                {/* <div className='flex justify-center my-4 w-full'>
                  <Button className='mx-3' type="submit" onMouseEnter={()=>setButton(false)} onMouseLeave={()=>setButton(true)} outline={button} gradientDuoTone="greenToBlue">
                  Solicitar
                  </Button>
                  <Button className='mx-4' type="button" onClick={esconder} onMouseEnter={()=>setBtn(false)} onMouseLeave={()=>setBtn(true)} outline={btn} gradientDuoTone="greenToBlue">
                  Volver
                  </Button>
                </div> */}
}

const status = () => {
  
  return (
    <>
      {/* Active */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
              <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
              </span>
              <span className="relative">
                  Activo
              </span>
          </span>
      </td>

      {/* Inactive */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
            <span aria-hidden="true" className="absolute inset-0 bg-red-200 opacity-50 rounded-full">
            </span>
            <span className="relative">
                Inactivo
            </span>
        </span>
</td>
    </>
  )
}

const trash5 = () => {
  useEffect(() => {
    axios.get('https://api.cruzpet.com:8443/v1.0/productos/' + id).then(response => {
      setNombreProducto(response.data.nombreProducto)
      setNombreProductoOriginal(response.data.nombreProducto)
      setPrecioProducto(response.data.precioproducto)
      setPrecioProductoOriginal(response.data.precioProductoOriginal)
      setUrlImage(response.data.rutaImagen)
      setTotalCalificacion(response.data.totalCalificacion)
      setCalificacion(response.data.calificacion)
    })    
  }, [1])
}



