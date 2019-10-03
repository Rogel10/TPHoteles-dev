import * as UI from '../../helpers/ElementsDOM.js';
import iconWeather from '../../../media/icons/sun.svg';
import Notifications from '../components/Notifications.js';
import ListChannels from '../components/Channels.js';
import Events from '../components/Events.js';
import Consumos from '../components/Consumptions.js';
import Languaje from '../components/Languaje.js';
import Weather from '../components/Weather.js';
import {openSection} from '../../helpers/helpers.js';
export default class MenuSidebar {

    constructor(){

    }

    init(){
        this.render();
    }

    render(){

        const html = `
            <nav class="menu-side-bar">
                <div class="side-bar__logo"></div>
                <div class="side-bar__clima">
                    <div>
                        <span>30º</span>
                        <img src="${iconWeather}" alt=""/>
                    </div>
                    <div>(Estado), Mexico.</div>
                </div>
                <ul class="side-bar__main-menu">
                    <li class="side-bar__main-menu__item" id="goToTv">
                        <!-- Mira la TV -->
                        <span class="viewTv"></span>
                        Mira la TV
                    </li>
                    <li class="side-bar__main-menu__item" id="goToNotifications">
                        <!-- Notificaciones -->
                        Notificaciones
                        <span class="notifications-menu">+99</span>
                    </li>
                    <li class="side-bar__main-menu__item" id="goToEvents">
                        <!-- Eventos de hoy -->
                        Eventos de hoy
                    </li>
                    <li class="side-bar__main-menu__item" id="goToConsumos">
                        <!-- Consumos -->
                        Consumos
                    </li>
                    <li class="side-bar__main-menu__item" id="goToLanguaje">
                        <!-- Lenguaje -->
                        Lenguaje
                    </li>
                </ul>
            </nav>
            <div class="logaut">Cerrar sesión</div>`;

            UI.navMenuSidebar.innerHTML = html;
            UI.navMenuSidebar.style.cssText = `height:${UI.contentPageHome.getBoundingClientRect().height}px;`;

            this.onkeypressEvents();

    }

    onkeypressEvents(){

        document.querySelector('.side-bar__main-menu').addEventListener('click', (e) => {
            
            if (e.target.localName === 'li') {

        
                switch(e.target.id) {
                    case 'goToTv':
                        const modalChannels = new ListChannels();
                        openSection(modalChannels, {className: 'page-home__content-watch-tv'});
                    break;

                    case 'goToNotifications':
                        const notifications = new Notifications();
                        openSection(notifications, {className: 'page-home__content-watch-notifications'});
                    break;
                    
                    case 'goToEvents':
                        const events = new Events();
                        openSection(events, {className: 'page-home__content-watch-events'});
                    break;

                    case 'goToConsumos':
                        const consumos = new Consumos();
                        openSection(consumos, {className: 'page-home__content-watch-consumos'});
                    break;

                    case 'goToLanguaje':
                        const languaje = new Languaje();
                        openSection(languaje, {className: 'page-home__content-watch-languaje'});
                    break;
                }
            
            }

       });

       document.querySelector('.side-bar__clima').addEventListener('click', () => {

            console.log('click ===> ');
            const weather = new Weather();
            openSection(weather, {className: 'page-home__content-weather'});

       });

    }

}