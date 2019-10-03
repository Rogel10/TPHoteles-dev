import { createCustomElement, closeSection, openSection } from "../../helpers/helpers";
import { BackSection } from '../layout/BackSection.js';
import VodDetail from '../components/VodDetail.js';
import imgVodBanner from '../../../media/resources/VOD/main_banner.png';
import imgVod01 from '../../../media/resources/VOD/pelicula_01.jpg';
import imgVod02 from '../../../media/resources/VOD/pelicula_02.jpg';
import imgVod03 from '../../../media/resources/VOD/pelicula_03.jpg';
import imgVod04 from '../../../media/resources/VOD/pelicula_04.jpg';
import imgVod05 from '../../../media/resources/VOD/pelicula_05.jpg';
import imgVod06 from '../../../media/resources/VOD/pelicula_06.jpg';
import imgVod07 from '../../../media/resources/VOD/pelicula_07.jpg';
import imgVod08 from '../../../media/resources/VOD/pelicula_08.jpg';
import imgVod09 from '../../../media/resources/VOD/pelicula_09.jpg';

export default class Vod {

    constructor() {
        this.props = {   
            mainContainer: null,
            tl: new TimelineMax({
                pause: true
            }),
            vodDetail: new VodDetail({child: true})
        }        
    }
    
    init(container) {

        document.body.style.overflowY = 'hidden';
        this.props.mainContainer = document.querySelector(`.${container}`);
        let mainvod = ` 
            <img src="${imgVodBanner}" alt="">
        `;

        let items = `
                <li class="content-vod__list-vods__item">
                    <img src="${imgVod01}" alt="">
                </li>
                <li class="content-vod__list-vods__item">
                    <img src="${imgVod02}" alt="">
                </li>
                <li class="content-vod__list-vods__item">
                    <img src="${imgVod03}" alt="">
                </li>
                <li class="content-vod__list-vods__item">
                    <img src="${imgVod04}" alt="">
                </li>
                <li class="content-vod__list-vods__item">
                    <img src="${imgVod05}" alt="">
                </li>
                <li class="content-vod__list-vods__item">
                    <img src="${imgVod06}" alt="">
                </li>
                <li class="content-vod__list-vods__item">
                    <img src="${imgVod07}" alt="">
                </li>
                <li class="content-vod__list-vods__item">
                    <img src="${imgVod08}" alt="">
                </li>
                <li class="content-vod__list-vods__item">
                    <img src="${imgVod09}" alt="">
                </li>
                <li class="content-vod__list-vods__item">
                    <img src="${imgVod01}" alt="">
                </li>
            `;

        this.createElements(mainvod, items);
    }

    createElements(_vod, _items) {

        let color = '#fafafa';
        let topBar = BackSection(color, 'Réntalas ahora');
        
        // //crear el elemento content 
        const mainVod = createCustomElement('div', {
            class: 'page-vod__main-banner'
        }, [_vod]);

        
        const ul = createCustomElement('ul',{
            class: 'content-vod__list-vods'
        }, [_items]);

        const contentListVod = createCustomElement('div', {
            class: 'page-vod__content-vods'
        }, [ul]);


        // crear el elemento container
        const container = createCustomElement('div', {
            class: 'page-vod'
        }, [topBar, mainVod, contentListVod ]);

        this.props.mainContainer.appendChild(container);


        this.props.contentVods = document.querySelector('.content-vod__list-vods');
        this.props.itemsVod = [...document.querySelectorAll('.content-vod__list-vods__item img')];


        //animaciones
         this.props.tl.to('.page-home__content-vod', .5, {
            opacity: 1,
            right: 0,
            display: 'block',
            ease: Power1.easeOut
        }).to('.page-vod', .5,  {top: 0, ease: Power1.easeOut}, .5);
        this.props.tl.play();

        this.onkeyPress();

    }

    onkeyPress() {

        document.querySelector('.back-section__back').addEventListener('click', () => {

            this.props.tl.to('.page-home__content-vod', .5, {
                right: '20%',
                opacity: 0,
                ease: Back.easeOut.config(1.7),
                onComplete: this.onExit()
            });
        });

        this.props.contentVods.addEventListener('click', (e) => {
 
            if(e.target.localName === 'img'){

                let index = this.props.itemsVod.indexOf(e.target);
                openSection(this.props.vodDetail, {className: 'page-home__vodDetail'});
            }

        });


    }

    onExit() {

        let el = document.querySelector('.page-vod');
        closeSection(el, this.props.mainContainer, this.props.tl);

    }

}