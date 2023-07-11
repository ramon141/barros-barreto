import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography
} from "@mui/material";

import {
  Search
} from "@mui/icons-material";

import api from "../../services/api";
import React, { useEffect, useState } from "react";
import TablePatients from "./TablePatients";

const classes = {
  cardRoot: {
    margin: 20
  }
};

export default function ChoicePatient({ onChoosing, useFilter = true, title, onlyDischargedPatient, noDischargedPatient }) {

  const [searchValue, setSearchValue] = useState('');
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    let filter = {
      order: 'name',
      where: {}
    };

    if (onlyDischargedPatient) {
      filter.where = {
        dischargedFromHospital: { neq: null }
      };
    }

    if (noDischargedPatient) {
        filter.where = {
            dischargedFromHospital: null
        };
    }

    api.get(`/patients?filter=${JSON.stringify(filter)}`).then((response) => {
      setPatients(response.data);
    })
  }, [onlyDischargedPatient], [noDischargedPatient]);

  const getOnlyNumbers = (value) => {
    return value.replace(/[^\d,]/g, '');
  }

  function loadPatients() {
    let filter = {
      order: 'name',
      where: {}
    };

    const searchValueOnlyNumbers = getOnlyNumbers(searchValue);

    if (onlyDischargedPatient) {
      filter.where = {
        dischargedFromHospital: { neq: null }
      };
    }

    //Se for um cpf ou cns
    if (searchValueOnlyNumbers) {
      filter.where = {
        ...filter.where,
        or: [
          { cpf: { like: `.*${searchValueOnlyNumbers}.*` } },
          { name: { like: `.*${searchValue}.*`, options: 'i' } },
          { cns: { like: `.*${searchValueOnlyNumbers}.*` } }
        ]
      };

    } else {//Se for um nome
      filter.where = {
        ...filter.where,
        name: { like: `.*${searchValue.trim()}.*`, options: 'i' }
      };
    }

    api.get(`/patients?filter=${JSON.stringify(filter)}`).then((response) => {
      setPatients(response.data);
    })
  }

  const handleChangeSearch = (e) => {
    const newValue = e.target.value;

    setSearchValue(newValue);

    if (!newValue) {
      api.get(`/patients`).then((response) => {
        setPatients(response.data);
      })
    }
  }

  const filter = () => (
    <Grid container justifyContent='center' spacing={2} style={{ marginBottom: 30 }}>
      <Grid item xs={12} sm={10} md={10} lg={10}>
        <TextField
          size='small'
          label='Paciente'
          required
          fullWidth
          value={searchValue}
          onChange={handleChangeSearch}
        />
      </Grid>

      <Grid item xs={12} sm={2} md={2} lg={2}>
        <Button
          variant='outlined'
          fullWidth
          size='small'
          style={{ backgroundColor: '#075d85', color: 'white', height: 40 }}
          onClick={() => loadPatients()}
        >
          <Search />
        </Button>
      </Grid>
    </Grid>
  )

  return (
    <Card style={classes.cardRoot}>
      <CardContent style={{ margin: 20 }}>

        <Typography variant='h5' align='center' style={{ fontWeight: 'bold', marginBottom: 30 }}>
          {title}
        </Typography>

        {useFilter ? filter() : false}

        <TablePatients handleClickRow={onChoosing} patients={patients} />

      </CardContent>
    </Card >
  );
}