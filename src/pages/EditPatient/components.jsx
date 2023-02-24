import { TextField, FormControl, InputLabel, Select, MenuItem, Autocomplete } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MaskInput from '../../components/MaskInput';


export const components = (formik) => {
    const textFieldFormik = ({ id, ...props }) => (
        <TextField
            size='small'
            fullWidth
            id={id}
            name={id}
            label={props.label || id}
            value={formik.values[id]}
            onChange={formik.handleChange}
            error={formik.touched[id] && Boolean(formik.errors[id])}
            helperText={formik.touched[id] && formik.errors[id]}
            {...props}
        />
    );

    const inputMaskFormik = ({ id, mask, useRawValue, ...props }) => (
        <MaskInput
            size='small'
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
            {...props}
        />
    );

    const datePickerFormik = ({ id, ...props }) => (
        <MobileDatePicker
            label={props.label}
            id={id}
            name={id}
            inputFormat={props.inputFormat || 'MM/DD/YYYY'}
            error={formik.touched[id] && Boolean(formik.errors[id])}
            helperText={formik.touched[id] && formik.errors[id]}
            value={formik.values[id]}
            onChange={value => formik.setFieldValue(id, value)}
            renderInput={(params) => <TextField {...params} fullWidth size='small' />}
            {...props}
        />
    );

    const dateTimePickerFormik = ({ id, ...props }) => (
        <DateTimePicker
            label={props.label}
            id={id}
            name={id}
            value={formik.values[id]}
            error={formik.touched[id] && Boolean(formik.errors[id])}
            helperText={formik.touched[id] && formik.errors[id]}
            onChange={value => formik.setFieldValue(id, value)}
            renderInput={(params) => <TextField {...params} fullWidth size='small' />}
            {...props}
        />
    );

    const autocompleteFormik = ({ id, getOptionLabel, options, ...props }) => (
        <Autocomplete
            disablePortal
            fullWidth
            size='small'
            value={formik.values[id] || null}
            onChange={(event, newValue) => {
                formik.setFieldValue(id, newValue);
            }}
            getOptionLabel={getOptionLabel}
            options={options}
            renderInput={(params) =>
                <TextField
                    error={formik.touched[id] && Boolean(formik.errors[id])}
                    helperText={formik.touched[id] && formik.errors[id]}
                    label={props.label}
                    {...params}
                />}

            {...props}
        />
    );

    const selectFormik = ({ id, options, ...props }) => (
        <FormControl fullWidth size='small'>
            <InputLabel>{props.label}</InputLabel>
            <Select
                label={props.label}
                onChange={(e) => formik.setFieldValue(id, e.target.value)}
                value={formik.values[id]}
            >
                {
                    options.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.description}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );

    return {
        textFieldFormik,
        inputMaskFormik,
        datePickerFormik,
        dateTimePickerFormik,
        autocompleteFormik,
        selectFormik
    };
}