import { Grid, Typography, Card, CardContent, Button } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../services/api";
import moment from "moment";
import { validationSchema } from "./validationSchema";
import { components } from "./components";
import Notification from "../../components/Notification/Notification";
import { useHistory } from "react-router-dom";

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

export default function RegisterPatient() {
  const history = useHistory();
  const [notify, setNotify] = useState(INITIAL_VALUE_NOTIFY);
  const [choiceDefaultValueForVolume, setChoiceDefaultValueForVolume] =
    useState(true);
  const [doctors, setDoctors] = useState([]);
  const [raspberries, setRaspberries] = useState([]);

  useEffect(() => {
    api.get("doctors").then((response) => {
      setDoctors(response.data);
    });

    api.get("raspberries").then((response) => {
      setRaspberries(response.data);
    });
  }, []);

  //Valores que sejam reconhecidos como falso no JS, serão ignorados no envio de dados
  const removeOptionalValues = (optionalValues, data) => {
    const newValue = { ...data };
    optionalValues.forEach((value) => {
      newValue[value] = newValue[value] || undefined;
    });

    return newValue;
  };

  const post = (values) => {
    //Remove de "values" atributos que não possuem o mesmo nome na
    //api, ou que precisam ser tratados antes de serem enviados
    const {
      height,
      weight,
      doctorResponsible,
      rg,
      hospitalRecord,
      raspberry,
      normalVolumeInMl,
      ...data
    } = values;

    data.hospitalRegister = hospitalRecord;

    data.doctorId = doctorResponsible?.id;

    data.raspberryId = raspberry?.id;

    data.rg = String(rg);

    //Converte metros para centímetros
    data.heightInCm = parseFloat(height) * 100;

    data.weightInKg = parseFloat(weight);

    const newData = removeOptionalValues(
      [
        "mensureInterval",
        "heightInCm",
        "weightInKg",
        "rg",
        "maxVolumeInMl",
        "minVolumeInMl",
        "diagnostic",
        "birthdate",
        "entranceDate"
      ],
      data
    );

    api
      .post("patients", newData)
      .then((response) => {
        setNotify({
          isOpen: true,
          message: "",
          type: "success",
          title: "Paciente cadastrado com sucesso!",
        });

        setTimeout(() => history.push("/choice-patient-monitoring"), 700);
      })
      .catch((err) => {
        const message = err.response?.data?.error?.message;

        if (message) {
          setNotify({
            isOpen: true,
            message: message,
            type: "error",
            title: "Falha no cadastro!",
          });
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      cpf: "",
      name: "",
      rg: "",
      birthdate: null,
      weight: "",
      height: "",
      doctorResponsible: null,
      hospitalRecord: "",
      diagnostic: "",
      mensureInterval: "",
      entranceDate: moment(),
      maxVolumeInMl: "",
      minVolumeInMl: "",
      normalVolumeInMl: "",
      raspberry: null,
    },
    validationSchema: validationSchema,
    onSubmit: post,
  });

  const {
    textFieldFormik,
    inputMaskFormik,
    datePickerFormik,
    dateTimePickerFormik,
    autocompleteFormik,
    selectFormik,
    checkBoxForDefaulVolume,
  } = components(formik);

  const calcLimits = (event) => {
    const newWeight = parseFloat(event.target.value) || 0;
    const normalVolume = newWeight / 2;

    formik.setFieldValue("normalVolumeInMl", normalVolume || "");
    formik.setFieldValue("minVolumeInMl", normalVolume * 0.7 || "");
    formik.setFieldValue("maxVolumeInMl", normalVolume * 1.3 || "");
  };

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
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ textAlign: "right", color: "#EE2222" }}
            >
              <span>Os campos com * são obrigatórios</span>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              {inputMaskFormik({
                id: "cpf",
                label: "CPF",
                mask: "999.999.999-99",
                useOnlyNumbers: true,
                required: true,
              })}
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              {textFieldFormik({ id: "name", label: "Nome", required: true })}
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4}>
              {textFieldFormik({ id: "rg", label: "RG" })}
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4}>
              {textFieldFormik({
                id: "weight",
                label: "Peso (Kg)",
                type: "number",
                required: true,
                handleChange: calcLimits,
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
                required: true,
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
                required: true,
              })}
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4}>
              {selectFormik({
                id: "mensureInterval",
                label: "Intervalo de Mensuração",
                required: true,
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
                label: "Módulo",
                options: raspberries,
                required: true,
                getOptionLabel: (option) =>
                  option.model
                    ? `${option.model} - ${option.propertyIdentification}`
                    : "Selecione um Módulo",
              })}
            </Grid>
            <Grid item xs={12}>
              {checkBoxForDefaulVolume({
                id: "choiceDefaultValueForVolume",
                checked: choiceDefaultValueForVolume,
                label: "Determinar os limites de urina de forma automática?",
                onChange: () => {
                  setChoiceDefaultValueForVolume((state) => !state);
                },
              })}
            </Grid>

            {choiceDefaultValueForVolume ? (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                {textFieldFormik({
                  id: "normalVolumeInMl",
                  label: "Volume Base de Urina (Ml)",
                  type: "number",
                })}
              </Grid>
            ) : (
              <>
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
              </>
            )}

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
                <Button
                  variant="outlined"
                  style={classes.btnCancel}
                  onClick={() => history.push("/choice-patient-monitoring")}
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
                  Cadastrar
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
