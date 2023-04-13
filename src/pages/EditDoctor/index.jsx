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
    name: "",
    email: "",
    CRM: "",
    phone: "",
    password: "",
    confirmPassword: "",
};

export default function EditDoctor() {
    const history = useHistory();
    const [notify, setNotify] = useState(INITIAL_VALUE_NOTIFY);

    const { doctorId } = useParams();

    const [valuesFormik, setValuesFormik] = useState(INITIAL_VALUES_FORMIK);
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        api.get("doctors").then((response) => {
            setDoctors(response.data);
        });
    }, []);

    useEffect(() => {
        const filter = {
            include: ["doctor", "raspberry"],
        };

        api
            .get(`doctors/${doctorId}?filter=${JSON.stringify(filter)}`)
            .then((response) => {
                const { data } = response;

                setValuesFormik({
                    cpf: data.cpf,
                    name: data.name,
                    rg: data.rg || "",
                    birthdate: moment(data.birthdate),
                    weight: data.weightInKg || "",
                    height: data.heightInCm || "",
                    doctorResponsible: data.doctor || null,
                    hospitalRecord: data.hospitalRegister,
                    diagnostic: data.diagnostic || "",
                    mensureInterval: data.mensureInterval || null,
                    entranceDate: moment(data.entranceDate),
                    raspberry: data.raspberry || null,
                    maxVolumeInMl: data.maxVolumeInMl || "",
                    minVolumeInMl: data.minVolumeInMl || "",
                    normalVolumeInMl: data.maxVolumeInMl / 1.3,
                });
            });
    }, [patientId, raspberries, doctors]);

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
            ],
            data
        );

        api
            .patch(`patients/${patientId}`, newData)
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
        checkBoxForDefaulVolume,
    } = components(formik);


    return (
        <Card style={{ margin: 20 }}>
            <CardContent>
                <Typography
                    variant="h5"
                    align="center"
                    style={{ fontWeight: "bold", marginBottom: 30 }}
                >
                    Edição de Médico
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            {textFieldFormik({ id: "name", label: "Nome" })}
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            {textFieldFormik({ id: "email", label: "E-mail" })}
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            {textFieldFormik({ id: "CRM", label: "CRM" })}
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            {textFieldFormik({ id: "phone", label: "Telefone" })}
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