import type { Node, BuiltInNode } from "@xyflow/react";

export type CPMNode = Node<
  {
    label?: string;
    es?: number;
    t?: number;
    ef?: number;
    ls?: number;
    z?: number;
    lf?: number;
    c?: boolean;
  },
  "CPMNode"
>;
export type AppNode = BuiltInNode | CPMNode;
