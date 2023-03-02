import { createRaspberryHTML } from './createHTML'
import { createRaspberryHTML as createAllRaspberryHTML } from './createAllReportHTML'
const jsonToCsv = (json) => {
    const parsedJson = JSON.parse(json);
    if (
        !Array.isArray(parsedJson) ||
        !parsedJson.every((p) => typeof p === "object" && p !== null)
    ) {
        return;
    }
    const heading = Object.keys(parsedJson[0]).join(",");
    const body = parsedJson.map((j) => Object.values(j).join(",")).join("\n");
    return `${heading}\n${body}`
};
export const exportRaspberryPDF = async (raspberries, fileName) => {
    var iframe = document.createElement('iframe');

    const body = await createRaspberryHTML(raspberries, fileName);

    iframe.width = '100%';
    iframe.setAttribute('srcdoc', body);
    iframe.style.display = 'none';

    const bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.appendChild(iframe);

    iframe.contentWindow.print();
}

export const exportAllRaspberryPDF = async (raspberries, fileName) => {
    var iframe = document.createElement('iframe');

    const body = await createAllRaspberryHTML(raspberries, fileName);

    iframe.width = '100%';
    iframe.setAttribute('srcdoc', body);
    iframe.style.display = 'none';

    const bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.appendChild(iframe);

    iframe.contentWindow.print();
}

export const objectArrayToCsv = (array, fileName) => {
    if (!array) return
    let textCSV = jsonToCsv(typeof array === 'string' ? array : JSON.stringify(array))
    if (!textCSV) return
    var tempLink = document.createElement('a');
    var blobFile = new Blob([textCSV], { type: 'text/csv;charset=utf-8;' });

    tempLink.setAttribute('href', URL.createObjectURL(blobFile));
    tempLink.setAttribute('download', `${fileName}.csv`);
    tempLink.click();

    URL.revokeObjectURL(tempLink.href);
}

export const exportRaspberryHTML =  (patient, fileName) => {
    var htmlContent =  createRaspberryHTML(patient, fileName);

    var tempLink = document.createElement('a');
    var blobFile = new Blob([htmlContent], { type: 'text/html' });

    tempLink.setAttribute('href', URL.createObjectURL(blobFile));
    tempLink.setAttribute('download', `${fileName}.html`);
    tempLink.click();

    URL.revokeObjectURL(tempLink.href);
}
export const exportAllRaspberryHTML =  (patient, fileName) => {
    var htmlContent =  createAllRaspberryHTML(patient, fileName);

    var tempLink = document.createElement('a');
    var blobFile = new Blob([htmlContent], { type: 'text/html' });

    tempLink.setAttribute('href', URL.createObjectURL(blobFile));
    tempLink.setAttribute('download', `${fileName}.html`);
    tempLink.click();

    URL.revokeObjectURL(tempLink.href);
}
