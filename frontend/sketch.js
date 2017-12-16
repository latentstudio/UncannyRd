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
function setup() {
  createCanvas(w, h);
  var bufSize = w * h;
  console.log(bufSize);
  var buffer = new ArrayBuffer(bufSize);
  imageArray = new Uint8Array(buffer);
  background(0);
  drawUI();
}


function color2css(color) {
  return "rgb(" + color.join(",") + ")";
}

var classes = [
  // { color: [255, 0, 0], label: "person", id: 24, colorStr: '255,0,0'},
  { color: [255, 0, 0], label: "person", id: 24, colorStr: '255,0,0'},
  { color: [128, 64, 127], label: "road", id: 7, colorStr: '128,64,127'},
  { color: [0, 0, 142], label: "car", id: 26, colorStr: '0,0,142' },
  { color: [70, 130, 180], label: "sky", id: 23, colorStr: '70,130,180' },
  { color: [70, 70, 70], label: "building", id: 11, colorStr: '70,70,70' },
  { color: [153, 153, 153], label: "pole", id: 17, colorStr: '153,153,153' },
  { color: [106, 142, 34], label: "vegetation", id: 21, colorStr: '106,142,34' },
  { color: [220, 220, 0], label: "traffic sign", id: 19, colorStr: '220,220,0' },
  { color: [119, 11, 32], label: "bicycle", id: 33, colorStr: '119,11,32' }
];

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
  fill(currentColor);
  noStroke();

  if (mouseIsPressed) {
    rect(mouseX - 10, mouseY - 10, 20, 20);
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

  var ref = firebase
    .storage()
    .ref()
    .child(requestId + ".bin");
    saveToArray();
    console.log(imageArray);
    console.log(requestId);
        var blob = new Blob([imageArray], {type: "octet/stream"});
    //   var metadata = { contentType: "image/jpeg" };
      ref.put(blob).then(function(snapshot) {
        // submit the request
        var requestRef = requestsRef.child(requestId);
        var resultRef = resultsRef.child(requestId);

        resultRef.on("value", function(snapshot) {
          const val = snapshot.val();
          if (val !== null) {
            console.log(val);
          }
        });
        requestRef.set(snapshot.downloadURL);
      });
}
