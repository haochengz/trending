
import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import RepoListView from '../views/repo-list-view';
import { BGC, SFC, FC } from '../common/theme';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: 'un-defined'
      }
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          style={styles.repoList}
          initialPage={1}
          tabBarBackgroundColor={BGC}
          tabBarActiveTextColor={FC}
          tabBarInactiveTextColor={SFC}
          tabBarUnderlineStyle={{backgroundColor: FC}}
        >
          <RepoListView style={styles.repoTab} tabLabel="react"></RepoListView>
          <RepoListView style={styles.repoTab} tabLabel="node"></RepoListView>
          <RepoListView style={styles.repoTab} tabLabel="koa"></RepoListView>
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
