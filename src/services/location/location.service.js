import camelize from "camelize";
import { locations } from "./location.mock"

//Crep una promesa y adentro guardo el resultado de locations en locationMock
//Si la busqueda no coincide, arroja not found, si coincide, devuelve la ubicacion

export const locationRequest = (searchTerm) => {
    return new Promise((resolve,reject) => {
        const locationMock = locations[searchTerm];
        if(!locationMock){
            reject ('Not Found')
        };
        resolve(locationMock);
    })
};

//le paso el array de results
export const locationTransform = (result) => {
    const formattedResponse = camelize(result); 
    //primero buscamos la ubicacion del array results y se la paso al objeto geometry
    const { geometry = {} } = formattedResponse.results[0];

    //saco la latitud y longitud de geometry.location
    const { lat, lng } = geometry.location;

    return { lat, lng, viewport: geometry.viewport };
};