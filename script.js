let main = document.querySelector('main');
let dotElement = document.querySelector('.dot');
let dotContainer = document.querySelector('.dot-container');
let doButton = document.querySelector(".redo");
let undoButton = document.querySelector(".undo");
let undoAll = document.querySelector(".undoAll");

let number = document.querySelector('.number');

let dotList = [];
let lastDotList = [];

const handleNumber  = () => {
  number.innerHTML = dotList.length;
}

const createDot = (clientX, clientY) => {
  dotList.push({
    id: new Date().getTime(),
    x: clientX,
    y: clientY
  })
  refreshDot(dotList)
  handleNumber()
}

const undoDot = () => {
  if(dotList.length > 0){ lastDotList.push(dotList[dotList.length - 1]);
    dotList.pop()
    refreshDot()
    handleNumber()
  }
  
  return;
  
}

const redoDot = () => {
  if(lastDotList.length > 0){
    dotList.push(lastDotList[lastDotList.length - 1])
    lastDotList.pop()
    refreshDot()
    handleNumber()
  }
}

const handleUndoAll = () => {
  dotList = [];
  lastDotList = [];
  refreshDot();
  handleNumber();
}

const refreshDot = () => {
  let dot = "";
  dotList.map((el) => {
    dot += `<div class="dot" style="position: absolute; left: ${el.x}px; top: ${el.y}px"></div>`
  })
  dotContainer.innerHTML = dot;
}

main.addEventListener('click', (evt) => {
  
  let clientX = evt.clientX;
  let clientY = evt.clientY;

  if(evt.target !== doButton && evt.target !== undoButton && evt.target !== number && evt.target !== undoAll){
    createDot(clientX, clientY);
  }
  
  return;
})

undoButton.addEventListener('click', () => {
  undoDot();
})

doButton.addEventListener('click', () => {
  redoDot();
})

undoAll.addEventListener('click', () => {
  handleUndoAll();
})