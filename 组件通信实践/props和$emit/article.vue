<template>
  <div>
    <span v-for="(item, index) in articles" :key="index">
      {{item}}
    </span>
  </div>
</template>

<script>
export default {
name: "article",
  props:['article']
}
</script>

<style scoped>

</style>
