/*
Drawing App
*/

import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Rnd from 'react-rnd';

import './css/DraggableObject.css';

class DraggableObject extends Component {
  constructor() {
    super();
    this.state = {
      isBeingEdited: true
    }
  }

  handleClick = () => {
    this.setState({
      isBeingEdited: !this.state.isBeingEdited
    })
  }

  handleDrag = (e, d) => {
    if(this.state.isBeingEdited){
      const state = { 
        x: d.x,
        y: d.y
      }
      this.setState({
        ...state
      });
      this.props.update(this.props.values.key, this.state);
    }
  }

  handleResize = (e, direction, ref, delta, position) => {
    if(this.state.isBeingEdited){
      const state = {
        width: ref.offsetWidth,
        height: ref.offsetHeight,
        ...position,
      }
      this.setState({
        ...state
      });
      this.props.update(this.props.values.key, state);
    }
  }

  render() {
    const {x, y, width, height, src} = this.props.values;
    const { isBeingEdited } = this.state;

    let style = {
      background: '#ffffff24',
      border: '1px solid rgba(255, 255, 255, 0.11)'
    }

    if(!isBeingEdited){
      style = {
        background: 'none',
        border: 'none'
      }
    }
    // return (
    //   <Draggable
    //     handle=".DraggedElement"
    //     position={{x: x, y: y}}
    //     defaultPosition={{x: x, y: y}}
    //     onDrag={() => this.props.setDraggingOn()}
    //     onStop={this.handleDrag}
    //     defaultClassName="DraggableObject">
    //     <div>
    //       <img
    //         onDoubleClick={this.handleClick}
    //         onMouseOver={() => this.props.setDraggingOn()}
    //         onMouseLeave={() => this.props.setDraggingOff()}
    //         draggable="false"
    //         src={src}
    //         alt=""
    //         srcSet={src}
    //         className="DraggedElement"
    //       />
    //     </div>
    //   </Draggable>
    // );
    return  (
      <Rnd 
        className="DraggableObject" 
        style={style} 
        size={{ width: width, height: height }} 
        position={{ x: x, y: y }} 
        onDragStop={this.handleDrag} 
        onDrag={() => this.props.setDraggingOn()} 
        onResize={this.handleResize}
        lockAspectRatio={true}>
      <img 
        onDoubleClick={this.handleClick} 
        onMouseOver={() => this.props.setDraggingOn()} 
        onMouseLeave={() => this.props.setDraggingOff()} 
        draggable="false" 
        src={src} 
        alt="" 
        srcSet={src} className="DraggedElement" />
      </Rnd>
    )
  }
}

export default DraggableObject;

// This is not working. The resize. I'm using this: https://github.com/bokuweb/react-rnd
