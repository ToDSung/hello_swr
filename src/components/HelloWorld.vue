<template>
  <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button @click="state.count++">count is: {{ state.count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  
  <div v-for="datum in data" :key="datum.id">
    <span>{{ datum.title }}</span>
    <span>{{ datum.author }}</span>
    <span>{{ datum.link }}</span>
  </div>
  <button @click="post_articles">add data</button>

</template>

<script>
import { defineProps, reactive, ref,onMounted } from 'vue';
import useSWRV from 'swrv' 

export default {
  name: 'App',

  setup (props) {
    defineProps({
      msg: String
    })

    const state = reactive({ 
      count: 0,
    })

    const data = ref([])

    const get_articles = fetch('http://localhost:3000/articles')
      .then(r => r.json())
      .then(articles => data.value = articles)

    const post_articles = () => {
      const new_article = {
        "title": "VS Code for Vue Developers",
        "author": "Andy",
        "link": "https://www.vuemastery.com/blog/vs-code-for-vuejs-developers"
      }

      fetch('http://localhost:3000/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(new_article)
      })

      data.value = [...data.value, new_article]
    } 


    onMounted(get_articles)

    return {
      state,
      data,
      post_articles,
    }
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
