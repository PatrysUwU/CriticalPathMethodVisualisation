import { Handle, Position, type NodeProps } from "@xyflow/react";

import { type CPMNode } from "./types";
import { Box, Grid2 } from "@mui/material";
import NodeBox from "./Components/NodeBox.tsx";

export function CPMNode({ data }: NodeProps<CPMNode>) {
  return (
    <Box
      sx={{
        backgroundColor: data.c
          ? {
              background: "linear-gradient(120deg, #a8e6cf, #d4fc79)",
            }
          : "white",
      }}
      className="react-flow__node-default"
    >
      <Grid2 container spacing={2}>
        <Grid2 size={4}>
          <NodeBox>{data.es || 0}</NodeBox>
        </Grid2>
        <Grid2 size={4}>
          <NodeBox>{data.t || 0}</NodeBox>
        </Grid2>
        <Grid2 size={4}>
          <NodeBox>{data.ef || 0}</NodeBox>
        </Grid2>
        <Grid2 size={12}>
          <NodeBox>{data.label || ""}</NodeBox>
        </Grid2>
        <Grid2 size={4}>
          <NodeBox>{data.ls || 0}</NodeBox>
        </Grid2>
        <Grid2 size={4}>
          <NodeBox>{data.z || 0}</NodeBox>
        </Grid2>
        <Grid2 size={4}>
          <NodeBox>{data.lf || 0}</NodeBox>
        </Grid2>
      </Grid2>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </Box>
  );
}
