import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { useHistory } from "react-router-dom";

/* Componentes */
import EditInfoUser from './editInfoUser';
import EditPasswordUser from './editPasswordUser';
import UserPermission from '../../components/UserPermission';

/* Material UI */
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import './styles.css';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },

  textField: {
    width: '100%',
    backgroundColor: '#fff',
  },
}));


export default function UserEdit() {
  const classes = useStyles();
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
      <div className="useredit-container">

        <Link to='/userregister'>
          <FiLogIn size={18} color="009155" />
          Voltar para cadastro de usuários
        </Link>

        <div className={classes.root}>
          <Grid container justifyContent="space-between">
            <EditInfoUser userPermission={userPermission} />
            <EditPasswordUser userPermission={userPermission} />
          </Grid>
        </div>
      </div>
    )
  };
};