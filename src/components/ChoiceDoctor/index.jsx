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
import TableDoctors from "./TableDoctors";

const classes = {
    cardRoot: {
        margin: 20
    }
};

export default function ChoiceDoctor({ onChoosing, useFilter = true, title }) {

    const [searchValue, setSearchValue] = useState('');
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        let filter = {
            order: 'name',
            where: {role: "Doutor"},
        };

        api.get(`/doctors?filter=${JSON.stringify(filter)}`).then((response) => {
            setDoctors(response.data);
        })
    }, []);

    const getOnlyNumbers = (value) => {
        return value.replace(/[^\d,]/g, '');
    }

    function loadDoctors() {
        let filter = {
            order: 'name',
            where: {role: "Doutor"}
        };

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

        api.get(`/doctors?filter=${JSON.stringify(filter)}`).then((response) => {
            setDoctors(response.data);
        })
    }

    const handleChangeSearch = (e) => {
        const newValue = e.target.value;

        setSearchValue(newValue);

        if (!newValue) {
            api.get(`/doctors`).then((response) => {
                setDoctors(response.data);
            })
        }
    }

    const filter = () => (
        <Grid container justifyContent='center' spacing={2} style={{ marginBottom: 30 }}>
            <Grid item xs={12} sm={10} md={10} lg={10}>
                <TextField
                    size='small'
                    label='Médico'
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
                    onClick={() => loadDoctors()}
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

                <TableDoctors handleClickRow={onChoosing} doctors={doctors} />

            </CardContent>
        </Card >
    );
}