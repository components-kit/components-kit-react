import Button from './components/button';

import { lilconfigSync } from 'lilconfig';

const configSync = lilconfigSync('package.json', {
  searchPlaces: ['package.json'],
});

const config = configSync.search();

console.log(config);

export { Button };
