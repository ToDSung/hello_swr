<template>
  <div>
    <p v-if="articlesError">Sorry, there's been an error</p>
    <ul>
      <li v-for="item in articles" v-bind:key="item.id">
        <a v-bind:href="item.link" target="blank">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineProps, reactive, ref, onMounted } from "vue";
import useSWRV from "swrv";

const fetcher = function(url){
  return fetch(url).then(r => r.json())
}

export default {
  name: 'App',
  setup() {
    const { data: articles, error: articlesError } = useSWRV('/articles', fetcher)
 
    return {
      articles,
      articlesError,
    }
  },
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
