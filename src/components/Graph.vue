<script lang="ts">
import { defineComponent, ref, h, computed } from "vue";

import { useElementBounding, useParentElement } from "@vueuse/core";
import { useClamp } from "@vueuse/math";

import Bar from "./Bar.vue";
import { useGraphControlProvider } from "./provider";

import type { VNodeArrayChildren } from "vue";
import type { DatasetItem, GraphControlPayload } from "./provider";

export default defineComponent({
  props: {
    height: {
      type: Number,
      default: 240,
    },
    maxWidth: Number,
    spaceRatio: {
      type: Number,
      default: 0.5,
    },
  },
  setup(props, { slots }) {
    const dataset = ref<DatasetItem[]>([]);
    const parent = useParentElement();
    const { width } = useElementBounding(parent);
    const effectiveWidth = useClamp(width, 0, props.maxWidth ?? width);

    const measurements = computed(() => ({
      height: props.height,
      width: effectiveWidth.value,
      spaceRatio: useClamp(props.spaceRatio, 0, 1).value,
    }));

    const api: GraphControlPayload = {
      register: (payload, index) => {
        dataset.value[index] = payload;
      },
      dataset: dataset,
      measurements: measurements,
    };

    useGraphControlProvider(api);

    const barSlots = computed(() => {
      if (!slots.default) return [];

      const slotChildren = slots.default()[0].children as VNodeArrayChildren;

      if (!slotChildren) return [];

      if (Array.isArray(slotChildren)) {
        return slotChildren.map((vnode, index) => {
          if (typeof vnode === "string") return vnode;
          if (typeof vnode === "number") return vnode;
          if (typeof vnode === "boolean") return vnode;
          if (Array.isArray(vnode)) return vnode;
          if (vnode === null) return vnode;
          if (vnode === undefined) return vnode;
          if (vnode.type !== Bar) return vnode;

          return h(vnode.type, {
            ...vnode.props,
            index,
          });
        });
      }

      return [];
    });

    return () =>
      h(
        "svg",
        {
          height: props.height,
          width: effectiveWidth.value,
        },
        barSlots.value
      );
  },
});
</script>
