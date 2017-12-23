/*
Landing page
*/

import React, { Component } from 'react';
import uncanny from './videos/uncannyrd.mp4';
import poster from './img/result.jpg';
import './css/Landing.css';

class Landing extends Component {
  render() {
    const { click } = this.props;

    return (
      <div className="LandingPage">
        <div className="Overlay"></div>
        <video className='video' autoPlay loop muted poster={poster}>
          <source src={uncanny} type='video/mp4' />
        </video>

        <div className="Intro">
          <div className="Title">
            <h1>UNCANNY <span>RD</span></h1>
          </div>
          <div className="Description">
          A tool for collaboratively hallucinating a road using Generative Adversarial Neural Networks.
          </div>

          <button className="StartBtn" onClick={click}>Start</button>
        </div>

        <div className="Credits">
          <p>Made by <a href="http://agermanidis.com" target="_blank" rel="noopener noreferrer">Anastasis Germanidis</a> and <a href="http://cvalenzuelab.com/" target="_blank" rel="noopener noreferrer">Cristóbal Valenzuela</a></p>
        </div>

      </div>
    );
  }
}

export default Landing;
