
import React from 'react';
import {
  Text,
  Button,
  Image,
  View
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import TrendScreen from './screens/trend';
import {BGC, FC, SFC} from './common/theme';

class HomeScreenNav extends React.Component {
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

class TrendingScreen extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
      }}>
        <TrendScreen
          navigation={this.props.navigation}
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
    Home: {
      screen: HomeScreenNav,
      navigationOptions: screenNavigationOptions('HOME',
        require('../asset/icon/iconmonstr-home-6-240.png'),
        require('../asset/icon/iconmonstr-home-7-240.png'))
    },
    Trending: {
      screen: TrendingScreen,
      navigationOptions: screenNavigationOptions('TREND',
        require('../asset/icon/iconmonstr-whats-hot-1-240.png'),
        require('../asset/icon/iconmonstr-whats-hot-2-240.png'))
    },
    SearchScreen: {
      screen: SearchScreen,
      navigationOptions: screenNavigationOptions('FAVORITE',
        require('../asset/icon/iconmonstr-star-3-240.png'),
        require('../asset/icon/iconmonstr-star-5-240.png'))
    },
    Details: {
      screen: DetailsScreen,
      navigationOptions: screenNavigationOptions('DETAIL',
        require('../asset/icon/iconmonstr-menu-5-240.png'),
        require('../asset/icon/iconmonstr-menu-6-240.png'))
    }
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: BGC,
      inactiveTintColor: SFC,
      activeBackgroundColor: FC,
      inactiveBackgroundColor: FC
    }
  }
);

function screenNavigationOptions(title, focused_icon, unfocused_icon) {
  return function() {
    return {
      title: title,
      tabBarIcon: ({focused, tintColor}) => (
        focused ? <Image
          source={focused_icon}
          resizeMode="contain"
          style={{
            width: 23,
            height: 23,
            tintColor: tintColor
          }}
        />
          :
          <Image
            source={unfocused_icon}
            resizeMode="contain"
            style={{
              width: 23,
              height: 23,
              tintColor: tintColor
            }}
          />
      )
    };
  };
}

export default class Home extends React.Component {
  render() {
    return <HomeStack />;
  }
}
