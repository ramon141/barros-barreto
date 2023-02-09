import React from 'react';
import { Dialog, DialogContent, DialogActions, Typography, makeStyles } from '@material-ui/core';
import Controls from "../Controls/Controls";

const useStyles = makeStyles(theme => ({
  dialog: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
    border: 6,
    borderColor: 'red',
    borderRadius: 18,
    color: 'black',
  },

  dialogContent: {
    textAlign: 'center'
  },

  dialogAction: {
  },

  titleIcon: {
    backgroundColor: "#acacac",
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      cusor: 'default'
    },

    '& .MuiSvgIcon-root': {
      fontSize: '8rem'
    }
  }
}))

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();

  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">
          {confirmDialog.title}
        </Typography>
        <Typography variant="subtitle2">
          {confirmDialog.subTitle}
        </Typography>
      </DialogContent>

      <DialogActions className={classes.dialogAction}>
        <Controls.ButtonT
          text="Cancelar"
          variant="outline-secondary"
          onClick={() => {
            setConfirmDialog({
              ...confirmDialog,
              isOpen: false,
            })
          }}
        />

        <Controls.ButtonT
          text="Confirmar"
          variant='outline-success'
          onClick={
            confirmDialog.onConfirm
          }
        />
      </DialogActions>
    </Dialog>
  )
}