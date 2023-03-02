import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ChoiceRaspberry from '../../../components/ChoiceRaspberry';
import ModalChoiceReportFormat from '../../../components/ModalChoiceReportFormat';
import api from '../../../services/api';
import { exportRaspberryPDF, objectArrayToCsv } from '../../../utils/raspberryReport';

export default function Choice() {
    const history = useHistory();
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [choiceAll, setChoiceAll] = useState(false)
    const [raspberry, setRaspberry] = useState([])
    function loadRaspberry(searchValue) {
        if(!searchValue){
            api.get(`/raspberries-report`).then((response) => {
                setRaspberry(response.data);
              })    
        }
        let filter = {
          order: 'name',
          where: {}
        };
    
        //Se for um cpf ou cns
    
        filter.where = {
          ...filter.where,
          or: [
            { id: { like: `.*${searchValue}.*` } },
            { serialNumber: { like: `.*${searchValue}.*`, options: 'i' } },
            { propertyIdentification: { like: `.*${searchValue}.*` } }
          ]
        };
    
        api.get(`/raspberries-report?filter=${JSON.stringify(filter)}`).then((response) => {
          setRaspberry(response.data);
        })
      }
    const onChoosing = (value) => {
        console.log(value)
        setSelected(value.row)
        setOpen(true)
    }
    const printAll = (raspberries) => {
        setChoiceAll(true)
    }
    const onChoiceFormatAll = (format) =>{
        if(format == 'csv'){
            for(const rasp of raspberry){
                if(rasp.measuredPatients){
                    objectArrayToCsv(rasp.measuredPatients.map(v => ({
                        nome: v.name, cpf: v.cpf, peso: v.weightInKg,
                        "intervalo de mensuração": v.measureInterval, registroHospitalar: v.hospitalRegister,
                        "data de entrada": `${new Date(v.entranceDate).toLocaleDateString()}`,
                        "alta em": v.dischargedFromHospital ? new Date(v.dischargedFromHospital).toLocaleDateString() : "Hospitalizado"
                    })),
                        'raspberry_' + rasp.propertyIdentification + '_' + new Date().toLocaleDateString())
                }
            }
        }
    }
    const onChoice = async (format) => {
        if (!selected) return
        if (!Array.isArray(selected.measuredPatients) || Array.isArray(selected.measuredPatients) && selected.measuredPatients.length <= 0) {
            setSelected(null)
            return alert(`Raspberry não possui pacientes`)
        }
        if (format == 'csv') {
            objectArrayToCsv(selected.measuredPatients.map(v => ({
                nome: v.name, cpf: v.cpf, peso: v.weightInKg,
                "intervalo de mensuração": v.measureInterval, registroHospitalar: v.hospitalRegister,
                "data de entrada": `${new Date(v.entranceDate).toLocaleDateString()}`,
                "alta em": v.dischargedFromHospital ? new Date(v.dischargedFromHospital).toLocaleDateString() : "Hospitalizado"
            })),
                'raspberry_' + selected.propertyIdentification + '_' + new Date().toLocaleDateString())
        }
        if(format == 'pdf'){
            exportRaspberryPDF(selected, "Relatório do Raspberry " + selected.propertyIdentification)
        }
        setSelected(null)
    }
    return (
        <>
            <ModalChoiceReportFormat onChoice={onChoice} open={open} setOpen={setOpen} />
            <ModalChoiceReportFormat onChoice={onChoiceFormatAll} open={choiceAll} setOpen={setChoiceAll} />
            <ChoiceRaspberry
                title='Escolha um raspberry para imprimir o relatório'
                onChoosing={onChoosing}
                printAll={() => printAll()}
                loadRaspberry={loadRaspberry}
                raspberry={raspberry}
            />
        </>
    );
}