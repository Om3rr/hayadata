<template>
  <div>
    <b-form-group :invalid-feedback="invalidFeedback" @keyup.enter.native="enter"
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
      <b-button class="button" variant="primary" @click="basicSearch" style="margin-top: 10px" :disabled="$parent.loading">Search</b-button>
      <b-button class="button" variant="primary" @click="showAdv = !showAdv" style="margin-top: 10px">{{showAdv ? 'Basic' : 'Advanced'}}</b-button>
    </b-form-group>
    <div class="advanced" :class="{mimimized: !showAdv, maximize: showAdv}">
    <div class="container">
      <div class="flex">
        Purpose
        <div class="checkboxes">
          <b-form-radio-group class="scontainer" v-model="purpose" name="radioSubComponent">
            <b-form-radio v-for="v in radio_vals" :value="v.v">{{v.txt}}</b-form-radio>
          </b-form-radio-group>
        </div>
        <div class="slider" v-if="purpose === 1">
          <vue-slide-bar v-model="purpose_slider" :range="slider_range" :min="100" :max="1000" :reverse="true"/>
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
          <vue-slide-bar v-model="mechanism_slider" :range="slider_range" :min="100" :max="1000" :reverse="true"/>
        </div>
      </div>

    </div>
    <div class="button-container">
      <b-button class="button" variant="primary" @click="enter(true)" :disabled="$parent.loading">Super Search</b-button>
    </div>
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
        showAdv: false,
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
      enter(is_super) {
        this.tried = true;
        if(!!this.invalidFeedback) {
          return;
        }
        this.$parent.queryMultiple(this.search.code, this.mechanism, this.purpose, this.mechanism_slider, this.purpose_slider, is_super)
      },
      onSearch(search, loading) {
        loading(true);
        this.fetchSearch(loading, search, this);
      },
      basicSearch() {
        this.$parent.querySingle(this.search.code)
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
  .advanced {
    border: 1px solid #0062cc;
    margin: 15px;
    -webkit-transition: height 1s;
    -moz-transition: height 1s;
    -ms-transition: height 1s;
    -o-transition: height 1s;
    transition: height 1s;
    &.maximize {
      height: 320px;
      opacity: 1;
    }
    &.mimimized {
      height: 0;
      opacity: 0;
      border: 0 solid #0062cc;
    }
  }
  .container {
    display: flex;
    margin: 30px;
    min-height: 220px;
    margin-bottom: 0;
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
    margin: 5px;
    margin-bottom: 10px;
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
