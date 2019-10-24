import { TweenMax, Expo } from 'gsap';
import videojs from 'video.js';
import { closeSection } from "../../helpers/helpers.js";
import { getSeconds } from '../../helpers/helpersPlayer.js';

export default class Player {

    constructor(){
        
        this.props = {
            mainItem : null,
            contentPlayer : null,
            contentParent: null,
            objVideo: {}
        }
    }

    init(params){

        console.log('params ... ',params);
        /**
         * solo se aplica cuando viene de channel
        */
        if(params.parent){
            this.props.parentPage = params.parent;
            this.props.parentPage.style.overflowY = 'hidden';
        }

        this.props.mainContainer = document.querySelector(`.${params.className}`);
        this.createPlayer();

    }
   
    createPlayer(){

        const elementPlayer = `
            <div class="controls-player">
                <div>
                    <div class="controls-player__back">Regresar</div>
                </div>
                <div class="controls-player__subtitles">
                    <div class="subtitles-idioma">Español Sin Subtitulos</div>
                    <div class="subtitles-idioma">Inglés con subtitulos en  Español</div>
                </div>
            </div>
            <div class="content-video-player">

            </div>
        `;

        // 'seteo' el html en el contenedor padre 
        // quito el scroll de la pantalla del player
        console.log(this.props.contentPlayer)
        this.props.mainContainer.innerHTML = elementPlayer;

        // animation
        TweenMax.to(this.props.mainContainer, 0.8, {
            display: 'block',
            left: 0,
            ease: Expo.easeInOut,
            onComplete: this.setPlayer() 
        });

        this.onkeyPressEventsPlayer();

    }

    setPlayer(_url){

        const containerVideo = document.querySelector('.content-video-player');
        var html = `<video id="playerTp" class="player-js-tp video-js vjs-default-skin">
        Tu navegador no soporta el elemento <code>video</code>.
            <source src="" type="application/x-mpegURL">
        </video>`;
        
        containerVideo.innerHTML = html;

        this.props.videoHTML = document.querySelector('.player-js-tp');
        this.props.sourceVideo = this.props.videoHTML.getElementsByTagName('source');
        this.props.sourceVideo[0].src = 'https://ott.cdn.iutpcdn.com/VOD/H01/HD/VUKS07599191/index.m3u8';
        // this.props.sourceVideo[0].src = 'https://ott.cdn.iutpcdn.com/VOD/H01/HD/WBK0571SStrl/03.m3u8';

        const options = {
            controls: true,
            autoplay: true,
            preload: 'auto',
            muted: true
        };        

        this.props.mainPlayer = videojs(this.props.videoHTML, options, function onPlayerReady() {

            videojs.log('Your player is ready! ...');
            // In this context, `this` is the player that was created by Video.js.
            // How about an event listener?
            
            this.on('ended', function() {
                videojs.log('Awww...over so soon?!');
                videojs.log('termino el video ...');
            });

        });
        
        
        this.onStreamEvent();

    }

    /**
     * funcion que reseta el player
     */
    killPlayer() {
        this.props.mainPlayer.pause();
        localStorage.setItem('bookmark', this.props.objVideo.progress);
        // console.log('se guarda en storage => ',this.props.objVideo.progress);
        this.props.sourceVideo[0].src = null;
    }

    onStreamEvent() {

        this.props.objVideo.progress = null;
        let video = this.props.videoHTML;

        // Si el video tiene bookmark
        const bookmark = localStorage.getItem('bookmark');
        // console.log(' se seteara al tiempo ', bookmark);
        if(bookmark)
            this.props.mainPlayer.currentTime(bookmark);
        
        this.props.videoHTML.addEventListener('timeupdate', () => {

            this.props.objVideo.progress = getSeconds(video.currentTime);

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


    onkeyPressEventsPlayer(){

        document.querySelector('.controls-player__back').addEventListener('click', (e) => {
            this.killPlayer();
            TweenMax.to(this.props.mainContainer, 0.8, {
                left: '-100%',
                ease: Expo.easeInOut,
                onComplete: this.onExit()
            });
        });

    }

    onExit(){
        
        closeSection(null, this.props.mainContainer);
        
        if(this.props.parentPage)
            this.props.parentPage.style.overflowY = 'auto';

    }
   
}