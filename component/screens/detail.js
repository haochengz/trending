
import React from 'react';
import {
  Text, View, TouchableOpacity
} from 'react-native';
import {
  createStackNavigator
} from 'react-navigation';

import TagSetupPage from './options/tags';
import TagSortPage from './options/tag-sort.js';

class DetailScreen extends React.Component {

  render() {
    return (
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 22
      }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('TagSetupPage')}
        >
          <Text>Subscribe tags</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('TagSortPage')}
        >
          <Text>Sorting tags</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default createStackNavigator({
  Detail: DetailScreen,
  TagSetupPage: TagSetupPage,
  TagSortPage: TagSortPage
});
