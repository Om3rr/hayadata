import axios from 'axios'

export default {
  install(Vue, options) {
    const API = {}

    API.get_all_articles = function () {
      return axios.get('/api/articles')
    }

    API.queryArticle = function (idx, state) {
      const params = {article: idx, state};
      return axios.get(`/api/query`, {params})
    }

    API.queryMultiple = function (params) {
      return axios.get(`/api/multiple`, {params})
    }

    Vue.prototype.$api = API
  }
}
