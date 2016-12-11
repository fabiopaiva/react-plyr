import React from 'react';
import { shallow } from 'enzyme';
import Plyr from './index';

it('renders a simple Youtube Video', () => {
  const wrapper = shallow(
    <Plyr
      type="youtube"
      videoId="CDFN1VatiJA"
    />
  );
  expect(wrapper).toMatchSnapshot();
});

it('renders a simple Vimeo Video', () => {
  const wrapper = shallow(
    <Plyr
      type="vimeo"
      videoId="https://vimeo.com/189789787"
    />
  );
  expect(wrapper).toMatchSnapshot();
});
