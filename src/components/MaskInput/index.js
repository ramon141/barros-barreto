import React from 'react';
import InputMask from "react-input-mask";
import {
    TextField,
} from '@mui/material';

export default function MaskInput({ mask, value, useOnlyNumbers, onChange, useRawValue, ...props }) {

    const maskChar = '_';

    const getOnlyNumbers = (value) => {
        return value.replace(/\D/g, '');
    }

    const handleChange = (event) => {
        if (useRawValue)
            event.target.value = unmaskValue(event.target.value);

        if (useOnlyNumbers)
            event.target.value = getOnlyNumbers(event.target.value);

        onChange(event);
    }

    const unmaskValue = (value) => {
        let unmaskedValue = '';
        const characters = value.split('');
        const maskChars = mask.split('');

        for (let i = 0; i < characters.length; i++) {
            const isValueChar = maskChars[i] === '9' || maskChars[i] === 'a' || maskChars[i] === '*';
            const isMaskChar = value[i] === maskChar;

            if (isValueChar && !isMaskChar)
                unmaskedValue += value[i];
        }

        return unmaskedValue;
    }

    return (
        <InputMask
            mask={mask}
            value={value}
            onChange={handleChange}
        >
            {() => <TextField {...props} />}
        </InputMask>
    )
}