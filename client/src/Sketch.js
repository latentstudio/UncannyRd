/*
p5 Sketch
*/
import TWEEN from '@tweenjs/tween.js';
import { classes } from './classes';
import startImage from './img/start.png';

import car from './img/items/car01.png';

let canvas;
let startImg;
let width = 0;
let height = 0;
let status;
let isComparing;
let brushSize;
let menuWidth;
let isMenuActive;
let objects;
let preloadObjectsNames = ['car01.png']
let preloadObjects = [];
let updateMakeStatus;
let shouldMakeNewImage = false;
let isDraggingAnObject;

let currentColor = classes[0].color;
let currentId = classes[0].id;

const sketch = p => {

  p.myCustomRedrawAccordingToNewPropsHandler = props => {
    width = props.width;
    height = props.height;
    status = props.status;
    isComparing = props.isComparing;
    brushSize = props.brushSize;
    menuWidth = props.menuWidth;
    isMenuActive = props.isMenuActive;
    objects = props.objects;
    shouldMakeNewImage = props.shouldMakeNewImage;
    updateMakeStatus = props.updateMakeStatus;
    isDraggingAnObject = props.isDraggingAnObject;
  };

  p.preload = () => {
    preloadObjectsNames.forEach(name => {
      preloadObjects.push(p.loadImage(car))
    });
    startImg = p.loadImage(startImage)
  };

  p.setup = () => {
    canvas = p.createCanvas(width, height);
    p.noStroke();
    p.pixelDensity(1);
    p.smooth();
    p.background(0, 0, 0);
    p.copy(startImg, 0, 0, width, height, 0, 0, width, height);
  };

  p.draw = () => {
    TWEEN.update();

    p.fill(currentColor[0], currentColor[1], currentColor[2]);
    p.noStroke();

    // User draw
    if (p.mouseIsPressed && !isComparing && !isDraggingAnObject) {
      if (isMenuActive) {
        if (p.mouseX < window.innerWidth - menuWidth) {
          p.ellipse(p.mouseX, p.mouseY, parseInt(brushSize));
        }
      } else {
        p.ellipse(p.mouseX, p.mouseY, parseInt(brushSize));
      } 
      
    }

    // When shouldMakeNewImage is true, copy all the <img> to the canvas
    if (shouldMakeNewImage) {
      objects.forEach(object => {
        const index = preloadObjectsNames.findIndex(name => {return name === object.name });
        p.image(preloadObjects[index], object.x, object.y);
      });
      updateMakeStatus();
    }

    // // Place an item
    // if (placeItem) {
    //   p.image(pItems[placeImg], p.mouseX - 20, p.mouseY - 40);
    //   placeItem = false;
    // }
  }
};

export default sketch;