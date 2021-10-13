<template>
  <div>计算和:{{ocunt}}</div>
</template>

<script>
import {EventBus} from "./event-bus";

export default {
  name: "showNum",
  data(){
    return {
      count:0
    }
  },

  mounted(){
    EventBus.$on('addition', param => {
      this.count = this.count + param.num;
    })
  }
}
</script>

<style scoped>

</style>
