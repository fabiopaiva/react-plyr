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
