// audioPlayer.js

var context;

window.onload = function() {
    context = new AudioContext();
    // context.onstatechange = function() {
    //     if(context.state === 'running') {
    //         play();
    //     }
    // }
};

function play() {
    const promise = document.getElementById('PageAudio').play();
    if (promise !== undefined) {
        promise.then(_ => {
            console.log("playing");
        }).catch(error => {
            // Autoplay was prevented.
        });
    }
}

// We'll export this function to be used in main.js
export function resumeAudioContextAndPlay() {
    context.resume().then(function() {
        play();
    });
}
