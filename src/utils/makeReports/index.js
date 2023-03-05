import { createHTML } from './createHTML';
import { createCSV } from './createCSV';

export const makeReports = ({ patient, format, fileName }) => {
    fileName = fileName || 'Relatório Barros Barreto';

    const newPatient = {
        ...patient,
        notifications: organizeNotifications(patient.notifications, 'date')
    };

    switch (format.toLowerCase()) {
        case 'pdf':
            exportPDF(newPatient, fileName);
            break;
        case 'html':
            exportHTML(newPatient, fileName);
            break;
        case 'csv':
            exportCSV(newPatient, fileName);
            break;
        default:
            console.log(`O usuário tentou exportar um relatório em \
                         um formato desconhecido: ${format}`);
    }
}

const exportHTML = async (patient, fileName) => {
    var htmlContent = await createHTML(patient, fileName);

    var tempLink = document.createElement('a');
    var blobFile = new Blob([htmlContent], { type: 'text/html' });

    tempLink.setAttribute('href', URL.createObjectURL(blobFile));
    tempLink.setAttribute('download', `${fileName}.html`);
    tempLink.click();

    URL.revokeObjectURL(tempLink.href);
}

const exportCSV = async (patient, fileName) => {
    var textCSV = await createCSV(patient, fileName);

    var tempLink = document.createElement('a');
    var blobFile = new Blob([textCSV], { type: 'text/csv;charset=utf-8;' });

    tempLink.setAttribute('href', URL.createObjectURL(blobFile));
    tempLink.setAttribute('download', `${fileName}.csv`);
    tempLink.click();

    URL.revokeObjectURL(tempLink.href);
}


const exportPDF = async (patient, fileName) => {
    var iframe = document.createElement('iframe');

    const body = await createHTML(patient, fileName);

    iframe.width = '100%';
    iframe.setAttribute('srcdoc', body);
    iframe.style.display = 'none';

    const bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.appendChild(iframe);

    iframe.contentWindow.print();
}


//Organiza as os registros de viagens pelo atributo que os difere:
//Todas as vigens da escola XXX, ficarão no atributo XXX do objeto XXX
//Cada um desses atributos é um vetor que possuirá as viagens
function organizeNotifications(notifications, attributeForOrganize) {
    let shipmentsOrganized = {};

    notifications.forEach((shipment) => {
        if (!!shipmentsOrganized[shipment[attributeForOrganize]]) {
            shipmentsOrganized[shipment[attributeForOrganize]].push(shipment);
        } else {
            shipmentsOrganized[shipment[attributeForOrganize]] = [shipment];
        }
    });

    return shipmentsOrganized;

}
