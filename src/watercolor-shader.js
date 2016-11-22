export default {
  uniforms: {
    u_time: { type: "f", value: 1.0 },
  },
  vertexShader: `
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    void main() {
      v_texCoord = a_texCoord;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      // gl_Position = vec4( position, 1.0 );
    }
  `,
  fragmentShader: `
  // Author @patriciogv - 2015
// Title: Ikeda Data Stream

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D u_image;
varying vec2 v_texCoord;

float random (in float x) {
  return fract(sin(x)*1e4);
}

float random (in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

void main() {
  // vec2 st = gl_FragCoord.xy/u_resolution.xy;

  // color.r = pattern(st+offset,vel,0.5+u_mouse.x/u_resolution.x);
  // color.g = pattern(st,vel,0.5+u_mouse.x/u_resolution.x);
  // color.b = pattern(st-offset,vel,0.5+u_mouse.x/u_resolution.x);
  //
  // gl_FragColor = vec4(1.0-color,1.0);
  vec3 color = vec3(1);

  color.r = cos(u_time);
  color.g = 0.;
  color.b = 0.;

  gl_FragColor = vec4(color, 1);
  // texture2D(u_image, v_texCoord);
}
  `
};
