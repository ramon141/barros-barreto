import { useHistory } from "react-router-dom";
import ChoiceRaspberry from "../../components/ChoiceRaspberry";

export default function ChoiceRaspberryEdit() {
  const history = useHistory();

  const onChoosing = (raspberry) => {
    history.push(`/editraspberry/${raspberry.id}`);
  };

  return (
    <ChoiceRaspberry
      title="Selecione o Módulo que deseja editar"
      onChoosing={onChoosing}
    />
  );
}
