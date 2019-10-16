// import { setUrlPlayer } from '../helpers/PlayerEvents';
import { openSection, removeAllChilds } from '../../helpers/helpers.js';
import { TimelineMax } from "gsap";
import TopMenu from '../layout/TopMenu.js';
import MenuMovil from '../layout/MenuMovil.js';
import Channels from '../components/Channels.js';
import MenuSidebar from  '../../components/layout/MenuSidebar.js';
import PlayerHome from '../components/PlayerHome.js';
import Vod from '../components/Vod.js';
import Gallery from '../components/Gallery.js';
import * as UI from '../../helpers/ElementsDOM.js';

//Small
import imgAppSmall_1 from '../../../media/resources/SMALL/OnDemand-SMALL.jpg';
import imgAppSmall_2 from '../../../media/resources/SMALL/RoomService-SMALL.jpg';
import imgPromoSmall_1 from '../../../media/resources/SMALL/ElMaguey-SMALL.jpg';
import imgPromoSmall_2 from '../../../media/resources/SMALL/LaMaisonDeMichelle-SMALL.jpg';
import imgPromoSmall_3 from '../../../media/resources/SMALL/Spa-SMALL.jpg';

//Medium ../../../media/resources/MEDIUM
import imgAppMedium_1 from '../../../media/resources/MEDIUM/OnDemand-MEDIUM.jpg';
import imgAppMedium_2 from '../../../media/resources/MEDIUM/RoomService.jpg';
import imgPromoMedium_1 from '../../../media/resources/MEDIUM/ElMaguey.jpg';
import imgPromoMedium_2 from '../../../media/resources/MEDIUM/LaMaison.jpg';
import imgPromoMedium_3 from '../../../media/resources/FULL/Spa-FULL.jpg';

//Large ../../../media/resources/Large
import imgPromoLarge_2 from '../../../media/resources/LARGE/LaMaison.jpg'
import imgPromoLarge_3 from '../../../media/resources/LARGE/Spa.jpg';

//list movies
import imgMovie_1 from '../../../media/resources/fragmentado.jpg';
import imgMovie_2 from '../../../media/resources/jon.jpg';
import imgMovie_3 from '../../../media/resources/Chernobyl.jpg';

export default class Home {

    constructor(){
        this.props = {
            topMenu : new TopMenu(),
            menuMovil: new MenuMovil(),
            tlMenuMobile: new TimelineMax(),
            tlMainElements: new TimelineMax({
                pause: true
            }),
            tlTopMenu: new TimelineMax(),
            showMenu : false
        }
    }

    init(){
        
        console.log('llego al HOME .... ');
        const background = localStorage.getItem('urlBackground');
        UI.mainContainerHome.style.cssText = `background-image: url(${background});`;
        this.setImages(); 
        this.render();
        this.eventsWindow();
        this.animationsHome(window.innerWidth); //provisional
        this.onkeypressEvents();
        
    }

    onkeypressEvents(){
        
        // click open menu movil 
        document.querySelector('.menu-topbar__toggle').addEventListener('click', () => {
            this.props.menuMovil.init();
            this.props.showMenu = true;
            document.documentElement.style.overflowY = 'hidden';
            
            // let tlMenuMobile = this.props.tlMenuMobile;
            // tlMenuMobile.set('.movil-menu', {display: 'flex'});
            // document.documentElement.style.overflowY = 'hidden';

            // tlMenuMobile
            // .to('.movil-menu-shadow', 1, {opacity: 1, ease: Power3.easeOut})
            // .to('.movil-menu__content', 1, {opacity: 1, left: 0, ease: Power4.easeOut}, '-=1');

            // tlMenuMobile.play();

       });

        // click para cerrar el Menu movil
        // document.querySelector('.movil-menu').addEventListener('click', (e) => {

        //     let tlMenuMobile = this.props.tlMenuMobile;
        //     if( e.target.classList.contains('movil-menu-shadow' )){

        //         tlMenuMobile
        //         .to('.movil-menu-shadow', 1, {opacity: 0, ease: Power3.easeOut})
        //         .to('.movil-menu__content', 1, {opacity: 0, left: '-100%', ease: Power4.easeOut}, '-=1');

        //         setTimeout( ()=> {
        //             tlMenuMobile.set('.movil-menu', { clearProps : 'display'});
        //             tlMenuMobile.set('.movil-menu__content', {clearProps: 'opacity,left'});
        //             tlMenuMobile.set('.movil-menu-shadow', {clearProps:'opacity'});
        //         },300);                

        //         document.documentElement.removeAttribute('style');
        //         this.props.showMenu = false;

        //         removeAllChilds(UI.movilMenu);


        //     }
        // });

        // click Channels top menu
        document.querySelector('.menu-topbar__guide').addEventListener('click', () => {
            const modalChannels = new Channels();
            openSection(modalChannels, {className: 'page-home__content-watch-tv'});
        });

        // click items del menu

    //     document.querySelector('.side-bar__main-menu').addEventListener('click', (e) => {

    //         console.log('click en side-bar__main-menu *** **** ');
    //         if (e.target.localName === 'li') {
    //             switch(e.target.id) {
    //                 case 'ItemWatchTv':
    //                     const modalChannels = new ListChannels();
    //                     openSection(modalChannels, {className: 'page-home__content-watch-tv'});
    //                 break;

    //                 case 'ItemNotifications':
    //                     const notifications = new Notifications();
    //                     openSection(notifications, {className: 'page-home__content-watch-notifications'});
    //                 break;
                    
    //                 case 'ItemEvents':
    //                     const events = new Events();
    //                     openSection(events, {className: 'page-home__content-watch-events'});
    //                 break;

    //                 case 'ItemConsumos':
    //                     const consumos = new Consumos();
    //                     openSection(consumos, {className: 'page-home__content-watch-consumos'});
    //                 break;

    //                 case 'ItemLanguaje':
    //                     const languaje = new Languaje();
    //                     openSection(languaje, {className: 'page-home__content-watch-languaje'});
    //                 break;
    //             }
    //         }

    //    });
        
       document.getElementById('open-ondeMand').addEventListener('click', () => {
            const vod = new Vod();
            openSection(vod, {className: 'page-home__content-vod'});
        });

        document.getElementById('open-gallery').addEventListener('click', (e) => {
            const gallery = new Gallery();
            openSection(gallery, {className: 'page-home__content-gallery'});
        });


    }

