<template>

</template>

<script>
import RepositoriesFilters from './RepositoriesFilters.vue';
import RepositoriesSortBy from './RepositoriesSortBy.vue';
import RepositoriesList from './RepositoriesList.vue';
import useUserRepositories from './useUserRepositories'
import useRepositoryNameSearch from './useRepositoryNameSearch'
import { toRefs } from 'vue'


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

  setup (props) {
    const { user } = toRefs(props)

    const { repositories, getUserRepositories } = useUserRepositories(user)

    const {
      searchQuery,
      repositoriesMatchingSearchQuery
    } = useRepositoryNameSearch(repositories)

    return {
      // 因为我们并不关心未经过滤的仓库
      // 我们可以在 `repositories` 名称下暴露过滤后的结果
      repositories: repositoriesMatchingSearchQuery,
      getUserRepositories,
      searchQuery,
    }
  },
  data () {
    return {
      // repositories: [], // 1
      filters: {  }, // 3
    }
  },
  computed: {
    filteredRepositories () {  }, // 3
  },
  methods: {
    updateFilters () {  }, // 3
  },
}

</script>

<style scoped>

</style>
