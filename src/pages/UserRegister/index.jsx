import React from 'react';
import { useHistory } from "react-router-dom";
import './styles.css';
import UserRegister from './UserRegister';
import UserList from './UserList';
import UserPermission from '../../components/UserPermission';

export default function CadastroDeUsuario() {
  const history = useHistory();

  /* Permissão do usuário no sistema */
  let userPermission = UserPermission();

  if (userPermission !== 'admin') {
    return (
      <>
        {alert("Seu usuário não possuí privilégios para acessar essa página!")}
        {history.push("/search")}
      </>
    )
  } else {
    return (

      <div className="register-container">

        <h3>Cadastro de usuários</h3>
        <span>Preencha o formulário abaixo para cadastrar um usuário. Atente-se em cadastrar o(s) tipo(s) vinculadas a esse usuário.</span>

        <UserRegister />

        <hr></hr>

        <h3>Listagem de usuários</h3>
        <span>
          Abaixo será listado os usuários cadastrados no sistema.
          É possível editar ou excluir um usuário selecionando uma das opções a direita da tabela.
        </span>

        <UserList />
      </div>
    );
  }
}