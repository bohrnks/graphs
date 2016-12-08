function log(x) { console.log(x) }

//log(PIXI)

var renderer = PIXI.autoDetectRenderer(800, 600,
                                       {backgroundColor : 0x1079ab});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

stage.interactive = true;


function Circle(x, y) {
  var graphics = new PIXI.Graphics();

  // draw a circle
  graphics.lineStyle(2, 0x0033cc);
  graphics.beginFill(0xffff66, 0.7);
  graphics.drawCircle(470, 200, radius=10);
  graphics.endFill();

  stage.addChild(graphics);

  graphics.position.x = x;
  graphics.position.y = y;
  return graphics;
}

var circle = Circle(10, 60);

// Just click on the stage to draw random lines
stage.on('click', onClick);
stage.on('tap', onClick);

function onClick()
{
  graphics.lineStyle(Math.random() * 30, Math.random() * 0xFFFFFF, 1);
  graphics.moveTo(Math.random() * 620,Math.random() * 380);
  graphics.bezierCurveTo(Math.random() * 620,Math.random() * 380,
                         Math.random() * 620,Math.random() * 380,
                         Math.random() * 620,Math.random() * 380);
}
// run the render loop
animate();

function animate() {
  circle.position.x = circle.position.x + 1;
  renderer.render(stage);
  requestAnimationFrame( animate );
}
