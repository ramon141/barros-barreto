import * as yup from 'yup';

// Segui as instruções deste site
// https://www.calculadorafacil.com.br/computacao/validar-cpf
const validateCpf = (value) => {
    if (!value)
        return true;

    let sum = 0;
    let rest;
    const charsCpf = value.split('');

    for (let i = 1; i <= 9; i++)
        sum = sum + (parseInt(charsCpf[i - 1]) * i)

    rest = sum % 11;

    if ((rest === 10) || (rest === 11))
        rest = 0;

    if (rest !== Number(charsCpf[9]))
        return false;

    sum = 0;
    for (let i = 0; i <= 9; i++)
        sum = sum + parseInt(charsCpf[i]) * i;

    rest = sum % 11;

    if ((rest === 10) || (rest === 11))
        rest = 0;

    if (rest !== Number(charsCpf[10]))
        return false;

    return true;
}


export const validationSchema = yup.object().shape({
    cpf: yup
        .string()
        .test(
            'validate cpf',
            'O CPF é inválido',
            validateCpf
        )
        .required('Por favor, digite um CPF'),

    name: yup
        .string()
        .min(5, 'O nome deve conter ao menos 5 letras')
        .required('Por favor, digite seu nome completo'),

    rg: yup
        .string()
        .matches(/^[0-9]+$/, 'O campo RG deve conter somente números')
        .required('Por favor, digite o RG'),

    weight: yup
        .string()
        .required('Por favor, informe o seu peso'),

    height: yup
        .string()
        .required('Por favor, informe a sua altura'),

    doctorResponsible: yup
        .object()
        .required('Por favor informe o médico responsável')
        .nullable(),

    hospitalRecord: yup
        .string()
        .required('O campo é necessário'),

    diagnostic: yup
        .string()
        .required(''),

    mensureInterval: yup
        .string()
        .required('Informe um tempo de mensuração do volume de urina'),

    raspberry: yup
        .object()
        .required('Por favor informe o raspberry')
        .nullable(),
});