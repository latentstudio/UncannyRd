import React, { Component } from 'react';
import FaPlay from "react-icons/lib/fa/play";
import FaPause from "react-icons/lib/fa/pause";

import { BASE_URL } from './constants';

// how much time to spend on each block
const TIME_PER_BLOCK = 1000; // ms

// how often to update the playhead
const UPDATE_STEP = 25; //ms

class Timeline extends Component {
    constructor () {
        super();
        this.state = {
            relativePos: 1,
            playing: false,
            intervalId: null,
            mouseDown: false
        };
    }

    mouseMove (evt) {
        if (evt.nativeEvent.buttons & 1) {
            this.onClick(evt);
        }
    }

    onClick (evt) {
        const relativePos = evt.nativeEvent.offsetX / evt.target.offsetWidth;
        this.setState({ relativePos }, () => {
            this.updateSelection();
        });
    }

    updateSelection () {
        const selection = Math.max(0, Math.min(this.props.totalBlocks - 1, 
            Math.floor(this.props.totalBlocks * this.state.relativePos)));
        this.props.selectBlock(selection);
    }

    startPlaying () {
        if (this.state.relativePos === 1) { 
            this.setState({relativePos: 0});
        }
        const intervalId = setInterval(this.updatePlaying.bind(this), UPDATE_STEP);
        this.setState({intervalId, playing: true});
    }

    stopPlaying () {
        clearInterval(this.state.intervalId);
        this.setState({intervalId: null, playing: false});
    }

    updatePlaying () {
        const totalDuration = this.props.totalBlocks * TIME_PER_BLOCK;
        const step = UPDATE_STEP / totalDuration;
        let newRelativePos = Math.min(1, this.state.relativePos + step);
        if (newRelativePos === 1) {
            this.stopPlaying();
        }
        this.setState({relativePos: newRelativePos});
        this.updateSelection();
    }

    togglePlay () {
        if (this.state.playing) {
            this.stopPlaying();
        } else {
            this.startPlaying();
        }
    }

    render () {
        const {playing, relativePos} = this.state;
        const buttonStyle = {
            height: '100%',
            color: 'white',
            width: '2em'
        };
        const timelineStyle = {
            background: `url(${BASE_URL}/timeline?n=${this.props.totalBlocks}`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
        }
        
        return <div className="TimelineContainer">
            {playing ? <FaPause style={buttonStyle} onClick={this.togglePlay.bind(this)} /> : <FaPlay style={buttonStyle} onClick={this.togglePlay.bind(this)} />}
            <div className="Timeline" 
                onClick={this.onClick.bind(this)} 
                onMouseMove={this.mouseMove.bind(this)}
                style={timelineStyle}>
              <div className="TimelineHandle" style={{ left: relativePos * 100 + "%" }} />
            </div>
          </div>;
    }
}

export default Timeline;
