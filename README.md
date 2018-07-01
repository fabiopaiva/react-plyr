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

### CSS

Include the `plyr.css` stylsheet into your `<head>`

```html
<link rel="stylesheet" href="path/to/plyr.css">
```

If you want to use our CDN (provided by [Fastly](https://www.fastly.com/)) for the default CSS, you can use the following:

```html
<link rel="stylesheet" href="https://cdn.plyr.io/3.3.21/plyr.css">
```

## Usage

### Simple Youtube or Vimeo video
```javascript
import Plyr from 'react-plyr';

// add the component in the render function
render() {
  return (
    <Plyr
      type="youtube" // or "vimeo"
      videoId="CDFN1VatiJA"
    />
  )
}
```
Note: The ``videoId`` can either be the video ID or URL for the media.

## Props
[WIP]

## Support

Please [open an issue](https://github.com/xDae/react-plyr/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/xDae/react-plyr/compare/).
