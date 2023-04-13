import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress
} from "@mui/material";

import {
  Search
} from "@mui/icons-material";

import api from "../../../services/api";
import React, { useEffect, useState } from "react";
import TableRaspberry from "./TableRaspberry";

const classes = {
  cardRoot: {
    margin: 20
  }
};

export default function ChoiceRaspberry({ onChoosing, useFilter = true, title, printAll, loadRaspberry, raspberry, searching }) {

  const [searchValue, setSearchValue] = useState('');

  const handleChangeSearch = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
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
          disabled={searching}
          size='small'
          style={{ backgroundColor: '#1B98E0', color: 'white', height: 40 }}
          onClick={() => loadRaspberry(searchValue)}
        >
          {searching ?
            <CircularProgress size={24} color={'secondary'} /> :
            <Search />
          }
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

        <TableRaspberry handleClickRow={onChoosing} raspberry={raspberry} />

      </CardContent>
    </Card >
  );
}