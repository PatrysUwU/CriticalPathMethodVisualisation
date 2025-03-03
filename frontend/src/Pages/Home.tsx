import { Container, Typography, Button, Box, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { FieldArray, Form, Formik } from "formik";
import CloseIcon from "@mui/icons-material/Close";

interface Row {
  activity: string;
  time: number;
  prevActivities: string;
}

const initialValues = {
  rows: [
    {
      activity: "",
      time: 1,
      prevActivities: "",
    },
  ],
};

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        Wpisz Dane
      </Typography>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <FieldArray name="rows">
              {({ insert, remove, push }) => {
                return (
                  <Box>
                    {values.rows.length > 0 &&
                      values.rows.map((_, index) => (
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
                            />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <TextField
                              label="Previous Activities"
                              name={`rows[${index}].prevActivities`}
                              value={values.rows[index].prevActivities}
                              onChange={handleChange}
                              fullWidth
                            />
                          </Box>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => remove(index)}
                            sx={{
                              ml: 2,
                              height: "30px",
                              aspectRatio: "1/1",
                              alignSelf: "center",
                            }}
                          >
                            <CloseIcon></CloseIcon>
                          </Button>
                        </Box>
                      ))}
                    <Button
                      variant="outlined"
                      onClick={() =>
                        push({ activity: "", time: 0, prevActivities: "" })
                      }
                    >
                      Add Row
                    </Button>
                  </Box>
                );
              }}
            </FieldArray>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>

      <Button
        component={Link}
        to="/graph"
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
      >
        Zobacz Graf
      </Button>
    </Container>
  );
}
