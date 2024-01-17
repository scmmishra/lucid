import { inject, provide } from "vue";
import type { ComputedRef, InjectionKey } from "vue";

export type Dataset = {
  value: number;
};

export type GraphControlPayload = {
  register(payload: Dataset, index: number): void;
  values: ComputedRef<number[]>;
  measurements: ComputedRef<{
    width: number;
    height: number;
    xOffset?: number;
    yOffset?: number;
    containerWidth?: number;
    containerHeight?: number;
  }>;
};

export const graphControl = Symbol(
  "GraphControl"
) as InjectionKey<GraphControlPayload>;

export function useGraphControl(component: string) {
  const context = inject(graphControl, null);

  if (context === null) {
    const err = new Error(
      `<${component} /> is missing a parent <Graph /> component.`
    );
    if (Error.captureStackTrace) Error.captureStackTrace(err, useGraphControl);
    throw err;
  }

  return context;
}

export function useGraphControlProvider(value: GraphControlPayload) {
  return provide(graphControl, value);
}
