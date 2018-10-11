
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import {
  TabView, TabBar
} from 'react-native-tab-view';

import RepoListView from '../views/repo-list-view';
import { BGC, SFC, FC } from '../common/theme';
import SubscribeDao from '../common/dao/subscribe-dao';
const subscribeDao = new SubscribeDao();

export default class TrendScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [{key: 'java', title: 'Java'}],
      subscribe: {java: false},
      order: ['java']
    };
  }

  _renderTabBar(props) {
    return <TabBar
      {...props}
      scrollEnabled
      style={styles.tabbar}
      indicatorStyle={styles.indicator}
    />;
  }

  _renderScene({route}) {
    return <RepoListView
      style={styles.repoTab}
      tabLabel={route}
      key={route}
    />;
  }

  async componentDidMount() {
    await this.updateSubs();
    this.props.navigation.addListener(
      'willFocus',
      () => {
        this.updateSubs();
      }
    );
  }

  async updateSubs() {
    const subscribe = await subscribeDao.getSubs();
    const order = await subscribeDao.getOrder();
    const tabs = this.fetchTabs(order);
    this.setState({
      subscribe: subscribe,
      order: order,
      routes: tabs
    });
  }

  fetchTabs(order) {
    return order.map(tab => ({
      key: tab,
      title: tab
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <TabView
          style={styles.repoList}
          navigationState={this.state}
          renderScene={this._renderScene}
          onIndexChange={index => this.setState({index})}
          initialLayout={{
            width: Dimensions.get('window').width,
            height: 300
          }}
          renderTabBar={this._renderTabBar}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: BGC
  },
  repoList: {
    marginTop: 2,
    backgroundColor: 'white'
  },
  repoTab: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)'
  },
  tabbar: {
    backgroundColor: BGC,
    color: SFC
  },
  indicator: {
    backgroundColor: FC
  }
});
