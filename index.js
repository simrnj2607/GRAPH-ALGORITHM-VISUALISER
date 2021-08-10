var cy ;
var nodesOfVertices=0;
cy= cytoscape({
    container: document.getElementById('cy'),
    boxSelectionEnabled: false,
    autounselectify: true,
    zoomingEnabled:false,
    style: cytoscape.stylesheet()
      .selector('node')
        .style({
          'content': 'data(id)'
        })
      .selector('edge')
        .style({
          'content': 'data(weight)',
          'curve-style': 'bezier',
          'width': 4,
          'line-color': '#ddd',
          'target-arrow-color': '#ddd'
        })
      .selector('.visited')
        .style({
          'background-color': 'red',
          'line-color': 'red',
          'target-arrow-color': 'red',
          'transition-property': 'background-color, line-color, target-arrow-color',
          'transition-duration': '0.5s'
        })
      .selector('.leaving')
        .style({
          'background-color': 'blue',
          'line-color': 'blue',
          'target-arrow-color': 'blue',
          'transition-property': 'background-color, line-color, target-arrow-color',
          'transition-duration': '0.7s'
        }),
  
    elements: {
        nodes: [
          { data: { id: 'a' } },
          { data: { id: 'b' } },
          { data: { id: 'c' } },
          { data: { id: 'd' } },
          { data: { id: 'e' } },
          { data: { id: 'f' } },
          { data: { id: 'g' } },
          { data: { id: 'h' } }
        ],
        edges: [
          { data: { id: 'ae', weight: 1, source: 'a', target: 'e' } },
          { data: { id: 'ab', weight: 3, source: 'a', target: 'b' } },
          { data: { id: 'be', weight: 4, source: 'b', target: 'e' } },
          { data: { id: 'bc', weight: 5, source: 'b', target: 'c' } },
          { data: { id: 'ca', weight: 6, source: 'c', target: 'a' } },
          { data: { id: 'cd', weight: 2, source: 'c', target: 'd' } },
          { data: { id: 'de', weight: 7, source: 'd', target: 'e' } },
          { data: { id: 'eh', weight: 5, source: 'e', target: 'h' } },
          { data: { id: 'fg', weight: 3, source: 'f', target: 'g' } },
          { data: { id: 'df', weight: 6, source: 'd', target: 'f' } },
          { data: { id: 'cf', weight: 2, source: 'c', target: 'f' } }
        ]
      },
      layout : {
        name: "circle"
      }
  });
  
  function reset(){
    cy.elements().remove();
    nodesOfVertices=0;
    dfsPath = [];
    bfsPath =[];
    bfsItr=0;
    dfsItr=0;
    mstItr=0;
  }

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  function addNode(){
    var noOfNodes = document.getElementById('newNodes').value;
    if(noOfNodes=='')
    {
        alert("Empty field not allowed");
        return;
    }
    var el =  document.getElementById("cy");
    var x = el.offsetLeft, y = el.offsetTop;
    for (let i = 0; i < noOfNodes; i++) {
      console.log(el.offsetLeft);
      cy.add({
          group: 'nodes',
          data: { id: nodesOfVertices },
          position: { x: getRndInteger(x,x+300), y: getRndInteger(y+50,y+300) }
      });
      nodesOfVertices++;
    }
  }

  function addEdge(){
    var weightField = document.getElementById('Weight');
    var fromField = document.getElementById('From-Node');
    var toField = document.getElementById('To-Node');

    weightE = weightField.value;
    fromE = fromField.value;
    toE = toField.value;

    if(weightE=='' || fromE=='' ||toE=='')
    {
        alert("Empty field not allowed");
        return;
    }
    cy.add({
      group: 'edges',
      data: { id: fromE+toE , weight: weightE, source: fromE, target: toE } 
    });
  
  }

function run(){
  var start = document.getElementById('startnode').value;
  dfsPath = [];
  bfsPath =[];
  bfsItr=0;
  dfsItr=0;
  mstItr=0;
  dfs(start);
  bfs(start);
  resetStyles();
}

function resetStyles(){
  cy.nodes().forEach(node =>{
    node.removeClass('visited');
    node.removeClass('leaving');
  });

  cy.edges().forEach(edge =>{
    edge.removeClass('visited');
    edge.removeClass('leaving');
  })
}

document.getElementById('DFS').addEventListener('click',() =>{
  run();
  dfsRun();
});
document.getElementById('BFS').addEventListener('click',() =>{
  run();
  bfsRun();
});
document.getElementById('MST').addEventListener('click',() =>{
  run();
  id = [];
  mstPath=[];
  nodeMap=[];
  sortedWeights=[];
  
  initialize();
  kruskal();
  mstRun();
});