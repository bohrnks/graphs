function log(x) { console.log(x) }

//log(PIXI)

var renderer = PIXI.autoDetectRenderer(800, 600,
                                       {backgroundColor : 0x1079ab});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

stage.interactive = true;

var graphics = new PIXI.Graphics();

// draw a circle
graphics.lineStyle(0);
graphics.beginFill(0xFFFF0B, 0.5);
graphics.drawCircle(470, 200, radius=10);
graphics.endFill();

stage.addChild(graphics);

graphics.position.x = 30

// let's create a moving shape
var thing = new PIXI.Graphics();
stage.addChild(thing);
thing.position.x = 620/2;
thing.position.y = 380/2;

var count = 0;

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
    renderer.render(stage);
    requestAnimationFrame( animate );
}
