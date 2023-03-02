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
import api from "../../services/api";
import moment from "moment";
import GraphMonitoring from "../../components/GraphMonitoring";
import { makeReports } from "../../utils/makeReports";
import ModalChoiceReportFormat from "../../components/ModalChoiceReportFormat";
import ModalDischarge from "./ModalDischarge";

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

const fakeNotifications = [
  {
    reason: "Urinou muito",
    date: new Date(2023, 0, 6),
    hour: "10:30",
    volume: 200,
  },
  {
    reason: "Urinou pouco",
    date: new Date(2023, 0, 6),
    hour: "11:30",
    volume: 20,
  },
  {
    reason: "Urinou muito",
    date: new Date(2023, 0, 6),
    hour: "12:30",
    volume: 300,
  },
  {
    reason: "Urinou pouco",
    date: new Date(2023, 0, 6),
    hour: "13:30",
    volume: 30,
  },
];

export default function Monitoring() {
  const history = useHistory();

  const { patientId } = useParams();
  const [patient, setPatient] = useState({ name: "", volume: "", date: "" });
  const [mensureInterval, setMensureInterval] = useState("");
  const [isLoadingMensureInterval, setIsLoadingMensureInterval] =
    useState(false);
  const [isOpenModalChoiceFormat, setIsOpenModalChoiceFormat] = useState(false);
  const [isOpenModalDischarge, setIsOpenModalDischarge] = useState(false);

  useEffect(() => {
    api
      .get(`patients/${patientId}`)
      .then((response) => {
        const data = {
          ...response.data,
          notifications: fakeNotifications,
        };

        data.measures = !!data.measures
          ? data.measures.sort((a, b) => {
              const dateA = moment(a.time);
              const dateB = moment(b.time);

              return dateA.isAfter(dateB) ? 1 : -1;
            })
          : [];

        setPatient(data);
        setMensureInterval(data.mensureInterval);
      })
      .catch((error) => {
        console.err(error);
        alert("O sistema apresentou um erro ao carregar o paciente");
      });
  }, [patientId]);

  const getHospitalizedTime = () => {
    const init = moment(patient.entranceDate);
    const result = moment();

    result.subtract(init);

    return result.format("HH[h] [e] mm[min]");
  };

  const updateMensureInterval = () => {
    setIsLoadingMensureInterval(true);
    const data = {
      mensureInterval,
    };

    api
      .patch(`patients/${patientId}`, data)
      .then((response) => {
        setPatient((prev) => {
          return { ...prev, mensureInterval };
        });
      })
      .catch((err) => {
        alert("Erro ao atualizar tempo de mensuração");
      })
      .finally(() => {
        setIsLoadingMensureInterval(false);
      });
  };

  const SelectMensureInterval = () => (
    <FormControl fullWidth size="small">
      <InputLabel>Intervalo de Mensuração</InputLabel>
      <Select
        label="Intervalo de Mensuração"
        onChange={(e) => setMensureInterval(e.target.value)}
        value={mensureInterval}
      >
        <MenuItem value={10}>10 minutos</MenuItem>
        <MenuItem value={30}>30 minutos</MenuItem>
        <MenuItem value={60}>60 minutos</MenuItem>
      </Select>
    </FormControl>
  );

  const sumVolume = () => {
    let sum = 0;

    if (patient.measures) {
      patient.measures.forEach((measure) => {
        const volume = measure.volumeInMg;
        sum += volume;
      });
    }

    return sum || 0;
  };

  const onChoiceFormat = (format) => {
    makeReports({ patient, format });
  };

  const choiceFormat = () => {
    setIsOpenModalChoiceFormat(true);
  };

  const onDischarge = (dischargedFromHospital) => {
    const data = {
      dischargedFromHospital,
    };

    api
      .patch(`patients/${patientId}`, data)
      .then((response) => {
        setPatient((prev) => {
          return { ...prev, dischargedFromHospital };
        });

        setTimeout(() => history.push("/choice-patient-monitoring"), 700);
      })
      .catch((err) => {
        alert("Erro ao dar alta para o paciente");
      });
  };

  const Buttons = () => (
    <Grid
      container
      spacing={2}
      style={{ marginTop: 10 }}
      justifyContent="center"
    >
      <Grid item>
        <Button
          variant="outlined"
          style={classes.btnReport}
          onClick={() => choiceFormat()}
        >
          Relatório
        </Button>
      </Grid>

      <Grid item>
        <Button
          variant="outlined"
          style={classes.btnDischarge}
          onClick={() => setIsOpenModalDischarge(true)}
          type="submit"
        >
          Dar alta
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <Card style={{ margin: 20 }}>
      <CardContent>
        <Typography
          variant="h5"
          align="center"
          style={{ fontWeight: "bold", marginBottom: 30 }}
        >
          Monitoramento de Paciente
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              fullWidth
              size="small"
              label="Nome do Paciente"
              disabled
              style={classes.disabled}
              value={patient.name}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              fullWidth
              size="small"
              required
              label="Volume Total"
              style={classes.disabled}
              disabled
              value={`${sumVolume()} mg/H`}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              fullWidth
              size="small"
              required
              label="Iníco"
              disabled
              style={classes.disabled}
              value={moment(patient.date).format("DD/MM/YYYY")}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              fullWidth
              size="small"
              required
              label="Tempo Internado"
              disabled
              style={classes.disabled}
              value={getHospitalizedTime()}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              fullWidth
              size="small"
              required
              label="Dia da Entrada"
              disabled
              style={classes.disabled}
              value={moment(patient.entranceDate).format("DD/MM/YYYY")}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              fullWidth
              size="small"
              required
              label="Hora da Entrada"
              disabled
              style={classes.disabled}
              value={moment(patient.entranceDate).format("HH:mm[h]")}
            />
          </Grid>

          <Grid item container xs={12} sm={4} md={4} lg={4}>
            <Grid item xs={10} sm={10} md={10} lg={10}>
              <SelectMensureInterval />
            </Grid>

            <Grid item xs={2} sm={2} md={2} lg={2}>
              <IconButton
                style={{
                  width: "100%",
                  color:
                    mensureInterval === patient.mensureInterval
                      ? "#1B98E0"
                      : "#ff8833",
                }}
                onClick={updateMensureInterval}
              >
                {isLoadingMensureInterval ? (
                  <CircularProgress size="20px" />
                ) : (
                  <CheckCircle />
                )}
              </IconButton>
            </Grid>
          </Grid>

          {!!patient.measures && patient.measures.length > 0 ? (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <GraphMonitoring measures={patient.measures} />
            </Grid>
          ) : (
            false
          )}

          <Buttons />
        </Grid>

        <ModalChoiceReportFormat
          onChoice={onChoiceFormat}
          open={isOpenModalChoiceFormat}
          setOpen={setIsOpenModalChoiceFormat}
        />

        <ModalDischarge
          onChoice={onDischarge}
          open={isOpenModalDischarge}
          setOpen={setIsOpenModalDischarge}
        />
      </CardContent>
    </Card>
  );
}
