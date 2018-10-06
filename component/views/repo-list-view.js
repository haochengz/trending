
import React from 'react';
import {
  FlatList
} from 'react-native';

import RepoCellView from './repo-cell-view';

export default class RepoListView extends React.Component {
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
        keyExtractor={item => item.clone_url}
        renderItem={({item}) => <RepoCellView repo={item} />}
      />
    );
  }
}
