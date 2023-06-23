import { Grid, Typography, Card, CardContent, Button } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../services/api";
import { components } from "./components";
import { validationSchema } from "./validationSchema";
import Notification from "../../components/Notification/Notification";
import { useHistory, useParams } from "react-router-dom";

const classes = {
  btnSubmit: {
    backgroundColor: "#075d85",
    color: "white",
    border: "1px solid rgba(0, 0, 0, 0.23)",
  },
  btnCancel: {
    backgroundColor: "#CFCFCF",
    color: "black",
    border: "1px solid rgba(0, 0, 0, 0.23)",
  },
};

const INITIAL_VALUE_NOTIFY = {
  isOpen: false,
  message: "",
  type: "",
  title: "",
};

const INITIAL_VALUES_FORMIK = {
  name: "",
  ctiPhone: "",
  onDutyPhone: "",
};

export default function EditHospital() {
  const history = useHistory();

  const { hospitalId } = useParams();

  const [valuesFormik, setValuesFormik] = useState(INITIAL_VALUES_FORMIK);
  const [notify, setNotify] = useState(INITIAL_VALUE_NOTIFY);

  const [hospital, setHospital] = useState([]);
  useEffect(() => {
    api.get(`/hospitals/${hospitalId}`).then((response) => {
      setHospital(response.data);

      const { data } = response;

      setValuesFormik({
        name: data.name,
        ctiPhone: data.ctiPhone,
        onDutyPhone: data.onDutyPhone,
      });
    });
  }, []);

  const removeOptionalValues = (optionalValues, data) => {
    const newValue = { ...data };
    optionalValues.forEach((value) => {
      newValue[value] = newValue[value] || undefined;
    });

    return newValue;
  };

  const patch = (values) => {
    //Remove de "values" atributos que não possuem o mesmo nome na
    //api, ou que precisam ser tratados antes de serem enviados
    const {
      ctiPhone,
      onDutyPhone,
      ...data
    } = values;

    data.ctiPhone = ctiPhone;

    data.onDutyPhone = onDutyPhone;

    const newData = removeOptionalValues(
        [
          "ctiPhone",
          "onDutyPhone",
        ],
        data
    );

    api
        .patch(`/hospitals/${hospitalId}`, newData)
        .then((response) => {
          setNotify({
            isOpen: true,
            message: "",
            type: "success",
            title: "Informações atualizadas com sucesso!",
          });

          // setTimeout(() => history.push("/choice-patient-monitoring"), 700);
        })
        .catch((err) => {
          const message = err.response?.data?.error?.message;
          if (message) {
            setNotify({
              isOpen: true,
              message: message,
              type: "error",
              title: "Falha ao realizar edições!",
            });
          }
        });
  };
  const formik = useFormik({
    initialValues: valuesFormik,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: patch,
  });

  const {
    textFieldFormik,
    inputMaskFormik,
  } = components(formik);

  return (
      <Card style={{ margin: 20 }}>
        <CardContent>
          <Typography
              variant="h5"
              align="center"
              style={{ fontWeight: "bold", marginBottom: 30 }}
          >
            Editar informações do hospital
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                {textFieldFormik({
                  id: "name",
                  label: "Nome do Hospital",
                  required: true,
                })}
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={6}>
                {inputMaskFormik({
                  id: "ctiPhone",
                  label: "Telefone do CTI",
                  mask: "(99) 99999-9999",
                  useRawValue: true,
                })}
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={6}>
                {inputMaskFormik({
                  id: "onDutyPhone",
                  label: "Telefone do Plantão",
                  mask: "(99) 99999-9999",
                  useRawValue: true,
                })}
              </Grid>

              <Grid
                  container
                  spacing={2}
                  style={{ marginTop: 10 }}
                  justifyContent="center"
              >
                <Grid item>
                  <Button
                      variant="outlined"
                      style={classes.btnCancel}
                      onClick={() => history.push("/choice-hospital-edit")}
                  >
                    Voltar
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                      variant="outlined"
                      type="submit"
                      style={classes.btnSubmit}
                  >
                    Editar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </CardContent>
        <Notification notify={notify} setNotify={setNotify} />
      </Card>
  );
}