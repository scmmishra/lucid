<script setup lang="ts">
import { computed } from "vue";
import { useGraphControl } from "./provider";
interface Props {
  value: number;
  readonly index?: number;
  name?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
});

const graphContext = useGraphControl("Bar");
const { measurements } = graphContext;
const effectiveHeight = measurements.value.height * (props.value / 100);

const xPos = computed(() => {
  if (props.index === undefined) return 0;
  return props.index * 30;
});

const yPos = computed(() => {
  return measurements.value.height - effectiveHeight;
});
</script>

<template>
  <rect
    :height="effectiveHeight"
    width="20"
    fill="sky"
    style="opacity: 0.2"
    :x="xPos"
    :y="yPos"
  />
</template>
