
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
    this.dataSet = [];
    this.sychronized = false;
    this.STORE = '@tag:set';
    this.PRESTINE = '@tag:prestine';
  }

  save() {
    AsyncStorage.setItem(this.STORE, JSON.stringify(this.dataSet));
  }

  async load() {
    const data = await AsyncStorage.getItem(this.STORE);
    const result = JSON.parse(data);
    this.dataSet = result;
    return result;
  }

  async loadDefault() {
    try {
      const prestine = await AsyncStorage.getItem('@tag:prestine');
      if(prestine === null || prestine === true) {
        this.dataSet = this.defaultSet;
        await this.save();
        await AsyncStorage.setItem(this.PRESTINE, JSON.stringify(false));
      }
    } catch(error) {
      throw error;
    }
  }

  async reset() {
    await AsyncStorage.setItem('@tag:prestine', JSON.stringify(true));
    await this.loadDefault();
  }

  getDefault() {
    // TODO: delete this function
    return this.defaultSet;
  }

  async getTags() {
    // TODO: should be delete
    await this.loadDefault();
    const result = await AsyncStorage.getItem('@tag:set');
    return JSON.parse(result);
  }

  async setTags(tags) {
    // TODO: should be delete
    await AsyncStorage.setItem('@tag:set', JSON.stringify(tags));
  }

  getSections() {
    return this.dataSet.map(item => item.title);
  }

  addSection() {
    AsyncStorage.setItem('@');
  }

  // async addTag(tag, section){}

  // async removeTag(tag, section) {}

  // async addSection(section) {}

  // async removeSection(section) {}
}
