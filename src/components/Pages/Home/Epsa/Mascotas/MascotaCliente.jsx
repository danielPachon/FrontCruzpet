import axios from "axios"
import { useRef } from "react"
import { useNavigate } from "react-router"

export const MascotaCliente = () => {

    const navigate = useNavigate()

    const cedulaCliente = useRef()

    const validarCampo = () => {

        if(cedulaCliente.current.value !== ""){
            axios.post("https://api.cruzpet.com:8443/v1.0/clientes/existenciacedula", {
                cedulaCliente:cedulaCliente.current.value
            }).then(() =>{ 
                
                navigate("/MascotasEpsa/ClinteListado/" + cedulaCliente.current.value)

            }).catch(() => {

                console.log("El cliente no esta registrado")

            })
        }else{

            console.log("El campo esta vacio")

        }

    }

    return(
        <>
            <label>Cedula Cliente</label>
            <input type="text" ref={cedulaCliente}/>
            <button type="button" onClick={() => validarCampo()}>Enviar</button>
        </>
    )

}