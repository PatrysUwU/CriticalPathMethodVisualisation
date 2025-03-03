import type { NodeTypes } from "@xyflow/react";

import { AppNode } from "./types";
import { CPMNode } from "./CPMNode.tsx";

export const initialNodes: AppNode[] = [
  {
    id: "a",
    type: "CPMNode",
    position: { x: 0, y: 0 },
    data: { label: "A" },
  },
  {
    id: "b",
    type: "CPMNode",
    position: { x: -100, y: 100 },
    data: { label: "B" },
  },

  {
    id: "c",
    type: "CPMNode",
    position: { x: -100, y: 100 },
    data: { label: "C" },
  },
  {
    id: "d",
    type: "CPMNode",
    position: { x: -100, y: 100 },
    data: { label: "D", c: true },
  },
];

export const nodeTypes = {
  CPMNode: CPMNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
