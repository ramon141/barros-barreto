import React from 'react';
import { makeStyles, Snackbar } from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const useStyles = makeStyles(theme => ({
    root: {
        top: theme.spacing(9),

    },
    title: {
        fontSize: 18,
    },
    text: {
        fontSize: 15,
    }
}))

export default function Notification(props) {

    const { notify, setNotify } = props;
    const classes = useStyles()

    const handleClose = (event, reason) => {
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
            className={classes.root}
            open={notify.isOpen}
            autoHideDuration={notify.duration || 5000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={handleClose}>
            <Alert
                variant="filled"
                severity={notify.type}
                onClose={handleClose}>
                <AlertTitle className={classes.title}>{notify.title}</AlertTitle>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}