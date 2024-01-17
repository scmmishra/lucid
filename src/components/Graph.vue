<script setup lang="ts">
import { useElementBounding, useParentElement } from "@vueuse/core";
import { useGraphControlProvider } from "./provider";
import type { GraphControlPayload } from "./provider";

import { useClamp } from "@vueuse/math";
import { computed } from "vue";

interface Props {
  height: number;
  maxWidth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  height: 240,
});

const parent = useParentElement();
const { width } = useElementBounding(parent);
const effectiveWidth = useClamp(width, 0, props.maxWidth ?? width);

const measurements = computed(() => ({
  height: props.height,
  width: effectiveWidth.value,
}));

const api: GraphControlPayload = {
  measurements: measurements,
};

useGraphControlProvider(api);
</script>

<template>
  <svg :height="height" :width="effectiveWidth">
    <slot />
  </svg>
</template>
