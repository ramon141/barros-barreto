import React from 'react';
import { Button, ButtonToolbar} from 'react-bootstrap';

/* 
<MuiButton
        variant={variant || "contained"}
        size={size || "large"}
        color={color || "primary"}
        onClick={onClick}
        {...other}
        classes={{
          root: classes.root,
          label: classes.label,
        }}
        >
            {text}
        </MuiButton>
*/

export default function ButtonT(props) {
    const { text, size, color, variant, onClick, ...other } = props

    return (
        <ButtonToolbar>
            <Button 
            variant={variant}
            onClick={onClick}
            {...other}
            >
            {text}
        </Button>
	  </ButtonToolbar>
    )
}