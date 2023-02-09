import * as yup from 'yup';
import YupPassword from 'yup-password'
YupPassword(yup)

export const validationSchema = yup.object().shape({
    name: yup
        .string('')
        .required('O e-mail é necessário')
        .min(5, 'O nome digitado deve possuir ao menos 5 caracteres '),
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
        .required('Digite o telefone do médico'),
    password: yup
        .string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres')
        .minUppercase(1, 'A senha deve possuir ao menos 1 caracter maiúsculo')
        .minSymbols(1, 'A senha deve possuir ao menos 1 caracter especial ($@%&)')
        .required('Por favor, digite uma senha'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'As senhas não coincidem')
        .required('Confirme a senha'),
});