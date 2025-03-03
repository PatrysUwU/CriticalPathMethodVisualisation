import { Box } from "@mui/material";
import Graph from "../Components/Graph.tsx";

export default function GraphPage() {
  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex" }}>
      <Graph />
    </Box>
  );
}
