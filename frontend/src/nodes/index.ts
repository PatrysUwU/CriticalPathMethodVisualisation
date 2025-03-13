import type { NodeTypes } from "@xyflow/react";

import { AppNode } from "./types";
import { CPMNode } from "./CPMNode.tsx";

export const initialNodes: AppNode[] = [];

export const nodeTypes = {
  CPMNode: CPMNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
