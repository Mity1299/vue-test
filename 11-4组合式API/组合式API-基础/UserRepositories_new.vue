<template>

</template>

<script>
import RepositoriesFilters from './RepositoriesFilters.vue';
import RepositoriesSortBy from './RepositoriesSortBy.vue';
import RepositoriesList from './RepositoriesList.vue';
import { fetchUserRepositories } from '@/api/repositories';
import { ref, onMounted, watch, toRefs} from 'vue'

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: {
      type: String,
      required: true
    }
  },
  //setup 选项是一个接收 props 和 context 的函数
  //我们将 setup 返回的所有内容都暴露给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板

  setup(props){
    console.log(props);

    // 使用 `toRefs` 创建对prop的 `user` property 的响应式引用
    const { user } = toRefs(props)

    let repositories = ref([]);//响应式处理
    const getUserRepositories = async () => {
      repositories = await fetchUserRepositories(props.user);
    }

    //生命周期钩子
    onMounted(getUserRepositories);

    //监听user，如果有变动则重新获取repositories
    watch(user,getUserRepositories);


    //这里返回的任何内容都可以用于组件的其余部分
    return {
      repositories,
      getUserRepositories,
    };
  },
  data () {
    return {
      // repositories: [], // 1
      filters: {  }, // 3
      searchQuery: '' // 2
    }
  },
  computed: {
    filteredRepositories () {  }, // 3
    repositoriesMatchingSearchQuery () {  }, // 2
  },
  watch: {
    user: 'getUserRepositories' // 1
  },
  methods: {
    getUserRepositories () {
      // 使用 `this.user` 获取用户仓库
    }, // 1
    updateFilters () {  }, // 3
  },
  mounted () {
    this.getUserRepositories() // 1
  }
}

</script>

<style scoped>

</style>
