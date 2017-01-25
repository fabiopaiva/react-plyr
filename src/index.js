import React, { Component, PropTypes } from 'react';
import plyr from 'plyr';

class Plyr extends Component {
  constructor() {
    super();

    this.instance = null;
  }

  // Specifies the default values for props:
  static defaultProps = {
    type: 'youtube',

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
    type: PropTypes.oneOf(['youtube', 'vimeo']),
    videoId: PropTypes.string.isRequired,
    onReady: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onEnd: PropTypes.func,
    onSeeked: PropTypes.func,
    onEnterFullscreen: PropTypes.func,
    onVolumeChange: PropTypes.func,

    // plyr props
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

    this.instance = plyr.setup('.react-plyr', options);

    this.instance[0].on('ready', () => {
      this.props.onReady && this.props.onReady();
    });

    this.instance[0].on('play', () => {
      this.props.onPlay && this.props.onPlay();
    });

    this.instance[0].on('pause', () => {
      this.props.onPause && this.props.onPause();
    });

    this.instance[0].on('ended', () => {
      this.props.onEnd && this.props.onEnd();
    });

    this.instance[0].on('seeked', event => {
      const time = event.detail.plyr.getCurrentTime();
      this.props.onSeeked && this.props.onSeeked(time);
    });

    this.instance[0].on('enterfullscreen', () => {
      this.props.onEnterFullscreen && this.props.onEnterFullscreen();
    });

    this.instance[0].on('exitfullscreen', () => {
      this.props.onExitFullscreen && this.props.onExitFullscreen();
    });

    this.instance[0].on('volumechange', event => {
      const isMuted = event.detail.plyr.isMuted();
      const volume = event.detail.plyr.getVolume();

      this.props.onVolumeChange && this.props.onVolumeChange({ isMuted, volume });
    });
  }

  componentWillUnmount() {
    this.instance[0].destroy();
  }

  render() {
    return (
      <div className="react-plyr" style={this.props.style}>
        <div
          data-type={this.props.type}
          data-video-id={this.props.videoId}
        >
        </div>
      </div>
    );
  }
}

export default Plyr;
