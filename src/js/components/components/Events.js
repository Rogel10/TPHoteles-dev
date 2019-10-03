import { TimelineMax } from "gsap";
import { createCustomElement, closeSection } from "../../helpers/helpers.js";
import { BackSection } from '../layout/BackSection.js';
import imgWhite from '../../../media/icons/left-arrow-white.svg';
import imgTransparent from '../../../media/icons/left-arrow.svg';


export default class Events {

    constructor () {
        this.props = {
            mainContainer: null,
            tl: new TimelineMax({pause: true})
        }
    }

    init(container) {

        this.props.mainContainer = document.querySelector(`.${container}`);
        const events = `
                <li class="events-item">
                    <div class="events-item__title">
                        <span>20 de septiembre</span>
                    </div>
                    <ul class="events-item__content">
                        <li class="event-detail">
                            <div class="event-detail__horary">24:00 hrs : 20:00 hrs</div>
                            <div class="event-detail__description">Actividad. Longitud segura: 50 caracteres</div>
                            <div class="event-detail__location">Ubicación</div>
                        </li>
                        <li class="event-detail">
                            <div class="event-detail__horary">24:00 hrs : 20:00 hrs</div>
                            <div class="event-detail__description">Actividad. Longitud segura: 50 caracteres</div>
                            <div class="event-detail__location">Ubicación</div>
                        </li>
                        <li class="event-detail">
                            <div class="event-detail__horary">24:00 hrs : 20:00 hrs</div>
                            <div class="event-detail__description">Actividad. Longitud segura: 50 caracteres</div>
                            <div class="event-detail__location">Ubicación</div>
                        </li>
                    </ul>
                </li>
                <li class="events-item">
                    <div class="events-item__title">
                        <span>10 de septiembre</span>
                    </div>
                    <ul class="events-item__content">
                        <li class="event-detail">
                            <div class="event-detail__horary">24:00 hrs : 20:00 hrs</div>
                            <div class="event-detail__description">Actividad. Longitud segura: 50 caracteres</div>
                            <div class="event-detail__location">Ubicación</div>
                        </li>
                        <li class="event-detail">
                            <div class="event-detail__horary">24:00 hrs : 20:00 hrs</div>
                            <div class="event-detail__description">Actividad. Longitud segura: 50 caracteres</div>
                            <div class="event-detail__location">Ubicación</div>
                        </li>
                    </ul>
                </li>
                <li class="events-item">
                    <div class="events-item__title">
                        <span>19 de septiembre</span>
                    </div>
                    <ul class="events-item__content">
                        <li class="event-detail">
                            <div class="event-detail__horary">24:00 hrs : 20:00 hrs</div>
                            <div class="event-detail__description">Actividad. Longitud segura: 50 caracteres</div>
                            <div class="event-detail__location">Ubicación</div>
                        </li>
                        <li class="event-detail">
                            <div class="event-detail__horary">24:00 hrs : 20:00 hrs</div>
                            <div class="event-detail__description">Actividad. Longitud segura: 50 caracteres</div>
                            <div class="event-detail__location">Ubicación</div>
                        </li>
                    </ul>
                </li>
                <li class="events-item">
                    <div class="events-item__title">
                        <span>10 de septiembre</span>
                    </div>
                    <ul class="events-item__content">
                        <li class="event-detail">
                            <div class="event-detail__horary">24:00 hrs : 20:00 hrs</div>
                            <div class="event-detail__description">Actividad. Longitud segura: 50 caracteres</div>
                            <div class="event-detail__location">Ubicación</div>
                        </li>
                        <li class="event-detail">
                            <div class="event-detail__horary">24:00 hrs : 20:00 hrs</div>
                            <div class="event-detail__description">Actividad. Longitud segura: 50 caracteres</div>
                            <div class="event-detail__location">Ubicación</div>
                        </li>
                    </ul>
                </li>
                <li class="events-item">
                    <div class="events-item__title">
                        <span>30 de septiembre</span>
                    </div>
                    <ul class="events-item__content">
                        <li class="event-detail">
                            <div class="event-detail__horary">24:00 hrs : 20:00 hrs</div>
                            <div class="event-detail__description">Actividad. Longitud segura: 50 caracteres</div>
                            <div class="event-detail__location">Ubicación</div>
                        </li>
                        <li class="event-detail">
                            <div class="event-detail__horary">24:00 hrs : 20:00 hrs</div>
                            <div class="event-detail__description">Actividad. Longitud segura: 50 caracteres</div>
                            <div class="event-detail__location">Ubicación</div>
                        </li>
                    </ul>
                </li>`;

                this.createElements(events);
        }

        createElements(_events) {

            let color = 'transparent';
            let topBar = BackSection(color, 'Eventos');

            const contentList = createCustomElement('ul', {
                class: 'page-events__list-events'
            }, [_events]);

            const container = createCustomElement('div', {
                class: 'page-events'
            }, [topBar, contentList]);

            // inyecta todo el contenido al main container
            console.log('mainContainer: ',this.props.mainContainer);
            this.props.mainContainer.appendChild(container);


            // change top bar
            let icon = document.querySelector('.back-section__back');
            let t = document.querySelector('.back-section__title');
            let img = (color === 'transparent') ? imgWhite : imgTransparent;
            icon.style.cssText = `background: url(${img}); background-size: cover`;
            let c = (color === 'transparent') ? '#fafafa':'#3b4559';
            t.style.cssText = `color: ${c}`;


            //animaciones
            this.props.tl.to('.page-home__content-watch-events', .5, {
                opacity: 1,
                right: 0,
                display: 'block',
                ease: Power1.easeOut
            }).to('.page-events', .5,  {top: 0, ease: Power1.easeOut}, .5);
            this.props.tl.play();
            
            this.onkeyPress();

        }

        onkeyPress() {

            // BTN BACK
            document.querySelector('.back-section__back').addEventListener('click', () => {
                this.props.tl.to('.page-home__content-watch-events', .5, {
                    right: '20%',
                    opacity: 0,
                    ease: Back.easeOut.config(1.7),
                    onComplete: this.onExit()
                });
            });
    
        }
    
        onExit() {
    
            let el = document.querySelector('.page-events');
            closeSection(el, this.props.mainContainer, this.props.tl);

        }



}
