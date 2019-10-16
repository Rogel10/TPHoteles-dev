import './scss/main.scss';
import { Routes } from './js/helpers/Router';
import Login from './js/components/pages/Login';
import Home from './js/components/pages/Home';
import Player from './js/components/pages/Player.js';
import barba from '@barba/core';
import {TweenMax, Power4, Power3} from 'gsap';


const path = window.location.pathname;
const url = Routes('/');
// const url = Routes('/hotel/'); // Ruta para producción  ---> /hotel/

// valida que el navegador registre el SW ...
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Registro de SW exitoso', reg))
      .catch(err => console.warn('Error al tratar de registrar el sw', err))
}

switch( path ) {

    case url.home: 
        const home = new Home();
        home.init();
    break;

    case url.login:
        const login = new Login();
        login.init();
    break;

    case url.player:
        const player = new Player();
        player.init();
    break;
    
}





