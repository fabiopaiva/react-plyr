import React from 'react';
import { storiesOf } from '@kadira/storybook';

import ReactPlyr from '../src/ReactPlyr';

storiesOf('React Plyr', module)
  .add('default Youtube video', () => (
    <ReactPlyr
      type="youtube"
      videoId="CDFN1VatiJA"
    />
  ))
  .add('default Vimeo video', () => (
    <ReactPlyr
      type="vimeo"
      videoId="https://vimeo.com/189789787"
    />
  ));
