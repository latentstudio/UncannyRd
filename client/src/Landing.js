/*
Landing page
*/

import React, { Component } from 'react';
import { shuffleArray } from './utils';
import uncanny from './videos/uncannyrd.mp4';
import poster from './img/result.jpg';
import mobile from 'is-mobile';
import './css/Landing.css';

class Landing extends Component {
  render() {
    const { select } = this.props;

    const authors = shuffleArray([
      {
        name: "Anastasis Germanidis",
        url: "http://agermanidis.com"
      },
      {
        name: "Cristóbal Valenzuela",
        url: "http://cvalenzuelab.com"
      }
    ]);

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
          Collectively hallucinating a never-ending road using Generative Adversarial Neural Networks.
          </div>

          {mobile() ? <div className="Mobile">Please visit this site from a desktop browser</div> : <div><button className="StartBtn" onClick={() => select('create')}>Start</button></div>}
        </div>

        <div className="Credits">
          <p>Made by <a href={authors[0].url} target="_blank" rel="noopener noreferrer">{authors[0].name}</a>
          and <a href={authors[1].url} target="_blank" rel="noopener noreferrer">{authors[1].name}</a></p>
        </div>
      </div>
    );
  }
}

export default Landing;
