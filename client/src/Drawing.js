/*
Drawing App
*/

import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Draggable from 'react-draggable';
import MdSwapHoriz from 'react-icons/lib/md/swap-horiz';
import update from 'immutability-helper';

import Sketch from './Sketch';
import DraggableObject from './DraggableObject';
import Menu from './Menu';
import NavigationWidget from './NavigationWidget';
import { guid } from './utils'

import './css/Drawing.css';

class Drawing extends Component {
  constructor() {
    super();
    this.state = {
      menuWidth: 300,
      posLeft: 40,
      isMenuActive: true,
      isComparing: false,
      isDraggingAnObject: false,
      objects: [],
      shouldMakeNewImage: false,
      brushSize: 20
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
    this.setState({objects: newObjects});
  }

  render() {
    const { posLeft, brushSize, isComparing, objects, menuWidth, isMenuActive, shouldMakeNewImage, isDraggingAnObject } = this.state;
    const { width, height } = this.props;

    return (
      <div className="DrawingPage">
        <NavigationWidget />
        <Menu
          brushSize={brushSize}
          isMenuActive={isMenuActive}
          updateBrushSize={s => this.setState({brushSize: s })}
          updateStatus={() => this.setState({isMenuActive: !this.state.isMenuActive})}
          newObject={this.handleNewDragObject}
          make={() => this.setState({shouldMakeNewImage: true})}
          startDraggingObject={() => this.setState({isDraggingAnObject: true})}
        />
        <div className="ResultImage" style={{width: `${posLeft}px`}} />
        <Draggable
          axis="x"
          handle=".Handle"
          defaultPosition={{x: 20, y: 330}}
          onDrag={e => this.setState({posLeft: e.clientX})}
          onStart={() => this.setState({isComparing: true})}
          onStop={() => this.setState({isComparing: false})}
          defaultClassName="CompareIcon">
          <div>
            <MdSwapHoriz className="Handle"/>
          </div>
        </Draggable>
        {this.state.objects.map((object, index) => { return <DraggableObject key={object.key} values={object} update={this.updateDraggableObject}/> })};
        <P5Wrapper 
          sketch={Sketch}
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