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
import TableHospitals from "./TableHospitals";

const classes = {
    cardRoot: {
        margin: 20
    }
};

export default function ChoiceHospital({ onChoosing, useFilter = true, title }) {

    const [searchValue, setSearchValue] = useState('');
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        let filter = {
            order: 'name',
            where: {}
        };

        api.get(`/hospitals?filter=${JSON.stringify(filter)}`).then((response) => {
            setHospitals(response.data);
        })
    }, []);

    const getOnlyNumbers = (value) => {
        return value.replace(/[^\d,]/g, '');
    }

    function loadHospitals() {
        let filter = {
            order: 'name',
            where: {}
        };

        const searchValueOnlyNumbers = getOnlyNumbers(searchValue);

        if (searchValueOnlyNumbers) {
            filter.where = {
                ...filter.where,
                or: [
                    { name: { like: `.*${searchValue}.*`, options: 'i' } },
                    // { CNES: { like: `.*${searchValueOnlyNumbers}.*` } }
                ]
            };

        } else {//Se for um nome
            filter.where = {
                ...filter.where,
                name: { like: `.*${searchValue.trim()}.*`, options: 'i' }
            };
        }

        api.get(`/hospitals?filter=${JSON.stringify(filter)}`).then((response) => {
            setHospitals(response.data);
        })
    }

    const handleChangeSearch = (e) => {
        const newValue = e.target.value;

        setSearchValue(newValue);

        if (!newValue) {
            api.get(`/hospitals`).then((response) => {
                setHospitals(response.data);
            })
        }
    }

    const filter = () => (
        <Grid container justifyContent='center' spacing={2} style={{ marginBottom: 30 }}>
            <Grid item xs={12} sm={10} md={10} lg={10}>
                <TextField
                    size='small'
                    label='Hospital'
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
                    onClick={() => loadHospitals()}
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

                <TableHospitals handleClickRow={onChoosing} hospitals={hospitals} />

            </CardContent>
        </Card >
    );
}