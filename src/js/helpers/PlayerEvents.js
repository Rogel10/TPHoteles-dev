let hls = new Hls();

// window.onfocus = function() { document.querySelector('.player-home-hls').play(); };
// window.onblur = function() { document.querySelector('.player-home-hls').pause(); }; 

export const setUrlPlayer = (_tag, _url) => {

    let url = _url;
    let tagVideo = _tag;
    if(Hls.isSupported()){

        // bind them together
        hls.attachMedia(tagVideo);
        // MEDIA_ATTACHED event is fired by hls object once MediaSource is ready
        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            // console.log("video and hls.js are now bound together !");
            hls.loadSource(url);
            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                // console.log("manifest loaded, found " + data.levels.length + " quality level");
            });
        });
        
        let playPromise = tagVideo.play();
        // In browsers that don’t yet support this functionality,
        // playPromise won’t be defined.
        if (playPromise !== undefined) {
            
            playPromise.then(function() {
                // Automatic playback started!
                console.log('Automatic playback started! ...');
            }).catch(function(error) {
                console.log('Automatic playback failed ....');
                setTimeout(() => {
                    console.log('intenta de nuevo .... ')
                    playPromise 
                },1000);
                // Automatic playback failed.
                // Show a UI element to let the user manually start playback.
            });
        }
        
        
    }else{
        console.log('el video no es soportado por el navegador');
    }

}
