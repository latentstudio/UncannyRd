// Pix2Pix manager

import { guid, saveToArray } from './utils';
import { classes } from './classes';
import $ from "jquery";
import TWEEN from '@tweenjs/tween.js';
import pako from "pako";


const URL = 'http://54.145.156.112:8888/infer'

// Submit a new image
const sendImage = (width, height, callback) => {
  const imageArray = saveToArray(width, height, classes);
  const deflated = pako.deflate(imageArray);
  const blob = new Blob([deflated], { type: "octet/stream" });
  const fd = new FormData();
  fd.append("file", blob);

  $.ajax({
    type: "POST",
    url: URL,
    data: fd,
    processData: false,
    contentType: false
  }).done(data => {
    callback(data);
  });
};

export default sendImage;