<script setup lang="ts">
import Graph from "../components/Graph.vue";
import Bar from "../components/Bar.vue";

const values = [10, 20, 40, 30, 48, 32, 10, 20, 40, 30, 48, 32];
</script>

<template>
  <Story>
    <Graph :height="200" :space-ratio="0.2">
      <Bar v-for="value in values" :value="value" fill="pink" />
    </Graph>
  </Story>
</template>
