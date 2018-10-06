
import React from 'react';
import {
  Text,
  Button,
  View
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import HomeScreen from './screens/home';
import BGC from './common/theme';

class HomeScreenNav extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
      }}>
        <HomeScreen
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

class TrendingScreen extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class SearchScreen extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

const HomeStack = createBottomTabNavigator(
  {
    Home: HomeScreenNav,
    Trending: TrendingScreen,
    SearchScreen: SearchScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: 'Home',
  }
);

export default class Home extends React.Component {
  render() {
    return <HomeStack />;
  }
}
