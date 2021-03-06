import { createCustomElement, closeSection } from "../../helpers/helpers.js";
import { BackSection } from '../layout/BackSection.js';
import { TweenMax, Expo } from "gsap";
import imgWhite from '../../../media/icons/left-arrow-white.svg';
import imgTransparent from '../../../media/icons/left-arrow.svg';

export default class Languaje {

    constructor(){
        this.props = {
            mainContainer: null,
            tl: new TimelineMax()
        }
    }

    init(params){

        this.props.mainContainer = document.querySelector(`.${params.className}`);
        const idiomas = `        
            <li class="btn__transparent-gray active">Español</li>
            <li class="btn__transparent-gray">English</li>
        `;

        this.createElements(idiomas);
    }

    createElements(_idiomas) {

        console.log('en create elements ... ');
        let color = 'transparent';
        let topBar = BackSection(color, 'Cambiar Idioma');

        const contentList = createCustomElement('ul', {
            class: 'list-languajes'
        }, [_idiomas]);

        
        const container = createCustomElement('div', {
            class: 'page-languaje'
        }, [topBar, contentList]);

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
        TweenMax.to('.page-home__content-watch-languaje', 0.8, {
            left: 0,
            display: 'block',
            ease: Expo.easeInOut
        });

        this.onkeyPress();
    }

    onkeyPress() {

        // BTN BACK
        document.querySelector('.back-section__back').addEventListener('click', () => {

            TweenMax.to('.page-home__content-watch-languaje', 0.8, {
                left: '-100%',
                ease: Expo.easeInOut,
                onComplete: this.onExit()
            });

        });

    }

    onExit(){

        let el = document.querySelector('.page-languaje');
        closeSection(el, this.props.mainContainer);
        // closeSection(el, this.props.mainContainer, this.props.tl);
    }


}