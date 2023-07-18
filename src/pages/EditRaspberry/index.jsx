import {Grid, Typography, Card, CardContent, Button, Checkbox, FormControlLabel} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../services/api";
import { components } from "./components";
import { validationSchema } from "./validationSchema";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment/moment";
import Notification from "../../components/Notification/Notification";

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
  propertyIdentification: "",
  model: "",
  serialNumber: "",
  additionalDescription: "",
  createdAt: moment(),
  status: "",
  isMaintain: false,
};

export default function EditRaspberry() {
  const history = useHistory();

  const { raspberryId } = useParams();

  const [valuesFormik, setValuesFormik] = useState(INITIAL_VALUES_FORMIK);
  const [notify, setNotify] = useState(INITIAL_VALUE_NOTIFY);

  const [raspberry, setRaspberry] = useState([]);
  useEffect(() => {
    api.get(`/raspberries/${raspberryId}`).then((response) => {
      setRaspberry(response.data);

      const { data } = response;

      setValuesFormik({
        propertyIdentification: data.propertyIdentification,
        model: data.model,
        serialNumber: data.serialNumber,
        additionalDescription: data.additionalDescription,
        isMaintain: data.isMaintain,
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
      propertyIdentification,
      model,
      serialNumber,
      additionalDescription,
        isMaintain,
      ...data
    } = values;

    data.propertyIdentification = propertyIdentification;
    data.model = model;
    data.serialNumber = serialNumber;
    data.additionalDescription = additionalDescription;
    data.isMaintain = isMaintain;

    const newData = removeOptionalValues(
        [
          "propertyIdentification",
          "model",
          "serialNumber",
          "additionalDescription"
        ],
        data
    );

    api
        .patch(`/raspberries/${raspberryId}`, newData)
        .then((response) => {
            setNotify({
                 isOpen: true,
                 message: "",
                type: "success",
              title: "Informações atualizadas com sucesso!",
            });

          setTimeout(() => history.push("/choice-raspberry-edit"), 700);
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
    selectFormik,
  } = components(formik);

  return (
      <Card style={{ margin: 20 }}>
        <CardContent>
          <Typography
              variant="h5"
              align="center"
              style={{ fontWeight: "bold", marginBottom: 30 }}
          >
            Editar informações do Módulo
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                {textFieldFormik({ id: "propertyIdentification", label: "Número de identificação", required: true, })}
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                {textFieldFormik({ id: "model", label: "Modelo", required: true, })}
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                {textFieldFormik({
                  id: "serialNumber",
                  label: "Número de série",
                })}
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}>
                {selectFormik({
                  id: "isMaintain",
                  label: "Em manutenção?",
                  options: [
                    { value: false, description: "Não" },
                    { value: true, description: "Sim" },
                  ],
                })}
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                {textFieldFormik({
                  id: "additionalDescription",
                  label: "Descrição adicional",
                  multiline: true,
                  rows: 4,
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
                      onClick={() => history.push("/choice-raspberry-edit")}  // TODO: Caminho para /choice-module-monitoring
                  >
                    Voltar
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                      variant="outlined"
                      style={classes.btnSubmit}
                      type="submit"
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
