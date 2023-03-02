import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import MaskInput from "../../components/MaskInput";
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
        sx={classes.asterixRed}
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
      sx={classes.asterixRed}
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
      value={moment(formik.values[id]).format("DD/MM/YYYY")}
      error={formik.touched[id] && Boolean(formik.errors[id])}
      helperText={formik.touched[id] && formik.errors[id]}
      onChange={(value) => formik.setFieldValue(id, value)}
      renderInput={(params) => <TextField {...params} fullWidth size="small" />}
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

  const selectFormik = ({ id, options, ...props }) => (
    <FormControl
      fullWidth
      size="small"
      required={props.required}
      sx={classes.asterixRed}
    >
      <InputLabel>{props.label}</InputLabel>
      <Select
        label={props.label}
        onChange={(e) => formik.setFieldValue(id, e.target.value)}
        value={formik.values[id]}
        required={props.required}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.description}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
  const checkBoxForDefaulVolume = ({
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
    checkBoxForDefaulVolume,
  };
};
