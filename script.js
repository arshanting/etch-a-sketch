// Default values
const containerWidth = 960;
const defaultGridSize = 16;
let defaultOpacity = 0;
let mode = 'paint';

// Elements
const gridContainerEl = document.querySelector('.grid-container');
const generateButtonEl = document.getElementById('generateGrid');
const gridSizeEl = document.getElementById('gridSize');
const paintButtonEl = document.getElementById('paint');
const rainbowButtonEl = document.getElementById('rainbow');
const eraseButtonEl = document.getElementById('eraseBox');
const resetButtonEl = document.getElementById('resetGrid');

function getGridSize() {
  let gridSize = gridSizeEl.value ? gridSizeEl.value : defaultGridSize;

  if (gridSize > 100) {
    gridSize = 100;
  }

  return gridSize;
}

function generateBox() {
  const box = document.createElement('div');
  const boxDimensions = `${containerWidth / getGridSize()}px`;

  // box styles
  box.setAttribute('class', 'box');
  box.style.width = boxDimensions;
  box.style.height = boxDimensions;
  box.style.backgroundColor = '#000';
  box.style.opacity = defaultOpacity;

  box.addEventListener('mouseenter', (event) => {
    let boxDetails = event.target.style.opacity;
    let boxOpacity = Number(boxDetails); // convert to number

    if (mode === 'erase') {
      if (boxOpacity > 0) {
        box.style.opacity = 0;
      }
    } else if (mode === 'rainbow') {
      console.log('helo');
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);

      box.style.backgroundColor = `#${randomColor}`;
      if (boxOpacity <= 1) {
        boxOpacity += 0.1;
        box.style.opacity = boxOpacity;
      }
    } else {
      if (boxOpacity <= 1) {
        boxOpacity += 0.1;
        box.style.backgroundColor = '#000';
        box.style.opacity = boxOpacity;
      }
    }
  });

  // append the box in container
  gridContainerEl.appendChild(box);
}

function generateGridBox() {
  const gridSize = getGridSize();
  const grid = gridSize ** 2;

  gridContainerEl.innerHTML = '';
  for (i = 0; i < grid; i++) {
    generateBox();
  }
}

function resetGrid() {
  mode = 'paint';
  gridContainerEl.innerHTML = '';
  generateGridBox();
}

// Initialize (Document ready)
// self executing function here
(function () {
  generateGridBox();
})();

// EVENTS
// Generate button
generateButtonEl.addEventListener('click', function () {
  generateGridBox();
});

// Reset button
resetButtonEl.addEventListener('click', function () {
  resetGrid();
});

// Pain button
paintButtonEl.addEventListener('click', function () {
  mode = 'paint';
});

rainbowButtonEl.addEventListener('click', function () {
  mode = 'rainbow';
});

// Erase button
eraseButtonEl.addEventListener('click', function () {
  mode = 'erase';
});

// Enter key
gridSizeEl.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    document.getElementById('generateGrid').click();
  }
});
