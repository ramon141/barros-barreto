import * as yup from 'yup';
import YupPassword from 'yup-password'
YupPassword(yup)

export const validationSchema = yup.object().shape({
    name: yup
        .string()
        .min(5, "O nome deve conter ao menos 5 letras")
        .required("Por favor, digite o nome completo"),
    email: yup
        .string('')
        .email('Digite um e-mail válido')
        .required('O e-mail é necessário'),
    CRM: yup
        .string()
        .min(8, 'O CRM deve possuir 8 caractes')
        .max(8, 'O CRM deve possuir 8 caractes')
        .required('Por favor, digite o CRM do médico'),
    phone: yup
        .string()
        .matches(/^[0-9]+$/, 'Digite somente números')
        .min(9, 'O número de celular deve possuir mais de 10 dígitos')
        .max(11, 'O número de celular deve possuir menos de 11 dígitos')
        .required('Digite o telefone do médico')
});