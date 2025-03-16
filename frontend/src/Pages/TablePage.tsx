import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { CPMNode } from "../nodes/types.ts";

export default function TablePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const rows = location.state.nodes;

  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Activity name</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Earliest start</TableCell>
              <TableCell>Latest start</TableCell>
              <TableCell>Earliest finish</TableCell>
              <TableCell>Latest finish</TableCell>
              <TableCell>Reserve</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: CPMNode) => (
              <TableRow
                key={row.data.label}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: row.data.c
                    ? {
                        background: "linear-gradient(120deg, #a8e6cf, #d4fc79)",
                      }
                    : "white",
                }}
              >
                <TableCell component="th" scope="row">
                  {row.data.label}
                </TableCell>
                <TableCell>{row.data.t}</TableCell>
                <TableCell>{row.data.es}</TableCell>
                <TableCell>{row.data.ls}</TableCell>
                <TableCell>{row.data.ef}</TableCell>
                <TableCell>{row.data.lf}</TableCell>
                <TableCell>{row.data.z}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button sx={{ mt: 2 }} variant={"contained"} onClick={() => navigate(-1)}>
        Back
      </Button>
    </Container>
  );
}
