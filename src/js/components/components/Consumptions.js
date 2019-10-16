import { createCustomElement, closeSection } from "../../helpers/helpers";
import { TweenMax, Expo } from "gsap";
import { BackSection } from '../layout/BackSection';
import imgWhite from '../../../media/icons/left-arrow-white.svg';
import imgTransparent from '../../../media/icons/left-arrow.svg';

export default class Consumos {

    constructor() {

        this.props = {
            mainContainer: null,
            // tl: new TimelineMax({pause: true})

        }

    }

    init(container){


        this.props.mainContainer = document.querySelector(`.${container}`);
        const consumos = `
                <li class="content-consumos--list__item">
                    <div class="item-list__data-date"><span>Cuenta A</span><span>19/03/19</span></div>
                    <div class="item-list__description-price"><span>Una Historia de Star Wars</span><span>100</span>
                    </div>
                </li>
                <li class="content-consumos--list__item">
                    <div class="item-list__data-date"><span>Cuenta A</span><span>12/03/19</span></div>
                    <div class="item-list__description-price"><span>Solo: Una Historia de Star Wars</span><span>200</span></div>
                </li>
                <li class="content-consumos--list__item">
                    <div class="item-list__data-date"><span>Cuenta A</span><span>17/03/19</span></div>
                    <div class="item-list__description-price"><span>Solo: Una Historia de Star Wars</span><span>400</span></div>
                </li>
                <li class="content-consumos--list__item">
                    <div class="item-list__data-date"><span>Cuenta A</span><span>18/03/19</span></div>
                    <div class="item-list__description-price"><span>Solo: Una Historia de Star Wars</span><span>120</span></div>
                </li>
                <li class="content-consumos--list__item">
                    <div class="item-list__data-date"><span>Cuenta A</span><span>19/03/19</span></div>
                    <div class="item-list__description-price"><span>Solo: Una Historia de Star Wars</span><span>180</span></div>
                </li>
                <li class="content-consumos--list__item">
                    <div class="item-list__data-date"><span>Cuenta A</span><span>19/03/19</span></div>
                    <div class="item-list__description-price"><span>Solo: Una Historia de Star Wars</span><span>170</span></div>
                </li>
                <li class="content-consumos--list__item">
                    <div class="item-list__data-date"><span>Cuenta A</span><span>19/03/19</span></div>
                    <div class="item-list__description-price"><span>Solo: Una Historia de Star Wars</span><span>700</span></div>
                </li>
                <li class="content-consumos--list__item">
                    <div class="item-list__data-date"><span>Cuenta A</span><span>19/03/19</span></div>
                    <div class="item-list__description-price"><span>Solo: Una Historia de Star Wars</span><span>900</span></div>
                </li>
                <li class="content-consumos--list__item">
                    <div class="item-list__data-date"><span>Cuenta A</span><span>31/03/19</span></div>
                    <div class="item-list__description-price"><span>Solo: Una Historia de Star Wars</span><span>400</span></div>
                </li>
                <li class="content-consumos--list__item">
                    <div class="item-list__data-date"><span>Cuenta C</span><span>19/03/19</span></div>
                    <div class="item-list__description-price"><span>Solo: Una Historia de Star Wars</span><span>500</span></div>
                </li>
                <li class="content-consumos--list__item">
                    <div class="item-list__data-date"><span>Cuenta B</span><span>22/03/19</span></div>
                    <div class="item-list__description-price"><span>Solo: Una Historia de Star Wars</span><span>300</span></div>
                </li>
                <li class="content-consumos--list__item">
                    <div class="item-list__data-date"><span>Cuenta B</span><span>23/03/19</span></div>
                    <div class="item-list__description-price"><span>Solo: Una Historia de Star Wars</span><span>900</span></div>
                </li>
        `;

        const nav = `
                <ul class="nav-menuconsumos">
                    <li class="list-consumos__item">Cuenta</li>
                    <li class="list-consumos__item">Descripción</li>
                    <li class="list-consumos__item">Fecha</li>
                    <li class="list-consumos__item">Monto</li>
                </ul>`;

        const bar = `
                <div class="bar-costs__price"><span>Total:</span><span>$1,151 MXN</span></div>
                <div class="bar-costs__date">Calculado al 19 de marzo, 12:38 hrs</div>
            `;

        this.createElements(consumos, nav, bar);
        this.eventsWindow();
    
    }

    createElements(consumos, nav, bar){

        let color = 'transparent';
        let topBar = BackSection(color, 'Consumos');


        const navMenu = createCustomElement('nav', {
            class: 'page-consumos__nav'
        },[nav]);

        const contentList = createCustomElement('ul', {
            class: 'content-consumos--list'
        }, [consumos]);


        const barCosts = createCustomElement('div', {
            class: 'page-consumos__bar-costs'
        },[bar]);

        const container = createCustomElement('div', {
            class: 'page-consumos'
        }, [topBar, navMenu, contentList, barCosts]);


        // inyecta todo el contenido al main container
        this.props.mainContainer.appendChild(container);

        // change top bar
        let icon = document.querySelector('.back-section__back');
        let t = document.querySelector('.back-section__title');
        let img = (color === 'transparent') ? imgWhite : imgTransparent;
        icon.style.cssText = `background: url(${img}); background-size: cover`;
        let c = (color === 'transparent') ? '#fafafa':'#3b4559';
        t.style.cssText = `color: ${c}`;


        //animaciones
        TweenMax.to('.page-home__content-watch-consumos', 0.8, {
            left: 0,
            display: 'block',
            ease: Expo.easeInOut
        });
        // this.props.tl.to('.page-home__content-watch-consumos', .5, {
        //     opacity: 1,
        //     right: 0,
        //     display: 'block',
        //     ease: Power1.easeOut
        // }).to('.page-consumos', .5,  {top: 0, ease: Power1.easeOut}, .5);

        this.onkeyPress();
    }

    onkeyPress() {

        // BTN BACK
        document.querySelector('.back-section__back').addEventListener('click', () => {

            TweenMax.to('.page-home__content-watch-consumos', 0.5, {
                left: '-100%',
                ease: Expo.easeInOut,
                onComplete: this.onExit()
            });

            // this.props.tl.to('.page-home__content-watch-consumos', .5, {
            //     right: '20%',
            //     opacity: 0,
            //     ease: Back.easeOut.config(1.7),
            //     onComplete: this.onExit()
            // });
        })

    }

    onExit() {
        
        let el = document.querySelector('.page-consumos');
        closeSection(el, this.props.mainContainer);
        // closeSection(el, this.props.mainContainer, this.props.tl);
        document.body.removeEventListener('touchmove', this.prevDefault);
    }

    prevDefault(e){
        console.log('chegan aqui .... ');
        e.preventDefault();
    }

    eventsWindow(){

        // this.props.mainContainer.addEventListener()
        document.body.addEventListener('touchmove', this.prevDefault ,{passive: true});

    }


}