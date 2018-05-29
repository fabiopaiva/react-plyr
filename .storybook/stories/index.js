import React, { Component, Fragment } from 'react';
import { storiesOf } from '@storybook/react';
// import { withKnobs, text, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import './withWrapper';
import './updateVideoSource';

import Plyr from '../../src';

const stories = storiesOf('React Plyr', module);

stories.add('Simple Youtube video', withInfo()(() =>
  <Plyr videoId="CDFN1VatiJA" debug />
))

stories.add('Video with all Controls', withInfo()(() =>
  <Plyr
    videoId="bTqVqk7FSmY"
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
    url="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
    title="View From A Blue Moon"
    poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
  />
))

stories.add('Default video with multiple file addresses', withInfo()(() =>
  <Plyr
    type="video"
    title="View From A Blue Moon"
    poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
    sources={[
      {
        src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
        type: 'video/mp4',
        size: 576,
      },
      {
        src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
        type: 'video/mp4',
        size: 720,
      },
      {
        src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
        type: 'video/mp4',
        size: 1080,
      },
      {
        src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1440p.mp4',
        type: 'video/mp4',
        size: 1440,
      },
    ]}
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
    sources={[
      {
        src: "https://archive.org/download/testmp3testfile/mpthreetest.ogg",
        type: "audio/ogg"
      },
      {
        src: "https://archive.org/download/testmp3testfile/mpthreetest.mp3",
        type: "audio/mpeg"
      }
    ]}
  />
))

stories.add('Multiple players on same page', withInfo()(() => (
  <Fragment>
    {[
      "https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4",
      "https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4",
      "https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4"
    ].map((video, index) => (
      <div key={index} style={{ width: 540 }}>
        <Plyr
          url={video}
          type="video"
          className={`react-plyr-${index}`}
        />
      </div>
    ))}
  </Fragment>
)))
