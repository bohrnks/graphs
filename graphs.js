
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
CircleOfCircles(13);

AddLine(0, 3);
AddLine(0, 4);
AddLine(0, 5);
AddLine(0, 7);
AddLine(0, 8);
AddLine(0, 10);

AddLine(1, 3);
AddLine(1, 5);
AddLine(1, 8);

AddLine(2, 6);
AddLine(2, 7);
AddLine(2, 9);
AddLine(2, 10);
AddLine(2, 11);
AddLine(2, 12);

AddLine(3, 6);
AddLine(3, 8);
AddLine(3, 10);
AddLine(3, 8);
AddLine(3, 12);

AddLine(4, 7);
AddLine(4, 10);

AddLine(5, 7);
AddLine(5, 8);
AddLine(5, 9);
AddLine(5, 11);

AddLine(6, 10);
AddLine(6, 12);

AddLine(7, 10);
AddLine(7, 11);

AddLine(9, 11);


redrawLines();



// run the render loop
animate();
