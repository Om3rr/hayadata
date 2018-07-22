<template>
  <div class="container">
    <div class="header">
      <query-control :query="qq" ref="query"/>
    </div>
    <div v-for="(sliced_atricles, idx) in articles" :key="idx" v-show="!loading">
      <b-card-group deck
                    class="mb-3">
        <b-card class="clickable" v-for="article in sliced_atricles" v-bind:key="article.index" :title="article.title"
                @click="saveArticleKey(article.key)" :class="article.key === currentArticle ? 'marked' : ''">
          <blockquote class="blockquote mb-0">
            <p>{{article.abstract}}</p>
          </blockquote>
          <p v-if="article.distance">{{article.distance}}</p>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import QueryControl from './QueryControl';
import MyLoader from './MyLoader';

export default {
  components: {QueryControl, MyLoader},
  name: 'HelloWorld',
  data () {
    return {
      articles: [],
      currentArticle: null,
      state: 'abstract',
      qq: null,
      loading: false
    }
  },
  mounted () {
    this.query()
  },
  methods: {
    saveArticleKey(key) {
      this.$refs.query.setKey(key);
    },
    async query () {
      const resp = await this.$api.get_all_articles();
      this.articles = this.chunk(resp.data, 3)
    },
    async queryArticle (idx) {
      const resp = await this.$api.queryArticle(idx, this.state);
      this.articles = this.chunk(resp.data, 3);
      this.currentArticle = idx
    },
    async queryMultiple(idx, m_state, p_state, m_slider=1000, p_slider=1000) {
      this.loading = true;
      const resp = await this.$api.queryMultiple({idx, mechanism: {state: m_state, slider: m_slider}, purpose: {state: p_state, slider: p_slider}});
      this.articles = this.chunk(resp.data, 3);
      this.currentArticle = idx;
      setTimeout(() => this.loading = false, 2000)
    },
    chunk (arr, chunkSize) {
      let R = [];
      for (let i = 0, len = arr.length; i < len; i += chunkSize) {
        R.push(arr.slice(i, i + chunkSize))
      }
      return R
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .clickable {
    cursor: pointer;
  }

  .marked {
    background: rgba(1, 1, 1, 0.2);
    cursor: default !important;
  }

  @keyframes example {
    0%   {
      font-size: 10px;
      transform: skewX(0);
    }
    25%  {
    }
    50%  {
      font-size: 30px;
      transform: skewX(20deg)
    }
    100% {
      font-size: 10px;
      transform: skewX(0);
    }
  }
  .loading {
    animation: example 4s infinite;
  }
</style>
