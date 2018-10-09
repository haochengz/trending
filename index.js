/** @format */

import {AppRegistry} from 'react-native';
import getApp from './component/setup/start';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => getApp());
