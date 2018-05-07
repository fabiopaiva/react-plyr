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

stories.add('Video with Settings & Controls', withInfo()(() =>
  <Plyr
    videoId="https://youtube.com/watch?v=bTqVqk7FSmY"
    controls={[
      'play-large', // The large play button in the center
      'restart', // Restart playback
      'rewind', // Rewind by the seek time (default 10 seconds)
      'play', // Play/pause playback
      'fast-forward', // Fast forward by the seek time (default 10 seconds)
      'progress', // The progress bar and scrubber for playback and buffering
      'current-time', // The current time of playback
      'duration', // The full duration of the media
      'mute', // Toggle mute
      'volume', // Volume control
      'captions', // Toggle captions
      'settings', // Settings menu
      'pip', // Picture-in-picture (currently Safari only)
      'airplay', // Airplay (currently Safari only)
      'fullscreen', // Toggle fullscreen
    ]}
    debug
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
    volume={0.4}
    autoplay
    onReady={action('Video is ready!')}
    onPlay={action('Play!')}
    onPause={action('Video is paused')}
    onEnd={action('Video has finished!')}
    onEnterFullscreen={action('Fullscreen is enabled')}
    onExitFullscreen={action('Fullscreen is disabled')}
    onVolumeChange={action('Volume changed')}
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
