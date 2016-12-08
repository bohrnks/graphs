function log(x) { console.log(x) }

//log(PIXI)

var renderer = PIXI.autoDetectRenderer(800, 600,
                                       {backgroundColor : 0x99ccff});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

stage.interactive = true;

var lines = []


function Circle(x, y) {
  var container = new PIXI.Container();
  var circle = new PIXI.Graphics();

  // draw a circle
  circle.lineStyle(2, 0x0033cc);
  circle.beginFill(0xffff66, 0.9);
  circle.drawCircle(0, 0, radius=7);
  circle.endFill();

  container.position.x = x;
  container.position.y = y;

  stage.addChild(container);
  container.addChild(circle);

  container.interactive = true;
  container.on('mousedown', onDragStart)
    .on('touchstart', onDragStart)
    // events for drag end
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('touchend', onDragEnd)
    .on('touchendoutside', onDragEnd)
    // events for drag move
    .on('mousemove', onDragMove)
    .on('touchmove', onDragMove);

  return container;
}

function Line(node1, node2) {
  var line = new PIXI.Graphics();
  line.node1 = node1;
  line.node2 = node2;

  lines.push(line);

  line.redraw = function() {
    line.clear();
    // draw a line
    line.lineStyle(3, 0x9900cc, 1);
    line.moveTo(line.node1.position.x, line.node1.position.y)
    line.lineTo(line.node2.position.x, line.node2.position.y)
    line.endFill();
  }

  line.redraw();

  stage.addChild(line);
  line.zIndex = -1;

  return line;
}

function ccw(A,B,C) {
  return (C.y-A.y) * (B.x-A.x) > (B.y-A.y) * (C.x-A.x);
}

// Return true if two lines intersect
function intersect(line1, line2) {
  // Get positions for line end points A, B, C, D
  // Test segments AB and CD
  var A = line1.node1.position;
  var B = line1.node2.position;
  var C = line2.node1.position;
  var D = line2.node2.position;

  // Special case: if end points are the same, no intersect
  if (A == C ||
      A == D ||
      B == C ||
      B == D) {
    return false;
  }

  return ccw(A,C,D) != ccw(B,C,D) && ccw(A,B,C) != ccw(A,B,D);
}

var c1 = Circle(300, 300);
var c2 = Circle(400, 300);
var c3 = Circle(400, 400);
var c4 = Circle(300, 400);

var l1 = Line(c1, c2);
var l2 = Line(c2, c3);
var l3 = Line(c3, c4);
var l4 = Line(c4, c1);
var l5 = Line(c1, c3);
var l6 = Line(c2, c4);

log(intersect(l1, l2));
log(intersect(l1, l3));
log(intersect(l2, l4));
log(intersect(l3, l4));
log(intersect(l5, l6));

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

    for (var i = 0, len = lines.length; i < len; i++) {
      line = lines[i];
      line.redraw();
    }
  }
}



// run the render loop
animate();

function animate() {
  //circle.position.x = circle.position.x + 1;
  SortByZIndex(stage);

  renderer.render(stage);
  requestAnimationFrame(animate);
}
