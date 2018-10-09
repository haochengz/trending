
import React from 'react';
import {
  Text, View, SectionList, StyleSheet, Switch
} from 'react-native';

import TagDao from '../../common/dao/tag-dao';
const tagDao = new TagDao();

export default class TagSetupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionLoad: false,
      sections: tagDao.getDefault()
    };
  }

  async componentDidMount() {
    const sections = await tagDao.getTags();
    this.setState({
      sections: sections,
      sectionLoad: true
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
                <Switch />
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
    height: 44
  },
  itemSwitch: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
});
