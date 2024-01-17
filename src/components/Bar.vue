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

const { measurements, dataset, register } = useGraphControl("Bar");

onMounted(() => {
  if (props.index === undefined) return;
  register(props, props.index);
});

const maxValue = computed(() => {
  return Math.max(...dataset.value.map((item) => item.value));
});

const effectiveHeight = computed(
  () => measurements.value.height * (props.value / maxValue.value)
);

const effectiveWidth = computed(() => {
  const { width, spaceRatio } = measurements.value;
  const numberOfBars = dataset.value.length;

  const barWidth = width / numberOfBars;
  return barWidth * (1 - spaceRatio);
});

const xPos = computed(() => {
  const { width } = measurements.value;
  const numberOfBars = dataset.value.length;

  const spaceWidth = (width * measurements.value.spaceRatio) / numberOfBars;

  const barWidth = (width + spaceWidth) / numberOfBars;

  if (props.index === undefined) return 0;
  return props.index * barWidth;
});

const yPos = computed(() => {
  return measurements.value.height - effectiveHeight.value;
});
</script>

<template>
  <rect
    :height="effectiveHeight"
    :width="effectiveWidth"
    :name="name"
    :x="xPos"
    :y="yPos"
    v-bind="$attrs"
  />
</template>
