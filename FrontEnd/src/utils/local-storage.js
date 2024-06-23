class LocalStorage {
    _key = "";
  
    constructor(key) {
      this._key = key;
    }
  
    get() {
      const data = localStorage.getItem(this._key);
  
      if (!data) {
        return JSON.parse(data);
      }
  
      return data;
    }
  
    set(data) {
      localStorage.setItem(this._key, data);
    }
  
    remove() {
      localStorage.removeItem(this._key);
    }
  }
  
  export default LocalStorage;