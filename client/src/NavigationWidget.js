/*
Drawing App
*/

import React, { Component } from 'react';
import MdPlace from 'react-icons/lib/md/place';

import './css/NavigationWidget.css';

class NavigationWidget extends Component {
  render() {
    return <div className="NavigationWidget">
        {/* {this.props.viewMode && this.props.currentBlock !== 0 && <div onClick={() => this.props.onBlockChanged(this.props.currentBlock - 1)} className="Back">
              <MdArrowBack className="Backarrow" />
            </div>} */}
        <div className="StreetInfo">
          <p id="streetName">Uncanny Rd.</p>
          <MdPlace className="PlaceIcon" />
          <p id="block-number">Block #{this.props.currentBlock}</p>
          {/* <p id="location">Unknown Location</p> */}
          <p id="date">December 2017</p>
        </div>
        {/* {this.props.viewMode && this.props.currentBlock < this.props.totalBlocks - 1 && <div onClick={() => this.props.onBlockChanged(this.props.currentBlock + 1)} className="Forward">
              <MdArrowForward className="Backarrow" />
            </div>} */}
      </div>;
  }
}

export default NavigationWidget;
