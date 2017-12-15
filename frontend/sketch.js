function setup() { 
  createCanvas(750, 500);
  background(0);
	drawUI();
}

var currentColor = [255, 0, 0];

function color2css(color) {
  return 'rgb('+color.join(',')+')';
}

var classes = [
	{color: [255, 0, 0], label: 'person', id: 24},
	{color: [128, 64, 127], label: 'road', id: 7},
  {color: [0, 0, 142], label: 'car', id: 26},
  {color: [70, 130, 180], label: 'sky', id: 23},
  {color: [70, 70, 70], label: 'building', id: 11},
  {color: [153, 153, 153], label: 'pole', id: 17},
  {color: [106, 142, 34], label: 'vegetation', id: 21},
  {color: [220, 220, 0], label: 'traffic sign', id: 19},
  {color: [119, 11, 32], label: 'bicycle', id: 33}
];

function makeButton (name, bg) {
	var btn = createButton(name);
	btn.elt.style.background = color2css(bg);
  return btn;
}

function drawUI () {
  var container = createDiv('');
  container.id = 'ui';
	for (var i = 0; i < classes.length; i++) {
		var cls = classes[i];
		var btn = makeButton(cls.label, cls.color);
    btn.addClass('class-button');
    if (i === 0) btn.addClass('selected');
    btn.id = i +'-class-button';
    btn.mousePressed(buttonPressed);
		container.child(btn);
	}
}

function buttonPressed() {
  var btns = selectAll('.class-button');
  for (var i = 0; i < btns.length; i++) {
    btns[i].removeClass('selected');
  }
  this.addClass('selected');
  currentColor = classes[parseInt(this.id.split('-')[0])].color;
}


function draw() { 
	fill(currentColor[0], currentColor[1], currentColor[2]);
	noStroke();

	if (mouseIsPressed) {
		ellipse(mouseX, mouseY, 20);
	}
}

function mouseMoved() {
}