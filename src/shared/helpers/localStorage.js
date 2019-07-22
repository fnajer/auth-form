const defaultStorage = {
  auth: {
    token: '',
    expires: '',
    secret: '',
    id: '',
  },
}

class LocalStorage {
  init() {
    let storage = localStorage.getItem('whoertest')
    if (!storage) {
      storage = JSON.stringify(defaultStorage)
      localStorage.setItem('whoertest', storage)
    }
    this.storage = JSON.parse(storage)
  }
  getPart(partOfStorage) {
    if (!this.storage) return defaultStorage[partOfStorage]

    return this.storage[partOfStorage]
  }
  setPart(partOfStorage, value) {
    this.storage[partOfStorage] = { ...this.storage[partOfStorage], ...value }
    localStorage.setItem('whoertest', JSON.stringify(this.storage))
  }
}

const storage = new LocalStorage()

export default storage

export const localSaveAuth = (key, value) => {
  storage.setPart('auth', {
    [key]: value,
  })
}

export const localLoadAuth = key => {
  return storage.getPart('auth')[key]
}
