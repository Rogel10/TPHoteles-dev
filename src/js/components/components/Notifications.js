import { createCustomElement, closeSection } from "../../helpers/helpers.js";
import { BackSection } from '../layout/BackSection.js';
import imgWhite from '../../../media/icons/left-arrow-white.svg';
import imgTransparent from '../../../media/icons/left-arrow.svg';

export default class Notifications {

    constructor (){
        this.props = {
            mainContainer: null,
            tl: new TimelineMax({pause: true})
        }

    }

    init(container){

        this.props.mainContainer = document.querySelector(`.${container}`);

        let notifications = `
            <li class="list-notifications__item isView-true">
                <div class="item-notification__location-date"><span>Sala</span> <span>Hoy, 11:07 am</span></div>
                <div class="item-notification__description">Cuerpo de notificación. Longitud segura:70 caracteres</div>
            </li>
            <li class="list-notifications__item isView-true">
                <div class="item-notification__location-date"><span>Sala</span> <span>Hoy, 11:07 am</span></div>
                <div class="item-notification__description">Cuerpo de notificación. Longitud segura:70 caracteres</div>
            </li>
            <li class="list-notifications__item isView-false">
                <div class="item-notification__location-date"><span>Sala</span> <span>Hoy, 11:07 am</span></div>
                <div class="item-notification__description">Cuerpo de notificación. Longitud segura:70 caracteres</div>
            </li>
            <li class="list-notifications__item isView-false">
                <div class="item-notification__location-date"><span>Sala</span> <span>Hoy, 11:07 am</span></div>
                <div class="item-notification__description">Cuerpo de notificación. Longitud segura:70 caracteres</div>
            </li>
            <li class="list-notifications__item isView-false">
                <div class="item-notification__location-date"><span>Sala</span> <span>Hoy, 11:07 am</span></div>
                <div class="item-notification__description">Cuerpo de notificación. Longitud segura:70 caracteres</div>
            </li>
            <li class="list-notifications__item isView-false">
                <div class="item-notification__location-date"><span>Sala</span> <span>Hoy, 11:07 am</span></div>
                <div class="item-notification__description">Cuerpo de notificación. Longitud segura:70 caracteres</div>
            </li>
            <li class="list-notifications__item isView-false">
                <div class="item-notification__location-date"><span>Sala</span> <span>Hoy, 11:07 am</span></div>
                <div class="item-notification__description">Cuerpo de notificación. Longitud segura:70 caracteres</div>
            </li>
        `;

        this.createElements(notifications);
    }

    createElements(_notifications) {
        let color = 'transparent';
        let topBar = BackSection(color, 'Centro de notificaciones');

        const contentList = createCustomElement('ul', {
            class: 'list-notifications'
        }, [_notifications]);

        const container = createCustomElement('section', {
            class: 'page-notifications'
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
        this.props.tl.to('.page-home__content-watch-notifications', .5, {
            opacity: 1,
            right: 0,
            display: 'block',
            ease: Power1.easeOut
        }).to('.page-notifications', .5,  {top: 0, ease: Power1.easeOut}, .5);

        this.onkeyPress();

    }


    onkeyPress() {

        // BTN BACK
        document.querySelector('.back-section__back').addEventListener('click', () => {
            this.props.tl.to('.page-home__content-watch-notifications', .5, {
                right: '20%',
                opacity: 0,
                ease: Back.easeOut.config(1.7),
                onComplete: this.onExit()
            });
        })

    }

    onExit() {
        let el = document.querySelector('.page-notifications');
        closeSection(el, this.props.mainContainer, this.props.tl);
    }
}