/*
Drawing App
*/

import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import MdBrush from 'react-icons/lib/md/brush';

import { clearSketch } from './Sketch';
import { classes } from './classes';
import loader from './img/loader.gif';
import car from './img/items/car01.png';
import { color2css } from './utils';

import './css/Menu.css';

class BurgerMenu extends Component {
  constructor() {
    super();
  }

  handleColorChange = e => {
    console.log(e.target.style.background);
    this.props.changeColor('test');
  }

  render() {
    const { isMenuActive, updateStatus, brushSize, showLoader } = this.props;
    let makeBtnStyle = {
      background: 'rgba(41, 128, 41, 0.986)'
    }

    if(showLoader) {
      makeBtnStyle = {
        background: 'rgba(95, 95, 95, 0.986)'
      }
    }

    let burgerIcon = <MdBrush />
    if (isMenuActive) {
      burgerIcon = false;
    }
    return (
      <Menu
        isOpen={ isMenuActive }
        noOverlay
        right
        customBurgerIcon={ burgerIcon } 
        onStateChange={ updateStatus }
        bodyClassName={"Menu"}>
          <div><h5>Brush Color</h5></div>
          {classes.map(c => {
            if(c.visible){
              const style = {
                background: color2css(c.color),
                color: color2css(c.textColor)
              }
              return <button 
                onClick={this.handleColorChange} 
                key={c.label}
                style={style}
                className={"BrushColor"}
                >
                {c.label}
                </button>
            } else {
              return null;
            }
          })}
          <div><h5>Brush Size</h5></div>
          <input 
            type="range"
            name="brushSize"
            min="1"
            max="100"
            value={brushSize} 
            onChange={(e) => this.props.updateBrushSize(e.target.value)}
            className="brushSizeSlider"
          />
          <div><h5>Drag Objects</h5></div>
          <img 
            src={car} 
            alt="car" 
            key="car"
            name="car01.png"
            srcSet={car}
            className="DragObject"
            draggable={true}
            onDrag={() => this.props.startDraggingObject()}
            onDragEnd={(e) => this.props.newObject(e.clientX, e.clientY, e.target)}
          />
          <div className="ActionableBtns">
            {showLoader ? <img src={loader} alt="loader" srcSet={loader} className="Loader"/>: null}
            <button className="MakeBtn Btn" onClick={(e) => this.props.make(e)} style={makeBtnStyle}>GENERATE <span>RD</span></button>
            <button className="ClearBtn Btn" onClick={() => clearSketch()}>CLEAR ALL</button>
          </div>

       </Menu>
    );
  }
}

export default BurgerMenu;
