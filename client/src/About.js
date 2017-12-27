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
        <p>Uncanny Road is an experimental tool for collectively hallucinating a never-ending road using Generative Adversarial Neural Networks.
        It is based on the pix2pixHD project, published by Nvida and UC Berkeley (<a href="https://tcwang0509.github.io/pix2pixHD/" target="_blank" rel="noopener noreferrer">Project</a>, <a href="https://arxiv.org/pdf/1711.11585.pdf" target="_blank" rel="noopener noreferrer">Paper</a> and <a href="https://github.com/NVIDIA/pix2pixHD" target="_blank" rel="noopener noreferrer">Code</a>), that allows for photorealistic image-to-image translation. The pix2pix model was trained using adversarial learning on the <a href='https://www.cityscapes-dataset.com/'>Cityscapes</a> dataset, containing thousands of street images.</p>
        <p>To synthesize street images, draw on the colormap of the scene. Each color represents a different kind of object label (e.g. road, building, vegetation, etc.) that the neural network can understand. To generate an image based on that colormap, click <span className='Btn FakeBtn' style={{background: 'green'}}>GENERATE RD</span>. If you're happy with your generated image and want to contribute it to the collective road, click <span className='Btn FakeBtn' style={{color: 'black', background: 'white'}}>ADD BLOCK TO RD</span>.</p>
        <p>The code for this project can be found <a href="https://github.com/agermanidis/UncannyRd" target="_blank" rel="noopener noreferrer">here</a>.</p>
        <p>Made by <a href={authors[0].url} target="_blank" rel="noopener noreferrer">{authors[0].name}</a>
        and <a href={authors[1].url} target="_blank" rel="noopener noreferrer">{authors[1].name}</a></p>
        <span>* Due to the expense of running the GPU server for this project, it might be turned off once in a while.</span>
        <button onClick={() => setAbout(false)}>Back to Road</button>
        </div>
      </div>
      </div>
    );
  }
}
export default About;
