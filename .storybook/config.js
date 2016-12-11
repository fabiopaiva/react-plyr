import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import { setOptions } from '@kadira/storybook-addon-options';

setAddon(infoAddon);

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
  downPanelInRight: true
});

configure(loadStories, module);
