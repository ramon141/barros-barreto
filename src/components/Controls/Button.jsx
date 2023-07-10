import React from 'react';
import { Button, ButtonToolbar} from 'react-bootstrap';

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