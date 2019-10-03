export default class Api {

    constructor(){
        this.ctx = '';
        this.URL = '';
    }

    async getServiceLogin() {

        const response = await fetch('https://picsum.photos/v2/list');
        const data = response.json();
        return data;
        
    }

    async getWeather(){
        const response = await fetch('https://api.weather.com/v3/wx/forecast/daily/7day?geocode=24.14,-110.31&units=m&language=es-MX&format=json&apiKey=6c9f9f893e79445f9f9f893e79645fdc');
        const data = response.json();
        return data;
    }

    // async getServiceLogin(){

    //     const url = 'https://iptvservices.totalplay.com.mx/kan-hh/getStartMobileScreen?intAlias=SEADUSTIPTV2019';
    //     // const url = 'https://jsonplaceholder.typicode.com/posts';
    //     const response = await fetch(url,{
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     const r = response;
    //     console.log('R= ',r);
    //     const data = await response.json();
    //     console.log('data ... ',data);
    //     return data;

    // }


    // getServiceLogin (){

    //     fetch('https://picsum.photos/v2/list')
    //     .then( resp => {
    //         resp.json();
    //     })
    //     .then(obj => {
    //         console.log(obj)
    //     })
    //     .catch(error => {
    //         console.log('error en la petición');
    //         console.log(error);
    //     })

    // }

}