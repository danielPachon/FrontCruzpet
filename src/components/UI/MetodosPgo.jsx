import React, { useState } from 'react'
import axios from 'axios'
import { useRef } from 'react'
import { useNavigate } from 'react-router'

export function MetodosPgo({precio}) {
  const username = localStorage.getItem("username")

  const [cod,setCod] = useState('')
  const [CedulaCliente, setCedulaCliente] = useState("")
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const rolUser = localStorage.getItem("rolUser")

  const formulario = useRef()
  const navigate = useNavigate()

  function codigo() {
    axios.post("https://api.cruzpet.com:8443/v1.0/clientes/buscarcliente",{
      username:username,
    }).then(function(resp){
      setCedulaCliente(resp.data.cedulaUsuario)
      setName(resp.data.nombres+resp.data.apellidos)
      setEmail(resp.data.email)
    })
  
    axios.post("https://api.cruzpet.com:8443/v1.0/codigoreferencia/crear",{
      codigoReferenciaCliente: {
        cedulaCliente: CedulaCliente
      }
    }).then(function(resp){
      setCod(resp.data.codigoReferencia)
    })
  }

  const sendcodigo =()=>{
    formulario.current.submit()
  }

  function ActivarTiempo(){
    if(rolUser === null){

      navigate('/Login')

    }else{
      codigo()
      setTimeout(sendcodigo,3000);
    }
  }

  return (
    <div>
      <form action="https://checkout.wompi.co/p/" method="GET" ref={formulario}>
        <input type="hidden" name="public-key" value="pub_prod_YeM8CFSqw9mkWha1YEZMUKG95bAR8YpZ" />
        <input type="hidden" name="currency" value="COP" />
        <input type="hidden" name="amount-in-cents" value={precio} />
        <input type="hidden" name="reference" value={cod} />

        <input type="hidden" name="customer-data:email" value={email} />
        <input type="hidden" name="customer-data:full-name" value={name} />
        <input type="hidden" name="customer-data:legal-id" value={CedulaCliente} />

        <input type="hidden" name="redirect-url" value="https://www.cruzpet.com" />
      </form>

      <div className='flex items-center justify-center'>
      <div className='flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-tr focus:ring-4 focus:ring-green-200  hover:from-blue-600 hover:to-green-400 rounded-lg w-auto'>
        <button onClick={() => ActivarTiempo()} className="relative inline-flex items-center justify-center py-[9px] px-5 my-[0.125rem]  mx-[0.125rem] overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-white hover:bg-gradient-to-tr hover:from-blue-600 hover:to-green-400 hover:text-white">
          Adquirir
        </button>
      </div>
    </div>
    </div>
  )
}
