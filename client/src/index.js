// Interactive pix2pix drawing

import p5 from 'p5';
import faker from 'faker';

import { classes } from './classes';
import { color2css } from './utils';
import { items as predefinedItems } from './items';
import * as uploadManager from './uploadManager';
import TWEEN from '@tweenjs/tween.js';

const template_scenes_files = ['01.png', '02.png', '03.png', '04.png'];
const template_scenes = []

const width = 2048;
const height = 1024;
let canvas;
let startingImage;
let dragging = false;
let placeItem = false;
let comparing = false;
let placeImg = '';
let pItems = [];
let brushS = 30;

let currentColor = classes[0].color;
let currentId = classes[0].id;

window.onload = () => {
  const gui = document.getElementById('gui');
  const brushes = document.getElementById('brushes');
  const items = document.getElementById('items');
  const compare = document.getElementById('compare');
  const resultImg = document.getElementById('resultImg');
  const brushSize = document.getElementById('brushSizeSlider');
  const loader = document.getElementById('loader');
  const scenes = document.getElementById('scenes');

  const streetName = document.getElementById('streetName');
  const city = document.getElementById('city');

  streetName.innerText = faker.fake("{{address.streetAddress}}, {{address.streetName}}")
  city.innerText = faker.fake("{{address.city}}")

  // Show class buttons
  classes.forEach(c => {
    const btn = document.createElement('button');
    btn.innerText = c.label;
    btn.style.background = color2css(c.color);
    btn.style.color = color2css(c.textColor);
    btn.addEventListener('click', () => {
      currentColor = c.color;
      currentId = c.id;
    });
    brushes.appendChild(btn);
  });

  // Set the images
  predefinedItems.forEach((image, index) => {
    const item = document.createElement('img');
    item.classList = 'item';
    item.src = `images/items/${image}`;
    item.addEventListener('drag', () => {
      dragging = true;
    });
    item.addEventListener('dragend', () => {
      placeItem = true;
      placeImg = index;
      dragging = false;
    });
    items.appendChild(item);
  });

  compare.addEventListener('mousedown', (e) => {
    comparing = true;
    window.sliderAnim.stop();
  });

  // Compare the images
  compare.addEventListener('dragstart', (e) => {
    comparing = true;
    var img = document.createElement("img");
    img.src = "#";
    img.style.display = 'none';
    e.dataTransfer.setDragImage(img, 0, 0);
  });
  compare.addEventListener('dragend', () => {
    comparing = false;
  });

  // Change the brush size
  brushSize.addEventListener('change', (e) => {
    brushS = parseInt(brushSize.value);
  })
}

// P5
const sketch = (p) => {
  p.preload = () => {
    template_scenes_files.forEach(image => {
      template_scenes.push(p.loadImage(`images/scenes/${image}`));
    });
    predefinedItems.forEach(image => {
      pItems.push(p.loadImage(`images/items/${image}`));
    });
  };

  p.setup = () => {
    canvas = p.createCanvas(width, height);
    p.noStroke();
    p.pixelDensity(1);
    p.smooth();
    p.background(0, 0, 0);
    p.copy(template_scenes[0], 0, 0, width, height, 0, 0, width, height);
  };

  p.draw = () => {
    TWEEN.update();

    p.fill(currentColor[0], currentColor[1], currentColor[2]);
    p.noStroke();

    // User draw
    if (p.mouseIsPressed && !dragging && !comparing) {
      p.ellipse(p.mouseX, p.mouseY, brushS, brushS);
    }

    // Compare two images
    if (comparing) {
      resultImg.style.width = `${p.mouseX}px`;
      compare.style.left = `${p.mouseX-25}px`;
    }

    // Place an item
    if (placeItem) {
      p.image(pItems[placeImg], p.mouseX - 20, p.mouseY - 40);
      placeItem = false;
    }
  }

  // Show scenes
  template_scenes_files.forEach((s, index) => {
    const elt = document.createElement('img');
    elt.src = `images/scenes/${s}`;
    elt.className = 'scene';
    elt.addEventListener('click', () => {
      p.clear();
      p.copy(template_scenes[index], 0, 0, width, height, 0, 0, width, height);
    });
    scenes.appendChild(elt);
  });

  // Make pix2pix
  const make = document.getElementById('make');
  make.addEventListener('click', () => {
    console.log('Sending!');
    loader.style.display = 'block';
    setTimeout(() => {
      uploadManager.submitRequest(width, height, resultImg, loader);
    }, 100);
  });

  document.body.addEventListener('mouseup', () => {
    comparing = false;
  });
}

const p5Instance = new p5(sketch);

export { p5Instance, width, height }