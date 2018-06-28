import axios from 'axios'

export default {
  install(Vue, options) {
    const API = {}

    API.get_all_articles = function () {
      return axios.get('/api/articles')
    }

    API.queryArticle = function (idx) {
      return axios.get(`/api/query?article=${idx}`)
    }

    Vue.prototype.$api = API
  }
}
