import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import MaskInput from "../../../src/components/MaskInput";
import moment from "moment";

const classes = {
    asterixRed: {
        "& .MuiFormLabel-asterisk": {
            color: "red",
        },
    },
};

export const components = (formik) => {
    const textFieldFormik = ({ id, ...props }) => {
        const onChange = (e) => {
            formik.handleChange(e);
            props.handleChange && props.handleChange(e);
        };

        return (
            <TextField
                size="small"
                fullWidth
                id={id}
                name={id}
                label={props.label || id}
                value={formik.values[id]}
                onChange={onChange}
                error={formik.touched[id] && Boolean(formik.errors[id])}
                helperText={formik.touched[id] && formik.errors[id]}
                sx={classes.asterisk}
                {...props}
            />
        );
    };

    const inputMaskFormik = ({ id, mask, useRawValue, ...props }) => (
        <MaskInput
            size="small"
            mask={mask}
            useRawValue={useRawValue}
            useOnlyNumbers={props.useOnlyNumbers}
            fullWidth
            id={id}
            name={id}
            label={props.label || id}
            value={formik.values[id]}
            onChange={formik.handleChange}
            error={formik.touched[id] && Boolean(formik.errors[id])}
            helperText={formik.touched[id] && formik.errors[id]}
            sx={classes.asterisk}
            {...props}
        />
    );
    return {
        textFieldFormik,
        inputMaskFormik,
    };
};
