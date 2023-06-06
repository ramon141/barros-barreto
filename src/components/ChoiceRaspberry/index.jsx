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
import TableRaspberrys from "./TableRaspberrys";

const classes = {
  cardRoot: {
    margin: 20
  }
};

export default function ChoiceRaspberry({ onChoosing, useFilter = true, title, onlyDischargedRaspberry, onlyActiveRaspberrys }) {

  const [searchValue, setSearchValue] = useState('');
  const [raspberrys, setRaspberrys] = useState([]);

  useEffect(() => {
    let filter = {
      order: 'propertyIdentification',
      where: {}
    };

    if (onlyDischargedRaspberry) {
      filter.where = {
        dischargedFromRaspberry: { neq: null }
      };
    }

    api.get(`/raspberrys?filter=${JSON.stringify(filter)}`).then((response) => {
      setRaspberrys(response.data);
    })
  }, [onlyDischargedRaspberry]);

  const getOnlyNumbers = (value) => {
    return value.replace(/[^\d,]/g, '');
  }

  function loadRaspberrys() {
    let filter = {
      order: 'propertyIdentification',
      where: {}
    };

    const searchValueOnlyNumbers = getOnlyNumbers(searchValue);

    if (onlyDischargedRaspberry) {
      filter.where = {
        dischargedFromRaspberry: { neq: null }
      };
    }

    //Se for um cpf ou cns
    if (searchValueOnlyNumbers) {
      filter.where = {
        ...filter.where,
        or: [
          { serialNumber: { like: `.*${searchValueOnlyNumbers}.*` } },
          { propertyIdentification: { like: `.*${searchValue}.*`, options: 'i' } },
        ]
      };

    } else {//Se for um nome
      filter.where = {
        ...filter.where,
        propertyIdentification: { like: `.*${searchValue.trim()}.*`, options: 'i' }
      };
    }

    api.get(`/raspberrys?filter=${JSON.stringify(filter)}`).then((response) => {
      setRaspberrys(response.data);
    })
  }

  const handleChangeSearch = (e) => {
    const newValue = e.target.value;

    setSearchValue(newValue);

    if (!newValue) {
      api.get(`/raspberrys`).then((response) => {
        setRaspberrys(response.data);
      })
    }
  }

  const filter = () => (
      <Grid container justifyContent='center' spacing={2} style={{ marginBottom: 30 }}>
        <Grid item xs={12} sm={10} md={10} lg={10}>
          <TextField
              size='small'
              label='Módulo'
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
              style={{ backgroundColor: '#1B98E0', color: 'white', height: 40 }}
              onClick={() => loadRaspberrys()}
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

          <TableRaspberrys handleClickRow={onChoosing} raspberrys={raspberrys} />

        </CardContent>
      </Card >
  );
}