import { configure } from '@kadira/storybook';
import { setOptions } from '@kadira/storybook-addon-options';

function loadStories() {
  require('../stories');
}

setOptions({
  name: 'React Plyr',
  url: 'https://github.com/xDae/react-plyr#readme',
  // goFullScreen: false,
  // showLeftPanel: false,
  // showDownPanel: false,
  // showSearchBox: false,
  downPanelInRight: true,
});

configure(loadStories, module);
