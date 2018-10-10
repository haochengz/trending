
import React from 'react';
import {
  Text, TouchableHighlight, StyleSheet, Image, View
} from 'react-native';
import SortableListView from 'react-native-sortable-listview';

import {BGC, FC} from '../../common/theme';
import SubscribeDao from '../../common/dao/subscribe-dao';
const subscribeDao = new SubscribeDao();

class Cell extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.cell}
        underlayColor={BGC}
        key={this.props.data.name}
        {...this.props.sortHandlers}
      >
        <View style={styles.line}>
          <Image
            style={styles.pic}
            source={require('../../../asset/icon/iconmonstr-menu-1-240.png')}
          />
          <Text>{this.props.data.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class TagSortPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribe: {java: {available: false}},
      order: ['java']
    };
  }

  componentDidMount() {
    this.updateSeq();
  }

  componentWillUnmount() {
    subscribeDao.setOrder(this.state.order);
  }

  async updateSeq() {
    const subs = await subscribeDao.getSubs();
    const order = await subscribeDao.getOrder();
    this.setState({
      subscribe: subs,
      order: order
    });
  }

  onMoved(e) {
    const order = this.state.order;
    order.splice(e.to, 0, order.splice(e.from, 1)[0]);
    this.setState({
      order: order
    });
    this.forceUpdate();
  }

  render() {
    return (
      <SortableListView
        style={styles.list}
        data={this.state.subscribe}
        order={this.state.order}
        onRowMoved={this.onMoved.bind(this)}
        renderRow={row => <Cell data={row} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  cell: {
    padding: 12,
    backgroundColor: FC,
    borderBottomWidth: 1,
    borderColor: BGC
  },
  list: {
    flex: 1
  },
  pic: {
    tintColor: BGC,
    height: 20,
    width: 20,
    marginLeft: 15,
    marginRight: 25
  },
  line: {
    flexDirection: 'row'
  }
});
