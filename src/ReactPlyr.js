import React, { Component } from 'react';
import plyr from 'plyr';
import '../node_modules/plyr/dist/plyr.css';

class ReactPlyr extends Component {
  componentDidMount() {
    plyr.setup();
  }

  render() {
    return (
      <video poster="https://cdn.selz.com/plyr/1.5/View_From_A_Blue_Moon_Trailer-HD.jpg" controls crossOrigin>
        <source src="https://cdn.selz.com/plyr/1.5/View_From_A_Blue_Moon_Trailer-HD.mp4" type="video/mp4" />
        <source src="https://cdn.selz.com/plyr/1.5/View_From_A_Blue_Moon_Trailer-HD.webm" type="video/webm" />

        <track kind="captions" label="English" srcLang="en" src="https://cdn.selz.com/plyr/1.5/View_From_A_Blue_Moon_Trailer-HD.en.vtt" default />
      </video>
    );
  }
}

export default ReactPlyr;
