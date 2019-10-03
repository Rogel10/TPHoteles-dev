import './scss/main.scss';
import { Routes } from './js/helpers/Router';
import Login from './js/components/pages/Login';
import Home from './js/components/pages/Home';
import Player from './js/components/pages/Player.js';

const path = window.location.pathname;
console.log('PATH: ', path);
const url = Routes('/');
// const url = Routes('/hotel/'); // Ruta para producción  ---> /hotel/

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
    break
}


