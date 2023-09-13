import { default as seagulls } from './dependencies/seagulls.js';
// import { default as Video } from './video.js'
import { default as Audio } from './dependencies/audio.js';

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

    // Start audio on body click
    document.body.onclick = Audio.start;

    // Initial uniforms setting
    let framecounter = 0;
    sg.uniforms({
        frame: framecounter,
        res: [window.innerWidth, window.innerHeight],
        audio: [0, 0, 0],
        mouse: [0, 0, 0],
    });

    // Update frame count on each frame
    sg.onframe(() => {
        sg.uniforms.frame = framecounter++;
    });

    // Render setup
    sg.render(shader, { uniforms: ['frame', 'res', 'audio', 'mouse'] }).run();

    // Event listeners for mouse move and window resize
    document.addEventListener('mousemove', (event) => {
        sg.uniforms.mouse = [event.clientX, event.clientY, 0];
    });

    window.addEventListener('resize', () => {
        sg.uniforms.res = [window.innerWidth, window.innerHeight];
    });
}

main();
