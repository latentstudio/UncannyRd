// Pix2Pix manager

import { guid, saveToArray } from './utils';
import { classes } from './classes';
import TWEEN from '@tweenjs/tween.js';
import pako from "pako";

const URL = "http://34.229.68.209:8888/infer";

// Submit a new image
const sendImage = (width, height, callback) => {
  const imageArray = saveToArray(width, height, classes);
  const deflated = pako.deflate(imageArray);
  const blob = new Blob([deflated], { type: "octet/stream" });
  const fd = new FormData();
  fd.append("file", blob);

  fetch(URL, {
    method: "POST",
    body: fd
  }).then(data => {
    callback(data);
  });
};

export default sendImage;