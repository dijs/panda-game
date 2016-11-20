import {
  Scene, PerspectiveCamera, CubeGeometry, MeshNormalMaterial, Mesh,
  WebGLRenderer, MeshBasicMaterial, BoxGeometry
} from 'three';

const pandaImageUrl = 'http://assets.worldwildlife.org/photos/81/images/carousel_small/Giant_Panda_Why_They_Matter_image_(c)_Bernard_De_Wetter_WWF_Canon.jpg?1345563751';

const shader = `
void main() {
  gl_FragColor = vec4(1.0,  // R
                      0.0,  // G
                      1.0,  // B
                      1.0); // A
}
`;

const scene = new Scene();

const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 5;

scene.add(camera);

const geometry = new BoxGeometry(1, 1, 1);
// const material = new MeshBasicMaterial({
//   color: 0xff0000,
//   wireframe: true
// });
const material = new MeshNormalMaterial();

const mesh = new Mesh(geometry, material);
scene.add(mesh);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;
  renderer.render(scene, camera);
}

animate();
