/*
Uncanny Rd.

Cristóbal Valenzuela
Anastasis Germanidis
*/

import React, { Component } from 'react';
import Landing from './Landing';
import Drawing from './Drawing';

class App extends Component {
  constructor(){
    super();
    this.state = {
      showLanding: true,
      width: 2048,
      height: 1024
    };
  }

  handleClick = (view) => {
    this.setState({
      showLanding: !this.state.showLanding,
      viewing: view
    })
  }

  render() {
    const { showLanding } = this.state;
    return(
      <div>
        <div className='OfflineMsg'>This project is temporarily off.</div>
        {showLanding ? 
          <Landing select={this.handleClick} /> :
          <Drawing
            onClickBack={() => this.setState({showLanding: true})}
            width={this.state.width} 
            height={this.state.height} />
        }
      </div>
    )
  }
}

export default App;
