export default function getWeather() {
    console.log(' ===> en la funcion...');
    // let data = {
    //     'geocode':  '24.14,-110.31',
    //     'units':    'm',
    //     'language': 'es-MX',
    //     'format':   'json',
    //     'apiKey':   '6c9f9f893e79445f9f9f893e79645fdc'
    // }
    
    // let url = `https://api.weather.com/v3/wx/forecast/daily/7day?geocode=${data.geocode}&units=${data.units}&language=${data.language}&format=${data.format}&apikey=${data.apiKey}`;

    return fetch('https://api.weather.com/v3/wx/forecast/daily/7day?geocode=24.14,-110.31&units=m&language=es-MX&format=json&apiKey=6c9f9f893e79445f9f9f893e79645fdc')
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            return responseData;
        })
        .catch(error => console.log(error));

    // .then( resp => {
    //     if(resp.status === 200){
    //        // gdata = resp.json();
    //         return resp.json();
    //     }else{
    //         throw new Error('Error en el Servicio ', resp.status);
    //     }
    // })
    // .then(console.log)
    // .catch(error => {
    //     console.log('error en la peticion', error);
    //     return error;
    // });
}


// export default function getweather2() {

//     let getPromise = new Promise((resolve, reject) => {
            
//         reject('el numero es muy alto');

//     });    
    
//     return getPromise;

// }


