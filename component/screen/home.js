
import React from 'react';
import {
  Text,
  Button,
  View,
  StyleSheet,
  FlatList
} from 'react-native';

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {name: 'Hoho', key: '1'},
            {name: 'Bobo', key: '2'},
            {name: 'Kiki', key: '3'},
            {name: 'Wiwi', key: '4'},
            {name: 'Cici', key: '5'}
          ]}
          renderItem={({item}) => (
            <View>
              <Text style={styles.item}>{ item.name }</Text>
              <Button
                key={item.name}
                style={styles.btn}
                title={`Go to ${item.name}'s detail page`}
                onPress={() => this.props.navigation.navigate('Details')}
              />
            </View>
          )}
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
  }
});