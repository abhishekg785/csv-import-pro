// Dumb Cache Implementation

// Note: This is not a good approach and can be solved using redis cache

const cache = {}

const cacheOperation = {
  setCache: (key, data) => {
    cache[key] = data
  },

  getCache: key => cache[key],

}

export default cacheOperation
