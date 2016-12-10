function findNextEdge(startEdge) {
  var startNode = startEdge.A;
  var nextNode = startEdge.B;

  for (var i = 0; i < nextNode.edges.length; i++) {
    var nextEdge = nextNode.edges[i];
    if (nextEdge != startEdge) {
      return nextEdge;
    }
  }
}

function getEdge(node) {
  var neighbor_labels = Object.keys(node.edges);
  for (var i = 0; i < neighbor_labels.length; i ++ ) {
    var next_label = neighbor_labels[i];
    var edge = node.edges[next_label];
    return edge;
  }
}

function findLoop(startNode) {
  var seenNodesSet = new Set();
  var seenEdges = [];

  seenNodesSet.add(startNode.label);
  log('Start = ' + startNode.label);

  var curNode = startNode;
  var curEdge = getEdge(startNode);

  // Jump to the next node.
  // 
  function findNextNode(node) {
    for (var label in node.edges) {
      log(label + ' -> ' + node.edges[label].label);
      if (!seenNodesSet.has(label)) {
        seenNodesSet.add(label);
        log(seenNodesSet);
        return label;
      }
    }
  }

  var nextLabel = findNextNode(curNode);
  curNode = circles[nextLabel];
  while (!!nextLabel) {
    nextLabel = findNextNode(curNode);
    var nextLabel = findNextNode(curNode);
    curNode = circles[nextLabel];
  }
}

function Solve() {
  log('Solving!');
  // Find a loop
  var loop = findLoop(lines[0].A);
  log(222222);
  log(loop);

  var edge = lines[0];
  log(edge.label);
  var startNode = edge.A;
  var nextNode = edge.B;

  // var nextEdge = findNextEdge(edge);
  // log(nextEdge.label);

}

var solveLabel = new PIXI.Text('SOLVE');
solveLabel.interactive = true;
solveLabel.on('mousedown', Solve);
