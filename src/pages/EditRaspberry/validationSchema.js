import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  propertyIdentification: yup
      .string('')
      .required('O número de identificação é necessário'),
  model: yup
      .string('')
      .required('O modelo é necessário'),
  serialNumber: yup
      .string(),
  additionalDescription: yup
      .string(),
  status: yup
      .string()
      .required('Diga o status do módulo de mensuração'),
});