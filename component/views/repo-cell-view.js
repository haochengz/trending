
import React from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity
} from 'react-native';

import { BGC } from '../common/theme';

export default class RepoCellView extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <Text style={styles.title}>{this.props.repo.full_name}</Text>
        <Text style={styles.description}>{this.props.repo.description}</Text>
        <View style={styles.line}>
          <View style={styles.line}>
            <Text style={styles.smallword}>Author: </Text>
            <Image
              source={{uri: this.props.repo.owner.avatar_url}}
              style={styles.avatar}
            />
          </View>
          <View style={{...styles.line, ...styles.middle}}>
            <Image
              style={styles.avatar}
              source={require('../../asset/icon/iconmonstr-star-5-240.png')}
            />
            <Text style={styles.smallword}>{' ' + this.props.repo.stargazers_count}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  smallword: {
    fontSize: 13,
    color: BGC
  },
  middle: {
    justifyContent: 'center'
  },
  line: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 14
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 3,
    marginBottom: 1,
    borderWidth: 0.3,
    borderColor: BGC,
    borderRadius: 5,
    padding: 6,
    shadowColor: 'grey',
    shadowOffset: {
      width: 5, height: 5
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 2
  },
  avatar: {
    width: 18,
    height: 18
  }
});
