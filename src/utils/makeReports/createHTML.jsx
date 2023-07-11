import { format } from 'date-fns';
import ReactDOMServer from 'react-dom/server';
import { formatCpf } from '../formatFields';
import ApexChart from 'apexcharts';
import moment from 'moment';

export async function createHTML(patient, title) {
    const htmlNotifications = await tableNotifications(patient);

    return `
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        margin: 20px;
                        font-family: 'Arial Nova', Arial, sans-serif;
                        font-weight: normal;
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                    @media print {
                        img {
                            width: 100%;
                        }
                    }
                </style>
                <title>${title}</title>
            </head>

                <body>
                    ${ReactDOMServer.renderToStaticMarkup(htmlNotifications)}
                <body>
            </html>
        `;
}

async function tableNotifications(patient) {

    const classes = {
        root: {
            fontWeight: 'bold',
            border: '2px solid #016494',
            borderRadius: '5px',
            textAlign: 'center',
            height: '100px',
            lineHeight: '25px',
            fontSize: '13px'
        },
        title: {
            position: 'relative',
            top: '10px',
            left: '10px',
            fontSize: '17px',
        },
        subtitle: {
            fontWeight: 'bold',
            width: '100%',
            textAlign: 'center',
            marginTop: '10px',
            fontSize: '13px',
        },
        line: {
            backgroundColor: 'rgb(229, 229, 229)}'
        },
        tableRoot: {
            width: '101%',
            textAlign: 'left',
            marginLeft: '-3px',
            borderSpacing: '0px',
        },
        theadLine: {
            backgroundColor: 'rgb(211, 211, 211)'
        },
        tableLine: {
            borderBottom: '1px solid rgb(224, 224, 224)',
            fontSize: '13px',
            padding: '7px 0px'
        },
        centerImg: {
            textAlign: 'center'
        }
    }

    const organizedNotifications = patient.notifications;

    const graphs = await createDailyCharts(patient);

    return (
        <>
            <div>
                <div style={classes.root}>
                    <p style={classes.title}>
                        Hospital Universitário João de Barros Barreto
                    </p>
                    <p>Emitido em: {format(Date.now(), "dd/MM/yyyy 'às' HH:mm")}</p>
                </div>
            </div>

            <div style={classes.subtitle}>
                <p>Relatório de Notificações</p>
                <p>Paciente: {`${patient.name} - ${formatCpf(patient.cpf)}`}</p>
            </div>

            <hr style={classes.line} />

            {Object.keys(organizedNotifications).map((valueAttribute) => (
                <div key={valueAttribute} style={{ marginTop: '40px', pageBreakAfter: 'always' }}>
                    <span>Data: {moment(valueAttribute).format('DD/MM/YYYY')}</span>
                    <table style={classes.tableRoot}>
                        <thead>
                            <tr style={classes.theadLine}>
                                <th style={{ width: '25%', fontSize: '13px' }}>
                                    Hora da notificação
                                </th>
                                <th style={{ width: '50%', fontSize: '13px' }}>
                                    Motivo
                                </th>
                                <th style={{ width: '25%', fontSize: '13px' }}>
                                    Volume de urina na hora correspondente
                                </th>
                            </tr>
                        </thead >
                        <tbody>
                            {organizedNotifications[valueAttribute].map((item, key) => (
                                <tr key={key}>
                                    <td style={classes.tableLine}>
                                        &nbsp;&nbsp; {moment(item.time).format("HH:mm")}h
                                    </td>

                                    <td style={classes.tableLine}>
                                        &nbsp;&nbsp; {item.notification.subject}
                                    </td>

                                    <td style={classes.tableLine}>
                                        &nbsp;&nbsp; {item.volumeInMl}Ml
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table >

                {/*<div style={classes.centerImg}>*/}
                {/*    <img*/}
                {/*        alt={`Gráfico do dia ${moment(valueAttribute).format('DD/MM/YYYY')}`}*/}
                {/*        src={graphs[valueAttribute]}*/}
                {/*    />*/}
                {/*    </div>*/}
                </div >
            ))}
        </>
    );
}

const getGraphFromDate = async (measures) => {
    const { categories, data } = separeInfoFromMeasures(measures);

    const options = {
        chart: {
            id: 'other-graph',
            animations: {
                enabled: false
            },
            type: 'area'
        },
        colors: ['#1B98E0'],
        xaxis: {
            categories
        },
        series: [{
            name: 'Volume',
            data
        }]
    };

    const chart = new ApexChart(document.getElementById('other-graph'), options);
    await chart.render();
    const base64 = await chart.dataURI();
    chart.destroy();
    return base64.imgURI;
}

const separeInfoFromMeasures = (measures) => {
    const categories = [];
    const data = [];

    if (measures) {
        measures.forEach((measure) => {
            const time = moment(measure.time);
            const volume = measure.volumeInMl;

            categories.push(time.format('HH:mm[h]'));
            data.push(volume);
        });
    }

    return {
        categories,
        data
    };
}


//Retorna um objeto:
//O índice é a data e o valor um base64 do gráfico correspondente
const createDailyCharts = async (patient) => {
    const measures = patient.measures;
    const measuresOrganized = separateMeasuresByDate(patient);
    let graphs = [];

    if (measures) {
        const keys = Object.keys(measuresOrganized);

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i] /*Dia da mensuração*/;
            const measures = measuresOrganized[key];
            const graph = await getGraphFromDate(measures);

            graphs[key] = graph;
        }
    }

    return graphs;
}

const separateMeasuresByDate = (patient) => {
    const measures = patient.measures;
    let measuresOrganized = [];

    if (measures) {
        measures.forEach((measure) => {
            const time = moment(measure.time);
            const formatedDate = time.format('DD/MM/YYYY');

            if (!!measuresOrganized[formatedDate]) {
                measuresOrganized[formatedDate].push(measure);
            } else {
                measuresOrganized[formatedDate] = [measure];
            }
        });
    }

    return measuresOrganized;
}