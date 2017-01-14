import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Plyr from '../src';

storiesOf('React Plyr', module)
  .addWithInfo('Default Youtube video', () => (
    <Plyr
      videoId="CDFN1VatiJA"
    />
  ))
  .addWithInfo('Default Vimeo video', () => (
    <Plyr
      type="vimeo"
      videoId="https://vimeo.com/189789787"
    />
  ))
  .addWithInfo('Player with autoplay and callbacks', () => (
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
