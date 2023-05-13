import {
    Grid,
    TextField,
    CircularProgress,
    FormControl,
    InputLabel,
    Typography,
    Card,
    CardContent,
    Select,
    MenuItem,
    IconButton,
    Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CheckCircle } from "@material-ui/icons";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../../../Desktop/barros-barreto-develop-master/src/services/api";


const classes = {
    disabled: {
        backgroundColor: "#DEDEDE",
    },
    btnDischarge: {
        backgroundColor: "#1B98E0",
        color: "white",
        border: "1px solid rgba(0, 0, 0, 0.23)",
    },
    btnReport: {
        backgroundColor: "#1B98E0",
        color: "white",
        border: "1px solid rgba(0, 0, 0, 0.23)",
    },
};

export default function RaspberryMonitoring() {
    const history = useHistory();

    const { moduleId } = useParams();
    const [module, setModule] = useState({ propertyIdentification: "", model: "",
        serialNumber: "", status: "", additionalDescription: "" });

    useEffect(() => {
        api
            .get(`raspberries/${moduleId}`)
            .then((response) => {
                const data = {
                    ...response.data,
                };

                setModule(data);
            })
            .catch((error) => {
                console.err(error);
                alert("O sistema apresentou um erro ao carregar o módulo");
            });
    }, [moduleId]);


    // const Buttons = () => (
    //     <Grid
    //         container
    //         spacing={2}
    //         style={{ marginTop: 10 }}
    //         justifyContent="center"
    //     >
    //         <Grid item>
    //             <Button
    //                 variant="outlined"
    //                 style={classes.btnReport}
    //                 onClick={() => choiceFormat()}
    //             >
    //                 Relatório
    //             </Button>
    //         </Grid>
    //
    //         <Grid item>
    //             <Button
    //                 variant="outlined"
    //                 style={classes.btnDischarge}
    //                 onClick={() => setIsOpenModalDischarge(true)}
    //                 type="submit"
    //             >
    //                 Dar alta
    //             </Button>
    //         </Grid>
    //     </Grid>
    // );

    return (
        <Card style={{ margin: 20 }}>
            <CardContent>
                <Typography
                    variant="h5"
                    align="center"
                    style={{ fontWeight: "bold", marginBottom: 30 }}
                >
                    Monitoramento de Módulo de Mensuração
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Número de identificação"
                            disabled
                            style={classes.disabled}
                            value={module.propertyIdentification}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Modelo"
                            style={classes.disabled}
                            disabled
                            value={module.model}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Número de série"
                            disabled
                            style={classes.disabled}
                            value={module.serialNumber}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Status"
                            disabled
                            style={classes.disabled}
                            value= {module.status === "operante" ? "Em utilização" : "Não utilizado"}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Descrição adicional"
                            disabled
                            multiline={true}
                            rows={4}
                            style={classes.disabled}
                            value={module.additionalDescription}
                        />
                    </Grid>

                    {/*<Buttons />*/}
                </Grid>
            </CardContent>
        </Card>
    );
}
