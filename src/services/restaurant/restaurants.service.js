import { mockImages, mocks } from './mock/index';
import camelize from 'camelize';

export const restaurantRequest = (location = "37.7749295,-122.4194155") => {
//Si el mock esta vacio, la Promise devuelve not found. En caso tener un mock no nulo
//lo resolvemos    
    
    return new Promise((resolve,reject) => {
        const mock = mocks[location];
        if(!mock) {
            reject('Not Found');
        }
        resolve(mock);
    })
}

//Cambiamos el nombre de los campos. Pasan de usar underscore a usar camelcase
export const restaurantTransform = ({results = []}) => {
    const mappedResults = results.map((restaurant) => {
        restaurant.photos = restaurant.photos.map((p) => {
            return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
        });
        
        return {
            //Agarramos el objeto restaurant y le añadimos dos propiedades adicionales

            ...restaurant, 
            isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
            isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
            address: restaurant.vicinity
            
        }
    })

    return camelize(mappedResults);
};

//Al tener una promesa, que es algo que no se llama inmediatamente tenemos que usar
//.then(), ya que esto indica que es algo que no se devuelve inmediatamente, sino 
//en algun momento en el futuro
/*restaurantRequest()
.then(restaurantTransform)
.then(transformedResponse => {
    console.log(transformedResponse);
})
.catch((err) => {
    console.log(err);
})*/

//COMENTADO porque se va a usar en otra parte de la app