import {
    Autocomplete,
    FormControl, InputLabel, MenuItem, Select,
    TextField
} from "@mui/material";
import MaskInput from "../../components/MaskInput";

export const components = (formik) => {

    const textFieldFormik = ({ id, ...props }) => (
        <TextField
            size="small"
            fullWidth
            id={id}
            name={id}
            label={props.label || id}
            value={formik.values[id]}
            onChange={formik.handleChange}
            error={formik.touched[id] && Boolean(formik.errors[id])}
            helperText={formik.touched[id] && formik.errors[id]}
            required={true}
            {...props}
        />
    );

    const autocompleteFormik = ({ id, getOptionLabel, options, ...props }) => (
        <Autocomplete
            disablePortal
            fullWidth
            size="small"
            value={formik.values[id] || null}
            onChange={(event, newValue) => {
                formik.setFieldValue(id, newValue);
            }}
            getOptionLabel={getOptionLabel}
            options={options}
            renderInput={(params) => (
                <TextField
                    error={formik.touched[id] && Boolean(formik.errors[id])}
                    helperText={formik.touched[id] && formik.errors[id]}
                    label={props.label}
                    required={props.required}
                    sx={classes.asterixRed}
                    {...params}
                />
            )}
            {...props}
        />
    );

    return {
        textFieldFormik,
        autocompleteFormik,
    };

}