import videojs from 'video.js';
import * as UI from '../../helpers/ElementsDOM.js';

export default class Player {

    constructor(){
        this.props = {
            videoHTML: null
        }
    }

    init(){
        // this.props.isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini /i.test(navigator.userAgent)) ? true : false;
        this.setUrl();
        this.onkeypressEvents();
        
    }

    setUrl(){

        this.props.videoHTML = document.querySelector('.video-main');
        let source = this.props.videoHTML.getElementsByTagName('source');
        // if(this.props.isMobile){
            // document.querySelector('.icon-play').style.display = 'block';
        // }
        // console.log('tag de video ===> ',this.props.videoHTML);
        // console.log(source);
        source[0].src = 'https://ott.cdn.iutpcdn.com/VOD/H01/HD/WBK0560DS1/03.m3u8';

        var options = {};
        
        this.props.player = videojs(this.props.videoHTML, options, function onPlayerReady() {
            videojs.log('Your player is ready!');
            
            // In this context, `this` is the player that was created by Video.js.
            this.pause();
        
            
            // How about an event listener?
            this.on('ended', function() {
                videojs.log('Awww...over so soon?!');
                videojs.log('termino el video')
            });

        });

        // this.props.videoHTML.requestFullscreen();

    }

    onkeypressEvents(){

        UI.iconPlayPlayer.addEventListener('click', () => {

            // console.log(' ===> ok play icon');
            setTimeout(() => {
                UI.iconPlayPlayer.style.cssText = 'transition: all .2ms ease-in-out; display: none;';
            }, 500);

            this.props.player.play();


        });



    }

}