const THREE = require('three');
const EffectComposer = require('three-effectcomposer')(THREE);
const fragmentShader = require('./watercolor.frag');
const vertexShader = require('./watercolor.vert');

const uniforms = {
  u_time: { type: "f", value: 1.0 },
  u_resolution: { type: "v2", value: new THREE.Vector2() },
  tDiffuse: { type: "t", value: null }
};

// const pandaImageUrl = 'http://assets.worldwildlife.org/photos/81/images/carousel_small/Giant_Panda_Why_They_Matter_image_(c)_Bernard_De_Wetter_WWF_Canon.jpg?1345563751';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 5;

scene.add(camera);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh(geometry, material);
// mesh.rotation.x = 0.3;
// mesh.rotation.y = 0.2;
scene.add(mesh);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const composer = new EffectComposer(renderer)
composer.addPass(new EffectComposer.RenderPass(scene, camera))

const watercolorEffect = new EffectComposer.ShaderPass({
  uniforms,
  fragmentShader,
  vertexShader
});
watercolorEffect.renderToScreen = true;
composer.addPass(watercolorEffect);

document.body.appendChild(renderer.domElement);

onWindowResize();
window.addEventListener( 'resize', onWindowResize, false );

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;
  watercolorEffect.material.uniforms.u_time.value += 0.05;
  composer.render();
}

function onWindowResize() {
  renderer.setSize( window.innerWidth, window.innerHeight );
  watercolorEffect.material.uniforms.u_resolution.value.x = renderer.domElement.width;
  watercolorEffect.material.uniforms.u_resolution.value.y = renderer.domElement.height;
}

animate();
