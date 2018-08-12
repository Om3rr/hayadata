import axios from 'axios'

export default {
  install(Vue, options) {
    const API = {};

    API.get_all_articles = function () {
      return axios.get('/api/articles')
    };

    API.queryArticle = function (idx, state) {
      const params = {article: idx, state};
      return axios.get(`/api/query`, {params})
    };

    API.queryMultiple = function (params) {
      return axios.get(`/api/multiple`, {params})
    };

    API.regular_search = function(code) {
      return axios.get(`/api/search`, {params: {code}})
    }


    API.suggest = function(text) {
      return axios.get(`/api/suggest?text=${text}`)
    };

    Vue.prototype.$api = API
  }
}
