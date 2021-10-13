<template>
  <div>
    <button @click="additionHandle">+ 加法器</button>
  </div>
</template>

<script>
import {EventBus} from "./event-bus";
console.log(EventBus);

export default {
  name: "additionNum",
  data(){
    return {
      num:1
    }
  },
  methods:{
    additionHandle(){
      EventBus.$emit('addition', {
        num: this.num ++
      })
    }
  }
}
</script>

<style scoped>

</style>
