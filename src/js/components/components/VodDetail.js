import { createCustomElement, closeSection } from '../../helpers/helpers.js';
import { BackSectionVoddetail } from '../layout/BackSection.js';
import iconSVG from '../../../media/icons/hd.svg';
import trailerVod from '../../../media/resources/trailer-vod.jpg';
import { TweenMax, Expo } from 'gsap';

export default class VodDetail {

    constructor(isChild) {
        this.props = {
            mainContainer: null,
            // tl: new TimelineMax(),
            isChild: isChild
        }
    }

    init(container) {

        console.log('isChild: ',this.props.isChild);
        this.props.mainContainer = document.querySelector(`.${container}`);

        const vodTriller = `
            <img src="${trailerVod}" alt="">
        `;

        const buttons = `
            <span>Réntala ahora por</span>
            <div class="buy-vod__buttons">
                <a href="/player.html"><div class="btn-primary">HD $99 MXN</div></a>
                <a href="/player.html"><div class="btn-primary">SD $75 MXN</div></a>
            </div> 
        `;
    
        const detailData = `
            <div class="detail-vod__detail-vod">
            <ul>
                <li><img src="${iconSVG}" alt=""></li>
                <li>AA</li>
                <li>2018</li>
                <li>1hr 47 min</li>
            </ul>
                <div class="detail-languaje">Idiomas: Español, Inglés</div>
            </div>
            <div class="detail-vod__description">
                Los superhéroes se alían para vencer al poderoso Thanos, el peor enemigo al que se han enfrentado. Si Thanos logra reunir las seis gemas del infinito, nadie podrá detenerlo.
            </div>
        `;

        this.createElements(vodTriller, buttons, detailData);
    }

    createElements(triller, buttons, detailData) {

        let color = '#fafafa';
        let topBar = BackSectionVoddetail(color, 'Titulo de la pelicula');

        // crear los elementos

        // video o poster
        const vodTriller = createCustomElement('div', {
            class: 'detail-vod__trailer'
        }, [triller]);
        
        // buttons buy
        const vodButtons = createCustomElement('div', {
            class: 'detail-vod__buy-vod'
        }, [buttons]);


        const vodData = createCustomElement('div', {
            class: 'detail-vod__content-data'
        }, [detailData]);


        // // crear el elemento container
        const container = createCustomElement('div', {
            class: 'page-detail-vod'
        }, [topBar, vodTriller, vodButtons, vodData]);

        
        this.props.mainContainer.appendChild(container);

        this.props.buttonBack = document.querySelector('.btn-back-vod-detail');

        //animaciones
        TweenMax.to('.page-home__vodDetail', 0.8, {
            left: 0,
            display: 'block',
            ease: Expo.easeInOut
        });
        // this.props.tl.to('.page-home__vodDetail', .5, {
        //     opacity: 1,
        //     right: 0,
        //     display: 'block',
        //     ease: Power1.easeOut
        // }).to('.page-detail-vod', .5,  {top: 0, ease: Power1.easeOut}, .5);
        // this.props.tl.play();

        this.onkeyPress();

    }

    onkeyPress() {

        // BTN BACK

        this.props.buttonBack.addEventListener('click', () => {

            TweenMax.to('.page-home__vodDetail', 0.5, {
                left: '-100%',
                ease: Expo.easeInOut,
                onComplete: this.onExit()
            });
            // this.props.tl.to('.page-home__vodDetail', .5, {
            //     right: '20%',
            //     opacity: 0,
            //     ease: Back.easeOut.config(1.7),
            //     onComplete: this.onExit()
            // });

        });

    }

    onExit() {
        
        let el = document.querySelector('.page-detail-vod');
        closeSection(el, this.props.mainContainer, this.props.tl, this.props.isChild);
    }

}