import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
// import { withKnobs, text, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import './withWrapper';

import Plyr from '../../src';

const stories = storiesOf('React Plyr', module);

stories.add('Simple Youtube video', withInfo()(() =>
  <Plyr
    videoId="CDFN1VatiJA"
  />
))

stories.add('Simple Vimeo video', withInfo()(() =>
  <Plyr
    type="vimeo"
    videoId="https://vimeo.com/189789787"
  />
))

stories.add('Default video with file address', withInfo()(() =>
  <Plyr
    type="video"
    url="https://api.clipman.com/media/download?videoUrl=https%3A%2F%2Fclipman-video-server-production.s3.eu-central-1.amazonaws.com%2Fuploads%2F598205fd8f294f3b6293c41a%2Ftmp-31444wOuKCU2xG0J3.mp4&title=Clipman-funny-video"
    poster="http://wallpaperget.com/images/amazing-car-wallpapers-42.jpg"
  />
))

stories.add('Default video with multiple file addresses', withInfo()(() =>
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

stories.add('Player with autoplay and callbacks', withInfo()(() =>
  <Plyr
    videoId="M6_a2wBK-yc"
    autoplay
    onReady={action('Video is ready!')}
    onPlay={action('Play!')}
    onPause={action('Video paused')}
    onEnd={action('Video has finished!')}
    onEnterFullscreen={action('Fullscreen is enabled')}
    onExitFullscreen={action('Fullscreen is disabled')}
    onVolumeChange={action('volume changed')}
    onSeeked={action('Seeked')}
  />
))

stories.add('Audio player with url', withInfo()(() =>
  <Plyr
    type="audio"
    url="https://archive.org/download/testmp3testfile/mpthreetest.mp3"
  />
))

stories.add('Audio player with sources', withInfo()(() =>
  <Plyr
    type="audio"
    sources={
      [
        {
          src: "https://archive.org/download/testmp3testfile/mpthreetest.ogg",
          type: "audio/ogg"
        },
        {
          src: "https://archive.org/download/testmp3testfile/mpthreetest.mp3",
          type: "audio/mpeg"
        }
      ]
    }
  />
))
