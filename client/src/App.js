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
      showLanding: false,
      width: 2048,
      height: 1024
    };
  }

  handleClick = () => {
    this.setState({
      showLanding: !this.state.showLanding
    })
  }

  render() {
    const { showLanding } = this.state;
    return(
      <div>
        {showLanding ? <Landing click={this.handleClick} /> : <Drawing width={this.state.width} height={this.state.height} /> }
      </div>
    )
  }
}

export default App;
