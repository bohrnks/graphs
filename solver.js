
function Solve(edges) {
  log('Solving!');
  // Find a loop

  var edge = edges[0];
  log(edge.label);
  var startNode = edge.A;
  var nextNode = edge.B;

  //for (var i = 0; i < nextNode.edges.length; i++) {
    
}

var solveLabel = new PIXI.Text('SOLVE');
solveLabel.interactive = true;
solveLabel.on('mousedown', Solve);

