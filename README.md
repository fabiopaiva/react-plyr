# ReactPlyr Video Component

[![npm](https://img.shields.io/npm/dt/react-plyr.svg)](https://www.npmjs.com/package/react-plyr)
[![npm](https://img.shields.io/npm/v/react-plyr.svg)](https://www.npmjs.com/package/react-plyr)
[![David](https://img.shields.io/david/xDae/react-plyr.svg)](https://david-dm.org/xDae/react-plyr)
[![Travis](https://img.shields.io/travis/xDae/react-plyr.svg)](https://travis-ci.org/xDae/react-plyr)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

A React video component based on Plyr.

![react-plyr ](screenshot.png "react-plyr")

## Installation

Add `react-plyr` into your package.json dependencies:

```sh
npm install react-plyr --save
```

## Usage

```javascript
import Plyr from 'react-plyr';

// add the component in the render function
render() {
  return (
    <Plyr
      type="youtube"
      videoId="CDFN1VatiJA"
    />
  )
}
```

## Props

|Name|Type|Required|Default|
|----|----|----|----|
|type|`oneOf('youtube','vimeo','video','audio')`||`'youtube'`|
|className|`string`||`'react-plyr'`|
|videoId|`string`|||
|url|`string`|||
|poster|`string`|||
|sources|`arrayOf`|||
|onReady|`func`|||
|onPlay|`func`|||
|onPause|`func`|||
|onEnd|`func`|||
|onLoadedData|`func`|||
|onSeeked|`func`|||
|onEnterFullscreen|`func`|||
|onVolumeChange|`func`|||
|enabled|`bool`||☑️`true `|
|controls|`arrayOf`||`['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen']`|
|loadSprite|`bool`||☑️`true `|
|iconUrl|`string`||`null`|
|iconPrefix|`string`||`'plyr'`|
|debug|`bool`||`false`|
|autoplay|`bool`||`false`|
|preload|`string`|||
|seekTime|`number`||`10`|
|volume|`number`||`5`|
|clickToPlay|`bool`||☑️`true `|
|disableContextMenu|`bool`||☑️`true `|
|hideControls|`bool`||☑️`true `|
|showPosterOnEnd|`bool`||`false`|
|keyboardShortcuts|`shape`||`{  focused: true,  global: false}`|
|tooltips|`shape`||`{  controls: false,  seek: true}`|
|duration|`number`||`null`|
|displayDuration|`bool`||☑️`true `|
|storage|`shape`||`{  enabled: true,  key: 'plyr_volume'}`|

## Support

Please [open an issue](https://github.com/xDae/react-plyr/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/xDae/react-plyr/compare/).
