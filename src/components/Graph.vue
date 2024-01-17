<script lang="ts">
import { defineComponent, h, computed, VNodeArrayChildren } from "vue";
import Bar from "./Bar.vue";
import { useElementBounding, useParentElement } from "@vueuse/core";
import { useGraphControlProvider } from "./provider";
import type { GraphControlPayload } from "./provider";
import { useClamp } from "@vueuse/math";

export default defineComponent({
  props: {
    height: {
      type: Number,
      default: 240,
    },
    maxWidth: Number,
  },
  setup(props, { slots }) {
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