    animationsHome (size) {

        let propsContentApps = (size < 1440 ) ? {opacity: 1, top: 0} : {opacity: 1, left:0, ease: Power2.easeOut };        
        this.props.tlMainElements.to('.page-home', 1, {
            opacity: 1,
            ease: Power3.easeOut
        });

        this.props.tlTopMenu.to('.main-header', .8, {opacity: 1, top: 0, ease: Power4.easeOut}, .5);
        this.props.tlMainElements.to('.page-home__menu-sidebar', .8, { left: 0, ease: Power2.easeOut }, .5)
        .to('.page-home__content-apps', .8, propsContentApps, .5);
    }

    render(){

        this.props.topMenu.init();
        // this.props.menuMovil.render();
        // top menu
        if(window.innerWidth >= 1440){
            const player = new PlayerHome();
            const sidebar = new MenuSidebar();
            sidebar.init();
            player.init();
        }

    }

    eventsWindow(){

        window.addEventListener('resize', () => {

            let size = window.innerWidth;
            // console.log(' en RESIZE ******** ', size);
            // size < 1400 ? this.killPlayer() : this.continuePlayer();
            this.setImages(size);
            this.animationsHome(size);
            // ya no  this.props.menuMovil.style.cssText = (size >= '1440') ?'display: none' : 'display: flex';
            
            // opcional ---
            if(size < 1440) {
                // console.log(' ===> estoy en menos de 1440');
                this.props.tlMainElements.set(UI.contentPageHome, {clearProps: 'left'});  
            }

            // Set menu sidebar
            if(window.innerWidth >= 1440){
                const sidebar = new MenuSidebar();
                sidebar.init();
            }

            // if(size >= 1400)
            //     document.querySelector('.page-home__content-apps').style.left = 0;

        });

    }

    /**
     * esta funcion es temporal las imagenes se consumiran de webservices
     * @param {*} _size 
     */
    setImages( _size ){

        let size = (_size ) ? _size : window.innerWidth;
        // let urlSmall = '//resources/SMALL/';
        // let urlMedium = '/assets/img/resources/MEDIUM/';
        // let urlLarge = '/assets/img/resources/LARGE/';
        // let urlFull = '/assets/img/resources/FULL/';
        let imgApp_1, imgApp_2, imgApp_3, imgPromo_1, imgPromo_2, imgPromo_3;
    

        if(size < 768){
            
            
            imgApp_1 = imgAppSmall_1;
            imgApp_2 = imgAppSmall_2;
            
            imgPromo_1 = imgPromoSmall_1;
            imgPromo_2 = imgPromoSmall_2;
            imgPromo_3 = imgPromoSmall_3;

        }else if(size >= 768 && size <= 1024){

            
            imgApp_1 = imgAppMedium_1;
            imgApp_2 = imgAppMedium_2;

            imgPromo_1 = imgPromoMedium_1;
            imgPromo_2 = imgPromoMedium_2;
            imgPromo_3 = imgPromoMedium_3;

        }else if(size >= 1024 ){
            

            imgApp_1 = imgAppMedium_1;
            imgApp_2 = imgAppMedium_2;
            imgApp_3 = imgPromoMedium_1;

            imgPromo_1 = imgPromoLarge_2;
            imgPromo_2 = imgPromoLarge_3;

        }

        // MOVIES
        UI.listMovies[0].src = imgMovie_1;
        UI.listMovies[1].src = imgMovie_2;
        if(imgMovie_3)
            UI.listMovies[2].src = imgMovie_3;

        // APPS
        UI.listApps[0].src = imgApp_1;
        UI.listApps[1].src = imgApp_2;
        if(imgApp_3)
            UI.listApps[2].src = imgApp_3;

        // PROMOS
        UI.listPromos[0].src = imgPromo_1;
        UI.listPromos[1].src = imgPromo_2;
        if(imgPromo_3)
            UI.listPromos[2].src = imgPromo_3;

    }


}