import { Grid, Typography, Card, CardContent, Button } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../services/api";
import moment from "moment";
import { validationSchema } from "./validationSchema";
import { components } from "./components";
import Notification from "../../components/Notification/Notification";
import { useHistory, useParams } from "react-router-dom";

const classes = {
  btnSubmit: {
    backgroundColor: "#1B98E0",
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
  cpf: "",
  name: "",
  rg: "",
  birthdate: moment(),
  weight: "",
  height: "",
  doctorResponsible: null,
  hospitalRecord: "",
  diagnostic: "",
  mensureInterval: "",
  entranceDate: moment(),
  raspberry: null,
  maxVolumeInMg: 60,
  minVolumeInMg: 30,
};

export default function EditPatient() {
  const history = useHistory();
  const [notify, setNotify] = useState(INITIAL_VALUE_NOTIFY);

  const { patientId } = useParams();

  const [valuesFormik, setValuesFormik] = useState(INITIAL_VALUES_FORMIK);
  const [doctors, setDoctors] = useState([]);
  const [raspberries, setRaspberries] = useState([]);
  useEffect(() => {
    api.get("doctors").then((response) => {
      setDoctors(response.data);
      console.log("carregou os doutores");
    });

    api.get("raspberries").then((response) => {
      setRaspberries(response.data);
      console.log("carregou os raspberries");
    });
  }, []);

  useEffect(() => {
    const filter = {
      include: ["doctor", "raspberry"],
    };

    api.get(`patients/${patientId}?filter=${JSON.stringify(filter)}`).then((response) => {
      const { data } = response

      setValuesFormik({
        cpf: data.cpf,
        name: data.name,
        rg: data.rg,
        birthdate: moment(data.birthdate),
        weight: data.weightInKg,
        height: data.heightInCm,
        doctorResponsible: data.doctor,
        hospitalRecord: data.hospitalRegister,
        diagnostic: data.diagnostic,
        mensureInterval: data.mensureInterval,
        entranceDate: moment(data.entranceDate),
        raspberry: data.raspberry,
        maxVolumeInMl: data.maxVolumeInMl,
        minVolumeInMl: data.minVolumeInMl,
      });
    });
  }, [patientId, raspberries, doctors]);

  const patch = (values) => {
    //Remove de "values" atributos que não possuem o mesmo nome na
    //api, ou que precisam ser tratados antes de serem enviados
    const {
      height,
      weight,
      doctorResponsible,
      rg,
      hospitalRecord,
      raspberry,
      ...data
    } = values;

    data.hospitalRegister = hospitalRecord;

    data.doctorId = doctorResponsible.id;

    data.raspberryId = raspberry.id;

    data.rg = String(rg);

    //Converte metros para centímetros
    data.heightInCm = parseFloat(height) * 100;

    data.weightInKg = parseFloat(weight);

    api
      .patch(`patients/${patientId}`, data)
      .then((response) => {
        setNotify({
          isOpen: true,
          message: "",
          type: "success",
          title: "Informações atualizadas com sucesso!",
        });

        setTimeout(() => history.push("/choice-patient-monitoring"), 700);
      })
      .catch((err) => {
        const message = err.response?.data?.error?.message;
        console.log(message, err.response)
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
    datePickerFormik,
    dateTimePickerFormik,
    autocompleteFormik,
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
          Cadastro de Paciente
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              {inputMaskFormik({
                id: "cpf",
                label: "CPF",
                mask: "999.999.999-99",
                useOnlyNumbers: true,
              })}
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              {textFieldFormik({ id: "name", label: "Nome" })}
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4}>
              {textFieldFormik({ id: "rg", label: "RG" })}
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4}>
              {textFieldFormik({
                id: "weight",
                label: "Peso (Kg)",
                type: "number",
              })}
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4}>
              {textFieldFormik({
                id: "height",
                label: "Altura (m)",
                type: "number",
              })}
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4}>
              {datePickerFormik({
                id: "birthdate",
                label: "Data de Nascimento",
              })}
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4}>
              {autocompleteFormik({
                id: "doctorResponsible",
                label: "Médico Responsável",
                options: doctors,
                getOptionLabel: (option) =>
                  option.name
                    ? `${option.CRM} - ${option.name}`
                    : "Selecione um médico",
              })}
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4}>
              {textFieldFormik({
                id: "hospitalRecord",
                label: "Registro Hospitalar",
              })}
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4}>
              {selectFormik({
                id: "mensureInterval",
                label: "Intervalo de Mensuração",
                options: [
                  { value: 10, description: "10 minutos" },
                  { value: 30, description: "30 minutos" },
                  { value: 60, description: "60 minutos" },
                ],
              })}
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4}>
              {dateTimePickerFormik({
                id: "entranceDate",
                label: "Data e Hora da entrada",
              })}
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4}>
              {autocompleteFormik({
                id: "raspberry",
                label: "Raspberry",
                options: raspberries,
                getOptionLabel: (option) =>
                  option.model
                    ? `${option.model} - ${option.propertyIdentification}`
                    : "Selecione um Raspberry",
              })}
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              {textFieldFormik({
                id: "minVolumeInMl",
                label: "Volume Mínimo de Urina (Ml)",
                type: "number",
              })}
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              {textFieldFormik({
                id: "maxVolumeInMl",
                label: "Volume Máximo de Urina (Ml)",
                type: "number",
              })}
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              {textFieldFormik({
                id: "diagnostic",
                label: "Diagnóstico",
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
                <Button variant="outlined" style={classes.btnCancel}>
                  Voltar
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="outlined"
                  style={classes.btnSubmit}
                  type="submit"
                >
                  Salvar
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