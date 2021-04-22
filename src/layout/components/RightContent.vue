<template>
  <a-layout-content>
      <main-panel/>
  </a-layout-content>
</template>

<script>
  import { defineComponent } from 'vue';
  // import InfoTable from '../../components/InfoTable'
  import MainPanel from './MainPanel'

  export default defineComponent({
    name: "RightContent",
    components:{
      // InfoTable,
      MainPanel
    },
    setup(){

    }
  })
</script>

<style scoped>

</style>
