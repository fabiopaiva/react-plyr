import React, { Component } from 'react';
import PropTypes from 'prop-types';
import plyr from 'plyr';

import defaultProps from './defaultProps';

class Plyr extends Component {
  constructor() {
    super();

    this.player = null;
  }

  // Specifies the default values for props:
  static defaultProps = {
    type: 'youtube',
    className: 'react-plyr',

    ...defaultProps
  };

  static propTypes = {
    type: PropTypes.oneOf(['youtube', 'vimeo', 'video', 'audio']),
    className: PropTypes.string,
    videoId: PropTypes.string,
    url: PropTypes.string,

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
    title: PropTypes.string,
    debug: PropTypes.bool,
    autoplay: PropTypes.bool,
    autopause: PropTypes.bool,
    seekTime: PropTypes.number,
    volume: PropTypes.number,
    muted: PropTypes.bool,
    duration: PropTypes.number,
    displayDuration: PropTypes.bool,
    invertTime: PropTypes.bool,
    toggleInvert: PropTypes.bool,
    ratio: PropTypes.string,
    clickToPlay: PropTypes.bool,
    hideControls: PropTypes.bool,
    resetOnEnd: PropTypes.bool,
    disableContextMenu: PropTypes.bool,
    loadSprite: PropTypes.bool,
    iconPrefix: PropTypes.string,
    iconUrl: PropTypes.string,
    blankVideo: PropTypes.string,
    quality: PropTypes.shape({
      default: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
      options: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]))
    }),
    loop: PropTypes.shape({
      active: PropTypes.bool
    }),
    speed: PropTypes.shape({
      selected: PropTypes.number,
      options: PropTypes.arrayOf(PropTypes.number)
    }),
    keyboard: PropTypes.shape({
      focused: PropTypes.bool,
      global: PropTypes.bool
    }),
    tooltips: PropTypes.shape({
      controls: PropTypes.bool,
      seek: PropTypes.bool
    }),
    captions: PropTypes.shape({
      active: PropTypes.bool,
      language: PropTypes.string
    }),
    fullscreen: PropTypes.shape({
      enabled: PropTypes.bool,
      fallback: PropTypes.bool,
      iosNative: PropTypes.bool
    }),
    storage: PropTypes.shape({
      enabled: PropTypes.bool,
      key: PropTypes.string
    }),
    controls: PropTypes.arrayOf(PropTypes.string),
    settings: PropTypes.arrayOf(PropTypes.string),

    poster: PropTypes.string,
    sources: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
      })
    )
  }

  getType = () => this.player && this.player.source && this.player.source.type;
  play = () => this.player && this.player.play();
  pause = () => this.player && this.player.pause();
  stop = () => this.player && this.player.stop();
  togglePlay = () => this.player && this.player.togglePlay();
  restart = () => this.player && this.player.restart();
  getCurrentTime = () => this.player && this.player.currentTime();
  getDuration = () => this.player && this.player.duration;
  getVolume = () => this.player && this.player.volume;
  isMuted = () => this.player && this.player.muted;
  isPaused = () => this.player && this.player.paused;
  toggleMute = () => this.player && this.player.toggleControls(this.player.muted);

  componentDidMount() {
    const options = Object.keys(defaultProps).reduce((acc, current) => ({
      ...acc,
      [current]: this.props[current]
    }), {});

    const selector = `.${this.props.className.replace(/ /g, '.')}`
    this.player = new plyr(selector, options);

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

      // TODO: return the time
      this.player.on('seeked', event => {
        this.props.onSeeked && this.props.onSeeked();
      });

      this.player.on('enterfullscreen', () => {
        this.props.onEnterFullscreen && this.props.onEnterFullscreen();
      });

      this.player.on('exitfullscreen', () => {
        this.props.onExitFullscreen && this.props.onExitFullscreen();
      });

      this.player.on('volumechange', () => {
        const { muted, volume } = this.player;
        this.props.onVolumeChange && this.props.onVolumeChange({ muted, volume });
      });
    }
  }

  componentWillUnmount() {
    this.player && this.player.destroy();
  }

  // For video support for plyr supported videos using videoId (Youtube and Vimeo for now).
  renderPlayerWithVideoId() {
    return (
      <div
        className={this.props.className}
        style={this.props.style}
        data-plyr-provider={this.props.type}
        data-plyr-embed-id={this.props.videoId}
      />
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
    if (this.props.type === 'audio') {
      return this.renderAudioPlayer();
    } else if (this.props.type === 'video') {
      return this.renderPlayerWithSRC();
    }

    return this.renderPlayerWithVideoId();
  }
}

export default Plyr;
