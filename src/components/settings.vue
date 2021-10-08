<!-- eslint-disable -->
<template>
    <div>
        <div @drop="log" @dragend="logEnd"> 
            <div v-for="(item,num) in cities2" :key="item" draggable="true" class="elem-dragable elem" :class="{moved:selected==num}" @dragstart="selectToDrag(num)">
                <img src='@/assets/reorder.svg'>
                <div>{{ item?.city }}</div>
                <img src="@/assets/delete.svg" v-if="cities2.length>1" alt="" srcset="" @click="deleteCity(num)">
            </div>
        </div>
        <div class='bottom'>
            <input v-model='cityName'>
            <img src='@/assets/add.svg' @click='()=>{addCity(cityName); cityName=""}'>
        </div>
    </div>
</template>
<script lang="ts">
/* eslint-disable */
// import Vue from 'vue';
import { Options, Vue } from 'vue-class-component';
import { Inject } from 'vue-property-decorator';

@Options({
    components: {
    },
    props:{
        location:Location,
        screen:0
    }
})
export default class Settings extends Vue {
    @Inject('cities') private cities2;
    @Inject('swap') private swap;
    @Inject('deleteCity') private deleteCity;
    @Inject('addCity') private addCity;
    selected = -1;
    cityName='';
    log(e){
        console.log(e);
    }
    selectToDrag(e){
        console.log('selected ',e)
        this.selected=e;
    }
    logEnd(e){
        console.log('moved by',e.offsetY,Math.round(e.offsetY/35))
        console.log(this.selected,this.selected+Math.round(e.offsetY/35) )
        this.swap(this.selected,this.selected+Math.round(e.offsetY/35));
        this.selected=-1;
    }
    setNew(){
        this.cities2 = 'his';
    }
  // Logo=Logo;
}
</script>

<style scoped lang='scss'>
    .elem{
        display:flex;
        margin-bottom:5px;
        font-size:16px;
        div{
            flex-grow: 1;
        }
        img:last-child{
            width:15px;
        }
    }
    .handle{
        margin-bottom:5px;
    }
    img{
        height:25px;
    }
    .elem-dragable{
        height:30px;
    }
    .moved{
        opacity:0.5
    }
    .bottom{
        display: flex;
        input{
            width:10px;
            flex-grow:1;
            color: white;
            background: #ffffff40;
            border: none;
            border-radius: 20px;
            padding-left: 9px;
        }
    }
</style>   