import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
// import { withKnobs, text, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import Plyr from '../../src';

const stories = storiesOf('React Plyr', module);

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
          videoId="yGh0bjzj4IQ"
          onReady={action('Is Ready!')}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onEnd={() => action('Video has finished!')}
          onEnterFullscreen={() => action('Fullscreen is enabled')}
          onExitFullscreen={() => action('Fullscreen is disabled')}
          onVolumeChange={action('Volume changed')}
          onSeeked={action('Seeked!')}
          ref={plyr => this.plyr = plyr}
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

export default stories.add('External State', withInfo()(() =>
  <Wrapper />
));
