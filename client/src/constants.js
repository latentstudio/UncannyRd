// Classes by color
import React, { Component } from 'react';

import FaRoad from 'react-icons/lib/fa/road';
import FaTree from 'react-icons/lib/fa/tree';
import FaCloud from 'react-icons/lib/fa/cloud';
import MdDirectionsWalk from 'react-icons/lib/md/directions-walk';
import FaBicycle from 'react-icons/lib/fa/bicycle';
import MdDirectionsBike from 'react-icons/lib/md/directions-bike';
import MdNaturePeople from 'react-icons/lib/md/nature-people';
import FaMotorcycle from 'react-icons/lib/fa/motorcycle';
import MdTraffic from 'react-icons/lib/md/traffic';
import MdDirectionsCar from 'react-icons/lib/md/directions-car';
import FaMapSigns from 'react-icons/lib/fa/map-signs';
import FaBuilding from 'react-icons/lib/fa/building';
import MdLocalParking from 'react-icons/lib/md/local-parking';
import TiDirections from 'react-icons/lib/ti/directions';
import MdBorderOuter from 'react-icons/lib/md/border-outer';

const CLASSES = [
  { color: [0, 0, 0], label: "unlabeled", id: 0, textColor: [255,255,255], visible: false },
  { color: [255, 0, 104], label: "ego vehicle", id: 1, textColor: [255,255,255], visible: false },
  { color: [28, 255, 215], label: "rectification border", id: 2, textColor: [0,0,0], visible: false },
  { color: [185, 249, 72], label: "out of roi", id: 3, textColor: [0,0,0], visible: false },
  { color: [255, 255, 255], label: "static", id: 4, textColor: [0,0,0], visible: false},
  { color: [128, 64, 127], label: "road", id: 7, textColor: [255,255,255], visible: true, icon: <FaRoad />},
  { color: [243, 36, 232], label: "sidewalk", id: 8, textColor: [255,255,255], visible: true, icon: <FaRoad />},
  { color: [250, 165, 165], label: "parking", id: 9, textColor: [0,0,0], visible: true, icon: <MdLocalParking />},
  { color: [70, 70, 70], label: "building", id: 11, textColor: [255,255,255], visible: true, icon: <FaBuilding />},
  { color: [189, 153, 153], label: "fence", id: 13, textColor: [255,255,255], visible: true, icon: <MdBorderOuter />},
  { color: [153, 153, 153], label: "pole", id: 17, textColor: [255,255,255], visible: true, icon: <TiDirections />},
  { color: [220, 220, 0], label: "traffic light", id: 19, textColor: [0,0,0], visible: true, icon: <MdTraffic />},
  { color: [235, 150, 9], label: "traffic sign", id: 20, textColor: [255,255,255], visible: true, icon: <FaMapSigns />},
  { color: [106, 142, 34], label: "vegetation", id: 21, textColor: [255,255,255], visible: true, icon: <FaTree />},
  { color: [70, 130, 180], label: "sky", id: 23, textColor: [255,255,255], visible: true, icon: <FaCloud />},
  { color: [255, 0, 0], label: "person", id: 24, textColor: [255,255,255], visible: true, icon: <MdDirectionsWalk />},
  { color: [255, 129, 129], label: "rider", id: 25, textColor: [255,255,255], visible: true, icon: <MdDirectionsBike />},
  { color: [0, 0, 142], label: "car", id: 26, textColor: [255,255,255], visible: true, icon: <MdDirectionsCar />},
  { color: [246, 210, 255], label: "motorcycle", id: 32, textColor: [0,0,0], visible: true, icon: <FaMotorcycle />},
  { color: [125, 8, 33], label: "bicycle", id: 33, textColor: [255,255,255], visible: true, icon: <FaBicycle />}
];

// const BASE_URL = "http://34.207.237.232:8888";
const BASE_URL = "http://52.201.176.87:8888";

export {
  CLASSES,
  BASE_URL
}