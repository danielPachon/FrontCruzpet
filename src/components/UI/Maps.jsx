import { Map, GoogleApiWrapper, Marker  } from "google-maps-react"
import React, { Component } from 'react'
class Maps extends Component {
    
    render() {      
        return (
            <Map
                google = {this.props.google}
                style = {{width:this.props.tamaño + '%' , height: '100%'}}
                zoom = {15}

                initialCenter = { {
                        lat: 4.541114,
                        lng: -75.668008
                    }
                }
                
                >
                <Marker
                    icon={{
                        url: "http://maps.google.com/mapfiles/ms/icons/blue.png",
                        
                        // size: new window.google.maps.Size(488,349),      // original image size
                        // scaledSize: new window.google.maps.Size(64, 40), // desired image size
                        // origin: new window.google.maps.Point(0, 0),
                        // anchor: new window.google.maps.Point(32, 40)
                    }}
                    name='CruzPet'
                    position={{ lat: 4.541114, lng: -75.668008 }}
                    title='Comercio y Turismo'
                    
                />

                {/* <Marker
                    name="Dolores park"
                    position={{ lat: 37.759703, lng: -122.428093 }}
                /> */}
                
                
            </Map>
        )
    }
}
// const google = window.google

export default GoogleApiWrapper ({
    apiKey: 'AIzaSyBOOi1To8VHOIrjUDgEp1YmpbuaMwdwC-8'
}) (Maps)

// apiKey: AIzaSyBOOi1To8VHOIrjUDgEp1YmpbuaMwdwC-8
// apiKey: AIzaSyDKvOka2VOKRJOm5pch0ch6rjeP2gy-8Fc


// Archivo JSON - Ubicaciones (Pintar las ubicaciones en el map)

// Coordenadas de la ubicación (Longitud - Latitud)
