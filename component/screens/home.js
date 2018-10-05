
import React from 'react';
import {
  Text,
  Button,
  View,
  StyleSheet,
  FlatList
} from 'react-native';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: 'un-defined'
      }
    };
  }

  async onLoad() {
    const data = await fetch('http://rap2api.taobao.org/app/mock/86719/exam/object');
    const result = data.json()
    console.log(result, result.name)
    this.setState({
      data: {...data.data}
    });
  }

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
              <Text style={styles.item}
                onPress={() => this.onLoad()}
              >
                {this.state.data.name}
              </Text>
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
