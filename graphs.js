
var renderer = PIXI.autoDetectRenderer(800, 600,
                                       {backgroundColor : 0x99ccff});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();
stage.addChild(solveLabel);
stage.interactive = true;


function animate() {
  //circle.position.x = circle.position.x + 1;
  SortByZIndex(stage);

  renderer.render(stage);
  requestAnimationFrame(animate);
}


// main
CircleOfCircles(6);

AddLine(0, 2);
AddLine(2, 4);
AddLine(4, 0);

AddLine(1, 3);
AddLine(3, 5);
AddLine(5, 1);

AddLine(1, 4);
AddLine(2, 5);

redrawLines();



// run the render loop
animate();
