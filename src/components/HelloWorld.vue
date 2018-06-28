<template>
  <div class="container">
    <b-card-group columns>
      <b-card class="clickable" v-for="article in articles" :title="article.title" @click="queryArticle(article.index)" :class="article.index === currentArticle ? 'marked' : ''">
        <blockquote class="blockquote mb-0">
          <p>{{article.abstract}}</p>
        </blockquote>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      articles: [],
      currentArticle: null
    }
  },
  mounted () {
    this.query()
  },
  methods: {
    async query () {
      const resp = await this.$api.get_all_articles()
      this.articles = resp.data
    },
    async queryArticle (idx) {
      const resp = await this.$api.queryArticle(idx)
      this.articles = resp.data
      this.currentArticle = idx
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
    background: rgba(1,1,1,0.2);
    cursor: default !important;
  }
</style>
