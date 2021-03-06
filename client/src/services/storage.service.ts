class StorageService {
  static addUsername(username: string): void {
    const data = window.localStorage.getItem('v1');
    if(!data) {
      window.localStorage.setItem('v1', JSON.stringify([ username ]));
    } else {
      const names: Array<string> = JSON.parse(data);
      if(!names.includes(username)) {
        names.push(username);
      }
      window.localStorage.setItem('v1', JSON.stringify(names));
    }
  }
  
  static editUsername(oldUsername: string, newUsername: string): void {
    const data = window.localStorage.getItem('v1');
    if(!data) {
      window.localStorage.setItem('v1', JSON.stringify([ newUsername ]));
    } else {
      let names: Array<string> = JSON.parse(data);
      const index = names.indexOf(oldUsername);
      if(index != -1) {
        names[index] = newUsername;
      } else {
        names.push(newUsername);
      }
      window.localStorage.setItem('v1', JSON.stringify(names));
    }
  }

  static removeUsername(username: string): void {
    const data = window.localStorage.getItem('v1');
    if(data) {
      let names: Array<string> = JSON.parse(data);
      names = names.filter(name => name != username);
      window.localStorage.setItem('v1', JSON.stringify(names));
    } else {
      window.localStorage.setItem('v1', JSON.stringify([]));
    }
  }
}

export default StorageService;
