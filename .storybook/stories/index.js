import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import { withKnobs, text, number, select } from '@kadira/storybook-addon-knobs';
import withWrapper from './withWrapper'

import Plyr from '../../src';

const stories = storiesOf('React Plyr', module);
stories.addDecorator(withKnobs);

stories.addWithInfo('Default Youtube video', () => (
  <Plyr
    videoId="CDFN1VatiJA"
  />
))

stories.addWithInfo('Default video with file address', () => (
  <Plyr
    type="video"
    url="https://api.clipman.com/media/download?videoUrl=https%3A%2F%2Fclipman-video-server-production.s3.eu-central-1.amazonaws.com%2Fuploads%2F598205fd8f294f3b6293c41a%2Ftmp-31444wOuKCU2xG0J3.mp4&title=Clipman-funny-video"
    poster="http://wallpaperget.com/images/amazing-car-wallpapers-42.jpg"
  />
))

stories.addWithInfo('Default video with multiple file addresses', () => (
  <Plyr
    type="video"
    sources={
      [
        {
          src: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
          type: 'video/mp4'
        },
        {
          src: 'http://clips.vorwaerts-gmbh.de/VfE.ogv',
          type: 'video/ogg'
        },
        {
          src: 'http://clips.vorwaerts-gmbh.de/VfE.webm',
          type: 'video/webm'
        }
      ]
    }
  />
))

stories.addWithInfo('Default Vimeo video', () => (
  <Plyr
    type="vimeo"
    videoId="https://vimeo.com/189789787"
  />
))
stories.addWithInfo('Player with autoplay and callbacks', () => (
  <Plyr
    videoId="MM0XgD89Tr8"
    autoplay
    onReady={console.log('Is Ready!')}
    onPlay={() => console.log('Play!')}
    onPause={() => console.log('Paused!')}
    onEnd={() => console.log('Video has finished!')}
    onEnterFullscreen={() => console.log('Fullscreen is enabled')}
    onExitFullscreen={() => console.log('Fullscreen is disabled')}
    onVolumeChange={volume => console.log('volume changed', volume)}
    onSeeked={time => console.log('seeked!', time)}
  />
));
