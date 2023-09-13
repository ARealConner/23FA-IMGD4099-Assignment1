@group(0) @binding(0) var<uniform> frame: f32;
@group(0) @binding(1) var<uniform> res:   vec2f;
@group(0) @binding(2) var<uniform> audio:  vec3f;
@group(0) @binding(3) var<uniform> mouse: vec3f;

@vertex
fn vs( @location(0) input : vec2f ) ->  @builtin(position) vec4f {
  return vec4f( input, 0., 1.);
}

@fragment
fn fs( @builtin(position) pos : vec4f ) -> @location(0) vec4f {
  // create normalized position coordinates in range 0-1
  var p : vec2f = -1. + (pos.xy / res) * 2.;
  var color: vec4f = vec4f(0.);
  let nMouse = mouse.xy / res;
  let frequency = 2.;
  let gain = audio[0]*2;
  let thickness = audio[1]/150;
  for( var i:f32 = 0.; i < audio[2]*50; i+= 1. ) {
    p.x += sin( p.y + (frame/60.) * i ) * gain;
    color += abs( thickness / p.x );
  }

  return color;
}
