<script setup lang="ts">
import Graph from "../components/Graph.vue";
import Bar from "../components/Bar.vue";

const values = [10, 20, 40, 30];
</script>

<template>
  <Story>
    <Graph :height="200">
      <Bar v-for="value in values" :value="value" />
    </Graph>
  </Story>
</template>
