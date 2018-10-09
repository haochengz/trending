
import {
  AsyncStorage
} from 'react-native';

export default class SubscribeDao {
  constructor() {
    this.defaultSet = {
      React: {available: true, pos: 0},
      Python: {available: true, pos: 2},
      Javascript: {available: true, pos: 1},
      Java: {available: false},
      Spring: {available: false},
      Scheme: {available: false}
    };
    this.setDefault = false;
  }

  async loadDefault() {
    try {
      const prestine = await AsyncStorage.getItem('@sub:prestine');
      if(prestine === null) {
        await AsyncStorage.setItem('@sub:set', JSON.stringify(this.defaultSet));
        this.setDefault = true;
      }
    } catch(error) {
      throw error;
    }
  }

  getDefault() {
    return this.defaultSet;
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
