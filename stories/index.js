import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import ReactPlyr from '../src/ReactPlyr';

storiesOf('React Plyr', module)
  .addWithInfo('default Youtube video', () => (
    <ReactPlyr
      type="youtube"
      videoId="CDFN1VatiJA"
    />
  ))
  .addWithInfo('default Vimeo video', () => (
    <ReactPlyr
      type="vimeo"
      videoId="https://vimeo.com/189789787"
    />
  ));
