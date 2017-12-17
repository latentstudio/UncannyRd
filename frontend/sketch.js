var config = {
  apiKey: "AIzaSyBonURHQN9QHaXeWKd2HJYUHhRvpFCOPvA",
  authDomain: "interactive-editing.firebaseapp.com",
  databaseURL: "https://interactive-editing.firebaseio.com",
  projectId: "interactive-editing",
  storageBucket: "interactive-editing.appspot.com",
  messagingSenderId: "699414634794"
};
firebase.initializeApp(config);

const requestsRef = firebase
  .database()
  .ref()
  .child("requests");
const resultsRef = firebase
  .database()
  .ref()
  .child("results");

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

var imageArray;


var w = 2048;
var h = 1024;
var img;

function preload() {
  img = loadImage("template.png");

}
function setup() {
  pixelDensity(1);
  createCanvas(w, h);
  var bufSize = w * h;
  console.log(bufSize);
  var buffer = new ArrayBuffer(bufSize);
  imageArray = new Uint8Array(buffer);
  background(0);
  drawUI();
      copy(img, 0, 0, w, h, 0, 0, w, h);

}


function color2css(color) {
  return "rgb(" + color.join(",") + ")";
}

// classes = {
//     0: [0, 0, 0], # unlabeled
//     1: [255, 0, 104], # ego vehicle
//     7: [128, 64, 127], # road
//     8: [243, 36, 232], # sidewalk
//     9: [250, 165, 165], # parking
//     11: [70, 70, 70], # building
//     13: [189, 153, 153], # fence
//     17: [153, 153, 153], # pole
//     19: [220, 220, 0], # traffic light
//     20: [235, 150, 9],  # traffic sign
//     21: [106, 142, 34], # vegetation
//     23: [70, 130, 180], # sky
//     24: [255, 0, 0],  # person
//     25: [255, 129, 129],  # rider
//     26: [0, 0, 142], # car
//     32: [246, 210, 255],  # motorcycle
//     33: [125, 8, 33], # bicycle
// }

var classes = [
  { color: [0, 0, 0], label: "unlabeled", id: 0 },
  { color: [255, 0, 104], label: "ego vehicle", id: 1 },
  { color: [28, 255, 215], label: "rectification border", id: 2 },
  { color:  [185, 249, 72], label: "out of roi", id: 3 },
  { color: [255, 255, 255], label: "static", id: 4 },
  { color: [128, 64, 127], label: "road", id: 7 },
  { color: [243, 36, 232], label: "sidewalk", id: 8 },
  { color: [250, 165, 165], label: "parking", id: 9 },
  { color: [70, 70, 70], label: "building", id: 11 },
  { color: [189, 153, 153], label: "fence", id: 13 },
  { color: [153, 153, 153], label: "pole", id: 17 },
  { color: [220, 220, 0], label: "traffic light", id: 19 },
  { color: [235, 150, 9], label: "traffic sign", id: 20 },
  { color: [106, 142, 34], label: "vegetation", id: 21 },
  { color: [70, 130, 180], label: "sky", id: 23 },
  { color: [255, 0, 0], label: "person", id: 24 },
  { color: [255, 129, 129], label: "rider", id: 25 },
  { color: [0, 0, 142], label: "car", id: 26 },
  { color: [246, 210, 255], label: "motorcycle", id: 32 },
  { color: [125, 8, 33], label: "bicycle", id: 33 }
];

for (var i = 0; i < classes.length; i++) {
  var cls = classes[i];
  cls.colorStr = cls.color.toString();
}

var currentColor = classes[0].color;
var currentId = classes[0].id;

function makeButton(name, bg) {
  var btn = createButton(name);
  btn.elt.style.background = color2css(bg);
  return btn;
}

function drawUI() {
  var container = createDiv("");
  container.id = "ui";
  for (var i = 0; i < classes.length; i++) {
    var cls = classes[i];
    var btn = makeButton(cls.label, cls.color);
    btn.addClass("class-button");
    if (i === 0) btn.addClass("selected");
    btn.id = i + "-class-button";
    btn.mousePressed(buttonPressed);
    container.child(btn);
  }
  var submitButton = createButton("submit");
  submitButton.elt.style.background = "black";
  submitButton.mousePressed(submitRequest);
  container.child(submitButton);

  var saveButton = createButton("save");
  saveButton.elt.style.background = "blue";
  saveButton.mousePressed(saveToDisk);
  container.child(saveButton);
  
}

function buttonPressed() {
  var btns = selectAll(".class-button");
  for (var i = 0; i < btns.length; i++) {
    btns[i].removeClass("selected");
  }
  this.addClass("selected");
  currentColor = classes[parseInt(this.id.split("-")[0])].color;
  currentId = classes[parseInt(this.id.split("-")[0])].id;
}

function draw() {
  // image(img, 0, 0, w, h);

  fill(currentColor);
  noStroke();

  if (mouseIsPressed) {
    rect(mouseX - 10, mouseY - 10, 20, 20);
    // saveToArray ();
  }
}

function saveToArray () {
  var ctx = document.querySelector('canvas').getContext('2d');
  var imgData = ctx.getImageData(0, 0, w, h);
  for (var i = 0; i < imgData.data.length; i += 4) {
    var c = [imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]].toString();
    for (var j = 0; j < classes.length; j++){
      if (c === classes[j].colorStr) {
        imageArray[i / 4] = classes[j].id;
      }
    }
  }
}

function mouseMoved() {}

function submitRequest() {
  const requestId = guid();
  var t1 = Date.now();

  saveToArray();
  var blob = new Blob([imageArray], {type: "octet/stream"});

  var fd = new FormData();
  fd.append("file", blob);
  $.ajax({
    type: "POST",
    url: "http://49a89aa9.ngrok.io/infer",
    data: fd,
    processData: false,
    contentType: false
  }).done(function(data) {
    console.log('done', Date.now() - t1);
    var img = document.createElement("img");
    // img.src = new Blob([data]);
    img.src = "data:image/jpeg;base64," + data;
    document.body.appendChild(img);
    // console.log(data);
  });

}

function saveToDisk () {
  saveToArray();
  var blob = new Blob([imageArray], { type: "octet/stream" });
  // saveAs(blob, "img.bin");
  var url = window.URL.createObjectURL(blob);
 var a = document.createElement("a");
 document.body.appendChild(a);
     a.style = "display: none";
             a.href = url;
             a.download = "img.bin";
             a.click();
             window.URL.revokeObjectURL(url);

}