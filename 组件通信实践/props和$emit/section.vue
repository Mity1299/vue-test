<!--父组件-->
<template>
    <div class="section">
      <com-article :articles="articleList"></com-article>
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
  }
}
</script>
