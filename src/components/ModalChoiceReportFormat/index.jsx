import * as React from 'react';

import { Modal, Typography, Button, Box, Grid } from '@mui/material';

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

export default function ModalChoiceReportFormat({ open, setOpen, onChoice }) {

    const handleClose = () => setOpen(false);

    const handleChoice = (format) => {
        handleClose();
        onChoice(format);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-choice-format-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-choice-format-title" variant="h6" component="h2">
                    Você gostaria de exportar o relatório em qual formato?
                </Typography>

                <Grid
                    style={{ marginTop: 15 }}
                    container
                    id="modal-modal-description"
                    justifyContent='center'
                    spacing={2}
                >

<Grid item xs={12} md={12}>
                        <Typography style={{fontWeight: 'bold', textAlign: 'center'}}>
                            Relatório das notificações
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Button
                            color="primary"
                            variant='outlined'
                            onClick={() => handleChoice('pdf')}
                        >
                            PDF
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            color="primary"
                            variant='outlined'
                            onClick={() => handleChoice('html')}
                        >
                            HTML
                        </Button>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Typography style={{fontWeight: 'bold', textAlign: 'center'}}>
                            Relatório das mensurações
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Button
                            color="primary"
                            variant='outlined'
                            onClick={() => handleChoice('csv')}
                        >
                            CSV
                        </Button>
                    </Grid>

                </Grid>
            </Box>
        </Modal>
    );
}