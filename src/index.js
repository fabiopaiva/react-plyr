import React, { Component } from 'react';
import PropTypes from 'prop-types';
import plyr from 'plyr';

class Plyr extends Component {
  constructor() {
    super();

    this.player = null;
  }

  // Specifies the default values for props:
  static defaultProps = {
    type: 'youtube',

    className: 'react-plyr',
    enabled: true,
    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen'],
    loadSprite: true,
    iconUrl: null,
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
    type: PropTypes.oneOf(['youtube', 'vimeo', 'video', 'audio']),
    className: PropTypes.string,
    videoId: PropTypes.string,
    url: PropTypes.string,
    poster: PropTypes.string,
    sources: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
      })
    ),

    onReady: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onEnd: PropTypes.func,
    onLoadedData: PropTypes.func,
    onSeeked: PropTypes.func,
    onEnterFullscreen: PropTypes.func,
    onVolumeChange: PropTypes.func,

    // plyr props
    enabled: PropTypes.bool,
    controls: PropTypes.arrayOf(PropTypes.string),
    loadSprite: PropTypes.bool,
    iconUrl: PropTypes.string,
    iconPrefix: PropTypes.string,
    debug: PropTypes.bool,
    autoplay: PropTypes.bool,
    preload: PropTypes.string,
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

  getType = () => this.player && this.player.getType();
  isReady = () => this.player && this.player.isReady();
  play = () => this.player && this.player.play();
  pause = () => this.player && this.player.pause();
  stop = () => this.player && this.player.stop();
  togglePlay = () => this.player && this.player.togglePlay();
  restart = () => this.player && this.player.restart();
  getCurrentTime = () => this.player && this.player.getCurrentTime();
  getDuration = () => this.player && this.player.getDuration();
  getVolume = () => this.player && this.player.getVolume();
  isMuted = () => this.player && this.player.isMuted();
  isPaused = () => this.player && this.player.isPaused();
  toggleMute = () => this.player && this.player.toggleMute();

  componentDidMount() {
    const options = {
      enabled: this.props.enabled,
      controls: this.props.controls,
      loadSprite: this.props.loadSprite,
      iconUrl: this.props.iconUrl,
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

    if (!options.iconUrl) {
      delete options.iconUrl;
    }

    const selector = `.${this.props.className.replace(/ /g, '.')}`
    this.player = plyr.setup(selector, options)[0];

    if (this.player) {
      this.player.on('ready', () => {
        this.props.onReady && this.props.onReady();
      });

      this.player.on('play', () => {
        this.props.onPlay && this.props.onPlay();
      });

      this.player.on('pause', () => {
        this.props.onPause && this.props.onPause();
      });

      this.player.on('ended', () => {
        this.props.onEnd && this.props.onEnd();
      });

      this.player.on('loadeddata', () => {
        this.props.onLoadedData && this.props.onLoadedData();
      });

      this.player.on('seeked', event => {
        const time = event.detail.plyr.getCurrentTime();
        this.props.onSeeked && this.props.onSeeked(time);
      });

      this.player.on('enterfullscreen', () => {
        this.props.onEnterFullscreen && this.props.onEnterFullscreen();
      });

      this.player.on('exitfullscreen', () => {
        this.props.onExitFullscreen && this.props.onExitFullscreen();
      });

      this.player.on('volumechange', event => {
        const isMuted = event.detail.plyr.isMuted();
        const volume = event.detail.plyr.getVolume();

        this.props.onVolumeChange && this.props.onVolumeChange({ isMuted, volume });
      });
    }
  }

  componentWillUnmount() {
    this.player && this.player.destroy();
  }

  // For video support for plyr supported videos using videoId (Youtube and Vimeo for now).
  renderPlayerWithVideoId() {
    return (
      <div className={this.props.className} style={this.props.style}>
        <div
          data-type={this.props.type}
          data-video-id={this.props.videoId}
        />
      </div>
    );
  }

  renderPlayerWithSRCWithSources(sources) {
    return (
      <video
        className={this.props.className}
        preload={this.props.preload}
        poster={this.props.poster}
      >
        {sources.map((source, index) =>
          <source key={index} src={source.src} type={source.type} />
        )}
      </video>
    );
  }

  // For video support for source defined as link to those video files.
  renderPlayerWithSRC() {
    const {
      sources,
      url,
      preload,
      poster,
      className,
    } = this.props;

    if (sources && Array.isArray(sources) && sources.length) {
      return this.renderPlayerWithSRCWithSources(sources);
    } else {
      return (
        <video
          className={className}
          src={url}
          preload={preload}
          poster={poster}
        />
      );
    }
  }

  renderAudioPlayer() {
    const {
      sources,
      url,
      preload,
      className,
    } = this.props;

    if (sources && Array.isArray(sources) && sources.length) {
      return (
        <audio
          className={className}
          preload={preload}
        >
          {sources.map((source, index) =>
            <source key={index} src={source.src} type={source.type} />
          )}
        </audio>
      )
    } else {
      return (
        <audio
          className={className}
          preload={preload}
          src={url}
        />
      )
    }
  }

  render() {
    if (this.props.type === 'audio')
      return this.renderAudioPlayer();
    else if (this.props.type === 'video')
      return this.renderPlayerWithSRC();
    else
      return this.renderPlayerWithVideoId();
  }
}

export default Plyr;
