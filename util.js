function log(x) { console.log(x) }

function SortByZIndex(parent) {
  parent.children.sort(function(a,b) {
    a.zIndex = a.zIndex || 0;
    b.zIndex = b.zIndex || 0;
    return a.zIndex - b.zIndex
  });
};
