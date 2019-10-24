import { createCustomElement, closeSection, openSection } from '../../helpers/helpers.js';
import { BackSectionVoddetail } from '../layout/BackSection.js';
import trailerVod from '../../../media/resources/trailer-vod.jpg';
import { TweenMax, Expo } from 'gsap';
import videojs from 'video.js';
import Player from '../components/Player.js';
import iconSVG from '../../../media/icons/hd.svg';


export default class VodDetail {

    constructor(isChild) {
        this.props = {
            mainContainer: null,
            isChild: isChild
        }
    }

    init(params) {
        
        // se recibe el objeto de vod

        console.log('isChild: ',this.props.isChild);
        this.props.mainContainer = document.querySelector(`.${params.className}`);


        const vodTriller = `
            <div class="poster-movie">
                <div class="poster-layer"></div>
                <img class="poster-image" src="${trailerVod}" />
            </div>
            <video id="playerTpTriller" class="player-js-tp-triller video-js vjs-default-skin">
                Tu navegador no soporta el elemento <code>video</code>.
                <source src="" type="application/x-mpegURL">
            </video>` ;

        const buttons = `
            <span>Réntala ahora por</span>
            <div class="buy-vod__buttons">
                <div class="btn-primary">HD $99 MXN</div>
                <div class="btn-primary">SD $75 MXN</div>
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

    createElements( triller, buttons, detailData) {

        let color = '#fafafa';
        let topBar = BackSectionVoddetail(color, 'Titulo de la pelicula');

        // crear los elementos

        // video o poster
        const vodTriller = createCustomElement('div', {

            class: 'detail-vod__trailer'
        },[triller]);
        
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
            ease: Expo.easeInOut,
            onComplete: this.setUrl()            
        });


        this.onkeyPress();


    }


    setUrl(){

        this.props.videoHTML = document.getElementById('playerTpTriller');
        this.props.sourceVideo = this.props.videoHTML.getElementsByTagName('source');
        //this.props.sourceVideo[0].src = 'https://ott.cdn.iutpcdn.com/VOD/H01/HD/VUKS07599191/index.m3u8';
        this.props.sourceVideo[0].src = 'https://ott.cdn.iutpcdn.com/VOD/H01/HD/WBK0571SStrl/03.m3u8';

        const options = {
            controls: true,
            autoplay: false,
            preload: 'auto',
            muted: true
        };        

        this.props.mainPlayer = videojs(this.props.videoHTML, options, function onPlayerReady() {

            videojs.log('Your player is ready! ...');
            // In this context, `this` is the player that was created by Video.js.
            // How about an event listener?
            
            // this.on('ended', function() {
            //     videojs.log('Awww...over so soon?!');
            //     videojs.log('termino el video ...');
                
            // });

        });
        this.onStreamEvent();
        
    }

    onStreamEvent() {

        // this.props.objVideo.progress = null;
        let video = this.props.videoHTML;

        // Si el video tiene bookmark
        // const bookmark = localStorage.getItem('bookmark');
        // console.log(' se seteara al tiempo ', bookmark);
        // if(bookmark)
        //     this.props.mainPlayer.currentTime(bookmark);

        // retrasa el inicio del trailler
        setTimeout(() => {
            this.props.mainPlayer.play();
            // console.log('poster ¿? ',this.props.videoHTML.poster);
            TweenMax.to('.poster-movie', 0.5, {
                opacity: 0,
                display: 'none',
                ease: Power0.easeNone
            });
        }, 2000);
        
        video.addEventListener('timeupdate', () => {

            // this.props.objVideo.progress = getSeconds(video.currentTime);
            if(video.ended) {
                console.log(' ... -> termina el video ');
                // this.props.btnPlay.className = "control-play";
                this.endVideo();
            }
            
            // console.log(getSeconds(video.currentTime));
            //console.log(': ',Math.round(video.currentTime),' - ',video.currentTime,' t ', Math.round(video.duration));
            // let s = Math.round(video.currentTime / 1000) * 60;
            // let t = Math.round(video.duration);
            // let s = video.currentTime / video.duration;
            // let w =`${s*1000}%`;
            
            // console.log(s, t)
            // console.log('duration: ',video.duration,' currentTime: ',video.currentTime);
            // console.log('currentTime: ',video.currentTime);
            // this.props.objVideo.progress = (video.currentTime / video.duration) * 100;

            // console.log('progress: ',getMinSeconds(this.props.objVideo.progress));

        });
    }

    endVideo(){
        this.props.mainPlayer.currentTime(0);
        this.props.mainPlayer.exitFullscreen();
        this.props.videoHTML.exitFullScreen();
        // console.log('poster ¿? ',this.props.videoHTML.poster);

        TweenMax.to('.poster-movie', 0.5, {
            opacity: 1,
            display: 'block',
            ease: Power0.easeNone
        });
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


        document.querySelector('.btn-primary').addEventListener('click', () => {

            console.log('click boton player ... ');
            this.goToPlayer();

        });

    }

    goToPlayer(_item){

        // this.killPlayer();
        this.stopPlayer();
        const player = new Player();
        openSection(player, {
            className: 'main-player',
            channelItem: {},
            contentVideo: null,
            parent: this.props.mainContainer
        });
    }

    killPlayer() {
        // this.props.mainPlayer.pause();
        // this.props.mainPlayer.dispose();
    }

    stopPlayer(){
        this.props.mainPlayer.currentTime(0);
        TweenMax.to('.poster-movie', 0.5, {
            opacity: 1,
            display: 'block',
            ease: Power0.easeNone
        });

    }
    
    onExit() {
        
        let el = document.querySelector('.page-detail-vod');
        closeSection(el, this.props.mainContainer, this.props.tl, this.props.isChild);
    }

}