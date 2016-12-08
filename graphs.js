function log(x) { console.log(x) }

//log(PIXI)

var renderer = PIXI.autoDetectRenderer(800, 600,
                                       {backgroundColor : 0x1079ab});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

stage.interactive = true;


function Circle(x, y) {
  var circle = new PIXI.Graphics();

  // draw a circle
  circle.lineStyle(2, 0x0033cc);
  circle.beginFill(0xffff66, 0.7);
  circle.drawCircle(470, 200, radius=10);
  circle.endFill();

  circle.position.x = x;
  circle.position.y = y;

  stage.addChild(circle);

  circle.interactive = true;
  circle.on('mousedown', onDragStart)
    .on('touchstart', onDragStart)
    // events for drag end
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('touchend', onDragEnd)
    .on('touchendoutside', onDragEnd)
    // events for drag move
    .on('mousemove', onDragMove)
    .on('touchmove', onDragMove);

  return circle;
}

var circle = Circle(10, 60);

function onDragStart(event)
{
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  console.log(event);
  this.data = event.data;
  this.startOffset = this.data.getLocalPosition(this);
  this.startOffset.x *= this.scale.x
  this.startOffset.y *= this.scale.y
  this.alpha = 0.5;
  this.dragging = true;
}

function onDragEnd()
{
  this.alpha = 1;

  this.dragging = false;

  // set the interaction data to null
  this.data = null;
}

function onDragMove()
{
  if (this.dragging)
  {
    var newPosition = this.data.getLocalPosition(this.parent);
    this.position.x = (newPosition.x - this.startOffset.x);
    this.position.y = (newPosition.y - this.startOffset.y);
  }
}



// run the render loop
animate();

function animate() {
  //circle.position.x = circle.position.x + 1;
  renderer.render(stage);
  requestAnimationFrame(animate);
}
