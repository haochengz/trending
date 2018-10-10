
import {
  AsyncStorage
} from 'react-native';

export default class SubscribeDao {
  constructor() {
    this.defaultSet = {
      React: {name: 'React', available: true, pos: 0},
      Python: {name: 'Python', available: true, pos: 2},
      Javascript: {name: 'Javascript', available: true, pos: 1},
      Java: {name: 'Java', available: false},
      Spring: {name: 'Spring', available: false},
      Scheme: {name: 'Scheme', available: false}
    };
    this.order = [
      'React', 'Javascript', 'Python'
    ];
    this.setDefault = false;
  }

  async loadDefault() {
    try {
      const prestine = await AsyncStorage.getItem('@sub:prestine');
      if(prestine === null) {
        await AsyncStorage.setItem('@sub:set', JSON.stringify(this.defaultSet));
        await AsyncStorage.setItem('@sub:order', JSON.stringify(this.order));
        this.setDefault = true;
      }
    } catch(error) {
      throw error;
    }
  }

  getDefault() {
    return this.defaultSet;
  }

  async getOrder() {
    if(false === this.setDefault) {
      await this.loadDefault();
    }
    const result = await AsyncStorage.getItem('@sub:order');
    return JSON.parse(result);
  }

  async setOrder(order) {
    await AsyncStorage.setItem('@sub:order', JSON.stringify(order));
    await AsyncStorage.setItem('@sub:prestine', JSON.stringify(false));
  }

  async getSubs() {
    if(false === this.setDefault) {
      await this.loadDefault();
    }
    const result = await AsyncStorage.getItem('@sub:set');
    return JSON.parse(result);
  }

  async setSubs(subs) {
    await AsyncStorage.setItem('@sub:set', JSON.stringify(subs));
    await AsyncStorage.setItem('@sub:prestine', JSON.stringify(false));
  }
}
