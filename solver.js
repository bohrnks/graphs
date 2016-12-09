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

function findLoop() {
  var startNode = lines[0].A;
  var seenNodesSet = new Set();
  var seenEdges = [];

  seenNodesSet.add(startNode.label);
  log('Start = ' + startNode.label);

  var curNode = startNode;
  var curEdge = getEdge(startNode);
  var nextNode = null;
  if (curEdge.A == curNode) {
    nextNode = curEdge.B;
  } else {
    nextNode = curEdge.A;
  }

  function findNextNode(curNode) {
    log('Neighbors of ' + curNode.label);
    for (var label in curNode.edges) {
      log(label + ' -> ' + curNode.edges[label].label);
      if (!seenNodesSet.has(label)) {
        return label
      }
    }
    var neighbor_labels = Object.keys(curNode.edges);
    for (var i = 0; i < neighbor_labels.length; i ++ ) {
      var next_label = neighbor_labels[i];
      var node = circles[next_label];
      return node;
    }
  }

  curNode = findNextNode(curNode);
  log('Next = ' + curNode.label);
  if (seenNodesSet.has(curNode)) {
    // Found a loop
    log('Found loop');
    log(seenNodes);
    return seenNodes;
  } else {
    seenNodesSet.add(curNode);
    //seenEdgesNodes.push(node);
    log('Added node ' + curNode.label);
  }
}

function Solve() {
  log('Solving!');
  // Find a loop
  var loop = findLoop();
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

