import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import { withKnobs, text, number, select } from '@kadira/storybook-addon-knobs';

import Plyr from '../../src';

const stories = storiesOf('React Plyr', module);
stories.addDecorator(withKnobs);

class Wrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      isPaused: false,
      isStopped: true

    }
  }

  handlePlay = () => {
    this.plyr.play();
    this.setState({
      isPlaying: true,
      isPaused: false,
      isStopped: false
    });
  }

  handleToogle = () => {
    this.plyr.togglePlay();
    this.setState({
      isPlaying: !this.state.isPlaying,
      isPaused:  !this.state.isPaused,
      isStopped: !this.state.isStopped
    });
  }

  handlePause = () => {
    this.plyr.pause();
    this.setState({
      isPlaying: false,
      isPaused: true,
      isStopped: false
    });
  }

  handleStop = () => {
    this.plyr.stop();
    this.setState({
      isPlaying: false,
      isPaused: false,
      isStopped: true
    });
  }

  render() {
    return (
      <div>
        <Plyr
          videoId="MM0XgD89Tr8"
          // autoplay
          onReady={console.log('Is Ready!')}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onEnd={() => console.log('Video has finished!')}
          onEnterFullscreen={() => console.log('Fullscreen is enabled')}
          onExitFullscreen={() => console.log('Fullscreen is disabled')}
          onVolumeChange={volume => console.log('volume changed', volume)}
          onSeeked={time => console.log('seeked!', time)}
          ref={ply => this.plyr = ply}
        />

        <hr/>

        <button onClick={this.handlePlay}>️▶️ Play</button>
        <button onClick={this.handleToogle}>️⏯ Toggle Playing</button>
        <button onClick={this.handlePause}>️⏸️ Pause</button>
        <button onClick={this.handleStop}>️⏹ Stop</button>

        <hr/>

        <h4>Playing: {this.state.isPlaying ? '✅' : '❌'}</h4>
        <h4>Paused: {this.state.isPaused ? '✅' : '❌'}</h4>
        <h4>Stopped: {this.state.isStopped ? '✅' : '❌'}</h4>
      </div>
    );
  }
}

export default stories.addWithInfo('External State', () => (
  <Wrapper />
));
