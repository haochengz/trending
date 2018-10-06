
import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import RepoListView from '../views/repo-list-view';

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
        <ScrollableTabView>
          <RepoListView tabLabel="react"></RepoListView>
          <RepoListView tabLabel="node"></RepoListView>
          <RepoListView tabLabel="koa"></RepoListView>
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    paddingLeft: 5,
    paddingRight: 5
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  btn: {
    fontSize: 14
  }
});
