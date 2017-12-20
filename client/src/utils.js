// Utils

// RGB color to css color
const color2css = color => {
  return `rgb(${color.join(',')})`;
}

// S4 Generator
const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

// GUID Generator
const guid = () => `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;

// Save to Array
const saveToArray = (w, h, classes) => {
  const ctx = document.querySelector('canvas').getContext('2d');
  const imgData = ctx.getImageData(0, 0, w, h);
  const buffer = new ArrayBuffer(w*h);
  const imageArray = new Uint8Array(buffer);

  for (let i = 0; i < imgData.data.length; i += 4) {
    const c = [imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]];
    for (let j = 0; j < classes.length; j++) {
      var c2 = classes[j].color;
      if (c[0] === c2[0] && c[1] === c2[1] && c[2] === c2[2]) {
        imageArray[i / 4] = classes[j].id;
        break;
      }
    }
  }

  return imageArray;
}

export {
  guid,
  saveToArray,
  color2css
}