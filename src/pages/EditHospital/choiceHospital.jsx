import { useHistory } from "react-router-dom";
import ChoiceHospital from "../../components/ChoiceHospital";

export default function ChoiceHospitalEdit() {
  const history = useHistory();

  const onChoosing = (hospital) => {
    history.push(`/edithospital/${hospital.id}`);
  };

  return (
    <ChoiceHospital
      title="Selecione o Hospital que deseja editar"
      onChoosing={onChoosing}
    />
  );
}
