import React, { Component } from 'react';
import plyr from 'plyr';
import youtubeUrl from 'youtube-url';
import '../node_modules/plyr/dist/plyr.css';

class PlyrYoutube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instance: undefined
    };
  }

  componentDidMount() {
    const options = {
      enabled: this.props.enabled,
      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen'],
      loadSprite: true,
      // iconUrl: null,
      iconPrefix: 'plyr',
      debug: true,
      autoplay: false,
      seekTime: 10,
      volume: 5,
      clickToPlay: true,
      disableContextMenu: true,
      hideControls: true,
      showPosterOnEnd: false,
      keyboardShortcuts: {
        focused: true,
        global: false
      },
      tooltips: {
        controls: false,
        seek: true
      },
      duration: null,
      displayDuration: true,
      storage: {
        enabled: true,
        key: 'plyr_volume'
      }
    };

    const youtubeurl = youtubeUrl.valid(`https://www.youtube.com/watch?v=${this.props.videoId}`);
    const youtubeId = youtubeUrl.extractId(`https://www.youtube.com/watch?v=${this.props.videoId}`);

    // console.log(youtubeurl, youtubeId);

    this.setState({
      instance: plyr.setup(options)[0]
    });
  }

  componentWillUnmount() {
    this.state.instance.instancedestroy();
  }

  play = () => {
    this.state.instance.play();
  }

  duration = () => {
    var caca = this.state.instance.getDuration();
    console.log(caca);
  }

  type = () => {
    var caca = this.state.instance.getType();
    console.log(caca);
  }

  render() {
    return (
      <div>
        <div data-type="youtube" data-video-id={this.props.videoId}></div>

        <button type="button" onClick={this.play}>Play</button>
        <button type="button" onClick={this.duration}>duration</button>
        <button type="button" onClick={this.type}>get type</button>
      </div>
    );
  }
}

export default PlyrYoutube;
