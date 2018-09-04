import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let cachedSearchQuery
const api = 'http://localhost:8081'

const deffirenceBetweenThenAndNow = (startDate) => {
  const sDate = new Date(startDate).getTime()
  let endDate = new Date().getTime()
  let diffSeconds = (endDate - sDate) / 1000

  return diffSeconds
}

const getCachedData = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

const setCacheData = (cacheData, data) => {
  // Cache the data to local storage
  if (cacheData) {
    cacheData.date = new Date()
    cacheData.data = data
    localStorage.setItem(cacheData.key, JSON.stringify(cacheData))
  }
}

export default new Vuex.Store({
  state: {
    giffItems: []
  },
  mutations: {
    FETCH_TRENDING_GIFF_ITEMS (state, {cacheData, data}) {
      state.giffItems = state.giffItems.concat(data)
      setCacheData(cacheData, state.giffItems)
    },
    FETCH_SEARCH_GIFF_ITEMS (state, {cacheData, data, query = ''}) {
      if (cachedSearchQuery === query) {
        state.giffItems = state.giffItems.concat(data)
      } else {
        state.giffItems = data
      }

      cachedSearchQuery = query
      setCacheData(cacheData, state.giffItems)
    }
  },
  actions: {
    fetchGiffs ({ commit }, offset) {
      return new Promise((resolve, reject) => {
        let diffSeconds
        let giffItems = getCachedData('giffItems')

        if (giffItems) {
          diffSeconds = deffirenceBetweenThenAndNow(giffItems.date)

          /*
           * Use the cached data and not the API if there is no new data
           * avaible in the cache, and if the cache is less than 1 hour old
           */
          if (diffSeconds < 3600 && offset < giffItems.data.length) {
            commit('FETCH_TRENDING_GIFF_ITEMS', {
              data: giffItems.data.slice(offset, offset + 10)
            })
            resolve()
            return
          }
        }

        axios
          .get(api + '/trending?offset=' + offset)
          .then((response) => {
            commit('FETCH_TRENDING_GIFF_ITEMS', {
              cacheData: {
                key: 'giffItems'
              },
              data: response.data
            })
            resolve()
          })
          .catch((error) => {
            console.log(error.statusText)
            reject(error)
          })
      })
    },
    searchGiffs ({ commit }, {query, offset}) {
      return new Promise((resolve, reject) => {
        if (!query) {
          resolve()
          return
        }

        let diffSeconds
        const queryLower = query.toLowerCase()
        let giffItems = getCachedData('giffItemsSearch' + queryLower)

        if (giffItems) {
          diffSeconds = deffirenceBetweenThenAndNow(giffItems.date)

          /*
           * Use the cached data and not the API if there is no new data
           * avaible, and if the cache is less than 60 seconds old, and if the
           * current search term has previously been cached
           */
          if (diffSeconds < 60 && queryLower === giffItems.query && offset < giffItems.data.length) {
            commit('FETCH_SEARCH_GIFF_ITEMS', {
              data: giffItems.data.slice(offset, offset + 10)
            })
            resolve()
            return
          }
        }

        axios
          .get(api + '/search?offset=' + offset + '&query=' + queryLower)
          .then((response) => {
            commit('FETCH_SEARCH_GIFF_ITEMS', {
              cacheData: {
                key: 'giffItemsSearch' + queryLower,
                query: queryLower
              },
              data: response.data,
              query: queryLower
            })
            resolve()
          })
          .catch((error) => {
            console.log(error.statusText)
            reject(error)
          })
      })
    }
  }
})
