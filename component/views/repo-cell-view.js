
import React from 'react';
import {
  View, Text, Image, StyleSheet
} from 'react-native';

export default class RepoCellView extends React.Component {
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
  avatar: {
    width: 20,
    height: 20
  }
});
