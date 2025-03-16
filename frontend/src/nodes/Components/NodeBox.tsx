import { Box, Tooltip } from "@mui/material";

export default function NodeBox({
  title,
  children,
}: {
  title: string;
  children: number | string;
}) {
  return (
    <Tooltip title={title || ""} placement={"top"} disableInteractive>
      <Box
        sx={{
          border: "solid 1px grey",
          borderRadius: "5px",
        }}
      >
        {children}
      </Box>
    </Tooltip>
  );
}
