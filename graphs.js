
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


level8();

redrawLines();



// run the render loop
animate();
