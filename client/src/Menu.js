/*
Drawing App
*/

import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import MdBrush from 'react-icons/lib/md/brush';

import BrushColor from './BrushColor';
import { clearSketch } from './Sketch';
import { CLASSES } from './constants';
import loader from './img/loader.gif';
import { color2css } from './utils';
import { preDrawnImages } from './Sketch';
import eye from './img/eye.svg';
import add from './img/add.svg';

import './css/Menu.css';

class BurgerMenu extends Component {

  render() {
    const { isMenuActive, updateStatus, brushSize, showLoader, changeColor, currentColor } = this.props;
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

    return <Menu isOpen={isMenuActive} noOverlay right customBurgerIcon={burgerIcon} onStateChange={updateStatus} bodyClassName={"Menu"}>
        <div>
          <h5>Brush Color</h5>
        </div>
        {CLASSES.map(c => {
          if (c.visible) {
            return <BrushColor currentColor={currentColor} changeColor={() => changeColor(c.color)} key={c.color} label={c.label} textColor={c.textColor} backgroundColor={c.color} icon={c.icon}/>;
          } else {
            return null;
          }
        })}
        <div>
          <h5>Brush Size</h5>
        </div>
        <input type="range" name="brushSize" min="1" max="100" value={brushSize} onChange={e => this.props.updateBrushSize(e.target.value)} className="brushSizeSlider" />
        <div>
          <h5>Drag Objects</h5>
        </div>
        {preDrawnImages.map((image, index) => {
          return <img src={image} alt={index} key={index} name={index} srcSet={image} className="DragObject" draggable={true} onDrag={() => this.props.startDraggingObject()} onDragEnd={e => this.props.newObject(e.clientX, e.clientY, e.target, index)} />;
        })}
        <div className="ActionableBtns">
          {showLoader ? <img src={loader} alt="loader" srcSet={loader} className="Loader" /> : null}
          <button className="MakeBtn Btn" onClick={e => this.props.make(e)} style={makeBtnStyle}>
            GENERATE <span>RD</span>
          </button>
          <button className="ClearBtn Btn" onClick={() => clearSketch()}>
            CLEAR ALL
          </button>
          <div className="Divider"></div>
          <button className="AddBtn Btn" 
            onClick={this.props.onAddImageClick} 
            disabled={!this.props.allowAdding}>
            <img className="BtnIcon" src={add} alt="add block"/> ADD BLOCK TO ROAD
          </button>
          <div className="Divider"></div>
          <button className="ViewBtn Btn" onClick={this.props.onViewModeClick}>
            <img className="BtnIcon" src={eye} alt="view blocks"/> VIEW PREVIOUS BLOCKS
          </button>
        </div>
      </Menu>;
  }
}

export default BurgerMenu;