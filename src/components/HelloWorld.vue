<template>
  <div class="container">
    <div class="header">
      Sorting by
      <button @click="state = state === 'title' ? 'abstract' : 'title'">{{state}}</button>
    </div>
    <div v-for="sliced_atricles in articles">
      <b-card-group deck
                    class="mb-3">
        <b-card class="clickable" v-for="article in sliced_atricles" :key="article.index" :title="article.title"
                @click="queryArticle(article.index)" :class="article.index === currentArticle ? 'marked' : ''">
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
export default {
  name: 'HelloWorld',
  data () {
    return {
      articles: [],
      currentArticle: null,
      state: 'abstract'
    }
  },
  mounted () {
    this.query()
  },
  methods: {
    async query () {
      const resp = await this.$api.get_all_articles()
      this.articles = this.chunk(resp.data, 3)
    },
    async queryArticle (idx) {
      const resp = await this.$api.queryArticle(idx, this.state)
      this.articles = this.chunk(resp.data, 3)
      this.currentArticle = idx
    },
    chunk (arr, chunkSize) {
      let R = []
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
</style>
