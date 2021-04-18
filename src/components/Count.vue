<template>
  <div>
    <span>Article Count: {{ articles === undefined ? 0 : articles.length }}</span>
  </div>
</template>

<script>
import { fetcher } from '../utils/fetcher.js'
import useSWRV from 'swrv'

export default {
  name: 'Count',
  setup() {
    const { data: articles } = useSWRV('/articles', fetcher)
 
    return {
      articles
    }
  },
}
</script>