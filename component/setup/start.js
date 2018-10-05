
import React from 'react';

import HomeStack from '../App';

export default function start() {
  class Root extends React.Component {
    render() {
      return (
        <HomeStack />
      );
    }
  }

  return Root;
}
