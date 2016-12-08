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
    redrawLines();
  }
}
