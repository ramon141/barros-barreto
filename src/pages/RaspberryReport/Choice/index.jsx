import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ChoiceRaspberry from '../../../components/ChoiceRaspberry';
import ModalChoiceReportFormat from './ModalChoiceReportFormat';
import api from '../../../services/api';
import { exportAllRaspberryHTML, exportAllRaspberryPDF, exportRaspberryPDF, objectArrayToCsv, exportRaspberryHTML } from '../../../utils/raspberryReport';

export default function Choice() {
    const history = useHistory();
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [choiceAll, setChoiceAll] = useState(false)
    const [raspberry, setRaspberry] = useState([])
    const [searching, setSearching] = useState(false)

    useEffect(() => {
        loadRaspberry();
    }, []);

    function loadRaspberry(searchValue) {
        if (!searchValue) {
            api.get(`/raspberries-report`).then((response) => {
                setRaspberry(response.data);
            })
        } else {
            let filter = {
                order: 'name',
                where: {}
            };

            filter.where = {
                ...filter.where,
                or: [
                    { id: { like: `.*${searchValue}.*` } },
                    { serialNumber: { like: `.*${searchValue}.*`, options: 'i' } },
                    { propertyIdentification: { like: `.*${searchValue}.*` } }
                ]
            };
            setSearching(true)
            api.get(`/raspberries-report?filter=${JSON.stringify(filter)}`).then((response) => {
                setRaspberry(response.data);
            }).finally(() => setSearching(false))
        }
    }

    const onChoosing = (value) => {
        console.log(value)
        setSelected(value.row)
        setOpen(true)
    }
    
    const printAll = (raspberries) => {
        setChoiceAll(true)
    }

    const onChoiceFormatAll = (format) => {
        if (format == 'csv') {
            for (const rasp of raspberry) {
                if (rasp.measuredPatients) {
                    objectArrayToCsv(rasp.measuredPatients.map(v => ({
                        nome: v.name, cpf: v.cpf, peso: v.weightInKg,
                        modulo: `${rasp.model} - ${rasp.propertyIdentification}`,
                        "intervalo de mensuração": v.measureInterval, registroHospitalar: v.hospitalRegister,
                        "data de entrada": `${new Date(v.entranceDate).toLocaleDateString()}`,
                        "alta em": v.dischargedFromHospital ? new Date(v.dischargedFromHospital).toLocaleDateString() : "Hospitalizado"
                    })),
                        'raspberry_' + rasp.propertyIdentification + '_' + new Date().toLocaleDateString())
                }
            }
        }
        if (format == 'pdf') {
            exportAllRaspberryPDF(raspberry, 'relatório de todos os módulos')
        }
        if (format == 'html') {
            exportAllRaspberryHTML(raspberry, 'relatório de todos os módulos')
        }
    }

    const onChoice = async (format) => {
        if (!selected) return
        if (!Array.isArray(selected.measuredPatients) || Array.isArray(selected.measuredPatients) && selected.measuredPatients.length <= 0) {
            setSelected(null)
            return alert(`O módulo não possui pacientes`)
        }
        if (format == 'csv') {
            objectArrayToCsv(selected.measuredPatients.map(v => ({
                nome: v.name, cpf: v.cpf, peso: v.weightInKg,
                modulo: `${selected.model} - ${selected.propertyIdentification}`,
                "intervalo de mensuração": v.measureInterval, registroHospitalar: v.hospitalRegister,
                "data de entrada": `${new Date(v.entranceDate).toLocaleDateString()}`,
                "alta em": v.dischargedFromHospital ? new Date(v.dischargedFromHospital).toLocaleDateString() : "Hospitalizado"
            })),
                'raspberry_' + selected.propertyIdentification + '_' + new Date().toLocaleDateString())
        }
        if (format == 'pdf') {
            exportRaspberryPDF(selected, "Relatório dos Módulos " + selected.propertyIdentification)
        }
        if (format == 'html') {
            exportRaspberryHTML(selected, "Relatório dos Módulos " + selected.propertyIdentification)
        }
        setSelected(null)
    }

    return (
        <>
            <ModalChoiceReportFormat onChoice={onChoice} open={open} setOpen={setOpen} />
            <ModalChoiceReportFormat onChoice={onChoiceFormatAll} open={choiceAll} setOpen={setChoiceAll} />
            <ChoiceRaspberry
                title='Escolha um módulo para imprimir o relatório'
                onChoosing={onChoosing}
                printAll={() => printAll()}
                loadRaspberry={loadRaspberry}
                raspberry={raspberry}
                searching={searching}
            />
        </>
    );
}