//http://www.codewars.com/dojo/katas/52423db9add6f6fc39000354
function getGeneration(cells, generations){
  var xmin,xmax,ymin,ymax,current,gen=0;
  var state = {}, result = [];
  for (var row in cells) for (var col in cells[row]) 
    state[[col,row]] = cells[row][col];
  while(gen++ < generations) state = iterate(state);
  for (var cell in state) {
    if (state[cell] && (current = cell.split(',')) ) {
      if(xmax===undefined||+current[0]>xmax) xmax= +current[0];
      if(ymax===undefined||+current[1]>ymax) ymax= +current[1];
      if(xmin===undefined||+current[0]<xmin) xmin= +current[0];
      if(ymin===undefined||+current[1]<ymin) ymin= +current[1];
      }
    }
  if (xmax===undefined) return [[]]
  var ylen = ymax-ymin, xlen = xmax-xmin;
  for (var j = 0;j<=ylen;j++){
    var row = [];
    for (var i = 0;i<=xlen;i++){
      row.push(+!!state[[xmin+i,ymin+j]]);
      }
    result.push(row);
    }
  return result
}

function alive(x,y,state) {
    var neighbors = 
      +!!state[[+x-1,+y-1]] + +!!state[[+x,+y-1]] + +!!state[[+x+1,+y-1]]
    + +!!state[[+x-1,+y]]                         + +!!state[[+x+1,+y]]
    + +!!state[[+x-1,+y+1]] + +!!state[[+x,+y+1]] + +!!state[[+x+1,+y+1]];
    return ( neighbors == 2 && state[[+x,+y]] || neighbors == 3 );
    }
    
function iterate (state) {
    var next_step = {};
    var coord;
    for (var cell in state) {
      if (!state[cell]) continue;
      coord = cell.split(',');
      for (var i=-1;i<=1;i++){
        for (var j=-1;j<=1;j++){
          if (next_step[[i+ +coord[0],j+ +coord[1]]]===undefined)
            next_step[[i+ +coord[0],j+ +coord[1]]] = alive(i+ +coord[0],j+ +coord[1],state)
        }}
      }
    return next_step;
    }