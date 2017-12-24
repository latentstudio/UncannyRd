// Pix2Pix manager

import { saveToArray } from './utils';
import { BASE_URL, CLASSES } from './constants';
import $ from "jquery";
import pako from "pako";

// Submit a new image
const sendImage = (width, height, callback) => {
  const canvas = document.getElementById('hidden-canvas');
  const imageArray = saveToArray(canvas, width, height, CLASSES);
  const deflated = pako.deflate(imageArray);
  const blob = new Blob([deflated], { type: "octet/stream" });
  const fd = new FormData();
  fd.append("file", blob);
  $.ajax({
    type: "POST",
    url: BASE_URL + '/infer',
    data: fd,
    processData: false,
    contentType: false
  }).done(data => {
    callback(data);
  });
};

// Add image to road
const saveImage = (dataURI, callback) => {
  $.ajax({
    type: "POST",
    url: BASE_URL + "/save",
    data: dataURI.split(',')[1],
    processData: false,
    contentType: false,
    dataType: 'json'
  }).done(data => {
    callback(data);
  });
}

export {
  sendImage,
  saveImage
} 