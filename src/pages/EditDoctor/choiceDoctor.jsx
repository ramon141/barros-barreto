import { useHistory } from "react-router-dom";
import ChoiceDoctor from "../../components/ChoiceDoctor";

export default function ChoiceDoctorEdit() {
    const history = useHistory();

    const onChoosing = (doctor) => {
        history.push(`/editdoctor/${doctor.id}`);
    };

    return (
        <ChoiceDoctor
            title="Selecione o médico que deseja editar"
            onChoosing={onChoosing}
        />
    );
}
