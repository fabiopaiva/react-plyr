'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _plyr = require('plyr');

var _plyr2 = _interopRequireDefault(_plyr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Plyr = function (_Component) {
  _inherits(Plyr, _Component);

  function Plyr() {
    _classCallCheck(this, Plyr);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.getType = function () {
      return _this.player && _this.player.getType();
    };

    _this.isReady = function () {
      return _this.player && _this.player.isReady();
    };

    _this.play = function () {
      return _this.player && _this.player.play();
    };

    _this.pause = function () {
      return _this.player && _this.player.pause();
    };

    _this.stop = function () {
      return _this.player && _this.player.stop();
    };

    _this.togglePlay = function () {
      return _this.player && _this.player.togglePlay();
    };

    _this.restart = function () {
      return _this.player && _this.player.restart();
    };

    _this.getCurrentTime = function () {
      return _this.player && _this.player.getCurrentTime();
    };

    _this.getDuration = function () {
      return _this.player && _this.player.getDuration();
    };

    _this.getVolume = function () {
      return _this.player && _this.player.getVolume();
    };

    _this.isMuted = function () {
      return _this.player && _this.player.isMuted();
    };

    _this.isPaused = function () {
      return _this.player && _this.player.isPaused();
    };

    _this.toggleMute = function () {
      return _this.player && _this.player.toggleMute();
    };

    _this.player = null;
    return _this;
  }

  // Specifies the default values for props:


  Plyr.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var options = {
      enabled: this.props.enabled,
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

    this.player = _plyr2.default.setup('.react-plyr', options)[0];

    if (this.player) {
      this.player.on('ready', function () {
        _this2.props.onReady && _this2.props.onReady();
      });

      this.player.on('play', function () {
        _this2.props.onPlay && _this2.props.onPlay();
      });

      this.player.on('pause', function () {
        _this2.props.onPause && _this2.props.onPause();
      });

      this.player.on('ended', function () {
        _this2.props.onEnd && _this2.props.onEnd();
      });

      this.player.on('seeked', function (event) {
        var time = event.detail.plyr.getCurrentTime();
        _this2.props.onSeeked && _this2.props.onSeeked(time);
      });

      this.player.on('enterfullscreen', function () {
        _this2.props.onEnterFullscreen && _this2.props.onEnterFullscreen();
      });

      this.player.on('exitfullscreen', function () {
        _this2.props.onExitFullscreen && _this2.props.onExitFullscreen();
      });

      this.player.on('volumechange', function (event) {
        var isMuted = event.detail.plyr.isMuted();
        var volume = event.detail.plyr.getVolume();

        _this2.props.onVolumeChange && _this2.props.onVolumeChange({ isMuted: isMuted, volume: volume });
      });
    }
  };

  Plyr.prototype.componentWillUnmount = function componentWillUnmount() {
    this.player && this.player.destroy();
  };

  Plyr.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'react-plyr', style: this.props.style },
      _react2.default.createElement('div', {
        'data-type': this.props.type,
        'data-video-id': this.props.videoId
      })
    );
  };

  return Plyr;
}(_react.Component);

Plyr.defaultProps = {
  type: 'youtube',

  enabled: true,
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
Plyr.propTypes = {
  type: _react.PropTypes.oneOf(['youtube', 'vimeo']),
  videoId: _react.PropTypes.string.isRequired,
  onReady: _react.PropTypes.func,
  onPlay: _react.PropTypes.func,
  onPause: _react.PropTypes.func,
  onEnd: _react.PropTypes.func,
  onSeeked: _react.PropTypes.func,
  onEnterFullscreen: _react.PropTypes.func,
  onVolumeChange: _react.PropTypes.func,

  // plyr props
  enabled: _react.PropTypes.bool,
  controls: _react.PropTypes.arrayOf(_react.PropTypes.string),
  loadSprite: _react.PropTypes.bool,
  // iconUrl: PropTypes.string,
  iconPrefix: _react.PropTypes.string,
  debug: _react.PropTypes.bool,
  autoplay: _react.PropTypes.bool,
  seekTime: _react.PropTypes.number,
  volume: _react.PropTypes.number,
  clickToPlay: _react.PropTypes.bool,
  disableContextMenu: _react.PropTypes.bool,
  hideControls: _react.PropTypes.bool,
  showPosterOnEnd: _react.PropTypes.bool,
  keyboardShortcuts: _react.PropTypes.shape({
    focused: _react.PropTypes.bool,
    global: _react.PropTypes.bool
  }),
  tooltips: _react.PropTypes.shape({
    controls: _react.PropTypes.bool,
    seek: _react.PropTypes.bool
  }),
  duration: _react.PropTypes.number,
  displayDuration: _react.PropTypes.bool,
  storage: _react.PropTypes.shape({
    enabled: _react.PropTypes.bool,
    key: _react.PropTypes.string
  })
};
exports.default = Plyr;
module.exports = exports['default'];