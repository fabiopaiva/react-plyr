import React, { Component } from 'react';

import ReactPlyr from './ReactPlyr';
import PlyrYoutube from './PlyrYoutube';

class App extends Component {
  render() {
    return (
      <div className="container">
        {/* <ReactPlyr /> */}

        <PlyrYoutube
          videoId="bTqVqk7FSmY"
          controls={['play', 'progress']}
        />
      </div>
    );
  }
}

export default App;
