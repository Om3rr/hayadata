<template>
  <div>
    <b-form-group :invalid-feedback="invalidFeedback" description="Start writing and get a list of patents." @keyup.enter.native="enter"
                  label="Select A Patent" :state="state"
                  label-for="input1">
      <v-select :filterable="false" :options="options" @search="onSearch" v-model="search">
        <template slot="no-options">
          Start typing to find a patent
        </template>
        <template slot="option" slot-scope="option">
          <div class="d-center">
            <div class="code">{{option.code}}</div>
            <div class="title">{{option.title}}</div>
          </div>
        </template>
        <template slot="selected-option" scope="option">
          <div class="selected d-center">
            <div class="code">{{option.code}}</div>
            <div class="title">{{option.title}}</div>
          </div>
        </template>
      </v-select>
    </b-form-group>

    <div class="container">
      <div class="flex">
        Purpose
        <div class="checkboxes">
          <b-form-radio-group class="scontainer" v-model="purpose" name="radioSubComponent">
            <b-form-radio v-for="v in radio_vals" :value="v.v">{{v.txt}}</b-form-radio>
          </b-form-radio-group>
        </div>
        <div class="slider" v-if="purpose === 1">
          <vue-slide-bar v-model="purpose_slider" :range="slider_range" :min="100" :max="1000"/>
        </div>
      </div>
      <div class="flex">
        Mechanism
        <div class="checkboxes">
          <b-form-radio-group class="scontainer" v-model="mechanism" name="radioSubComponent2">
            <b-form-radio v-for="v in radio_vals" :value="v.v">{{v.txt}}</b-form-radio>
          </b-form-radio-group>
        </div>
        <div class="slider" v-if="mechanism === 1">
          <vue-slide-bar v-model="mechanism_slider" :range="slider_range" :min="100" :max="1000"/>
        </div>
      </div>
    </div>
    <div class="button-container">
      <b-button class="button" variant="primary" @click="enter" :disabled="$parent.loading">Go</b-button>
    </div>
  </div>
</template>

<script>
  import VueSlideBar from 'vue-slide-bar'
  import VueSelect from 'vue-select'
  export default {
    name: 'query-control',
    props: ['query'],
    data() {
      return {
        search: null,
        purpose: 0,
        purpose_slider: 500,
        mechanism: 0,
        mechanism_slider: 500,
        slider_range: [{label: 'Somewhat Similar'}, {label: 'Very Similar'}],
        radio_vals: [
          {txt: 'Don`t care', v: 0},
          {txt: 'Similiar', v: 1},
          {txt: 'Dissimiliar', v: 2},
        ],
        tried: false,
        options: []
      }
    },
    computed: {
      canQuery() {
        if(this.$parent.loading) {
          return false;
        }
        return !!this.search
      },
      invalidFeedback() {
        if(this.purpose !== 1 && this.mechanism !== 1) {
          return 'At least one of the filter should be on Similar'
        }
        if(!this.search) {
          return 'You should select a patent from the given list.'
        }
      },
      state() {
        return !this.tried;
      }
    },
    methods: {
      enter() {
        this.tried = true;
        if(!!this.invalidFeedback) {
          return;
        }
        this.$parent.queryMultiple(this.search.code, this.mechanism, this.purpose, this.mechanism_slider, this.purpose_slider)
      },
      onSearch(search, loading) {
        loading(true);
        this.fetchSearch(loading, search, this);
      },
      fetchSearch(loading, search, vm) {
        this.$api.suggest(search).then((resp) => {
          const {data: {response}} = resp;
          this.options = response;
        });
        loading(false)
      }
      // search: this._.debounce((loading, search, vm) => {
      //   debugger
      // }, 500)
    },
    components: {VueSlideBar}
  }
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    margin: 30px;
    min-height: 220px;
  }
  .scontainer {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }
  .flex {
    flex: auto;
  }
  .checkboxes {
    max-width: 130px;
    margin: auto;
    margin-top: 20px;
  }
  .slider {
    max-width: 60%;
    margin: auto;
  }
  .button-container {
    margin: 20px;
  }
  /deep/.v-select.single .selected-tag {
    width: 100%;
  }
  /deep/.selected-tag {
    width: 100%;
  }
  /deep/.open .selected {
    display: none;
  }
  .d-center {
    .code {
      font-weight: bold;
    }
  }

</style>
