import * as UI from '../../helpers/ElementsDOM';
import videojs from 'video.js';



export default class PlayerHome {

    constructor(){
        this.props = {
            videoHTML : null,
            click: false
        }
    }

    init(){
        this.render();
        
        
    }


    resize(){

        window.addEventListener('resize', () => {

            let size = window.innerWidth;
            
            if(size < 1440){
                this.props.mainPlayer.pause();
            }

        });

    }

    render(){

        //https://ott.cdn.iutpcdn.com/VOD/H01/HD/WBK0560DS1/03.m3u8
        const html = `
            <video class="player-home-hls video-js vjs-default-skin" preload="none">
                Tu navegador no soporta el elemento <code>video</code>.
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
        //source[0].src = 'https://totalgo.totalplay.com.mx:444/TPMCOREWeb/LiveAdaptive?v=N&session=o0fuxd2pwz6xhuf&lchId=2169&format=HLSAD&f=.m3u8'
        source[0].src = 'https://ott.cdn.iutpcdn.com/VOD/H01/HD/WBK0560DS1/03.m3u8';

        var options = {
            controls: false,
            autoplay: true,
            
        };

        this.props.mainPlayer = videojs(this.props.videoHTML, options, function onPlayerReady(){

            // In this context, `this` is the player that was created by Video.js.
            this.play();
            this.volume(0.5); 

            // How about an event listener?
            this.on('ended', function() {
                videojs.log('Awww...over so soon?!');
                videojs.log('termino el video ñeeeeeeee');
            });

        });

        this.resize();

    }

    onkeyPressEvent(){
        
        UI.playerHome.addEventListener('click', () => {
            
        });

        document.querySelector('.player-home-content').addEventListener('click', () => {
            this.props.videoHTML.requestFullscreen();

            // if(!this.props.click){
            //     this.props.click = true;
            //     this.props.videoHTML.requestFullscreen();
            //     this.props.videoHTML.play();
            // }
        });

        // document.querySelector('.icon-play').addEventListener('click', () => {

        //     console.log('click en ele boton PLAY')

        // })

    }

}