import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Plyr from '../src';

storiesOf('React Plyr', module)
  .add('default Youtube video', () => (
    <Plyr
      type="youtube"
      videoId="CDFN1VatiJA"
    />
  ))
  .add('default Vimeo video', () => (
    <Plyr
      type="vimeo"
      videoId="https://vimeo.com/189789787"
    />
  ));
