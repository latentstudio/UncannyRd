/*
Drawing App
*/

import React, { Component } from 'react';
import Rnd from 'react-rnd';

import './css/DraggableObject.css';

class DraggableObject extends Component {
  constructor() {
    super();
    this.state = {
      isBeingEdited: true,
      width: 166,
      height: 100,
      x: 200,
      y: 200
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

    return (
      <Rnd
        className="DraggableObject"
        style={style}
        size={{ width: width,  height:height }}
        position={{ x: x, y: y }}
        onDragStop={this.handleDrag}
        onDrag={() => this.props.setDraggingOn()}
        onResize={this.handleResize}
      >
      <img
        onDoubleClick={this.handleClick}
        onMouseOver={() => this.props.setDraggingOn()}
        onMouseLeave={() => this.props.setDraggingOff()}
        draggable="false"
        src={src}
        alt=""
        srcSet={src}
        className="DraggedElement"
      />
      </Rnd>
    );
  }
}

export default DraggableObject;