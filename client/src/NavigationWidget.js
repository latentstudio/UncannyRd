/*
Drawing App
*/

import React, { Component } from 'react';
import MdArrowBack from 'react-icons/lib/md/arrow-back';
import MdPlace from 'react-icons/lib/md/place';

import './css/NavigationWidget.css';

class NavigationWidget extends Component {
  render() {
    return <div className="NavigationWidget">
        <div className="Back">
          <MdArrowBack onClick={this.props.onClickBack} className="Backarrow" />
        </div>
        <div className="StreetInfo">
          <p id="streetName">Uncanny Rd.</p>
          <MdPlace className="PlaceIcon" />
          <p id="block-number">Block #{this.props.currentBlock}</p>
          <p id="date">December 2017</p>
        </div>
      </div>;
  }
}

export default NavigationWidget;
