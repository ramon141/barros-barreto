import moment from "moment";

export const createCSV = (patient, fileName) => {

    let text = '';

    text += makeHeader(patient) + '\n';
    text += listMeasures(patient);

    return text;
}

const makeHeader = (patient) => {
    let text = '';

    text += makeLineHeader('Nome', patient.name);
    text += makeLineHeader('CPF', patient.cpf);
    text += makeLineHeader('RG', patient.rg);
    text += makeLineHeader('Data de Nascimento', moment(patient.birthdate).format('DD/MM/YYYY'));
    text += makeLineHeader('Peso(Kg)', patient.weightInKg);
    text += makeLineHeader('Altura(cm)', patient.heightInCm);

    return text;
}

const makeLineHeader = (name, value) => {
    return `${name},${value}\n`;
}

const listMeasures = (patient) => {
    let text = 'Volume(Mg),Data,Hora\n';
    const measures = patient.measures;

    if (measures) {
        measures.forEach((measure) => {
            text += `${measure.volumeInMl},${moment(measure.time).format('DD/MM/YYYY')},${moment(measure.time).format('HH:mm')}\n`;
        })
    }

    return text;
}

