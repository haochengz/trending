
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import RepoListView from '../views/repo-list-view';
import { BGC, SFC, FC } from '../common/theme';
import SubscribeDao from '../common/dao/subscribe-dao';
const subscribeDao = new SubscribeDao();

export default class TrendScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: 'un-defined'
      },
      subscribe: {java: false}
    };
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
    this.setState({
      subscribe: subscribe
    });
  }

  fetchTabs() {
    const tabs = [];
    for(let tab in this.state.subscribe) {
      if(this.state.subscribe[tab]) {
        tabs.push(<RepoListView style={styles.repoTab} tabLabel={tab} key={tab}/>);
      }
    }
    return tabs;
  }

  render() {
    const tabs = this.fetchTabs();
    return (
      <View style={styles.container}>
        <ScrollableTabView
          style={styles.repoList}
          locked={false}
          tabBarPosition={'top'}
          initialPage={0}
          tabBarBackgroundColor={BGC}
          tabBarActiveTextColor={FC}
          tabBarInactiveTextColor={SFC}
          tabBarUnderlineStyle={{backgroundColor: FC}}
          tabBarTextStyle={{
            fontSize: 18
          }}
        >
          {tabs.length > 0 ? tabs : <Text tabLabel=""></Text>}
        </ScrollableTabView>
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
  }
});
