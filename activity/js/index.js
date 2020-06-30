
// Wing image size
var wingWidth = 200;
var wingHeight = 200;

// Reference Globals
var referenceImage;
var referenceCanvas;
var referenceContext;

// Render Globals
var renderSvg;
var renderImage;
var renderCanvas;

// Plot
var memoryUsed = [];
var generationBest = [];

var chartInstance;
var trainerInstance;
var databaseInstance;

var fields = [
  'montecarloTrials',
  'populationSize',
  'eliteSize',
  'crossoverProbability',
  'mutationProbability',
  'chromosomesExtension',
  'multiRun'
]

window.onload = () => {
  initialize(referenceBlobs[1])
}

function initialize(referenceBlob) {
  // Create reference
  referenceImage = document.getElementById('referenceImage');
  referenceImage.src = referenceBlob;
  referenceCanvas = document.createElement('canvas');
  referenceCanvas.setAttribute('width', wingWidth);
  referenceCanvas.setAttribute('height', wingHeight);
  referenceContext = referenceCanvas.getContext('2d');
  referenceContext.drawImage(referenceImage, 0, 0);
  referenceContext.save();
  // Creates render
  renderSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  renderSvg.setAttribute('style', 'background-color: white;')
  renderImage = new Image();
  renderImage.setAttribute('width', wingWidth);
  renderImage.setAttribute('height', wingHeight);
  renderCanvas = document.createElement('canvas');
  renderCanvas.setAttribute('width', wingWidth);
  renderCanvas.setAttribute('height', wingHeight);
  renderContext = renderCanvas.getContext('2d');
  renderContext.save();
  // Load image overlay
  bestButterflyOverlay = document.getElementById('bestButterflyOverlay');
  bestButterflyOverlay.src = referenceImage.src;
  // Load items
  for (let field of fields) {
    fieldValue = localStorage.getItem(field);
    if (fieldValue !== null) {
      document.getElementById(field).value = fieldValue;
    }
  }
  Chart.defaults.global.elements.line.fill = false;
  trainerInstance = new trainer();
  chartInstance = new progressChart();
  databaseInstance = new database();
}

function toggleReferenceOverlay() {
  overlay = document.getElementById('bestButterflyOverlay');
  if (overlay.style.display == 'none') {
    overlay.style.display = 'block';
  } else {
    overlay.style.display = 'none';
  }
}
