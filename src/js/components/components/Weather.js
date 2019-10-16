import { createCustomElement, closeSection, openSection } from "../../helpers/helpers.js";
import { TweenMax, Expo } from 'gsap';

// import { BackSection } from './BackSection';
import API from '../../api/Api';


export default class Weather {

    constructor() {
        this.props = {   
            mainContainer: null,
            // tl: new TimelineMax({pause: true})
        }        
    }

    init(container) {
        this.props.mainContainer = document.querySelector(`.${container}`);

        const api = new API();
        api.getWeather().then(obj => {
            this.responseWeather(obj);
        });

    }

    responseWeather(data){

        // console.log(' RESPUESTA del servicio ======> ', data);
        const days = data.dayOfWeek;
        const tempMax = data.temperatureMax;
        const tempMin = data.temperatureMin;

        // console.log('days: ',days);
        // console.log('temp mx: ',tempMax);
        // console.log('temp min: ',tempMin);


        let weatherDays = [];
        for(let i = 0; i < days.length; i++ ){
            weatherDays.push({'day': days[i].substr(0, 3), 'max': '', 'min': ''});
        }

        for(let x = 0; x < tempMax.length; x++){
            weatherDays[x].max = tempMax[x];
        }

        for(let y = 0; y <  tempMin.length; y++){
            weatherDays[y].min = tempMin[y];
        }

        console.log('objeto Final: ',weatherDays);
        this.createElements(weatherDays);

    }

    createElements(data){

        const header = `
        <div class="page-weather__content-header">
            <div class="btn-back-weather"></div>
            <div class="content-header-title">Clima</div>
            <div class="btn-switch-weather"></div>
        </div>
        `;

        const currentWeather = `
            <div class="page-weather__current-data">
                <div class="current-data">
                    <p>14</p>
                    <div>
                        <p>O</p>
                        <p class="icon-weather-page"></p>
                    </div>
                </div>
                <div class="max-min">
                    <p>${data[0].max}º</p>
                    <p>${data[0].min}º</p>
                </div>
            </div>
        `;

        let items = '';
        data.forEach(item => {
            items += `
            <li class="list-weekWeather__item">
                <div class="list-weekWeather__item-icon"></div>
                <div class="list-weekWeather__item-day">${item.day}</div>
                <div class="list-weekWeather__item-max">${item.max}º</div>
                <div class="list-weekWeather__item-min">${item.min}º</div>
            </li>`
        });

        const weatherweek = document.createElement('ul');
        weatherweek.className = 'list-weekWeather';
        weatherweek.innerHTML = items;

        const content = createCustomElement('div', {
            class: 'page-weather__content-data'
        }, [header, currentWeather, weatherweek] );

        const container = createCustomElement('section', {
            class: 'page-weather'
        }, [content]);

        this.props.mainContainer.appendChild(container);

        //animaciones
        // this.props.tl.to('.page-home__content-weather', .3, {
        //     opacity: 1,
        //     right: 0,
        //     display: 'block',
        //     ease: Power1.easeOut
        // });
        // this.props.tl.play();
        TweenMax.to('.page-home__content-weather', 0.8, {
            left: 0,
            display: 'block',
            ease: Expo.easeInOut
        });

        this.onkeypressEvents();

    }

    onkeypressEvents(){

        // BTN BACK
        document.querySelector('.btn-back-weather').addEventListener('click', () => {
            TweenMax.to(this.props.mainContainer, 0.5, {
                left: '-100%',
                ease: Expo.easeInOut,
                onComplete: this.onExit()
            });
            // this.props.tl.to(this.props.mainContainer, .5, {
            //     right: '20%',
            //     opacity: 0,
            //     ease: Back.easeOut.config(1.7),
            //     onComplete: this.onExit()
            // });
        })

    }

    onExit() {
        let el = document.querySelector('.page-weather');
        closeSection(el, this.props.mainContainer);
    }

} 