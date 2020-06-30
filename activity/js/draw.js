
async function svgDraw(target, figures, flipped = false) {
  svgClear(target);
  if (flipped) {
    for (let fig of figures) {
      appendSvgFigureFlipped(target, fig)
    }
  } else {
    for (let fig of figures) {
      appendSvgFigure(target, fig)
      await databaseInstance.write();
    }
  }
  return figures;
}

function svgClear(target) {
  let targetNode = target;
  while (targetNode.firstChild) {
    targetNode.removeChild(targetNode.lastChild);
  }
}

function appendSvgFigure(target, figure) {
  let toAppend;
  switch (figure.constructor.name) {
    case 'figureCircle':
      toAppend = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      toAppend.setAttribute('opacity', 1.0);
      toAppend.setAttribute('cx', figure.figureX);
      toAppend.setAttribute('cy', figure.figureY);
      toAppend.setAttribute('fill', figure.figureColor);
      toAppend.setAttribute('r', figure.figureCircleRadius);
      target.append(toAppend);
      break;
    case 'figureCircleBordered':
      toAppend = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      toAppend.setAttribute('opacity', 1.0);
      toAppend.setAttribute('cx', figure.figureX);
      toAppend.setAttribute('cy', figure.figureY);
      toAppend.setAttribute('fill', figure.figureColor);
      toAppend.setAttribute('r', Math.round(figure.figureCircleRadius / 10));
      toAppend.setAttribute('stroke', figure.figureCircleBorderedBordercolor);
      toAppend.setAttribute('strokewidth', figure.figureCircleBorderedBorderwidth);
      target.append(toAppend);
      break;
    case 'figureEllipse':
      toAppend = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      toAppend.setAttribute('opacity', 1.0);
      toAppend.setAttribute('cx', figure.figureX);
      toAppend.setAttribute('cy', figure.figureY);
      toAppend.setAttribute('fill', figure.figureColor);
      toAppend.setAttribute('rx', Math.round(figure.figureEllipseWidth / 2));
      toAppend.setAttribute('ry', Math.round(figure.figureEllipseHeight / 2));
      target.append(toAppend);
      break;
    case 'figureEllipseInclined':
      toAppend = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      toAppend.setAttribute('opacity', 1.0);
      toAppend.setAttribute('cx', figure.figureX);
      toAppend.setAttribute('cy', figure.figureY);
      toAppend.setAttribute('fill', figure.figureColor);
      toAppend.setAttribute('rx', Math.round(figure.figureEllipseWidth / 2));
      toAppend.setAttribute('ry', Math.round(figure.figureEllipseHeight / 2));
      toAppend.setAttribute('transform', 'rotate(' + figure.figureEllipseInclinedInclination + ' ' + (figure.figureX) + ' ' + (figure.figureY) + ')');
      target.append(toAppend);
      break;
    case 'figureEllipseBordered':
      toAppend = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      toAppend.setAttribute('opacity', 1.0);
      toAppend.setAttribute('cx', figure.figureX);
      toAppend.setAttribute('cy', figure.figureY);
      toAppend.setAttribute('fill', figure.figureColor);
      toAppend.setAttribute('rx', Math.round(figure.figureEllipseWidth / 2));
      toAppend.setAttribute('ry', Math.round(figure.figureEllipseHeight / 2));
      toAppend.setAttribute('stroke', figure.figureEllipseBorderedBordercolor);
      toAppend.setAttribute('strokewidth', figure.figureEllipseBorderedBorderwidth);
      target.append(toAppend);
      break;
    case 'figureEllipseInclinedBordered':
      toAppend = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      toAppend.setAttribute('opacity', 1.0);
      toAppend.setAttribute('cx', figure.figureX);
      toAppend.setAttribute('cy', figure.figureY);
      toAppend.setAttribute('fill', figure.figureColor);
      toAppend.setAttribute('rx', Math.round(figure.figureEllipseWidth / 2));
      toAppend.setAttribute('ry', Math.round(figure.figureEllipseHeight / 2));
      toAppend.setAttribute('transform', 'rotate(' + figure.figureEllipseInclinedInclination + ' ' + (figure.figureX) + ' ' + (figure.figureY) + ')');
      toAppend.setAttribute('stroke', figure.figureEllipseInclinedBorderedBordercolor);
      toAppend.setAttribute('strokewidth', figure.figureEllipseInclinedBorderedBorderwidth);
      target.append(toAppend);
      break;
  }
}

function appendSvgFigureFlipped(svg, figure) {
  let figureClone = Object.assign(Object.create(Object.getPrototypeOf(figure)), figure)
  figureClone.figureX = wingWidth - figureClone.figureX;
  if ('figureEllipseInclinedInclination' in figure) {
    figureClone.figureEllipseInclinedInclination = -figure.figureEllipseInclinedInclination;
  }
  appendSvgFigure(svg, figureClone);
}
