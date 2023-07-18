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
import MaskInput from "../../components/MaskInput";

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

  const datePickerFormik = ({ id, ...props }) => (
    <MobileDatePicker
      label={props.label}
      id={id}
      name={id}
      inputFormat={props.inputFormat || "DD/MM/YYYY"}
      error={formik.touched[id] && Boolean(formik.errors[id])}
      helperText={formik.touched[id] && formik.errors[id]}
      value={formik.values[id]}
      onChange={(value) => formik.setFieldValue(id, value)}
      renderInput={(params) => <TextField {...params} fullWidth size="small" />}
      {...props}
    />
  );

  const dateTimePickerFormik = ({ id, ...props }) => (
    <DateTimePicker
      label={props.label}
      id={id}
      name={id}
      value={formik.values[id]}
      inputFormat={"DD/MM/YYYY HH:MM"}
      error={formik.touched[id] && Boolean(formik.errors[id])}
      helperText={formik.touched[id] && formik.errors[id]}
      onChange={(value) => formik.setFieldValue(id, value)}
      renderInput={(params) => <TextField {...params} fullWidth size="small" />}
      {...props}
    />)

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
          sx={classes.asterisk}
          {...params}
        />
      )}
      {...props}
    />
  );

  const selectFormik = ({ id, options, ...props }) => (
    <FormControl fullWidth size="small" required={props.required}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        label={props.label}
        onChange={(e) => formik.setFieldValue(id, e.target.value)}
        required={props.required}
        value={formik.values[id]}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.description}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const checkBoxForMaintain = ({
    id,
    defaultChecked,
    onChange,
    checked,
    label,
    ...props
  }) => (
    <FormControlLabel
      id={id}
      control={
        <Checkbox
          defaultChecked={defaultChecked}
          onChange={onChange}
          checked={checked}
        />
      }
      label={label}
    />
  );

  return {
    textFieldFormik,
    inputMaskFormik,
    datePickerFormik,
    dateTimePickerFormik,
    autocompleteFormik,
    selectFormik,
    checkBoxForMaintain,
  };
};
