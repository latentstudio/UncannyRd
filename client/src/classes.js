// Classes by color

const classes = [
  { color: [0, 0, 0], label: "unlabeled", id: 0, textColor: [255,255,255], visible: false },
  { color: [255, 0, 104], label: "ego vehicle", id: 1, textColor: [255,255,255], visible: true },
  { color: [28, 255, 215], label: "rectification border", id: 2, textColor: [0,0,0], visible: false },
  { color:  [185, 249, 72], label: "out of roi", id: 3, textColor: [0,0,0], visible: false },
  { color: [255, 255, 255], label: "static", id: 4, textColor: [0,0,0], visible: false},
  { color: [128, 64, 127], label: "road", id: 7, textColor: [255,255,255], visible: true },
  { color: [243, 36, 232], label: "sidewalk", id: 8, textColor: [255,255,255], visible: true },
  { color: [250, 165, 165], label: "parking", id: 9, textColor: [255,255,255], visible: true },
  { color: [70, 70, 70], label: "building", id: 11, textColor: [255,255,255], visible: true },
  { color: [189, 153, 153], label: "fence", id: 13, textColor: [255,255,255], visible: true },
  { color: [153, 153, 153], label: "pole", id: 17, textColor: [255,255,255], visible: true },
  { color: [220, 220, 0], label: "traffic light", id: 19, textColor: [0,0,0], visible: true },
  { color: [235, 150, 9], label: "traffic sign", id: 20, textColor: [255,255,255], visible: true},
  { color: [106, 142, 34], label: "vegetation", id: 21, textColor: [255,255,255], visible: true },
  { color: [70, 130, 180], label: "sky", id: 23, textColor: [255,255,255], visible: true},
  { color: [255, 0, 0], label: "person", id: 24, textColor: [255,255,255], visible: true },
  { color: [255, 129, 129], label: "rider", id: 25, textColor: [255,255,255], visible: true},
  { color: [0, 0, 142], label: "car", id: 26, textColor: [255,255,255], visible: true },
  { color: [246, 210, 255], label: "motorcycle", id: 32, textColor: [0,0,0], visible: true },
  { color: [125, 8, 33], label: "bicycle", id: 33, textColor: [255,255,255], visible: true}
];

const items = [
  'person01.png',
  'person02.png',
  'car01.png',
  'car02.png',
  'bicyclist.png',
  'sign_template.png',
  'tree.png'
];

export {
  classes,
  items
}