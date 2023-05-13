import * as yup from 'yup';
import YupPassword from 'yup-password'
YupPassword(yup)

export const validationSchema = yup.object().shape({
    name: yup
        .string('')
        .required('O nome do Hospital é necessário')
        .min(5, 'O nome digitado deve possuir ao menos 5 caracteres '),
    // cityname: yup
    //     .string('')
    //     .required('O nome do Município é necessário')
    //     .min(1, 'O nome digitado deve possuir ao menos 4 caracteres '),
    // statename: yup
    //     .string('')
    //     .required('O nome do Estado é necessário')
    //     .min(1, 'O nome digitado deve possuir ao menos 4 caracteres '),
    // email: yup
    //     .string('')
    //     .email('Digite um e-mail válido')
    //     .required('O e-mail é necessário'),
    // CNES: yup
    //     .string()
    //     .min(7, 'O CNES deve possuir 9 caractéres')
    //     .max(9, 'O CRM deve possuir 9 caractéres')
    //     .required('Por favor, digite o CNES do Hospital'),
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