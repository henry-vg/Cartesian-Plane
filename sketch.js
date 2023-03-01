let origin, zoom = 30;
const unitLineSize = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);

  origin = createVector(width / 2, height / 2);
}

function draw() {
  background(255);

  if (mouseIsPressed) {
    origin.x += mouseX - pmouseX;
    origin.y += mouseY - pmouseY;
  }

  translate(origin.x, origin.y);

  noFill();

  stroke(0);
  strokeWeight(1);

  axis(true, 25);

  stroke(0, 100, 0);
  strokeWeight(2);

  f('sin(x)');
}

function axis(grid, gridAlpha) {
  //abscissa
  line(-origin.x, 0, width - origin.x, 0);

  for (let i = 1; i < origin.x / zoom; i++) {
    line(-i * zoom, unitLineSize / 2, -i * zoom, -unitLineSize / 2);

    if (grid) {
      push();
      stroke(0, gridAlpha);
      line(-i * zoom, -origin.y, -i * zoom, height - origin.y);
      pop();
    }

    push();
    noStroke();
    fill(0);
    textSize(unitLineSize * 1.2);
    text(-i, -i * zoom - textWidth(-i) / 2, unitLineSize * 2);
    pop();
  }
  for (let i = 1; i < (width - origin.x) / zoom; i++) {
    line(i * zoom, unitLineSize / 2, i * zoom, -unitLineSize / 2);

    if (grid) {
      push();
      stroke(0, gridAlpha);
      line(i * zoom, -origin.y, i * zoom, height - origin.y);
      pop();
    }

    push();

    noStroke();
    fill(0);
    textSize(unitLineSize * 1.2);

    text(i, i * zoom - textWidth(i) / 2, unitLineSize * 2);

    pop();
  }
  //ordinate
  line(0, -origin.y, 0, height - origin.y);
  for (let i = 1; i < origin.y / zoom; i++) {
    line(unitLineSize / 2, -i * zoom, -unitLineSize / 2, -i * zoom);

    if (grid) {
      push();
      stroke(0, gridAlpha);
      line(-origin.x, -i * zoom, width - origin.x, -i * zoom);
      pop();
    }

    push();

    noStroke();
    fill(0);
    textSize(unitLineSize * 1.2);

    text(-i, -(unitLineSize + textWidth(-i)), -i * zoom + unitLineSize / 2);

    pop();
  }
  for (let i = 1; i < (height - origin.y) / zoom; i++) {
    line(unitLineSize / 2, i * zoom, -unitLineSize / 2, i * zoom);

    if (grid) {
      push();
      stroke(0, gridAlpha);
      line(-origin.x, i * zoom, width - origin.x, i * zoom);
      pop();
    }

    push();

    noStroke();
    fill(0);
    textSize(unitLineSize * 1.2);

    text(i, -(unitLineSize + textWidth(i)), i * zoom + unitLineSize / 2);

    pop();
  }
}

function f(rule) {
  beginShape();
  for (let i = -origin.x; i < width - origin.x; i++) {
    const y = -eval(rule.replace(/x/g, i / zoom));

    if (y * zoom >= -origin.y && y * zoom <= height - origin.y) {
      vertex(i, y * zoom);
    }
  }
  endShape();
}

function mouseWheel(event) {
  zoom -= event.delta / 20;
  if (zoom < 18) {
    zoom = 18;
  }
}