
import { AsyncStorage } from 'react-native';
import TagDao from './tag-dao';

jest.mock('react-native', () => ({
  AsyncStorage: {
    getItem: jest.fn(),
    setItem: jest.fn()
  }
}));

let data = null;

beforeEach(() => {
  data = new TagDao();
  AsyncStorage.getItem.mockReset();
  AsyncStorage.setItem.mockReset();
});

describe('TagDao', () => {
  it('should pass this canary test', () => {
    expect(true).toBe(true);
  });

  it('should set to un-sychronized status once the dao have been created', () => {
    new TagDao();
    expect(data.sychronized).toBe(false);
  });
});

describe('save()', () => {
  it('should save cache data to local storage', () => {
    data.save();
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  it('should calls the setItem by a stringify cache object', () => {
    const _doc = [
      {title: 'language', data: ['java', 'javascript', 'scheme']}
    ];
    data.dataSet = _doc;
    data.save();
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('@tag:set', JSON.stringify(_doc));
  });
});

describe('load()', () => {
  it('should fetch the data from local storage', () => {
    data.load();
    expect(AsyncStorage.getItem).toHaveBeenCalled();
  });

  it('should update the dataSet by localstorage data', async done => {
    const _doc = [
      {title: 'language', data: ['java', 'javascript', 'scheme']}
    ];
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(_doc));
    await data.load();
    expect(data.dataSet).toEqual(_doc);
    done();
  });

  it('should returns the data loaded from local storage', async done => {
    const _doc = [
      {title: 'language', data: ['java', 'javascript', 'scheme']}
    ];
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(_doc));
    const returnValue = await data.load();
    expect(returnValue).toEqual(_doc);
    done();

  });
});

describe('loadDefault()', () => {
  it('should load the default value from local storage for new installed', async done => {
    AsyncStorage.getItem.mockResolvedValue(null);
    await data.loadDefault();
    expect(data.dataSet[1].data[1]).toBe('Angular');
    done();
  });

  it('should load the default value from local storage for reset to new', async done => {
    AsyncStorage.getItem.mockResolvedValue(true);
    await data.loadDefault();
    expect(data.dataSet[1].data[1]).toBe('Angular');
    done();
  });

  it('should do nothing if the app is not a newly installed', async done => {
    AsyncStorage.getItem.mockResolvedValue(false);
    const before = data.dataSet;
    await data.loadDefault();
    const after = data.dataSet;
    expect(before).toBe(after);
    done();
  });
});

describe('reset()', () => {
  it('should discard the data and reset to default', async done => {
    const _doc = [
      {title: 'language', data: ['java', 'javascript', 'scheme']}
    ];
    AsyncStorage.getItem.mockResolvedValue(true);
    data.dataSet = _doc;
    await data.reset();
    expect(data.dataSet[1].data[1]).toBe('Angular');
    done();
  });
});

describe('getSections()', () => {
  it.skip('should returns an array with all sections', () => {
    const sections = data.getSections();
    expect(sections).toHaveLength(3);
  });
});

describe('add sections', () => {
  it('should calls the setItem to save it locally', () => {
    data.addSection('os');
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });
});
