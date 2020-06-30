
class database {

  constructor() {
    this.connectDb();
  }

  async connectDb() {
    this.localdb = window.indexedDB.open('butterflyEffect', 1);
    this.localdb.onupgradeneeded = async (e) => {
      let objectStore;
      this.localdb = e.target.result;
      objectStore = this.localdb.createObjectStore('attempts', { keyPath: 'id' });
      objectStore = this.localdb.createObjectStore('generalFigure', { keyPath: 'id' });
      objectStore = this.localdb.createObjectStore('figure', { keyPath: 'id' });
      objectStore = this.localdb.createObjectStore('figureCircle', { keyPath: 'id' });
      objectStore = this.localdb.createObjectStore('figureCircleBordered', { keyPath: 'id' });
      objectStore = this.localdb.createObjectStore('figureEllipse', { keyPath: 'id' });
      objectStore = this.localdb.createObjectStore('figureEllipseInclined', { keyPath: 'id' });
      objectStore = this.localdb.createObjectStore('figureEllipseBordered', { keyPath: 'id' });
      objectStore = this.localdb.createObjectStore('figureEllipseInclinedBordered', { keyPath: 'id' });
    };
    this.localdb.onsuccess = async (e) => {
      if (this.localdb.constructor.name == 'IDBOpenDBRequest') {
        this.localdb = this.localdb.result;
      }
      this.ready = true;
    };
  }

  async clear() {
    return this.delayWrapper(async (resolve, reject) => {
      await this.localdb.transaction(['generalFigure'], 'readwrite').objectStore('generalFigure').clear();
      await this.localdb.transaction(['figure'], 'readwrite').objectStore('figure').clear();
      await this.localdb.transaction(['figureCircle'], 'readwrite').objectStore('figureCircle').clear();
      await this.localdb.transaction(['figureCircleBordered'], 'readwrite').objectStore('figureCircleBordered').clear();
      await this.localdb.transaction(['figureEllipse'], 'readwrite').objectStore('figureEllipse').clear();
      await this.localdb.transaction(['figureEllipseInclined'], 'readwrite').objectStore('figureEllipseInclined').clear();
      await this.localdb.transaction(['figureEllipseBordered'], 'readwrite').objectStore('figureEllipseBordered').clear();
      await this.localdb.transaction(['figureEllipseInclinedBordered'], 'readwrite').objectStore('figureEllipseInclinedBordered').clear();
      resolve();
    });
  }

  async delayWrapper(callback) {
    return new Promise((resolve, reject) => {
      return setTimeout(() => {
        callback(resolve, reject);
      }, (this.ready) ? 0 : 100);
    });
  }

  async write(figure) {
    return this.delayWrapper(async (resolve, reject) => {
      let item = {
        'cx': 10,
        'cy': 10,
        'fill': '#123456'
      }
      item.id = await this.generateUniqueDbKey('figure')
      let transaction = this.localdb.transaction(['figure'], 'readwrite').objectStore('figure').put(item);
      transaction.onsuccess = async () => resolve(transaction.result);
      transaction.onerror = async () => reject(transaction.result);
    });
  }

  async generateUniqueDbKey(table) {
    let newId;
    let iterator;
    do {
      newId = parseInt(Math.random() * 1000000000);
      iterator = await this.read(table, newId);
    } while (iterator);
    return newId;
  }

  async read(table, id) {
    return this.delayWrapper((resolve, reject) => {
      let transaction = this.localdb.transaction([table], 'readonly').objectStore(table).get(id);
      transaction.onsuccess = async () => resolve(transaction.result);
      transaction.onerror = async () => reject(transaction.result);
    });
  }

}
