<script setup lang="ts">
import { useGraphControl } from "./provider";
interface Props {
  value: number;
  name?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
});

const graphContext = useGraphControl("Bar");
const { measurements } = graphContext;
const effectiveHeight = measurements.value.height * (props.value / 100);
</script>

<template>
  <rect :height="effectiveHeight" width="20" fill="sky" style="opacity: 0.2" />
</template>
