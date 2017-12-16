// Interactive pix2pix drawing

import p5 from 'p5';

import { classes } from './classes';
import { color2css } from './utils';

const width = window.innerWidth;
const height = window.innerHeight;
let canvas;
let currentColor = [255, 0, 0];

window.onload = () => {
  const gui = document.getElementById('gui');
  
  classes.forEach(c => {
    const btn = document.createElement('button');
    btn.innerText = c.label;
    btn.style.background = color2css(c.color);
    btn.style.color = color2css(c.textColor);
    btn.addEventListener('click', () => {
      currentColor = c.color;
    });
    gui.appendChild(btn);
  });

}

const sketch = (p) => {
  p.setup = () => {
    canvas = p.createCanvas(width, height);
    p.noStroke();
    p.smooth();
  };

  p.draw = () => {
    p.fill(currentColor[0], currentColor[1], currentColor[2]);
    p.noStroke();
  
    if (p.mouseIsPressed) {
      p.ellipse(p.mouseX, p.mouseY, 20);
    }
  }

  const make = document.getElementById('make');
  make.addEventListener('click', () => {
    const date = new Date();
    p.saveCanvas(canvas, `${date.getTime()}`, 'jpg');
  });
}

const p5Instance =  new p5(sketch);

export { p5Instance }