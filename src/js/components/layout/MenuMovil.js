import * as UI from '../../helpers/ElementsDOM.js';
import { TweenMax, Expo } from 'gsap';
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

        this.render();
        this.eventsWindow();
    }

    render(){

        const html = `
            <div class="bg-menu-mobile" id="bgMenuMobile"></div>
            <nav class="bg-navigation-mobile"> 
                <div class="logo-mobile__menu"></div>
                <div class="clima-mobile__menu" id="weatherMovil">
                    <div><span>30º</span><div class="logoWeather"/></div></div>
                    <div>(Estado), Mexico.</div>
                </div>
                <ul class="list-menu-mobile">
                    <li class="list-menu-mobile__item" id="ItemNotifications">Notificaciones<span class="notifications-menu">+99</span></li>
                    <li class="list-menu-mobile__item" id="ItemEvents">Eventos de hoy</li>
                    <li class="list-menu-mobile__item" id="ItemConsumos">Consumos</li>
                    <li class="list-menu-mobile__item" id="ItemLanguaje">Lenguaje</li>                    
                </ul>
                <div class="logout-menu-mobile" id="ItemLogoutMobile">Cerrar sesión</div>
            </nav>
        `;

        this.setElements(html);
    }

    setElements(html){

        UI.mobileMenu.innerHTML = html;
        TweenMax.to('#bgMenuMobile', 0.8, {
            left: 0,
            ease: Expo.easeInOut
        });

        TweenMax.to('.bg-navigation-mobile', 1.2, {
            left: 0,
            ease: Expo.easeInOut
        })

        this.onkeypressEvents();

    }


    onkeypressEvents(){

        // close Menu Mobile
        document.querySelector('.bg-menu-mobile').addEventListener('click', () => {

            TweenMax.to('#bgMenuMobile', 1, {left: '-100%', ease: Expo.easeInOut });
            TweenMax.to('.bg-navigation-mobile', 0.8, {left: '-100%', ease: Expo.easeInOut, onComplete: () => {
                document.documentElement.removeAttribute('style');
            }});
            this.onExit();

        });

        document.querySelector('.list-menu-mobile').addEventListener('click', (e) => {

            if (e.target.localName === 'li') {
                
                switch(e.target.id) {

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
                this.onExit();
            }

        });

       document.getElementById('weatherMovil').addEventListener('click', (e) => {

        
            const weather = new Weather();
            openSection(weather, {className: 'page-home__content-weather'});

       });
    }

    eventsWindow() {
        // console.log('bloquea')
        document.body.addEventListener('touchmove', this.prevDefault ,{passive: false});
    }

    onExit() { 
        document.body.removeEventListener('touchmove', this.prevDefault);
    }

    prevDefault(e){
        e.preventDefault();
    }

}

/**
 * 
 *  <div class="movil-menu-shadow"></div>
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
 */