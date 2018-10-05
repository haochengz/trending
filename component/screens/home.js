
import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

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
          <RepoList tabLabel="react"></RepoList>
          <RepoList tabLabel="node"></RepoList>
          <RepoList tabLabel="koa"></RepoList>
        </ScrollableTabView>
      </View>
    );
  }
}

class RepoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  generateUrl(keyword) {
    return `https://api.github.com/search/repositories?q=${keyword}&sort=stars&order=desc`;
  }

  async componentDidMount() {
    const data = await this.loadData();
    this.setState({
      data: data.items
    });
  }

  loadData() {
    let url = this.generateUrl(this.props.tabLabel);
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(resolve)
        .catch(error => reject(error));
    });
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={item => item.id}
        renderItem={({item}) => <RepoCell repo={item} />}
      />
    );
  }
}

class RepoCell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>{this.props.repo.full_name}</Text>
        <Text>{this.props.repo.description}</Text>
        <Image
          source={{uri: this.props.repo.owner.avatar_url}}
          style={styles.avatar}
        />
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
  },
  avatar: {
    width: 20,
    height: 20
  }
});
