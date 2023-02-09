import React from 'react';
import { Dialog, DialogContent, DialogActions, Typography, makeStyles } from '@material-ui/core';
import Controls from "../Controls/Controls";
import { withNotitificationCustom } from '../../contexts/NotificationContext'
const useStyles = makeStyles(theme =>({
  dialog:{
    padding: theme.spacing(1),
    position: 'absolute',
    top: theme.spacing(5),
    border: 6,
    borderColor: 'red',
    borderRadius: 18,
    color: 'black',
  },

  dialogTitle:{
    textAlign: 'center'
  },

  dialogContent: {
    textAlign: 'center'
  },
}))

function NotificationCustom({ isOpen, title, onConfirm }) {
  const classes = useStyles();

  return (
    <Dialog open={isOpen} classes={{paper: classes.dialog}}> 
      
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">
          {title}
        </Typography>
      </DialogContent>

      <DialogActions className={classes.dialogAction}> 
        <Controls.ButtonT
					text="OK"
					variant="outline-info"
					onClick={ onConfirm }
				/>
    	</DialogActions>
    </Dialog>
  )
}

export default withNotitificationCustom(NotificationCustom)