import { Grid, TextField, Typography, Card, CardContent, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import moment from 'moment';
import GraphMonitoring from '../../components/GraphMonitoring';
import { makeReports } from '../../utils/makeReports';
import ModalChoiceReportFormat from './ModalChoiceReportFormat';
import { formatCpf } from '../../utils/formatFields';

const classes = {
  disabled: {
    backgroundColor: '#DEDEDE'
  },
  btnDischarge: {
    backgroundColor: '#075d85',
    color: 'white',
    border: '1px solid rgba(0, 0, 0, 0.23)'
  },
  btnReport: {
    backgroundColor: '#075d85',
    color: 'white',
    border: '1px solid rgba(0, 0, 0, 0.23)'
  }
}

const PATIENT_INITIAL_VALUES = {
  name: '',
  volume: '',
  date: '',
  rg: '',
  cpf: '',
  diagnostic: ''
};

export default function Monitoring() {

  const { patientId } = useParams();
  const [patient, setPatient] = useState(PATIENT_INITIAL_VALUES);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    api.get(`patients/${patientId}`)
      .then((response) => {
        let data = {
          ...response.data,
        }
        if (response.data.measures !== undefined) {
          data = {
            ...data,
            notifications: response.data.notifications,
            measures: response.data.measures.sort((a, b) => {
              const dateA = moment(a.time);
              const dateB = moment(b.time);

              return dateA.isAfter(dateB) ? 1 : -1;
            })
          };
        }
        setPatient(data);
      })
      .catch((error) => {
        alert('O sistema apresentou um erro ao carregar o paciente');
      })
  }, [patientId])

  const getHospitalizedTime = () => {
    const init = moment(patient.entranceDate);
    const result = moment();

    result.subtract(init);

    return result.format('HH[h] [e] mm[min]');
  }

  const sumVolume = () => {
    let sum = 0;

    if (patient.measures) {
      patient.measures.forEach((measure) => {
        const volume = measure.volumeInMl;
        sum += volume;
      })
    }

    return sum;
  }

  const onChoiceFormat = (format) => {
    makeReports({ patient, format })
  }

  const choiceFormat = () => {
    setIsOpenModal(true);
  }

  const Buttons = () => (
    <Grid container spacing={2} style={{ marginTop: 10 }} justifyContent='center'>
      <Grid item>
        <Button
          variant='outlined'
          style={classes.btnReport}
          onClick={() => choiceFormat()}
        >
          Imprimir
        </Button>
      </Grid>
    </Grid>
  )

  return (
    <Card style={{ margin: 20 }}>
      <CardContent>
        <Typography variant='h5' align='center' style={{ fontWeight: 'bold', marginBottom: 30 }}>
          Relatório do Paciente
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8} lg={8}>
            <TextField
              fullWidth
              size='small'
              label='Nome do Paciente'
              disabled
              style={classes.disabled}
              value={patient.name}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              fullWidth
              size='small'
              label='CPF'
              style={classes.disabled}
              disabled
              value={formatCpf(patient.cpf)}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              fullWidth
              size='small'
              label='RG'
              style={classes.disabled}
              disabled
              value={patient.rg}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              fullWidth
              size='small'
              label='Data de Nascimento'
              style={classes.disabled}
              disabled
              value={moment(patient.birthdate).format('DD/MM/YYYY')}
            />
          </Grid>


          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              fullWidth
              size='small'
              label='Volume Total'
              style={classes.disabled}
              disabled
              value={`${sumVolume()} mg/H`}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              fullWidth
              size='small'
              label='Iníco'
              disabled
              style={classes.disabled}
              value={moment(patient.date).format('DD/MM/YYYY')}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              fullWidth
              size='small'
              label='Tempo Internado'
              disabled
              style={classes.disabled}
              value={getHospitalizedTime()}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              fullWidth
              size='small'
              label='Dia da Entrada'
              disabled
              style={classes.disabled}
              value={moment(patient.entranceDate).format('DD/MM/YYYY')}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              fullWidth
              size='small'
              label='Hora da Entrada'
              disabled
              style={classes.disabled}
              value={moment(patient.entranceDate).format('HH:mm[h]')}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              fullWidth
              size='small'
              label='Intervalo de Mensuração'
              disabled
              style={classes.disabled}
              value={`${patient.mensureInterval} min`}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              fullWidth
              size='small'
              label='Data e Hora de Saída do Hospital'
              disabled
              style={classes.disabled}
              value={`${patient.dischargedFromHospital || '27/12/2022 às 18:40'}`}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              fullWidth
              size='small'
              label='Médico Responsável'
              disabled
              style={classes.disabled}
              value={`ramon`}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              fullWidth
              size='small'
              label='Peso'
              disabled
              style={classes.disabled}
              value={patient.weightInKg ? `${patient.weightInKg} Kg` : ''}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              fullWidth
              size='small'
              label='Altura'
              disabled
              style={classes.disabled}
              value={patient.heightInCm ? `${patient.heightInCm / 100} m` : ''}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              fullWidth
              size='small'
              multiline={true}
              rows={4}
              label='Diagnóstico'
              disabled
              style={classes.disabled}
              value={patient.diagnostic}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <GraphMonitoring measures={patient.measures} />
          </Grid>

          <Buttons />

        </Grid>

        <ModalChoiceReportFormat onChoice={onChoiceFormat} open={isOpenModal} setOpen={setIsOpenModal} />
      </CardContent>
    </Card>
  )


}