import {
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import MaskInput from "../../components/MaskInput";
import Notification from "../../components/Notification/Notification";
import api from "../../services/api";
import { validationSchema } from "./validationSchema";

const classes = {
  cardRoot: {
    margin: 20,
  },

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

export default function RegisterDoctor() {
  const [notify, setNotify] = useState(INITIAL_VALUE_NOTIFY);

  const post = (values) => {
    const { confirmPassword, ...newValues } = values;
    api
      .post("doctors", newValues)
      .then(() => {
        setNotify({
          isOpen: true,
          message: "Médico cadastrado com sucesso!",
          type: "success",
          title: "Médico cadastrado!",
        });
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
      email: "",
      name: "",
      CRM: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: post,
  });

  const textFieldFormik = ({ id, ...props }) => (
    <TextField
      size="small"
      fullWidth
      id={id}
      name={id}
      label={props.label || id}
      value={formik.values[id]}
      onChange={formik.handleChange}
      error={formik.touched[id] && Boolean(formik.errors[id])}
      helperText={formik.touched[id] && formik.errors[id]}
      required={true}
      {...props}
    />
  );

  const inputMaskFormik = ({ id, mask, useRawValue, ...props }) => (
    <MaskInput
      size="small"
      mask={mask}
      useRawValue={useRawValue}
      fullWidth
      id={id}
      name={id}
      label={props.label || id}
      value={formik.values[id]}
      onChange={formik.handleChange}
      error={formik.touched[id] && Boolean(formik.errors[id])}
      helperText={formik.touched[id] && formik.errors[id]}
      required={true}
      {...props}
    />
  );

  return (
    <Card style={classes.cardRoot}>
      <CardContent>
        <Typography
          variant="h5"
          align="center"
          style={{ fontWeight: "bold", marginBottom: 30 }}
        >
          Cadastro de Médico
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              {textFieldFormik({ id: "name", label: "Nome" })}
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={3}>
              {textFieldFormik({ id: "email", label: "E-mail" })}
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={3}>
              {inputMaskFormik({
                id: "CRM",
                label: "CRM",
                mask: "999999-aa",
                useRawValue: true,
              })}
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={3}>
              {inputMaskFormik({
                id: "phone",
                label: "Telefone",
                mask: "(99) 99999-9999",
                useRawValue: true,
              })}
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              {textFieldFormik({
                id: "password",
                label: "Senha",
                type: "password",
              })}
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              {textFieldFormik({
                id: "confirmPassword",
                label: "Confirmar senha",
                type: "password",
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
                  type="submit"
                  style={classes.btnSubmit}
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
