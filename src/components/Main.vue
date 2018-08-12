<template>
  <div class="container">
    <div class="header">
      <query-control :query="qq" ref="query"/>
    </div>
    <div v-show="loading">
      <div class="lds-css ng-scope">
        <div style="width:100%;height:100%" class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <div v-for="(sliced_atricles, idx) in articles" :key="idx" v-show="!loading">
      <b-card-group deck
                    class="mb-3">
        <b-card class="clickable" v-for="article in sliced_atricles" v-bind:key="article.index" :title="article.title"
                :class="article.key === currentArticle ? 'marked' : ''">
          <blockquote class="blockquote mb-0">
            <p>{{article.abstract}}</p>
          </blockquote>
          <p v-if="article.distance">{{article.distance}}</p>
          <div v-if="article.purp_tags">
            <b-badge v-for="(tag, idxx) in article.purp_tags" style="margin: 0px 3px" :key="idxx">
              {{tag}}
            </b-badge>
          </div>
          <div v-if="article.mech_tags">
            <b-badge v-for="(tag, idxx) in article.mech_tags" style="margin: 0px 3px; background: darkred;" :key="idxx">
              {{tag}}
            </b-badge>
          </div>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
  import QueryControl from './QueryControl';

  export default {
    components: {QueryControl},
    name: 'HelloWorld',
    data() {
      return {
        articles: [],
        currentArticle: null,
        state: 'abstract',
        qq: null,
        loading: false
      }
    },
    mounted() {
      this.query()
    },
    methods: {
      async query() {
        const resp = await this.$api.get_all_articles();
        this.articles = this.chunk(resp.data, 3)
      },
      async queryArticle(idx) {
        const resp = await this.$api.queryArticle(idx, this.state);
        this.articles = this.chunk(resp.data, 3);
        this.currentArticle = idx
      },

      async querySingle(code) {
        this.loading = true;
        const resp = await this.$api.regular_search(code);
        this.articles = this.chunk(resp.data, 3);
        this.currentArticle = code;
        setTimeout(() => this.loading = false, 500)
      },
      async queryMultiple(idx, m_state, p_state, m_slider = 1000, p_slider = 1000, super_query= false) {
        this.loading = true;

        const resp = await this.$api.queryMultiple({
          idx,
          mechanism: {state: m_state, slider: m_slider},
          purpose: {state: p_state, slider: p_slider},
          super: super_query
        });
        this.articles = this.chunk(resp.data, 3);
        this.currentArticle = idx;
        setTimeout(() => this.loading = false, 2000)
      },
      chunk(arr, chunkSize) {
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
    0% {
      font-size: 10px;
      transform: skewX(0);
    }
    25% {
    }
    50% {
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

  @keyframes lds-ripple {
    0% {
      top: 96px;
      left: 96px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 18px;
      left: 18px;
      width: 156px;
      height: 156px;
      opacity: 0;
    }
  }

  @-webkit-keyframes lds-ripple {
    0% {
      top: 96px;
      left: 96px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 18px;
      left: 18px;
      width: 156px;
      height: 156px;
      opacity: 0;
    }
  }

  .lds-ripple {
    margin: auto;
  }

  .lds-ripple div {
    box-sizing: content-box;
    position: absolute;
    border-width: 4px;
    border-style: solid;
    opacity: 1;
    border-radius: 50%;
    -webkit-animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  .lds-ripple div:nth-child(1) {
    border-color: #93dbe9;
  }

  .lds-ripple div:nth-child(2) {
    border-color: #689cc5;
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }

  .lds-ripple {
    width: 200px !important;
    height: 200px !important;
    -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
    transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
  }
</style>
