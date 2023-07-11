import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import api from '../../services/api';

//alerta
import Notification from '../../components/Notification/Notification';

/* Material UI */
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import UpdateIcon from '@material-ui/icons/Update';
import Button from '@material-ui/core/Button';

import InputMask from "react-input-mask";

import './styles.css';
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '100%',
    backgroundColor: '#fff',
  },

  /* Estilização do conteúdo dentro do container */
  paper: {
    padding: theme.spacing(2),
    display: 'inline-block',
    overflow: 'auto',
    flexDirection: 'row',
    minWidth: 'calc(100%)',
    [theme.breakpoints.up("sm")]: {
      minWidth: 500
    },
    marginRigth: '20px',
    marginTop: '40px',
  },

  root: {
    width: '100%'
  },

  /* Estilização do títutlo */
  textTitle: {
    margin: theme.spacing(1),
    color: '#41414d',
    fontWeight: 600,
  },

  textDescription: {
    margin: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.54)',
  },
}));

const styleMultiSelect = {
  control: (base) => ({
    ...base,
    position: 'relative',
    height: 70,
    minHeight: 35,
    width: '100%',
    minWidth: 3,
    marginTop: 15,
  })
};

export default function EditInfoUser({ userPermission }) {
  const classes = useStyles();

  /* Estados dos campos enviados pelo método PUT */
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setTelefone] = useState("");
  const [role, setRole] = useState([]);
  const [areasSelect, setAreasSelect] = useState([]);
  const [areas, setAreas] = useState([]);

  // const [users, setUsers] = useState("");

  const [editName, setEditName] = useState(true);
  const [editPhone, setEditTelefone] = useState(true);
  const [editEmail, setEditEmail] = useState(true);

  //alerta
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '', title: '' })

  /* ************************************************************************ */
  /* Informações dos selects ************************************************ */
  // captura as áreas de atuação.
  // renomeia os campos do objeto para ser legível pelo componente multiselect.
  const areasAtuacao = areas.map(item => (
    { value: item.id, label: item.name }
  ));

  useEffect(() => {
    // id do usuário que será editado
    const id = window.location.pathname.split("/").pop();

    api.get(`${userPermission}/areas`).then(response => {
      setAreas(response.data);
    });

    api.get(`${userPermission}/users/${id}`).then(response => {
      setId(response.data.id);
      setName(response.data.name);
      setEmail(response.data.email);
      setTelefone(response.data.phone);
      setPassword('');
      setRole(response.data.role);
      setAreasSelect(() => {
        if (role === "Doutor") {
          return response.data.executor.map(item => ({ value: item.id, label: item.name }));
        } else if (role === "Controlador") {
          return "";
        }
      });
    });
  }, [role, userPermission]);

  function clearForm() {
    setId('');
    setName('');
    setEmail('');
    setTelefone('');
    setAreasSelect([]);
    setRole([]);
  }

  function rawValueTelephone(telephone) {
    return telephone.replace(/\D/g, "");
  }

  async function handleUpdate(e) {
    e.preventDefault();

    /* * O objeto data será enviado pela api para o endpoint /users. 
       * Destaca-se a necessidade de renomear o objeto areasSelect, para que o mesmo
         tenha os mesmo campos permitidos no campo manager ou executor da api 
         (value => id | label => name). */
    let data = {};

    /* Muda o objeto caso seja selecionado que o usuário é Controlador ou Executor */
    switch (role) {
      case "Controlador":
        data = {
          id,
          name,
          email,
          password,
          telefone,
          role,
          manager: areasSelect.map(item => ({
            id: item.value,
            name: item.label
          })
          )
        }
        break;

      case "Doutor":
        data = {
          name,
          id,
          email,
          password,
          phone,
          role,
          doctor: areasSelect.map(item => ({
            id: item.value,
            name: item.label
          })
          )
        }
        break;

      default:
        data = {
          id,
          name,
          email,
          password,
          phone,
          role,
        }
        break;
    }
    try {
      await api.put(`${userPermission}/users/${data.id}`, data);

      setNotify({
        isOpen: true,
        message: 'Dados do usuário atualizado com sucesso.',
        type: 'success',
        title: 'Atualizado'
      });
      clearForm();

    } catch (err) {
      setNotify({
        isOpen: true,
        message: 'Ocorreu um erro ao registrar o usuário.',
        type: 'error',
        title: 'Erro',
      });
    }
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.root}>
        <Typography
          variant="h6"
          align="left"
          className={classes.textTitle}
        >
          Editar Informações
        </Typography>

        <Typography variant="body2" align="justify" className={classes.textDescription}>
          Abaixo é possível editar informações do usuário selecionado.
        </Typography>

        <form onSubmit={handleUpdate} className="form-register">
          <TextField placeholder="Digite o nome do usuário"
            disabled={false}
            className={classes.textField}
            variant="outlined"
            margin="normal"
            required
            label="Nome completo"
            InputProps={{
              startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setEditName(editName === true ? false : true)}>
                    <EditIcon />
                  </IconButton>
                </InputAdornment>
              ),
              disabled: editName,
            }}
            value={name}
            onChange={e => setName(e.target.value)}
          />

            <TextField placeholder="Digite o e-mail do usuário"
                       disabled={false}
                       className={classes.textField}
                       variant="outlined"
                       margin="normal"
                       required
                       label="Email"
                       InputProps={{
                         startAdornment: (
                             <InputAdornment position="start">
                               <AlternateEmailIcon />
                             </InputAdornment>
                         ),
                         endAdornment: (
                             <InputAdornment position="end">
                               <IconButton onClick={() => setEditEmail(editEmail === true ? false : true)}>
                                 <EditIcon />
                               </IconButton>
                             </InputAdornment>
                         ),
                         disabled: editEmail,
                       }}
                       value={email}
                       onChange={e => setEmail(e.target.value)}
            />

          <InputMask
              mask="(99) 9 9999-9999"
              maskChar=" "
              type="tel"
              value={phone}
              onChange={e => setTelefone(rawValueTelephone(e.target.value))}
          >
            {() => <TextField placeholder="Digite o telefone de usuário"
              className={classes.textField}
              variant="outlined"
              margin="normal"
              fullWidth
              label="Telefone"
              InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                <LocalPhoneIcon />
                </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setEditTelefone(editPhone === true ? false : true)}>
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                disabled: editPhone,
              }}
            />}
          </InputMask>

          <Notification
            notify={notify}
            setNotify={setNotify}
          />

          <div className="register-user">
            <Button
              variant="outlined"
              type='submit'
            >
              Atualizar Usuário
            </Button>
            <Button onClick={() => clearForm()} type="button" className="button-clear">Limpar</Button>
          </div>
        </form>
      </div>
    </Paper>
  );
};
