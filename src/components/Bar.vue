<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useGraphControl } from "./provider";
interface Props {
  value: number;
  readonly index?: number;
  name?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
});

const { measurements, values, register } = useGraphControl("Bar");

onMounted(() => {
  if (props.index === undefined) return;
  register(props, props.index);
});

const maxValue = computed(() => {
  return Math.max(...values.value);
});

const effectiveHeight = computed(
  () => measurements.value.height * (props.value / maxValue.value)
);

const xPos = computed(() => {
  if (props.index === undefined) return 0;
  return props.index * 30;
});

const yPos = computed(() => {
  return measurements.value.height - effectiveHeight.value;
});
</script>

<template>
  <rect
    :height="effectiveHeight"
    width="20"
    :name="name"
    :x="xPos"
    :y="yPos"
    v-bind="$attrs"
  />
</template>
