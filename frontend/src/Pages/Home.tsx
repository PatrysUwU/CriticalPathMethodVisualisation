import { Container, Typography, Button, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import * as axios from "axios";
import { useEffect, useState } from "react";

interface Row {
  activity: string;
  time: number;
  prevActivities?: string;
}

const storedValues = localStorage.getItem("formData");
const initialValues: { rows: Row[] } = storedValues
  ? JSON.parse(storedValues)
  : { rows: [{ activity: "", time: 1, prevActivities: "" }] };

const validationSchema = Yup.object({
  rows: Yup.array().of(
    Yup.object({
      activity: Yup.string().required("Activity name is required"),
      time: Yup.number()
        .required("Time is required")
        .positive("Time must be positive"),
      prevActivities: Yup.string().matches(
        /^([A-Za-z]+)(,([A-Za-z]+))*$/,
        "Previous activities must be in format A,B,C",
      ),
    }),
  ),
});

export default function Home() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    const storedValues = localStorage.getItem("formData");
    if (storedValues) {
      setFormValues(JSON.parse(storedValues));
    }
  }, []);

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        Wpisz Dane
      </Typography>

      <Formik
        initialValues={formValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          localStorage.setItem("formData", JSON.stringify(values));
          const response = await axios.default.post(
            "http://localhost:3000/CPM",
            values,
          );
          const newNodes = response.data.nodes.map((item) => ({
            id: item.id,
            type: "CPMNode",
            position: { x: 0, y: 0 },
            data: { ...item.data, label: item.id },
          }));
          const newEdges = response.data.edges
            ? response.data.edges.map((item) => ({ ...item }))
            : [];
          navigate("/graph", { state: { nodes: newNodes, edges: newEdges } });
        }}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <FieldArray name="rows">
              {({ insert, remove, push }) => (
                <Box>
                  {values.rows.length > 0 &&
                    values.rows.map((row, index) => (
                      <Box
                        key={index}
                        sx={{
                          mb: 2,
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ flex: 1, mr: 1 }}>
                          <TextField
                            label="Activity"
                            name={`rows[${index}].activity`}
                            value={values.rows[index].activity}
                            onChange={handleChange}
                            fullWidth
                            error={
                              touched.rows?.[index]?.activity &&
                              Boolean(errors.rows?.[index]?.activity)
                            }
                            helperText={
                              touched.rows?.[index]?.activity &&
                              errors.rows?.[index]?.activity
                            }
                          />
                        </Box>
                        <Box sx={{ flex: 1, mr: 1 }}>
                          <TextField
                            label="Time"
                            name={`rows[${index}].time`}
                            type="number"
                            value={values.rows[index].time}
                            onChange={handleChange}
                            fullWidth
                            error={
                              touched.rows?.[index]?.time &&
                              Boolean(errors.rows?.[index]?.time)
                            }
                            helperText={
                              touched.rows?.[index]?.time &&
                              errors.rows?.[index]?.time
                            }
                          />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <TextField
                            label="Previous Activities"
                            name={`rows[${index}].prevActivities`}
                            value={values.rows[index].prevActivities}
                            onChange={handleChange}
                            fullWidth
                            error={
                              touched.rows?.[index]?.prevActivities &&
                              Boolean(errors.rows?.[index]?.prevActivities)
                            }
                            helperText={
                              touched.rows?.[index]?.prevActivities &&
                              errors.rows?.[index]?.prevActivities
                            }
                          />
                        </Box>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => remove(index)}
                          sx={{ ml: 2, alignSelf: "center" }}
                        >
                          <CloseIcon />
                        </Button>
                      </Box>
                    ))}
                  <Button
                    variant="outlined"
                    onClick={() =>
                      push({ activity: "", time: 1, prevActivities: "" })
                    }
                  >
                    Add Row
                  </Button>
                </Box>
              )}
            </FieldArray>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                localStorage.removeItem("formData");
                window.location.reload();
              }}
              sx={{ ml: 2, mt: 3 }}
            >
              Reset
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
