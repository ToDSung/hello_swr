<template>
  <div>
    <p v-if="articlesError">Sorry, there's been an error</p>
    <ul>
      <li v-for="item in visibleArticles" v-bind:key="item.id">
        <a v-bind:href="item.link" target="blank">{{ item.title }}</a>
        <button @click="hideArticle(item.id)">Hide</button>
      </li>
    </ul>
  </div>
  <div>
    <button @click="updateArticles">Update Articles</button>
    Clicked Count: {{ BtnClickedCount }}  
  </div>
  <Count v-if="showCount"></Count>
  hidden articles: {{ hideList }}
</template>

<script>

import { fetcher } from '../utils/fetcher.js'
import { ref, computed } from 'vue'
import useSWRV from "swrv";
import Count from './Count.vue'

export default {
  name: 'App',

  components: { Count },

  setup() {
    const { 
      data: articles, 
      error: articlesError, 
      mutate: mutateArticles
    } = useSWRV('/articles', fetcher)

    const BtnClickedCount = ref(0)

    const updateArticles = async () => {
      await fetch('http://localhost:3000/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "title": `Untitled - ${new Date().toString()}`,
          "author": "Andy",
          "link": "https://vuemastery.com/blog",
        })
      })
      mutateArticles() 
      BtnClickedCount.value += 1
    }

    const { data: hideList, mutate: mutateHideList } = useSWRV('hideList', () => [1])

    const visibleArticles = computed(() => {
      if(articles.value === undefined) {
        return articles.value
      } 
      return articles.value.filter(a => hideList.value.indexOf(a.id) === -1)
    })

    const hideArticle = (id) => {
      console.log(mutateHideList)
      hideList.value = [...hideList.value, id]
      mutateHideList(() => hideList.value = [...hideList.value, id])
    } 
    
    const showCount = ref(false) 
    setTimeout(() => showCount.value = true, 3000)
 
    return {
      visibleArticles,
      articlesError,
      hideArticle,
      showCount,
      updateArticles,
      BtnClickedCount,
      hideList,
    }
  },
}
</script>

<style scoped>

</style>
