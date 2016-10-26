import React, { Component } from 'react';

import ReactPlyr from './ReactPlyr';
import PlyrYoutube from './PlyrYoutube';

class App extends Component {
  render() {
    return (
      <div className="container">
        {/* <ReactPlyr /> */}

        <PlyrYoutube
          enabled
          videoId="bTqVqk7FSmY" />
      </div>
    );
  }
}

export default App;
