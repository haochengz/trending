
import React from 'react';
import {
  Text, View, SectionList, StyleSheet, Switch
} from 'react-native';

import {BGC} from '../../common/theme';
import TagDao from '../../common/dao/tag-dao';
const tagDao = new TagDao();
import SubscribeDao from '../../common/dao/subscribe-dao';
const subscribeDao = new SubscribeDao();

export default class TagSetupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: tagDao.getDefault(),
      subscribes: subscribeDao.getDefault()
    };
  }

  async componentDidMount() {
    const sections = await tagDao.getTags();
    const subscribes = await subscribeDao.getSubs();
    this.setState({
      sections: sections,
      subscribes: subscribes
    });
  }

  componentWillUnmount() {
    subscribeDao.setSubs(this.state.subscribes);
  }

  toggleItem(item, v) {
    const subs = this.state.subscribes;
    if(!subs[item]) {
      subs[item] = {available: false};
    }
    subs[item].available = v;
    subs[item].pos = 0;
    this.setState({
      subscribes: subs
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={this.state.sections}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item}</Text>
              <View style={styles.itemSwitch}>
                <Switch
                  value={this.state.subscribes[item] && this.state.subscribes[item].available}
                  onValueChange={this.toggleItem.bind(this, item)}
                />
              </View>
            </View>
          )}
          renderSectionHeader={({section}) => <Text
            style={styles.header}
          >{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: 'white'
  },
  header: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'grey'
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  itemText: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: BGC
  },
  itemSwitch: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
});
