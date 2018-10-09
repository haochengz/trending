
import {
  AsyncStorage
} from 'react-native';

export default class TagDao {
  constructor() {
    this.defaultSet = [
      {title: 'languages', data: ['Java', 'Javascript', 'Python']},
      {title: 'frameworks', data: ['Spring', 'Angular', 'Django', 'React']},
      {title: 'tools', data: ['Atom', 'Git', 'Sublime']}
    ];
    this.setDefault = false;
  }

  async loadDefault() {
    try {
      const prestine = await AsyncStorage.getItem('@tag:prestine');
      if(prestine === null) {
        await AsyncStorage.setItem('@tag:set', JSON.stringify(this.defaultSet));
        this.setDefault = true;
      }
    } catch(error) {
      throw error;
    }
  }

  getDefault() {
    return this.defaultSet;
  }

  async getTags() {
    if(false === this.setDefault) {
      await this.loadDefault();
    }
    const result = await AsyncStorage.getItem('@tag:set');
    return JSON.parse(result);
  }

  async setTags(tags) {
    await AsyncStorage.setItem('@tag:set', JSON.stringify(tags));
  }

  // async addTag(tag, section){}

  // async removeTag(tag, section) {}

  // async addSection(section) {}

  // async removeSection(section) {}
}
