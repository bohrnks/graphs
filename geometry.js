var circleCounter = 0;

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

  container.idx = circleCounter;
  circleCounter += 1;

  circles[container.idx] = container;

  var label = new PIXI.Text(container.idx);
  container.addChild(label);
  label.position.x = 10
  label.scale.x = 0.5;
  label.scale.y = 0.5;

  return container;
}

function Line(node1, node2) {
  var line = new PIXI.Graphics();
  line.node1 = node1;
  line.node2 = node2;
  line.intersect = false;

  lines.push(line);

  line.redraw = function() {
    line.clear();
    if (line.intersect) {
      var color = 0xff9933;
    } else {
      var color = 0x9900cc;
    }
    line.lineStyle(3, color, 1);
    line.moveTo(line.node1.position.x, line.node1.position.y)
    line.lineTo(line.node2.position.x, line.node2.position.y)
    line.endFill();
  }

  line.redraw();

  stage.addChild(line);
  line.zIndex = -1;

  return line;
}

function AddLine(index1, index2) {
  // Find two circles by their indexes, add a line connecting them.
  var c1 = circles[index1];
  var c2 = circles[index2];
  Line(c1, c2);
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

function FourCircles() {
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
}

function CircleOfCircles(n) {
  var centerX = 300, centerY = 300;
  var R = 200
  for (var i = 0; i < n; i++) {
    var angle = Math.PI * 2 / n * i;

    var x = centerX + R * Math.sin(angle);
    var y = centerY - R * Math.cos(angle);

    Circle(x, y);
  }
  
}

function redrawLines() {
  // Clear intersect flags
  for (var i = 0, len = lines.length; i < len; i++) {
    var line = lines[i];
    line.intersect = false;
  }

  // Test lines for intersections
  for (var i = 0, len = lines.length; i < len; i++) {
    for (var j = i + 1, len = lines.length; j < len; j++) {
      var line1 = lines[i];
      var line2 = lines[j];
      if (intersect(line1, line2)) {
        line1.intersect = true;
        line2.intersect = true;
      }
    }
  }

  for (var i = 0, len = lines.length; i < len; i++) {
    var line = lines[i];
    line.redraw();
  }
}
