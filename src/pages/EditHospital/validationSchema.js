import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Por favor, digite o nome do hospital"),

    ctiPhone: yup
    .string()
    .matches(/^[0-9]+$/, 'Digite somente números')
    .min(9, 'O número de celular deve possuir mais de 10 dígitos')
    .max(11, 'O número de celular deve possuir menos de 11 dígitos')
    .required('Digite o telefone do CTI'),

    onDutyPhone: yup
    .string()
    .matches(/^[0-9]+$/, 'Digite somente números')
    .min(9, 'O número de celular deve possuir mais de 10 dígitos')
    .max(11, 'O número de celular deve possuir menos de 11 dígitos')
    .required('Digite o telefone do Plantão'),
});
