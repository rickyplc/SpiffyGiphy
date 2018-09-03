import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    giffItems: []
  },
  mutations: {
    FETCH_GIFF_ITEMS (state, giffItems) {
      state.giffItems = giffItems
    }
  },
  actions: {
    fetchGiffs ({ commit }) {
      return new Promise((resolve, reject) => {
        let diffSeconds
        let startDate
        let giffItems = JSON.parse(localStorage.getItem('giffItems'))
        let endDate = new Date().getTime()

        // If the cache is older than 1 hour then get the data from the API
        if (giffItems) {
          startDate = new Date(giffItems.date).getTime()
          diffSeconds = (endDate - startDate) / 1000

          if (diffSeconds < 3600) {
            commit('FETCH_GIFF_ITEMS', giffItems.data)
            resolve()
            return
          }
        }

        axios
          .get('https://api.giphy.com/v1/gifs/trending?api_key=kqFn5fZG8yAhpJHmmJFW6jzI9zMlXv3I&limit=20')
          .then((response) => {
            let data = []
            response.data.data.forEach((element) => {
              data.push({
                url: element.images.downsized_medium.url,
                title: element.title
              })
            })

            // Cache the data to localstorage
            localStorage.setItem('giffItems', JSON.stringify({
              date: new Date(),
              data: data
            }))
            commit('FETCH_GIFF_ITEMS', data)
            resolve()
          })
          .catch((error) => {
            console.log(error.statusText)
            reject(error)
          })
      })
    },
    searchGiffs ({ commit }, query) {
      return new Promise((resolve, reject) => {
        if (!query) {
          resolve()
          return
        }

        let diffSeconds
        let startDate
        const queryLower = query.toLowerCase()
        let giffItems = JSON.parse(localStorage.getItem('giffItemsSearch' + queryLower))
        let endDate = new Date().getTime()

        // If the cache is older than 1 hour then get the data from the API
        if (giffItems) {
          startDate = new Date(giffItems.date).getTime()
          diffSeconds = (endDate - startDate) / 1000

          if (diffSeconds < 60 && queryLower === giffItems.query) {
            commit('FETCH_GIFF_ITEMS', giffItems.data)
            resolve()
            return
          }
        }

        axios
          .get('https://api.giphy.com/v1/gifs/search?api_key=kqFn5fZG8yAhpJHmmJFW6jzI9zMlXv3I&limit=10&q=' + queryLower)
          .then((response) => {
            let data = []
            response.data.data.forEach((element) => {
              data.push({
                url: element.images.downsized_medium.url,
                title: element.title
              })
            })

            // Cache the data to localstorage
            localStorage.setItem('giffItemsSearch' + queryLower, JSON.stringify({
              date: new Date(),
              data: data,
              query: queryLower
            }))
            commit('FETCH_GIFF_ITEMS', data)
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
