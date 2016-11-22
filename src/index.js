const THREE = require('three');
const EffectComposer = require('three-effectcomposer')(THREE);

// const pandaImageUrl = 'http://assets.worldwildlife.org/photos/81/images/carousel_small/Giant_Panda_Why_They_Matter_image_(c)_Bernard_De_Wetter_WWF_Canon.jpg?1345563751';

import waterColorShader from './watercolor-shader';

THREE.DotScreenShader = {
  uniforms: {
    "tDiffuse": { type: "t", value: null },
    "tSize":    { type: "v2", value: new THREE.Vector2( 256, 256 ) },
    "center":   { type: "v2", value: new THREE.Vector2( 0.5, 0.5 ) },
    "angle":    { type: "f", value: 1.57 },
    "scale":    { type: "f", value: 1.0 }
  },
  vertexShader: [
    "varying vec2 vUv;",
    "void main() {",
      "vUv = uv;",
      "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
    "}"
  ].join("\n"),
  fragmentShader: [
    "uniform vec2 center;",
    "uniform float angle;",
    "uniform float scale;",
    "uniform vec2 tSize;",
    "uniform sampler2D tDiffuse;",
    "varying vec2 vUv;",
    "float pattern() {",
      "float s = sin( angle ), c = cos( angle );",
      "vec2 tex = vUv * tSize - center;",
      "vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;",
      "return ( sin( point.x ) * sin( point.y ) ) * 4.0;",
    "}",
    "void main() {",
      "vec4 color = texture2D( tDiffuse, vUv );",
      "float average = ( color.r + color.g + color.b ) / 3.0;",
      "gl_FragColor = vec4( vec3( average * 10.0 - 5.0 + pattern() ), color.a );",
    "}"
  ].join("\n")
};

THREE.RGBShiftShader = {
  uniforms: {
    "tDiffuse": { type: "t", value: null },
    "amount":   { type: "f", value: 0.005 },
    "angle":    { type: "f", value: 0.0 }
  },
  vertexShader: [
    "varying vec2 vUv;",
    "void main() {",
      "vUv = uv;",
      "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
    "}"
  ].join("\n"),
  fragmentShader: [
    "uniform sampler2D tDiffuse;",
    "uniform float amount;",
    "uniform float angle;",
    "varying vec2 vUv;",
    "void main() {",
      "vec2 offset = amount * vec2( cos(angle), sin(angle));",
      "vec4 cr = texture2D(tDiffuse, vUv + offset);",
      "vec4 cga = texture2D(tDiffuse, vUv);",
      "vec4 cb = texture2D(tDiffuse, vUv - offset);",
      "gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);",
    "}"
  ].join("\n")
};

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 5;

scene.add(camera);

const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshNormalMaterial();
const material = new THREE.ShaderMaterial(waterColorShader);

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const composer = new EffectComposer(renderer)
composer.addPass(new EffectComposer.RenderPass(scene, camera))

// Redraw with a shader
const dotEffect = new EffectComposer.ShaderPass(waterColorShader);
dotEffect.renderToScreen = true;
composer.addPass(dotEffect);

// And another shader, drawing to the screen at this point
// const shiftEffect = new EffectComposer.ShaderPass(THREE.RGBShiftShader)
// shiftEffect.renderToScreen = true;
// composer.addPass(shiftEffect);

document.body.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;
  waterColorShader.uniforms.u_time.value += 0.05;
  // composer.render();
  renderer.render(scene, camera);
}

animate();
