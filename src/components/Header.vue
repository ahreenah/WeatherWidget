<!-- eslint-disable -->
<template>
    <div class='header' v-if="screen==0">
      <div>{{location.city}}, {{location.country}}</div>
      <img src="@/assets/icons8-settings.svg" @click="$emit('to',1)">
    </div>
    <div class='header big' v-if="screen==1">
      <div>settings</div>
      <img src="@/assets/close.svg" @click="$emit('to',0)">
    </div>
</template>
<style>
.big{
  font-size:22px;
}
.header{
  margin-bottom:10px;
}
</style>
<script lang="ts">
/* eslint-disable */
// import Vue from 'vue';
import { Options, Vue } from 'vue-class-component';
import Component from 'vue-class-component';
import Location from '@/types/Location';

@Options({
  components: {
  },
  props:{
      location:Location,
      screen:0,
      hideSettings:false
  }
})
export default class Header extends Vue {
    
    
  // Logo=Logo;
}
</script>
