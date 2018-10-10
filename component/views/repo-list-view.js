
import React from 'react';
import {
  FlatList,
} from 'react-native';

import RepoCellView from './repo-cell-view';

export default class RepoListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: false
    };
  }

  generateUrl(keyword) {
    return `https://api.github.com/search/repositories?q=${keyword}&sort=stars&order=desc`;
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  componentDidMount() {
    this.refresh();
  }

  loadData() {
    let url = this.generateUrl(this.props.tabLabel);
    this.setState({
      refreshing: true
    });
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
        .catch(error => {
          this.setState({
            refreshing: false
          });
          reject(error);
        });
    });
  }

  async refresh() {
    const data = await this.loadData();
    !this.isCancelled && this.setState({
      data: data.items,
      refreshing: false
    });
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={item => item.clone_url}
        renderItem={({item}) => <RepoCellView repo={item} />}
        refreshing={this.state.refreshing}
        onRefresh={() => this.refresh()}
      />
    );
  }
}
