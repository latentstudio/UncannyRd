/*
Drawing App
*/

import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Draggable from 'react-draggable';
import MdSwapHoriz from 'react-icons/lib/md/swap-horiz';
import update from 'immutability-helper';
import TWEEN from '@tweenjs/tween.js';

import sendImage from './upload';
import { sketch, clearSketch } from './Sketch';
import DraggableObject from './DraggableObject';
import Menu from './Menu';
import NavigationWidget from './NavigationWidget';
import { guid } from './utils'
import startingResultImage from './img/result.jpg'

import './css/Drawing.css';

class Drawing extends Component {
  constructor() {
    super();
    this.state = {
      menuWidth: 300,
      posLeftPercentage: 10,
      posLeftPx: (8.5/100)*window.innerWidth,
      resultImg: startingResultImage,
      isMenuActive: true,
      isComparing: false,
      isDraggingAnObject: false,
      objects: [],
      shouldMakeNewImage: false,
      brushSize: 20,
      showLoader: false,
      sliderAnimation: undefined
    }
  }

  handleNewDragObject = (x, y, elt) => {
    const newObject = {
      key: guid(),
      x,
      y,
      width: 166,
      height: 100,
      src: elt.src,
      name: 'car01.png'
    };
    this.setState({
      objects: update(this.state.objects, {$push: [newObject]}),
      isDraggingAnObject: false
    })
  }

  updateDraggableObject = (key, values) => {
    const objects = this.state.objects;
    const index = this.state.objects.findIndex(object => {return object.key === key });
    const updatedValue= update(objects[index], {
      width: {$set: values.width},
      height: {$set: values.height},
      x: {$set: values.x},
      y: {$set: values.y},
    }); 

    const newObjects = update(objects, {
        $splice: [[index, 1, updatedValue]]
    });
    this.setState({
      isDraggingAnObject: false,
      objects: newObjects
    });
  }

  makeNewImage = () => {
    const { width, height } = this.props;
    
    this.setState({
      showLoader: true,
      shouldMakeNewImage: true
    });

    setTimeout(() => {
      let pos = { left: 0 };
      this.setState({
        posLeftPercentage: 0,
        posLeftPx: 0,
        shouldMakeNewImage: false,
        showLoader: false,
        sliderAnimation: new TWEEN.Tween(pos).to({ left: 70 }, 10000).easing(TWEEN.Easing.Exponential.Out).onUpdate(() => { 
          this.setState({
            posLeftPercentage: pos.left,
            posLeftPx: (window.innerWidth/100)*pos.left,
          }) }).start()
      }, () => clearSketch());
    }, 2000);

    // sendImage(width, height, resultImg => {
    //   let pos = { left: 0 };
    //   this.setState({
    //     posLeft: 0,
    //     shouldMakeNewImage: false,
    //     showLoader: false,
    //     resultImg: `url(data:image/jpeg;base64,${resultImg})`,
    //     sliderAnimation: new TWEEN.Tween(pos).to({ left: 70 }, 10000).easing(TWEEN.Easing.Exponential.Out).onUpdate(() => { 
    //       this.setState({
    //         posLeftPercentage: pos.left,
    //         posLeftPx: (window.innerWidth/100)*pos.left,
    //       }) }).start()
    //   }, () => clearSketch());
    // });
  }

  render() {
    const { width, height } = this.props;
    const {
      posLeftPercentage,
      posLeftPx,
      brushSize,
      isComparing,
      objects,
      menuWidth,
      isMenuActive,
      shouldMakeNewImage,
      isDraggingAnObject,
      showLoader
    } = this.state;

    return (
      <div className="DrawingPage">
        <NavigationWidget />
        <Menu
          brushSize={brushSize}
          isMenuActive={isMenuActive}
          showLoader={showLoader}
          updateBrushSize={s => this.setState({brushSize: s })}
          updateStatus={() => this.setState({isMenuActive: !this.state.isMenuActive})}
          newObject={this.handleNewDragObject}
          make={this.makeNewImage}
          startDraggingObject={() => this.setState({isDraggingAnObject: true})}
        />
        <div className="ResultImage" style={{width: `${posLeftPercentage}%`, background: `url(${this.state.resultImg})`}} />
        <Draggable
          axis="x"
          handle=".Handle"
          // grid={[0, window.innerWidth - 40]}
          position={{x: this.state.posLeftPx, y: 330}}
          defaultPosition={{x: this.state.posLeftPx, y: 330}}
          onDrag={e => this.setState({posLeftPx: e.clientX, posLeftPercentage: (e.clientX/window.innerWidth)*100})}
          onStart={() => this.setState({isComparing: true})}
          onStop={() => this.setState({isComparing: false})}
          defaultClassName="CompareIcon">
          <div>
            <MdSwapHoriz className="Handle"/>
          </div>
        </Draggable>
        {this.state.objects.map((object, index) => { return (
          <DraggableObject
            key={object.key}
            values={object}
            update={this.updateDraggableObject}
            setDraggingOn={() => this.setState({isDraggingAnObject: true})}
            setDraggingOff={() => this.setState({isDraggingAnObject: false})}
            />
          )})};
        <P5Wrapper 
          sketch={sketch}
          width={width}
          height={height}
          objects={objects}
          isMenuActive={isMenuActive}
          isComparing={isComparing}
          isDraggingAnObject={isDraggingAnObject}
          updateMakeStatus={() => this.setState({shouldMakeNewImage: false})}
          shouldMakeNewImage={shouldMakeNewImage}
          brushSize={brushSize}
          menuWidth={menuWidth}
          />
        <p className="ImageCredits">Image drawn by a human: December 2017 © The robots from Mars</p>
      </div>
    );
  }
}

export default Drawing;