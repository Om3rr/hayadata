<template>
  <div>
    <b-form-group :invalid-feedback="invalidFeedback" description="Super informative description goes here" @keyup.enter.native="enter"
                  label="Informative label goes here" :state="state"
                  label-for="input1">
      <b-form-input id="input1" type="text" v-model="search" placeholder="Informative placeholder goes here" ></b-form-input>
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
      <b-button class="button" variant="primary" @click="enter">GOGOGOGO</b-button>
    </div>
  </div>
</template>

<script>
  import VueSlideBar from 'vue-slide-bar'

  export default {
    name: 'query-control',
    props: ['query'],
    data() {
      return {
        search: '',
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
        tried: false
      }
    },
    computed: {
      invalidFeedback() {
        if(this.purpose !== 1 && this.mechanism !== 1) {
          return 'Informative error message goes here'
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
        this.$parent.queryMultiple(this.search, this.mechanism, this.purpose, this.mechanism_slider, this.purpose_slider)
      },
      setKey(key) {
        this.search = key
      }
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

</style>
