import { useHistory } from 'react-router-dom';
import ChoicePatient from '../../components/ChoicePatient';

export default function Choice() {
    const history = useHistory();

    const onChoosing = (patient) => {
        history.push(`/report/${patient.id}`);
    }

    return (
        <ChoicePatient
            onlyDischargedPatient={true}
            title='Escolha um paciente para imprimir o relatório'
            onChoosing={onChoosing}
        />
    );
}