<template>
  <div class="widget">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- {{cities}} -->
        <Header :location="cities[0]" :screen="screen" @to="to" :hideSettings="false"/>
    <div v-if="screen==0">
      <div  v-for='(city,num) in cities' :key='num'>
        <div v-if='num>0' class='header'>{{city.city}},{{city.country}}</div>
        <MainView :location="city"/>
      </div>
    </div>
    <Settings v-else/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Provide } from 'vue-property-decorator';
import Location from './types/Location';
import Header from './components/Header.vue';
import MainView from './components/MainView.vue';
import Settings from './components/settings.vue';
import api from './scripts/api';

@Options({
  components: {
    Header,
    MainView,
    Settings
  },
})
export default class App extends Vue {
  location:Location={ country: 'USA', city: 'Chicago' }

  @Provide('cities') public cities =[{
    city: 'Chicago',
    country: 'USA'
  }];

  @Provide('deleteCity')
  deleteCity(num:number):void{
    this.cities.splice(num, 1);
  }

  @Provide('addCity')
  async addCity(v:string){
    const country = await api.getCountry(v);
    if (country){
      this.cities.push({
        city: v,
        country
      });
    }
  }

  @Provide('swap')
  swapCities(a:number, b:number):void{
    if (!this.cities[a] || !this.cities[b]){
      return;
      }
    const t = this.cities[a];
        this.cities[a] = this.cities[b];
        this.cities[b] = t;
        // console.log('over',e)
  }

  screen=0

  to(v:number):void{
    this.screen = v;
  }

  mounted(){
    setTimeout(() => {
      this.location = { country: 'USA', city: 'Los Angeles' };  
      console.log('dsdfdfgs');
    }, 1000);
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'Montserrat';
  src: url('./assets/MontserratAlternates-Light.otf') format('truetype');
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.widget{
      box-shadow: 2px 2px 13px #909090, inset 0 0 130px #101010;
          background: #909090;
    color: white;

  width:200px;
  border-radius:12px;
  padding:20px;
  box-sizing: border-box;
  font-family: Montserrat;
}
.header{
  display: flex;
  font-size:12px;
  align-items: center;
  justify-content: space-between;
  width:100%;
  img{
    width:25px
  }
}
</style>
