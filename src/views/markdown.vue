<template>
  <div>
    <div class="title">22333</div>
    <div>2222</div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    console.log('onMounted1');
    return {

    };
  },
});
</script>

<style scoped>
.title {
  position: relative;
  font-size: 18px;
  color: green;
}
</style>
