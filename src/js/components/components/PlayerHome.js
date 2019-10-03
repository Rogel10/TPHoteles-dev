import * as UI from '../../helpers/ElementsDOM';
import videojs from 'video.js';



export default class PlayerHome {

    constructor(){
        this.props = {
            videoHTML : null
        }
    }

    init(){
        this.render();
        
    }

    render(){

        //https://ott.cdn.iutpcdn.com/VOD/H01/HD/WBK0560DS1/03.m3u8
        const html = `
            <video class="player-home-hls video-js vjs-default-skin">
                <source src="" type="application/x-mpegURL">
            </video>
            <div class="player-home-content">
                <div class="player-home__liveTv"></div>
                <div class="player-home__content">
                    <div class="player-home__progressBar">
                        <div class="progress-bar-progress"></div>
                    </div>
                    <div class="player-home__title-program">Título de programa</div>
                    <div class="player-home__info-program">A  I  000 min  I  IMDB 0.0</div>
                </div>
            </div>`;

            UI.playerHome.innerHTML = html;
            this.setURL();
            this.onkeyPressEvent();
    }

    setURL(){

        this.props.videoHTML = document.querySelector('.player-home-hls');
        let source = this.props.videoHTML.getElementsByTagName('source');
        // console.log('tag de video ===> ',this.props.videoHTML);
        // console.log(source);
        source[0].src = 'https://ott.cdn.iutpcdn.com/VOD/H01/HD/WBK0560DS1/03.m3u8';

        var options = {};
        this.props.mainPlayer = videojs(this.props.videoHTML, options, function onPlayerReady() {
            videojs.log('Your player is ready!');
            
            // In this context, `this` is the player that was created by Video.js.
            this.pause();
            
            // How about an event listener?
            this.on('ended', function() {
                videojs.log('Awww...over so soon?!');
                videojs.log('termino el video')
            });

        });

    }

    onkeyPressEvent(){
        
        UI.playerHome.addEventListener('click', () => {
            console.log('click => ');
        });

        document.querySelector('.player-home-content').addEventListener('click', () => {
            this.props.videoHTML.requestFullscreen();
        });


    }

}