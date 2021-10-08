<!-- eslint-disable -->
<template>
    <div class='header'>
      <img :src="`http://openweathermap.org/img/wn/${icon}@2x.png`" alt="">
      <div>{{temp}}&deg;C</div>
    </div>
    <div class='data'>
    <div>{{description}}</div>
    <div>feels like {{feelsLike}}&deg;C</div>
    <div>{{wind.speed}}m/s {{wind.direction}}</div>
    <div>visibility:{{visibility}}</div>
    <div>pressure:{{pressure}}</div>
    <div>humidity:{{humidity}}</div>
    </div>
    <!-- <div>{{getCardinal(20)}}</div> -->
</template>
<style scoped>
.header{
  /* font-size: 12px;; */
}
.data{
  margin-bottom:20px;
  font-size: 12px;
}
</style>
<script lang="ts">
/* eslint-disable */
// import Vue from 'vue';
import { Options, Vue } from 'vue-class-component';
import Component from 'vue-class-component';
import {Prop} from 'vue'
import {Watch} from 'vue-property-decorator';
import Location from '@/types/Location';
import api from '@/scripts/api.ts';
export function getCardinal(angle:number):string {
  /** 
   * Customize by changing the number of directions you have
   * We have 8
   */
  const degreePerDirection = 360 / 8;

  /** 
   * Offset the angle by half of the degrees per direction
   * Example: in 4 direction system North (320-45) becomes (0-90)
   */
  const offsetAngle = angle + degreePerDirection / 2;

  return (offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "N"
    : (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "NE"
      : (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "E"
        : (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "SE"
          : (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "S"
            : (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "SW"
              : (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "W"
                : "NW";
}
class Props{
    msg?: string;
    location: Location;
}

@Options({
  components: {
  },
  props:{
    location:Location
  }
})
export default class Header extends Vue.with(Props) {
  
    icon=''
    description=''
    feelsLike=0
    visibility=0
    pressure=0
    humidity=0
    temp=0
    wind={
        direction:'',
        speed:0
    };
    async load(){ 
        const res = await api.getWeather(this.location.city)
        this.icon = res.icon;
        this.temp = res.temp;
        this.feelsLike = res.feelsLike;
        this.description = res.description;
        this.visibility = res.visibility;
        console.log(res.wind)
        this.pressure = res.pressure;
        this.humidity = res.humidity;
        this.wind={direction: getCardinal(res.wind.deg), speed:res.wind.speed};
    }
    async mounted(){
        try{
            this.load()
        }
        finally{}
    }
    @Watch('location')
    onPropertyChanged(value: string, oldValue: string) {
        this.load()
    }
    watch={
        location:()=>{
            this.mounted()
        }
    }
}
</script>
