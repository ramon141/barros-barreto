import {
  TextField
} from "@mui/material";
import MaskInput from "../../components/MaskInput";

export const components = () => {

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

  const inputMaskFormik = ({ id, mask, useRawValue, ...props }) => (
    <MaskInput
      size="small"
      mask={mask}
      useRawValue={useRawValue}
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


  return {
    textFieldFormik,
    inputMaskFormik
  };

}