import { Map, GoogleApiWrapper, Marker  } from "google-maps-react"
import React, { Component } from 'react'
class MapsEpsa extends Component {
    
    render() {      
        return (
            <Map
                google = {this.props.google}
                style = {{width:this.props.tamaño + '%' , height: '100%'}}
                zoom = {16}

                initialCenter = { {
                        lat: 4.541114,
                        lng: -75.668008
                    }
                }
                >
                <Marker
                    icon={{
                        url: "https://res.cloudinary.com/dadzakyw1/image/upload/v1655903473/Logos/jnte2qfqbihga2oifus3_yuzlet.png",
                        
                        size: new window.google.maps.Size(488,349),      // original image size
                        scaledSize: new window.google.maps.Size(40, 40), // desired image size
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(32, 40)
                    }}
                    name='CruzPet'
                    position={{ lat: 4.541114, lng: -75.668008 }}
                    title='Comercio y Turismo'
                    
                />      
            </Map>
        )
    }
}
// const google = window.google

export default GoogleApiWrapper ({
    apiKey: 'AIzaSyBOOi1To8VHOIrjUDgEp1YmpbuaMwdwC-8'
}) (MapsEpsa)

// apiKey: AIzaSyBOOi1To8VHOIrjUDgEp1YmpbuaMwdwC-8
// apiKey: AIzaSyDKvOka2VOKRJOm5pch0ch6rjeP2gy-8Fc


// Archivo JSON - Ubicaciones (Pintar las ubicaciones en el map)

// Coordenadas de la ubicación (Longitud - Latitud)
