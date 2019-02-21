import React, { Component } from 'react';
import PropTypes from 'prop-types';
import plyr from 'plyr';

import defaultProps from './defaultProps';

class Plyr extends Component {
  constructor() {
    super();

    this.player = null;
    this.elementRef = new React.createRef();

    this.state = {
      muted: null
    }
  }

  static getDerivedStateFromProps = nextProps => ({
    muted: nextProps.muted
  });

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
    onTimeUpdate: PropTypes.func,
    onEnterFullscreen: PropTypes.func,
    onExitFullscreen: PropTypes.func,
    onVolumeChange: PropTypes.func,
    onCaptionsEnabled: PropTypes.func,
    onCaptionsDisabled: PropTypes.func,

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
    controls: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.func,
      PropTypes.object,
      PropTypes.bool
    ]),
    settings: PropTypes.arrayOf(PropTypes.string),

    poster: PropTypes.string,
    sources: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        size: PropTypes.string
      })
    ),

    captions: PropTypes.arrayOf(
      PropTypes.shape({
        kind: PropTypes.string,
        label: PropTypes.string,
        src: PropTypes.string.isRequired,
        srclang: PropTypes.string,
        default: PropTypes.bool,
        key: PropTypes.any
      }),
    ),
  }

  getType = () => this.player && this.player.source && this.player.source.type;
  play = () => this.player && this.player.play();
  pause = () => this.player && this.player.pause();
  togglePlay = () => this.player && this.player.togglePlay();
  stop = () => this.player && this.player.stop();
  restart = () => this.player && this.player.restart();
  rewind = time => this.player && this.player.rewind(time);
  forward = time => this.player && this.player.forward(time);
  getCurrentTime = () => this.player && this.player.currentTime;
  setCurrentTime = currentTime => this.player.currentTime = currentTime;
  getDuration = () => this.player && this.player.duration;
  getVolume = () => this.player && this.player.volume;
  isMuted = () => this.player && this.player.muted;
  isPaused = () => this.player && this.player.paused;
  toggleMute = () => this.player && this.player.toggleControls(this.player.muted);
  setMuted = (muted = true) => this.player.muted = muted;
  increaseVolume = step => this.player && this.player.increaseVolume(step);
  decreaseVolume = step => this.player && this.player.decreaseVolume(step);
  setVolume = amount => this.player.volume = amount;
  enterFullscreen = () => this.player && this.player.fullscreen.enter();
  exitFullscreen = () => this.player && this.player.fullscreen.exit();
  toggleFullscreen = () => this.player && this.player.fullscreen.toggle()

  componentDidMount() {
    const defaultOptions = Object.keys(defaultProps).reduce((acc, current) => ({
      ...acc,
      [current]: this.props[current]
    }), {});

    const options = {
      ...defaultOptions,
      muted: this.state.muted
    };

    const node = this.elementRef.current;
    this.player = node && node.classList.contains(this.props.className) ? new plyr(node, options) : null;

    if (this.player) {
      this.player.on('ready', () => {
        this.props.onReady && this.props.onReady(this.player);
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

      this.player.on('seeked', () => {
        const time = this.getCurrentTime();
        this.props.onSeeked && this.props.onSeeked(time);
      });

      this.player.on('timeupdate', () => {
        const time = this.getCurrentTime();
        this.props.onTimeUpdate && this.props.onTimeUpdate(time);
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

      this.player.on('captionsenabled', () => {
        this.props.onCaptionsEnabled && this.props.onCaptionsEnabled();
      });

      this.player.on('captionsdisabled', () => {
        this.props.onCaptionsDisabled && this.props.onCaptionsDisabled();
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.muted !== this.props.muted) {
      this.player.muted = this.props.muted;
    }

    if (prevProps.videoId !== this.props.videoId) {
      this.props.videoId && this.updateVideoSource(this.props.videoId, this.props.provider);
    }
  }

  componentWillUnmount() {
    this.player && this.player.destroy();
  }

  updateVideoSource = (videoId, provider) => {
    this.player.source = {
      type: 'video',
      sources: [{
        src: videoId,
        provider,
      }],
    };
  }

  updateHtmlVideoSource = (videoUrl, type, title, poster, tracks) => {
    this.player.source = {
      type,
      title,
      sources: [
        {
          src: videoUrl,
          type: 'video/mp4',
        }
      ],
      poster,
      tracks
    };
  }

  // For video support for plyr supported videos using videoId (Youtube and Vimeo for now).
  renderPlayerWithVideoId() {
    return (
      <div
        className={this.props.className}
        style={this.props.style}
        data-plyr-provider={this.props.type}
        data-plyr-embed-id={this.props.videoId}
        ref={this.elementRef}
      />
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
      captions
    } = this.props;

    const captionsMap = captions.map((source,index)=>{
      const {key, kind, label, src, srclang, default: def, ...attributes} = source;
      return (<track
        key={key || index}
        kind={kind || "captions"}
        label={label}
        src={src}
        srclang={srclang}
        default={def}
        {...attributes}
        ref={this.elementRef}
      />);
    });

    if (sources && Array.isArray(sources) && sources.length) {
      return (
        <video
          className={className}
          preload={preload}
          poster={poster}
          ref={this.elementRef}
        >
          {sources.map((source, index) =>
            <source
              key={index}
              src={source.src}
              type={source.type}
              size={source.size && source.size}
            />
          )}
          {captionsMap}
        </video>
      )
    }

    return (
      <video
        className={className}
        src={url}
        preload={preload}
        poster={poster}
        ref={this.elementRef}
      >
      {captionsMap}
      </video>
    );
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
          ref={this.elementRef}
        >
          {sources.map((source, index) =>
            <source key={index} src={source.src} type={source.type} />
          )}
        </audio>
      )
    }

    return (
      <audio
        className={className}
        preload={preload}
        src={url}
        ref={this.elementRef}
      />
    )
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
