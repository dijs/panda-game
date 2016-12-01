const PIXI = require('pixi.js');
const mountainsFragmentShader = require('./mountains.frag');

const width = 800;
const height = 600;

const renderer = new PIXI.autoDetectRenderer(width, height);

// The renderer will create a canvas element for you that you can then insert into the DOM.
document.body.appendChild(renderer.view);

function createCircle(color, x, y, r) {
  const circle = new PIXI.Graphics();
  circle.beginFill(color);
  circle.drawCircle(0, 0, r);
  circle.endFill();
  circle.x = x;
  circle.y = y;
  return circle;
}

function createRectangle(color, x, y, w, h) {
  var rectangle = new PIXI.Graphics();
  rectangle.beginFill(color);
  rectangle.drawRect(0, 0, w, h);
  rectangle.endFill();
  rectangle.x = x;
  rectangle.y = y;
  return rectangle;
}

const stage = new PIXI.Container();

// Create rectangle to take up whole space...
const bg = createRectangle(0x000000, 0, 0, width, height);

const panda = new PIXI.Container();
const head = new PIXI.Container();
head.addChild(createCircle(0xFFFFFF, 0, 0, 1));
head.addChild(createCircle(0xFFFFFF, -0.75, -0.75, 0.25));
head.addChild(createCircle(0xFFFFFF, 0.75, -0.75, 0.25));
head.addChild(createCircle(0x000000, 0.3, -0.3, 0.25));
head.addChild(createCircle(0x000000, -0.3, -0.3, 0.25));
head.addChild(createCircle(0x000000, 0, 0.1, 0.1));
panda.addChild(head);
panda.addChild(createCircle(0xFFFFFF, 0, 2.5, 2));
panda.scale.y = 16;
panda.scale.x = 16;
panda.y = height - 40;
panda.x = 64;

stage.addChild(bg);
stage.addChild(panda);

const uniforms = {
  time: {
    type: '1f',
    value: 0
  },
  width: {
    type: '1f',
    value: width
  },
  height: {
    type: '1f',
    value: height
  }
};

const mountainsShader = new PIXI.Filter('', mountainsFragmentShader, uniforms);

stage.filters = [mountainsShader];

function animate() {
    requestAnimationFrame(animate);

    mountainsShader.uniforms.time += 0.05;

    // each frame we spin the bunny around a bit
    // panda.rotation += 0.01;

    // this is the main render call that makes pixi draw your container and its children.
    renderer.render(stage);
}

animate();
