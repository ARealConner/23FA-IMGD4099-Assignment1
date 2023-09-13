@group(0) @binding(0) var<uniform> frame: f32;
@group(0) @binding(1) var<uniform> res:   vec2f;
@group(0) @binding(2) var<uniform> audio:  vec3f;
@group(0) @binding(3) var<uniform> mouse: vec3f;

// Helper function for random numbers
fn rand(u: vec2f) -> f32 {
    return fract(sin(dot(u, vec2f(12.9898, 78.233))) * 43758.5453);
}

@vertex
fn vs( @location(0) input : vec2f ) ->  @builtin(position) vec4f {
  return vec4f( input, 0., 1.);
}

@fragment
fn fs( @builtin(position) pos : vec4f ) -> @location(0) vec4f {
  var p : vec2f = (-1. + (pos.xy / res)) * 2.;
  var color: vec4f = vec4f(0.);
  let nMouse = mouse.xy / res;

  // Initial explosion effect based on audio input
  let distFromCenter = length(p);
  let explosionEffect = smoothstep(0.4, 0.42, distFromCenter - audio[0] * 2.0);

  // Expanding space filled with stars
  let starThresh = rand(floor(p * 50.0 + frame * audio[1] * 1.0)) > 0.995;
  let starField = select(0.0, 1.0, starThresh);

  // Spiral galaxies influenced by audio
  let spiral = sin(6.0 * atan2(p.y, p.x) - frame * 0.1 * audio[2]) * exp(-distFromCenter * 5.0);
  let galaxyEffect = smoothstep(0.02, 0.03, spiral);

  color = vec4f(explosionEffect + starField + galaxyEffect);

//    var p : vec2f = -1. + (pos.xy / res) * 2.;
//    var color: vec4f = vec4f(0.);
//    let nMouse = mouse.xy / res;
    let frequency = 2.;
    let gain = audio[0]*2;
    let thickness = audio[1]/150;
    for( var i:f32 = 0.; i < audio[2]*50; i+= 1. ) {
      p.x += sin( p.y + (frame/60.) * i ) * gain;
      color += abs( thickness / p.x );
    }

  return color;
}
