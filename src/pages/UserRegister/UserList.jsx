import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiEdit3 } from 'react-icons/fi';

import api from '../../services/api';

//import './styles.css';
import Table from "./Table";

//alerta
import Notification from '../../components/Notification/Notification';
import ConfirmDialog from '../../components/Notification/ConfirmDialog';

export default function UserList() {
  // Permissão do usuário no sistema
  let userPermission;
  switch(localStorage.getItem('Permission')) {
    case 'Admin':
      userPermission = 'admin';
      break;
    case 'Técnico':
      userPermission = 'managers';
      break;
    case 'Médico':
      userPermission = 'doctors';
      break;
    default:
      break;
  }

  // States
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [notify, setNotify] = useState({ isOpen:false, message: '', type: '', title:''})
  const [confirmDialog, setConfirmDialog] = useState({ isOpen:false, title: '', subTitle: ''}) 


  // Função para deletar um usuário 
  const handleDeleteUser = useCallback(async (id, userPermission) => {
    try {
      await api.delete(`${userPermission}/users/${id}`);
      //alert(`Usuário deletado com sucesso.`);
      setNotify({
        isOpen: true,
        message: 'Usuário deletado com sucesso.',
        type: 'error',
        title: 'Deletado'      
      });

      setRefresh(true);
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });

    } catch (err) {
      //alert('Erro ao deletar usuário, tente novamente');
      setNotify({
        isOpen: true,
        message: 'Erro ao deletar usuário, tente novamente.',
        type: 'error',
        title: 'Erro'      
      });
    }
  }, [ confirmDialog ]);

  // chama o alerta para deletar 
  const deleteUserDialog = useCallback((id, name, userPermission) => {
    setConfirmDialog({ 
      isOpen:true, 
      title: `Você gostaria de deletar o usuário ${name}?`, 
      subTitle: 'Esta ação não poderá ser desfeita',
      onConfirm: () => {
        handleDeleteUser(id, userPermission)
      }
    }) 
  }, [ handleDeleteUser ]); 

  // useEffect
  useEffect(() => {
    if(refresh === true){
      api.get(`${userPermission}/users?filter={"where":{"or":[{"role":"Técnico"}, {"role":"Doutor"}]}}`).then(response => {
        setUsers(response.data);
      })
    }
    setRefresh(false);
    // pega todos os usuários cadastrados
    
  }, [userPermission, refresh]); 

  /* Colunas da tabela */
  const columns = useMemo (
  () => [
    {
      Header: 'Nome',
      accessor: 'name',
    },
    {
      Header: 'E-mail',
      accessor: 'email',
    },
    {
      Header: 'Telefone',
      accessor: 'phone',
    },
    {
      Header: 'Perfil',
      accessor: 'role',
    },
    {
      // Make an expander cell
      Header: () => null, // No header
      id: 'edit', // It needs an ID
      Cell: ({ row }) => (
        // <Link to={`/useredit/${row.original.id}`}>
        <Link to={`/useredit/${row.original.id}`}>
          <FiEdit3 
            size={20} 
            color="#067D97" 
          />
        </Link>
      ),
    },
    {
      // Make an expander cell
      Header: () => null, // No header
      id: 'expander', // It needs an ID
      Cell: ({ row }) => (
        <Link to="#">
          <FiTrash2 
            size={20} 
            color="#FF0000"
            onClick = {() => {
              deleteUserDialog(row.original.id, row.original.name, userPermission)
            }}
          />
        </Link>)
      },
    ], [ userPermission, deleteUserDialog ]
  );

  return (
    <div className='list-table'>
      <Table columns={columns} data={users} />
      
      <Notification
        notify={notify}
        setNotify={setNotify}
      />

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  )
}