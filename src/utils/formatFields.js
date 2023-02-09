export const formatCpf = (cpf) => {

  if (!cpf || cpf.length < 11)
    return cpf;

  const regex = /(\d{3})(\d{3})(\d{3})(\d{2})/g;
  const subst = `$1.$2.$3-$4`;

  const cfpFormated = cpf.replace(regex, subst);

  return cfpFormated;
}