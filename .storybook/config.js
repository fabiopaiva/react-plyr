import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import { setOptions } from '@kadira/storybook-addon-options';

setAddon(infoAddon);

setOptions({
  name: 'React Plyr',
  url: 'https://github.com/xDae/react-plyr#readme',
  // goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  // showSearchBox: false,
  downPanelInRight: true
});

configure(() => require('./stories'), module);
