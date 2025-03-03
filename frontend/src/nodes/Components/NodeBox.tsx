import { Box } from "@mui/material";

export default function NodeBox({ children }: { children: number | string }) {
  return (
    <Box
      sx={{
        border: "solid 1px grey",
        borderRadius: "5px",
      }}
    >
      {children}
    </Box>
  );
}
