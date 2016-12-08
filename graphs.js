function log(x) { console.log(x) }

//log(PIXI)

var renderer = PIXI.autoDetectRenderer(800, 600,
                                       {backgroundColor : 0x99ccff});
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

function Line(node1, node2) {
  var line = new PIXI.Graphics();


  // draw a line
  line.lineStyle(3, 0x9900cc, 1);
  line.moveTo(node1.position.x, node1.position.y)
  line.lineTo(node2.position.x, node2.position.y)
  line.endFill();

  node1.addChild(line);
  return line;
}

var c1 = Circle(100, 60);
var c2 = Circle(0, -60);

var line = Line(c1, c2);

function onDragStart(event)
{
  // store a reference to the draggedObject
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  console.log(event);
  this.draggedObject = event.data;
  this.startOffset = this.draggedObject.getLocalPosition(this);
  this.startOffset.x *= this.scale.x
  this.startOffset.y *= this.scale.y
  this.alpha = 0.5;
  this.dragging = true;
}

function onDragEnd()
{
  this.alpha = 1;

  this.dragging = false;

  // set the interaction draggedObject to null
  this.draggedObject = null;
}

function onDragMove()
{
  if (this.dragging)
  {
    var newPosition = this.draggedObject.getLocalPosition(this.parent);
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
