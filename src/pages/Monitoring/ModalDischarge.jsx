import * as React from 'react';

import { Modal, Typography, Button, Box, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';
import moment from 'moment';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    borderRadius: '10px',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function ModalDischarge({ open, setOpen, onChoice }) {

    const [dateTime, setDateTime] = useState(moment());
    const handleClose = () => setOpen(false);

    const handleChoice = () => {
        handleClose();
        onChoice(dateTime);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-discharge"
            aria-describedby="modal-discharge-body"
        >
            <Box sx={style}>
                <Typography id="modal-discharge" variant="h6" component="h2">
                    Informe o horário de alta do paciente.
                </Typography>

                <Grid
                    style={{ marginTop: 15 }}
                    container
                    id="modal-discharge-body"
                    justifyContent='center'
                    spacing={2}
                >
                    <Grid item xs={12} md={12}>
                        <DateTimePicker
                            label={'Data e Hora da Saída'}
                            value={moment(dateTime).format("DD/MM/YYYY")}
                            onChange={setDateTime}
                            renderInput={(params) => <TextField {...params} fullWidth size='small' />}
                        />
                    </Grid>

                    <Grid item>
                        <Button
                            color="primary"
                            variant='outlined'
                            onClick={handleChoice}
                        >
                            Confirmar
                        </Button>
                    </Grid>

                </Grid>
            </Box>
        </Modal>
    );
}