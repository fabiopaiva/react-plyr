import React, { Component } from 'react';
import { render } from 'react-dom';

import ReactPlyr from '../../src/ReactPlyr';

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'youtube',
      videoId: 'CDFN1VatiJA',
      controls: ['play', 'progress'],
      isPlaying: false,
    };
  }

  _togglePlay = () => {
    // this.setState({
    //   isPlaying: !this.state.isPlaying
    // });
    // console.log('_togglePlay: ', this.state.isPlaying);
    console.log('_togglePlay: ');
    return true;
  }

  render() {
    return (
      <div>
        <h1>react-plyr Demo</h1>
        <ReactPlyr
          type={this.state.type}
          videoId={this.state.videoId}
          controls={this.state.controls}
          isPlaying={false}
        />

        <ReactPlyr
          type="vimeo"
          videoId="https://vimeo.com/189789787"
        />

        <button type="button" onClick={this.play}>Play</button>
        <button type="button" onClick={this.pause}>Pause</button>
        <button type="button" onClick={this._togglePlay}>ToglePlay</button>
        <button type="button" onClick={this.stop}>Stop</button>
        <button type="button" onClick={this.duration}>duration</button>
        <button type="button" onClick={this.getCurrentTime}>Current Time</button>
        <button type="button" onClick={this.type}>get type</button>
        <button type="button" onClick={this.destroy}>destroy</button>
      </div>
    );
  }

}

render(<Demo/>, document.querySelector('#demo'));
