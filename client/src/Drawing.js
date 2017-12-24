/*
Drawing App
*/

import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Draggable from 'react-draggable';
import MdSwapHoriz from 'react-icons/lib/md/swap-horiz';
import update from 'immutability-helper';
import TWEEN from '@tweenjs/tween.js';
import $ from "jquery";

import { BASE_URL, CLASSES } from './constants';
import { sendImage, saveImage } from './upload';
import { sketch, clearSketch } from './Sketch';
import DraggableObject from './DraggableObject';
import Menu from './Menu';
import NavigationWidget from './NavigationWidget';
import arrowNext from './img/arrow_next.png';
import arrowPrev from './img/arrow_prev.png';
import startingImg from './startImageResult';

import './css/Drawing.css';

class Drawing extends Component {
  constructor() {
    super();
    this.state = {
      menuWidth: 300,
      posLeftPercentage: 10,
      posLeftPx: (8.5/100)*window.innerWidth,
      resultImg: startingImg,
      isMenuActive: true,
      isComparing: false,
      isDraggingAnObject: false,
      objects: [],
      shouldMakeNewImage: false,
      currentColor: [128, 64, 127],
      brushSize: 20,
      currentColor: CLASSES[5].color,
      currentId: CLASSES[5].id,
      showLoader: false,
      sliderAnimation: undefined,
      currentBlock: 0,
      viewMode: false,
      numberOfBlocks: 0
    }
  }

  componentDidMount () {
    $.getJSON(BASE_URL + '/number_of_blocks', ({size}) => {
      this.setState({numberOfBlocks: size})
    })
  }

  handleNewDragObject = (x, y, elt, index) => {
    const newObject = {
      key: index,
      x,
      y,
      width: 400,
      height: 400,
      src: elt.src
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
    this.setState({
      showLoader: true,
      shouldMakeNewImage: true
    });
  }

  sendCanvasToServer = () => {
    const { width, height } = this.props;
    
    sendImage(width, height, resultImg => {
      let pos = { left: 0 };
      this.setState({
        posLeft: 0,
        shouldMakeNewImage: false,
        showLoader: false,
        resultImg: `data:image/jpeg;base64,${resultImg}`,
        sliderAnimation: new TWEEN.Tween(pos).to({ left: 70 }, 10000).easing(TWEEN.Easing.Exponential.Out).onUpdate(() => { 
          this.setState({
            posLeftPercentage: pos.left,
            posLeftPx: (window.innerWidth/100)*pos.left,
          }) }).start()
      });
    });
  }

  addImageToRoad () {
    // TODO: check if there are changes since last synthesis
    saveImage(this.state.resultImg, (data) => {
      if (data.error) {
        // TODO: show alert
        console.log('saving failed');
        return;
      }
      this.setState({
        numberOfBlocks: data.size,
        viewMode: true,
        resultImg: startingImg,
        currentBlock: data.size - 1
      })
    })
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
      showLoader,
      currentColor,
      currentId
    } = this.state;
    
    let imageToShow;
    if (this.state.viewMode) {
      imageToShow = BASE_URL + '/blocks/' + this.state.currentBlock + '.jpg';
    } else {
      imageToShow = this.state.resultImg;
    }

    return (
      <div className="DrawingPage">
        <NavigationWidget 
          currentBlock={this.state.viewMode ? this.state.currentBlock : this.state.numberOfBlocks}
          totalBlocks={this.state.numberOfBlocks}
          viewMode={this.state.viewMode}
          onBlockChanged={(block) => this.setState({
            currentBlock: block
          })}
          />
        {this.state.viewMode && 
        <button id='BackToDrawingBtn' 
          className="Btn" 
          onClick={() => this.setState({
            viewMode: false, 
            posLeftPercentage: 0,
            posLeftPx: 0
            })}>
         BACK TO DRAWING
        </button>}
        {!this.state.viewMode && (<Menu
          currentColor={currentColor}
          brushSize={brushSize}
          changeColor={color => this.setState({currentColor: color})}
          isMenuActive={isMenuActive}
          showLoader={showLoader}
          updateBrushSize={s => this.setState({brushSize: s })}
          updateStatus={() => this.setState({isMenuActive: !this.state.isMenuActive})}
          newObject={this.handleNewDragObject}
          make={this.makeNewImage}
          startDraggingObject={() => this.setState({isDraggingAnObject: true})}
          onViewModeClick={() => this.setState({viewMode: true})}
          onAddImageClick={() => this.addImageToRoad()}
        />)}
        <div
          className="ResultImage"
          style={{
            width: `${this.state.viewMode ? 100 : posLeftPercentage}%`, 
            background: `url(${imageToShow})`
          }}
        />
        {!this.state.viewMode && (<Draggable
          axis="x"
          handle=".Handle"
          position={{x: this.state.posLeftPx, y: 330}}
          defaultPosition={{x: this.state.posLeftPx, y: 330}}
          onDrag={e => {
              this.state.sliderAnimation && this.state.sliderAnimation.stop();
              if(e.clientX > 0 && e.clientX < window.innerWidth - 10){
                this.setState({
                  posLeftPx: e.clientX,
                  posLeftPercentage: (e.clientX/window.innerWidth)*100
                })
              }
          }}
          onStart={() => this.setState({isComparing: true})}
          onStop={() => this.setState({isComparing: false})}
          defaultClassName="CompareIcon">
          <div>
            <MdSwapHoriz className="Handle"/>
          </div>
        </Draggable>)}
        {this.state.objects.map((object, index) => { return (
          <DraggableObject
            key={object.key}
            values={object}
            update={this.updateDraggableObject}
            setDraggingOn={() => this.setState({isDraggingAnObject: true})}
            setDraggingOff={() => this.setState({isDraggingAnObject: false})}
            />
          )})};
        <div style={{display: this.state.viewMode ? 'none' : 'block'}}><P5Wrapper 
          sketch={sketch}
          width={width}
          height={height}
          objects={objects}
          isMenuActive={isMenuActive}
          isComparing={isComparing}
          isDraggingAnObject={isDraggingAnObject}
          updateMakeStatus={() => {
            this.setState({shouldMakeNewImage: false});
            this.sendCanvasToServer();
          }}
          shouldMakeNewImage={shouldMakeNewImage}
          brushSize={brushSize}
          menuWidth={menuWidth}
          currentColor={currentColor}
          currentId={currentId}
          clearObjects={() => this.setState({objects: []})}
          />
        <p className="ImageCredits">Image drawn by a human: December 2017 © The robots from Mars</p>
      </div>
    );
  }
}

export default Drawing;