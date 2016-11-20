import React, { Component, PropTypes } from 'react';
import plyr from 'plyr';

import '../node_modules/plyr/dist/plyr.css';

class ReactPlyr extends Component {
  constructor() {
    super();

    this.state = {
      instance: undefined
    };
  }

  // Specifies the default values for props:
  static defaultProps = {
    disabled: false,
    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen'],
    loadSprite: true,
    // iconUrl: null,
    iconPrefix: 'plyr',
    debug: false,
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

  static propTypes = {
    disabled: PropTypes.bool,
    controls: PropTypes.arrayOf(PropTypes.string),
    loadSprite: PropTypes.bool,
    // iconUrl: PropTypes.string,
    iconPrefix: PropTypes.string,
    debug: PropTypes.bool,
    autoplay: PropTypes.bool,
    seekTime: PropTypes.number,
    volume: PropTypes.number,
    clickToPlay: PropTypes.bool,
    disableContextMenu: PropTypes.bool,
    hideControls: PropTypes.bool,
    showPosterOnEnd: PropTypes.bool,
    keyboardShortcuts: PropTypes.shape({
      focused: PropTypes.bool,
      global: PropTypes.bool
    }),
    tooltips: PropTypes.shape({
      controls: PropTypes.bool,
      seek: PropTypes.bool
    }),
    duration: PropTypes.number,
    displayDuration: PropTypes.bool,
    storage: PropTypes.shape({
      enabled: PropTypes.bool,
      key: PropTypes.string
    }),
  }

  componentDidMount() {
    const options = {
      enabled: !this.props.disabled,
      controls: this.props.controls,
      loadSprite: this.props.loadSprite,
      // iconUrl: this.props.iconUrl,
      iconPrefix: this.props.iconPrefix,
      debug: this.props.debug,
      autoplay: this.props.autoplay,
      seekTime: this.props.seekTime,
      volume: this.props.volume,
      clickToPlay: this.props.clickToPlay,
      disableContextMenu: this.props.disableContextMenu,
      hideControls: this.props.hideControls,
      showPosterOnEnd: this.props.showPosterOnEnd,
      keyboardShortcuts: this.props.keyboardShortcuts,
      tooltips: this.props.tooltips,
      duration: this.props.duration,
      displayDuration: this.props.displayDuration,
      storage: this.props.storage
    };

    this.setState({
      instance: plyr.setup(`.ReactPlyr`, options)
    });
  }

  componentWillUnmount() {
    this.state.instance[0].destroy();
  }

  render() {
    return (
      <div className="ReactPlyr">
        <div
          data-type={this.props.type}
          data-video-id={this.props.videoId}
        >
        </div>
      </div>
    );
  }
}

export default ReactPlyr;
