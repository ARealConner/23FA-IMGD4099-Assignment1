import { default as seagulls } from './dependencies/seagulls.js';
// import { default as Video } from './video.js'
import { default as Audio } from './dependencies/audio.js';
import { resumeAudioContextAndPlay } from './scripts/audioPlayer.js'; // <-- Importing the function

async function loadShader() {
    const response = await fetch('shader.wgsl');
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.text();
}

async function main() {
    // Initialize seagulls and load the shader
    const sg = await seagulls.init();
    const shader = await loadShader();
    Audio.start()
    
    // Initial uniforms setting
    let framecounter = 0;
    sg.uniforms({
        frame: framecounter,
        res: [window.innerWidth, window.innerHeight],
        audio: [0, 0, 0],  // Use the processed audio values here
        mouse: [0, 0, 0],
    });

    // Update frame count and audio data on each frame
    sg.onframe(() => {
        sg.uniforms.frame = framecounter++;
        // console.log(Audio.low, Audio.mid, Audio.high);
        sg.uniforms.audio = [Audio.low, Audio.mid, Audio.high];  // Update the audio uniform values
    });

    // Render setup
    sg.render(shader, { uniforms: ['frame', 'res', 'audio', 'mouse'] }).run();

    // Event listeners for mouse move and window resize
    document.addEventListener('mousemove', (event) => {
        sg.uniforms.mouse = [event.clientX, event.clientY, 0];
    });

    window.addEventListener('resize', () => {
        const canvas = document.querySelector('canvas');
        const device = sg.device;
        // sg.uniforms.res = [window.innerWidth, window.innerHeight];
        seagulls.setupCanvas(device, canvas);
    });

}

// window.addEventListener('load', () => { document.getElementById("start").click(); });

// document.getElementById("start").click();

// This will start both the audio and the WebGPU script when the play button is clicked
document.getElementById("start").addEventListener('click', function() {
    resumeAudioContextAndPlay();
    main().then(r => r);

    // Hide the play button after starting everything
    document.getElementById("startContainer").style.display = 'none';
});


