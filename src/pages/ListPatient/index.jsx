import { useHistory } from "react-router-dom";
import ChoicePatient from "../../components/ChoicePatient";

export default function ListPatient() {
  const history = useHistory();

  const onChoosing = (patient) => {
    history.push(`/monitoring/${patient.id}`);
  };

  return (
    <ChoicePatient
      title="Acessar Monitoramento do Paciente"
      onChoosing={onChoosing}
      noDischargedPatient={true}
    />
  );
}
