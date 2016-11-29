const PIXI = require('pixi.js');

const height = 600;

// You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
// which will try to choose the best renderer for the environment you are in.
const renderer = new PIXI.WebGLRenderer(800, height);

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

const stage = new PIXI.Container();

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

stage.addChild(panda);

function animate() {    // start the timer for the next animation loop
    requestAnimationFrame(animate);

    // each frame we spin the bunny around a bit
    // panda.rotation += 0.01;

    // this is the main render call that makes pixi draw your container and its children.
    renderer.render(stage);
}

animate();
