<!--父组件-->
<template>
    <div class="section">
      <com-article :articles="articleList" ref="aArticle"></com-article>
      <button @click="getChild"></button>
    </div>
</template>

<script>
import comArticle from './article.vue';
export default {
  name: 'HelloWorld',
  components: {comArticle},
  data(){
    return {
      articleList: ['红楼梦', '西游记', '三国演义']
    }
  },
  methods:{
    getChild(){
      console.log(this.$refs.aArticle);
    }
  }
}
</script>
