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
      muted: false,
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

  handleRewind = () => {
    this.plyr.rewind();
  }

  handleForward = () => {
    this.plyr.forward();
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

  handleMute = () => {
    this.setState({ muted: true })
  }

  handleDecreaseVolume = step => {
    this.plyr.decreaseVolume(step);
  }

  handleIncreaseVolume = step => {
    this.plyr.increaseVolume(step);
  }

  handleSetFullVolume = amount => {
    this.plyr.setVolume(amount);
  }

  render() {
    return (
      <div>
        <Plyr
          videoId="yGh0bjzj4IQ"
          muted={this.state.muted}
          volume={0.5}
          onReady={action('Is Ready!')}
          // controls={[]}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onEnd={action('Video has finished!')}
          onEnterFullscreen={action('Fullscreen is enabled')}
          onExitFullscreen={action('Fullscreen is disabled')}
          onVolumeChange={action('Volume changed')}
          onSeeked={action('Seeked!')}
          ref={plyr => this.plyr = plyr}
        />

        <hr/>

        <button onClick={this.handleRewind}>️⏪ Rewind</button>
        <button onClick={this.handlePlay}>️▶️ Play</button>
        <button onClick={this.handleForward}>️⏩ Forward</button>
        <button onClick={this.handleToogle}>️⏯ Toggle Playing</button>
        <button onClick={this.handlePause}>️⏸️ Pause</button>
        <button onClick={this.handleStop}>️⏹ Stop</button>

        <hr/>

        <button onClick={this.handleMute}>️🔇 Mute</button>
        <button onClick={() => this.handleDecreaseVolume(0.2)}>️🔉 Decrease volume</button>
        <button onClick={() => this.handleIncreaseVolume(0.2)}>️🔊 Increase volume</button>
        <button onClick={() => this.handleSetFullVolume(1)}>️🔊 Set volume to full</button>

        <hr/>

        <h4>Playing: {this.state.isPlaying ? '✅' : '❌'}</h4>
        <h4>Paused: {this.state.isPaused ? '✅' : '❌'}</h4>
        <h4>Stopped: {this.state.isStopped ? '✅' : '❌'}</h4>
      </div>
    );
  }
}

export default stories.add('External Controls & State', withInfo()(() =>
  <Wrapper />
));
