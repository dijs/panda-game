export default {
  uniforms: {
    u_time: { type: "f", value: 1.0 },
    tDiffuse: { type: "t", value: null }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader: `
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

      gl_FragColor = color;
    }
  `
};
