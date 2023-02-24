import { useHistory } from "react-router-dom";
import ChoicePatient from "../../components/ChoicePatient";

export default function ChoicePatientEdit() {
  const history = useHistory();

  const onChoosing = (patient) => {
    history.push(`/editpatient/${patient.id}`);
  };

  return (
    <ChoicePatient
      title="Selecione o Paciente que deseja editar"
      onChoosing={onChoosing}
    />
  );
}
