/*
Drawing App
*/

import React, { Component } from 'react';
import MdBrush from 'react-icons/lib/md/brush';
import { color2css } from './utils';

class BrushColor extends Component {
  constructor(){
    super();
    this.state = {
      showName: false
    }
  }

  render() {
    const { showName } = this.state;
    const { changeColor, backgroundColor, label, textColor, currentColor } = this.props;

    const background = color2css(backgroundColor);
    const color = color2css(textColor);
    const btnStyle = { 
      background,
      color,
      opacity: 0.6
    };

    if (backgroundColor === currentColor) {
      btnStyle.border = "1px solid white";
      btnStyle.transform = "scale(1.3)";
      btnStyle.opacity = "1"
    }

    const textStyle = {
      background,
      color,
    }

    return (
      <div className="BrushHolder">
        <button
          onClick={changeColor}
          style={btnStyle}
          className="BrushColor"
          onMouseOver={() => this.setState({showName: true })}
          onMouseLeave={() => this.setState({showName: false })}
          >
            <MdBrush />
        </button>
        {showName && <span className="Label" style={textStyle}>{label}</span> }
      </div>
    );
  }
}

export default BrushColor;