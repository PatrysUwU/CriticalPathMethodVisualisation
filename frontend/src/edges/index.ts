import type { Edge, EdgeTypes } from "@xyflow/react";

export const initialEdges: Edge[] = [
  { id: "e1-2", source: "a", target: "c" },
  { id: "e1-3", source: "a", target: "b" },
  { id: "e1-4", source: "a", target: "d" },
];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
