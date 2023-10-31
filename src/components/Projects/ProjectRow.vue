<template>
  <div class="project-container container-fluid h-100" @redirect="this.$emit('click')">
    <div class="header m-3 align-middle">
      <div class="d-md-flex">
        <div class="col-4 d-flex justify-content-start">
          <div class="right">
            <h5 class="has-text-weight-bold"><b>Project:</b> {{ description }} </h5>
          </div>
        </div>
        <div class="col-4 d-flex justify-content-start">
          <div class="right">
            <h5 class="has-text-weight-bold"><b>Last Modified:</b> {{ last_modified }}</h5>
          </div>
        </div>
        <div class="col-4 d-lg-flex justify-content-end">
          <div class="avatar rounded-circle"
            v-for="person in members"
            v-bind:key="'avatar-'+ person.fname"
            v-bind:title="person.fname + ' ' + person.lname + ' '"
            >
            {{person.fname[0]}}{{person.lname[0]}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'ProjectRow',
  props: {
    description: String,
    last_modified: String,
    members: Array,
  },
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>

<style>
  .avatar{
    background: #57C5F2;
    color: #fff;
    padding: 6px;
    display: inline-block;
    margin-right: 3px;
    width: 30px;
    height: 30px;
    border-radius: 30px;
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    font-size: 0.75rem;
  }

  .project-container {
    height: 170px;
    margin: auto;
    padding: 10px;
    max-width: max;
    cursor: pointer;
    border-radius:5px;
    background-color: #B5EAD6;

    /* @include breakpoint(tablet2){
      height: 75px;
		} */
  }

  .right {
    text-align: center;

    /* @include breakpoint(tablet2){
      text-align: start;
		} */
  }
</style>
