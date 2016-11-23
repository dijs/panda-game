#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D tDiffuse;
varying vec2 vUv;

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;

  vec4 color = texture2D(tDiffuse, vUv);

  color.r = color.b;
  color.b = color.g;

  gl_FragColor = color;
}
