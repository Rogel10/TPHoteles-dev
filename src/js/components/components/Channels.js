import { createCustomElement, closeSection } from '../../helpers/helpers.js';
import { BackSection } from '../layout/BackSection.js';
import c1 from '../../../media/resources/Channels/01.png';
import c2 from '../../../media/resources/Channels/02.png';
import c3 from '../../../media/resources/Channels/03.png';
import c4 from '../../../media/resources/Channels/04.png';
import c5 from '../../../media/resources/Channels/05.png';
import c6 from '../../../media/resources/Channels/06.png';
import c7 from '../../../media/resources/Channels/07.png';
import c8 from '../../../media/resources/Channels/08.png';
import c9 from '../../../media/resources/Channels/09.png';
import c10 from '../../../media/resources/Channels/10.png';
import c11 from '../../../media/resources/Channels/11.png';
import c12 from '../../../media/resources/Channels/12.png';
import c13 from '../../../media/resources/Channels/13.png';
import c14 from '../../../media/resources/Channels/14.png';
import c15 from '../../../media/resources/Channels/15.png';
import c16 from '../../../media/resources/Channels/16.png';
import c17 from '../../../media/resources/Channels/17.png';
import c18 from '../../../media/resources/Channels/18.png';
import c19 from '../../../media/resources/Channels/19.png';
import c20 from '../../../media/resources/Channels/20.png';


export default class ListChannels {

    constructor() {
        this.props = {   
            mainContainer: null,
            tl: new TimelineMax(),
            contentChannels: null,
            data: {
                channels: [
                    {
                        name: 'channel_1',
                        id: 0,
                        url: 'https://ott.cdn.iutpcdn.com/VOD/H01/HD/WBK0560DS1/03.m3u8'
                    },
                    {
                        name: 'channel_2',
                        id: 1,
                        url: 'https://ott.cdn.iutpcdn.com/VOD/H01/HD/WBK0560DS1/03.m3u8'
                    },
                    {
                        name: 'channel_3',
                        id: 2,
                        url: 'https://ott.cdn.iutpcdn.com/VOD/H01/HD/WBK0560DS1/03.m3u8'
                    }
                ]
            }
        }        
    }

    init(container) {

        
        this.props.mainContainer = document.querySelector(`.${container}`);

        let items = `
       <li class="list-channels__channel"> 
            <a href="/player.html">
                <img class="channel_logo" src="${c1}" alt="">
                <div class="channel_number">1</div>
            </a>
        </li>
        <li class="list-channels__channel">
            <a href="/player.html">
                <img class="channel_logo" src="${c2}" alt="">
                <div class="channel_number">2</div>
            </a>
        </li>
        <li class="list-channels__channel">
            <img class="channel_logo" src="${c3}" alt="">
            <div class="channel_number">3</div>
        </li>
        <li class="list-channels__channel">
            <img class="channel_logo" src="${c4}" alt="">
            <div class="channel_number">4</div>
        </li>
        <li class="list-channels__channel">
            <img class="channel_logo" src="${c5}" alt="">
            <div class="channel_number">5</div>
        </li>
        <li class="list-channels__channel">
            <img class="channel_logo" src="${c6}" alt="">
            <div class="channel_number">6</div>
        </li>
        <li class="list-channels__channel">
            <img class="channel_logo" src="${c7}" alt="">
            <div class="channel_number">7</div>
        </li>
        <li class="list-channels__channel">
            <img class="channel_logo" src="${c8}" alt="">
            <div class="channel_number">8</div>
        </li>
        <li class="list-channels__channel">
            <img class="channel_logo" src="${c9}" alt="">
            <div class="channel_number">9</div>
        </li>
        <li class="list-channels__channel">
            <img class="channel_logo" src="${c10}" alt="">
            <div class="channel_number">10</div>
        </li>
        <li class="list-channels__channel">
            <img class="channel_logo" src="${c11}" alt=""
            ><div class="channel_number">11</div>
        </li>
        <li class="list-channels__channel">
            <img class="channel_logo" src="${c12}" alt="">
            <div class="channel_number">12</div>
        </li>
        <li class="list-channels__channel">
            <img class="channel_logo" src="${c13}" alt="">
            <div class="channel_number">13</div>
        </li>
        <li class="list-channels__channel">
            <img class="channel_logo" src="${c14}" alt="">
            <div class="channel_number">14</div>
        </li>
        <li class="list-channels__channel">
            <img class="channel_logo" src="${c15}" alt="">
            <div class="channel_number">15</div>
        </li>
        <li class="list-channels__channel">
            <img class="channel_logo" src="${c16}" alt="">
            <div class="channel_number">16</div>
        </li>
        <li class="list-channels__channel">
            <img class="channel_logo" src="${c17}" alt="">
            <div class="channel_number">17</div>
        </li>
        <li class="list-channels__channel">
            <img class="channel_logo" src="${c18}" alt="">
            <div class="channel_number">18</div>
        </li>
        <li class="list-channels__channel">
            <img class="channel_logo" src="${c19}" alt="">
            <div class="channel_number">19</div>
        </li>
        <li class="list-channels__channel">
            <img class="channel_logo" src="${c20}" alt="">
            <div class="channel_number">20</div>
        </li>
        <li class="list-channels__channel">
            <img class="channel_logo" src="${c1}" alt="">
            <div class="channel_number">21</div>
        </li>
        <li class="list-channels__channel">
            <img class="channel_logo" src="${c2}" alt="">
            <div class="channel_number">22</div>
        </li>
       `;
       
           
       this.createElements(items);
    }

    createElements(_items) {

        let color = '#fafafa';
        let topBar = BackSection(color, 'Televisión en Vivo');
    
        const contentList = createCustomElement('ul', {
            class: 'list-channels'
        }, [_items]);

        const player = createCustomElement('div', {
            class: 'video-player-channels',
            id: 'videoPlayerChannels'
        } );

        const container = createCustomElement('section', {
            class: 'page-guide'
        }, [topBar, contentList, player]);

        // inyecta todo el contenido al main container
        this.props.mainContainer.appendChild(container);

        //animaciones
        this.props.tl.to('.page-home__content-watch-tv', .3, {
            opacity: 1,
            right: 0,
            display: 'block',
            ease: Power1.easeOut
        }).to('.page-guide', .5,  {top: 0, ease: Power1.easeOut}, .5);
        this.props.tl.play();
        
        
        this.props.contentChannels =  document.querySelector('.list-channels');
        this.props.listChannels = [...document.querySelectorAll('.list-channels__channel')];
        this.props.video = document.getElementById('videoPlayerChannels');
        console.log('this.props.contentChannels === ',this.props.video);

        this.onkeyPress();

        console.log('id ??? ',this.props.video.id);

        // var player = videojs('example-video');
        // player.play();
    }

    onkeyPress() {

        // BTN BACK
        document.querySelector('.back-section__back').addEventListener('click', () => {
            this.props.tl.to('.page-home__content-watch-tv', .5, {
                right: '20%',
                opacity: 0,
                ease: Back.easeOut.config(1.7),
                onComplete: this.onExit()
            });
        })

        // click channel
        this.props.contentChannels.addEventListener('click', (e) => {


                let target = (e.target.parentElement.localName === 'li') ? e.target.parentNode : e.target;
                if(e.target.nodeName === 'LI' || e.target.parentNode.nodeName === 'LI'){

                    let indexHover = this.props.listChannels.indexOf(target);
                    console.log('indexHover => ', indexHover);

                }
        })


    }

    onExit() {
        let el = document.querySelector('.page-guide');
        closeSection(el, this.props.mainContainer, this.props.tl);
    }

}