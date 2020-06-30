

class figure {
  constructor(x, y, color) {
    this.figureX = x;
    this.figureY = y;
    this.figureColor = color;
  }
}

class figureCircle extends figure {
  constructor(x, y, color, radius) {
    super(x, y, color);
    this.figureCircleRadius = radius;
  }
}

class figureCircleBordered extends figureCircle {
  constructor(x, y, color, radius, borderwidth, bordercolor) {
    super(x, y, color, radius);
    this.figureCircleBorderedBorderwidth = borderwidth;
    this.figureCircleBorderedBordercolor = bordercolor;
  }
}

class figureEllipse extends figure {
  constructor(x, y, color, width, height) {
    super(x, y, color);
    this.figureEllipseWidth = width;
    this.figureEllipseHeight = height;
  }
}

class figureEllipseBordered extends figureEllipse {
  constructor(x, y, color, width, height, borderwidth, bordercolor) {
    super(x, y, color, width, height);
    this.figureEllipseBorderedBorderwidth = borderwidth;
    this.figureEllipseBorderedBordercolor = bordercolor;
  }
}

class figureEllipseInclined extends figureEllipse {
  constructor(x, y, color, width, height, inclination) {
    super(x, y, color, width, height);
    this.figureEllipseInclinedInclination = inclination;
  }
}

class figureEllipseInclinedBordered extends figureEllipseInclined {
  constructor(x, y, color, width, height, inclination, borderwidth, bordercolor) {
    super(x, y, color, width, height, inclination);
    this.figureEllipseInclinedBorderedBorderwidth = borderwidth;
    this.figureEllipseInclinedBorderedBordercolor = bordercolor;
  }
}

function randomColor() {
  let color = [];
  while (color.length < 3) {
    let semicolor = parseInt(Math.abs(Math.random() * 255)).toString(16);
    if (semicolor.length < 2) {
      semicolor = '0' + semicolor;
    }
    color.push(semicolor);
  }
  return '#' + color.join('');
}

function randomCoordinateX() {
  return parseInt(wingWidth * Math.random());
}

function randomCoordinateY() {
  return parseInt(wingHeight * Math.random());
}

function randomLength() {
  return parseInt((wingHeight + wingWidth) * Math.random() / 10);
}

function randomInclination() {
  return parseInt(180 * Math.random() - 90);
}

function randomFigure() {
  if (Math.random() < 0.5) {
    // Circle
    if (Math.random() < 0.5) {
      // Non bordered
      return new figureCircle(randomCoordinateX(), randomCoordinateY(), randomColor(), randomLength());
    } else {
      // Bordered
      return new figureCircleBordered(randomCoordinateX(), randomCoordinateY(), randomColor(), randomLength(), randomLength(), randomColor());
    }
  } else {
    // Ellipse
    if (Math.random() < 0.5) {
      // Non bordered
      if (Math.random() < 0.5) {
        // Non inclined
        return new figureEllipse(randomCoordinateX(), randomCoordinateY(), randomColor(), randomLength(), randomLength());
      } else {
        // Inclined
        return new figureEllipseInclined(randomCoordinateX(), randomCoordinateY(), randomColor(), randomLength(), randomLength(), randomInclination());
      }
    } else {
      // Bordered
      if (Math.random() < 0.5) {
        // Non Inclined
        return new figureEllipseBordered(randomCoordinateX(), randomCoordinateY(), randomColor(), randomLength(), randomLength(), randomLength(), randomColor());
      } else {
        // Inclined
        return new figureEllipseInclinedBordered(randomCoordinateX(), randomCoordinateY(), randomColor(), randomLength(), randomLength(), randomInclination(), randomLength(), randomColor());
      }
    }
  }
}
