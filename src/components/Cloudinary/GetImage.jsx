import React, {useEffect, useState}from 'react'
import { CloudinaryContext, Image } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from "../../../cloudinaryservice";

export function GetImage() {
    const [images, setImages] = useState([])

    const beginUpload = tag => {
        const uploadOptions = {
        cloudName: "dadzakyw1",
        tags: [tag, 'anImage'],
        uploadPreset: "upload"
        };
        openUploadWidget(uploadOptions, (error, photos) => {
        if (!error) {
            if(photos.event === 'success'){
            setImages([...images, photos.info.public_id])
            }
        } else {
        }
        })
    }
    useEffect( () => {
        fetchPhotos("image", setImages);
    }, [])
    return(
        <>
        <CloudinaryContext cloudName="dadzakyw1">
        <div className="App">
            <button onClick={() => beginUpload("image")}>Upload Image</button>
        <section>
            {images.map(i => <Image
                key={i}
                publicId={i}
                fetch-format="auto"
                quality="auto"
                />)}
        </section>
        </div>
    </CloudinaryContext>
        </>
    )
}