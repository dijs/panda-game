const PIXI = require('pixi.js');
const mountainsFragmentShader = require('./mountains.frag');

const width = 800;
const height = 600;

let worldPosition = 0;

const renderer = new PIXI.autoDetectRenderer(width, height);

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
panda.vx = 0;
panda.vy = 0;
panda.jumpedAt = 0;

const gravity = 9.8;

const checkpoints = Array(8).fill(0).map((e, i) => {
  const x = 1000 * i + 100;
  const checkpoint = createRectangle(0xFF0000, x, height / 2 - 32, 64, 64);
  checkpoint.lx = x;
  return checkpoint;
});

stage.addChild(bg);
stage.addChild(panda);
checkpoints.forEach(checkpoint => stage.addChild(checkpoint));

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
  },
  position: {
    type: '1f',
    value: 0
  },
};

const mountainsShader = new PIXI.Filter('', mountainsFragmentShader, uniforms);

stage.filters = [mountainsShader];

function update() {
  mountainsShader.uniforms.time += 0.05;

  panda.x += panda.vx;
  if (panda.vy) {
    const y = height - 40;
    const t = (Date.now() - panda.jumpedAt) * 0.01;
    panda.y = y + panda.vy * t + 0.5 * gravity * t * t;
    if (panda.y > y) {
      panda.y = y;
      panda.vy = 0;
    }
  }
  worldPosition += panda.vx;
  mountainsShader.uniforms.position = panda.x;

  checkpoints.forEach(checkpoint => {
    checkpoint.x = checkpoint.lx - worldPosition;
  });

  // each frame we spin the bunny around a bit
  // panda.rotation += 0.01;
}

function animate() {
    requestAnimationFrame(animate);
    update();
    renderer.render(stage);
}

const LEFT = 37;
const RIGHT = 39;
const UP = 38;

window.addEventListener('keydown', function (event) {
  if (event.keyCode === LEFT) {
    panda.vx = -4;
  }
  if (event.keyCode === RIGHT) {
    panda.vx = 4;
  }
  if (event.keyCode === UP && !panda.vy) {
    panda.vy = -70;
    panda.jumpedAt = Date.now();
  }
}, false);

window.addEventListener('keyup', function (event) {
  if (event.keyCode === LEFT || event.keyCode === RIGHT) {
    panda.vx = 0;
  }
}, false);

animate();
