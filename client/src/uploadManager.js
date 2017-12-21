// Pix2Pix manager

import { width, height } from './index';
import { guid, saveToArray } from './utils';
import { classes } from './classes';
import $ from "jquery";
import TWEEN from '@tweenjs/tween.js';
import pako from "pako";

// Submit a new image
const submitRequest = (w, h, resultImg, loader) => {
  const compare = document.getElementById('compare');
  const requestId = guid();
  const t1 = Date.now();
  const imageArray = saveToArray(w, h, classes);
  console.log('deflating')
  const deflated = pako.deflate(imageArray);
  console.log('done')
  const blob = new Blob([deflated], { type: "octet/stream" });

  const fd = new FormData();
  fd.append("file", blob);
  $.ajax({
    type: "POST",
    url: "http://52.91.152.195:8888/infer",
    data: fd,
    processData: false,
    contentType: false
  }).done(data => {
    loader.style.display = "none";
    let pos = { left: 0 };
    window.sliderAnim = new TWEEN.Tween(pos)
      .to({ left: 70 }, 10000)
      .easing(TWEEN.Easing.Exponential.Out)
      .onUpdate(() => {
        compare.style.left = pos.left - 2 + "%";
        resultImg.style.width = pos.left + "%";
      })
      .start();
    resultImg.style.background = `url(data:image/jpeg;base64,${data})`;
  });
};

export {
  submitRequest
}