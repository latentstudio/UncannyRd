/*
p5 Sketch
*/
import TWEEN from '@tweenjs/tween.js';
import startImage from './img/empty.png';

const importAllImages = r => {
  return r.keys().map(r);
}

const preDrawnImages = importAllImages(require.context('./img/items/', false, /\.(png|jpe?g|svg)$/));
window.preDrawnImages = preDrawnImages;

let canvas;
let pg;
let startImg;
let width = 0;
let height = 0;
let isComparing;
let brushSize;
let objects;
let preloadObjects = [];
let updateMakeStatus;
let shouldMakeNewImage = false;
let isDraggingAnObject;
let clearSketch;
let mousePressed = false;
let clearObjects;
let currentColor;

const sketch = p => {

  p.myCustomRedrawAccordingToNewPropsHandler = props => {
    width = props.width;
    height = props.height;
    isComparing = props.isComparing;
    brushSize = props.brushSize;
    objects = props.objects;
    currentColor = props.currentColor;
    shouldMakeNewImage = props.shouldMakeNewImage;
    updateMakeStatus = props.updateMakeStatus;
    isDraggingAnObject = props.isDraggingAnObject;
    clearObjects = props.clearObjects;
  };

  p.preload = () => {
    preDrawnImages.forEach(name => {
      preloadObjects.push(p.loadImage(name))
    });
    startImg = p.loadImage(startImage)
  };

  p.setup = () => {
    canvas = p.createCanvas(width, height);
    p.noStroke();
    p.pixelDensity(1);
    p.noSmooth();
    pg = p.createGraphics(width, height);
    pg.elt.id = 'hidden-canvas';
    pg.pixelDensity(1);
    p.background(0, 0, 0);
    p.copy(startImg, 0, 0, width, height, 0, 0, width, height);
  };

  p.draw = () => {
    TWEEN.update();

    p.fill(currentColor[0], currentColor[1], currentColor[2]);
    p.noStroke();
    // User draw
    if (mousePressed && !isComparing && !isDraggingAnObject) {
      p.ellipse(p.mouseX, p.mouseY, parseInt(brushSize, 10));
    }
    
    // When shouldMakeNewImage is true, copy all the <img> to the canvas
    if (shouldMakeNewImage) {
      p.loadPixels();
      pg.copy(p, 0, 0, width, height, 0, 0, width, height);
      const ow = canvas.elt.offsetWidth;
      const oh = canvas.elt.offsetHeight;
      objects.forEach(object => {
        const objWidth = object.width || 200;
        const objHeight = object.height || 200;
        pg.image(
          preloadObjects[object.templateKey], 
          (object.x / ow) * 2048,
          (object.y / oh) * 1024,
          (objWidth / ow) * 2048,
          (objHeight / oh) * 1024
        );
      });
      updateMakeStatus(); 
    }
  }

  p.mousePressed = (e) => {
    if (e.target !== canvas.elt) return;
    mousePressed = true;
  }

  p.mouseReleased = () => {
    mousePressed = false;
  }

  clearSketch = () => {
    p.clear();
    p.copy(startImg, 0, 0, width, height, 0, 0, width, height);
    clearObjects()
  }
};

export {
  sketch,
  clearSketch,
  preDrawnImages
}