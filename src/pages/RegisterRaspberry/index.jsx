import {
    Button,
    Card,
    CardContent,
    TextField,
    Grid,
    Typography, FormControl, InputLabel, Select, MenuItem, Autocomplete,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Notification from "../../../src/components/Notification/Notification";
import api from "../../../src/services/api";
import { validationSchema } from "./validationSchema";
import moment from "moment";

const classes = {
    cardRoot: {
        margin: 20,
    },

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

const INITIAL_VALUE_FORMIK = {
    propertyIdentification: "",
    model: "",
    serialNumber: "",
    additionalDescription: "",
    createdAt: moment(),
    status: "",
};

export default function RegisterRaspberry() {
    const history = useHistory();
    const [notify, setNotify] = useState(INITIAL_VALUE_NOTIFY);
    const statusOfModule = {OPERANTE: "está em uso", INOPERANTE: "Não está sendo usado"};

    const post = (values) => {
        //Remove de "values" atributos que não possuem o mesmo nome na
        //api, ou que precisam ser tratados antes de serem enviados
        const {
            serialNumber,
            additionalDescription,
            ...data
        } = values;

        data.serialNumber = serialNumber;
        data.additionalDescription = additionalDescription;



        const newData = removeOptionalValues(
            [
                "serialNumber",
                "additionalDescription"
            ],
            data
        );

        api
            .post("raspberries", newData)
            .then((response) => {
                setNotify({
                    isOpen: true,
                    message: "",
                    type: "success",
                    title: "Módulo de mensuração cadastrado com sucesso!",
                });

                setTimeout(() => history.push("/choice-patient-monitoring"), 700); //TODO: Mudar o caminho para /choice-module-monitoring
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


    const onSubmitSuccessfully = () => {
        setNotify({
            isOpen: true,
            message: "Módulo de mensuração cadastrado com sucesso!",
            type: "success",
            title: "Módulo de mensuração cadastrado!",
        });

        formik.resetForm()
    }

    const onSubmitFailed = (err) => {
        const message = err.response?.data?.error?.message;

        if (message) {
            setNotify({
                isOpen: true,
                message: message,
                type: "error",
                title: "Falha no cadastro!",
            });
        }
    }

    const removeOptionalValues = (optionalValues, data) => {
        const newValue = { ...data };
        optionalValues.forEach((value) => {
            newValue[value] = newValue[value] || undefined;
        });

        return newValue;
    };

    const formik = useFormik({
        initialValues: INITIAL_VALUE_FORMIK,
        validationSchema: validationSchema,
        onSubmit: post,
        enableReinitialize: true,
    });

    const textFieldFormik = ({ id, ...props }) => {
        const onChange = (e) => {
            formik.handleChange(e);
            props.handleChange && props.handleChange(e);
        };

        return (
            <TextField
                size="small"
                fullWidth
                id={id}
                name={id}
                label={props.label || id}
                value={formik.values[id]}
                onChange={onChange}
                error={formik.touched[id] && Boolean(formik.errors[id])}
                helperText={formik.touched[id] && formik.errors[id]}
                sx={classes.asterixRed}
                {...props}
            />
        );
    };

    const autocompleteFormik = ({ id, getOptionLabel, options, ...props }) => (
        <Autocomplete
            disablePortal
            fullWidth
            size="small"
            value={formik.values[id] || null}
            onChange={(event, newValue) => {
                formik.setFieldValue(id, newValue);
            }}
            getOptionLabel={getOptionLabel}
            options={options}
            renderInput={(params) => (
                <TextField
                    error={formik.touched[id] && Boolean(formik.errors[id])}
                    helperText={formik.touched[id] && formik.errors[id]}
                    label={props.label}
                    required={props.required}
                    sx={classes.asterixRed}
                    {...params}
                />
            )}
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
                    Cadastro de Módulo de Mensuração
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
                                    onClick={() => history.push("/choice-patient-monitoring")}
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
