/*
Landing page
*/

import React, { Component } from 'react';
import { shuffleArray } from './utils';
import './css/About.css';

class About extends Component {
  render() {
    const { setAbout } = this.props;

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
      <div className="About">
      <div className="Overlay"></div>
        <div className="AboutPart">
        <div className="TitleAbout">
          <h1 data-text="UNCANNY">UNCANNY <span>RD</span></h1>
        </div>
        <div className="AboutDescription">
        Uncanny Road is an experimental tool to collectively hallucinating a never-ending road using Generative Adversarial Neural Networks.
        It is based on the pix2pixHD project, published by Nvida and UC Berkeley (<a href="https://tcwang0509.github.io/pix2pixHD/" target="_blank" rel="noopener noreferrer">Project</a>, <a href="https://arxiv.org/pdf/1711.11585.pdf" target="_blank" rel="noopener noreferrer">Paper</a> and <a href="https://github.com/NVIDIA/pix2pixHD" target="_blank" rel="noopener noreferrer">Code</a>), that allows for photorealistic image-to-image translation.
        <p>The code for this project can be found <a href="https://github.com/agermanidis/UncannyRd" target="_blank" rel="noopener noreferrer">here</a>.</p>
        <p>Made by <a href={authors[0].url} target="_blank" rel="noopener noreferrer">{authors[0].name}</a>
        and <a href={authors[1].url} target="_blank" rel="noopener noreferrer">{authors[1].name}</a></p>
        <span>* Due to the processing requirements necessary for this project to work (ie: GPU's) it will be turn off once in a while.</span>
        <button onClick={() => setAbout(false)}>Back to Road</button>
        </div>
      </div>
      </div>
    );
  }
}
export default About;
