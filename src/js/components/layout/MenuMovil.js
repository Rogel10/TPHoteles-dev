import * as UI from '../../helpers/ElementsDOM.js';
import { openSection } from '../../helpers/helpers.js';
import Notifications from '../components/Notifications';
import Events from '../components/Events.js'
import Consumos from '../components/Consumptions.js';
import Languaje from '../components/Languaje.js';
import Weather from '../../components/components/Weather.js';

export default class MenuMovil {

    constructor(){
        this.props = {}
    }

    init(){

        console.log('menu movil .... ');
        this.render();
    }

    render(){
        console.log(' crea el menuMOVIL')
        const html = `
            <div class="movil-menu-shadow"></div>
            <div class="movil-menu__content">
                <div class="movil-menu-content__sidebar">
                    <nav class="menu-side-bar">
                        <div class="side-bar__logo"></div>
                        <div class="side-bar__clima" id="weatherMovil">
                            <div><span>30º</span><div class="logoWeather"/></div></div>
                            <div>(Estado), Mexico.</div>
                        </div>
                        <ul class="side-bar__main-menu">
                            <!-- <li class="side-bar__main-menu__item" id="ItemWatchTv">
                                <span class="viewTv"></span>
                                Mira la TV
                                <a href="/guia-de-canales.html">Mira la TV</a> 
                                Mira la TV
                            </li> -->
                            <li class="side-bar__main-menu__item" id="ItemNotifications">
                                Notificaciones
                                <span class="notifications-menu">+99</span>
                                <!-- <a href="/notificaciones.html"> Notificaciones </a> -->
                            </li>
                            <li class="side-bar__main-menu__item" id="ItemEvents">
                                Eventos de hoy
                                <!-- <a href="/eventos.html"> Eventos de hoy </a> -->
                            </li>
                            <li class="side-bar__main-menu__item" id="ItemConsumos">Consumos</li>
                            <li class="side-bar__main-menu__item" id="ItemLanguaje">Lenguaje</li>
                        </ul>
                        <div class="logaut">Cerrar sesión</div>
                    </nav>
                </div>
            </div> 

        `;
        UI.movilMenu.innerHTML = html;
        this.onkeypressEvents();

    }

    onkeypressEvents(){

        document.querySelector('.side-bar__main-menu').addEventListener('click', (e) => {

            console.log('click en side-bar__main-menu *** **** ');
            
            if (e.target.localName === 'li') {
                switch(e.target.id) {
                    case 'ItemWatchTv':
                        const modalChannels = new ListChannels();
                        openSection(modalChannels, {className: 'page-home__content-watch-tv'});
                    break;

                    case 'ItemNotifications':
                        const notifications = new Notifications();
                        openSection(notifications, {className: 'page-home__content-watch-notifications'});
                    break;
                    
                    case 'ItemEvents':
                        const events = new Events();
                        openSection(events, {className: 'page-home__content-watch-events'});
                    break;

                    case 'ItemConsumos':
                        const consumos = new Consumos();
                        openSection(consumos, {className: 'page-home__content-watch-consumos'});
                    break;

                    case 'ItemLanguaje':
                        const languaje = new Languaje();
                        openSection(languaje, {className: 'page-home__content-watch-languaje'});
                    break;
                }
            }

       });

       document.getElementById('weatherMovil').addEventListener('click', (e) => {

            console.log('click ===> ');
            const weather = new Weather();
            openSection(weather, {className: 'page-home__content-weather'});

       });


    }


}