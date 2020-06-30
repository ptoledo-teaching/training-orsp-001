
class trainer extends genericGA {

  constructor() {
    super()
  }

  async generateChromosome() {
    return randomFigure();
  }

  async calculatePertinence(individual, method = 'montecarlo') {
    function onloadPromise(obj) {
      return new Promise((resolve) => {
        obj.onload = () => resolve(obj);
      })
    }
    // Clearing canvas
    renderContext.clearRect(0, 0, renderCanvas.width, renderCanvas.height);
    renderContext.save();
    // Processing image
    svgClear(renderSvg);
    await svgDraw(renderSvg, individual);
    let svg = new Blob([new XMLSerializer().serializeToString(renderSvg)], { type: 'image/svg+xml' });
    let url = window.URL.createObjectURL(svg);
    let renderImageOnloadPromise = onloadPromise(renderImage);
    renderImage.src = url;
    await renderImageOnloadPromise;
    renderContext.drawImage(renderImage, 0, 0);
    renderContext.save();
    let totalError = 0;
    // let totalErrorReady = false;
    switch (method) {
      case 'montecarlo':
        let montecarloTrials = document.getElementById('montecarloTrials').value;
        for (let i = 0; i < montecarloTrials; i++) {
          let x = Math.random() * wingWidth;
          let y = Math.random() * wingHeight;
          let vec1 = renderContext.getImageData(x, y, 1, 1).data;
          let vec2 = referenceContext.getImageData(x, y, 1, 1).data;
          let pixelError = 0;
          pixelError += Math.pow(Math.abs(vec1[0] - vec2[0]), 2);
          pixelError += Math.pow(Math.abs(vec1[1] - vec2[1]), 2);
          pixelError += Math.pow(Math.abs(vec1[2] - vec2[2]), 2);
          if (vec2[0] + vec2[1] + vec2[2] == 756) {
            pixelError = Math.pow(pixelError, 2);
          }
          totalError += pixelError;
        }
        break;
      case 'full':
        let step = 2;
        for (let i = 0; i < 200; i += step) {
          for (let j = 0; j < 200; j += step) {
            let vec1 = renderContext.getImageData(i, j, 1, 1).data;
            let vec2 = referenceContext.getImageData(i, j, 1, 1).data;
            let pixelError = 0;
            pixelError += Math.pow(Math.abs(vec1[0] - vec2[0]), 2);
            pixelError += Math.pow(Math.abs(vec1[1] - vec2[1]), 2);
            pixelError += Math.pow(Math.abs(vec1[2] - vec2[2]), 2);
            if (vec2[0] + vec2[1] + vec2[2] == 756) {
              pixelError = pixelError * 10;
            }
            totalError += pixelError;
          }
        }
        break;
    }
    return totalError;
  }

}
