import React, { useState, useEffect } from 'react';

import api from '../../services/api';

//alerta
import Notification from '../../components/Notification/Notification';

/* Material UI */
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import UpdateIcon from '@material-ui/icons/Update';
import Button from '@material-ui/core/Button';

import './styles.css';

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

export default function EditInfoUser({userPermission}) {
	const classes = useStyles();

	/* Estados dos campos enviados pelo método PUT */
  const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const [telefone, setTelefone] = useState("");
	const [role, setRole] = useState([]);
	const [areasSelect, setAreasSelect] = useState([]);

  const [editPassword, setEditPassWord] = useState(true);
  const [editConfirmPassword, setEditConfirmPassWord] = useState(true);

  //alerta
  const [notify, setNotify] = useState({ isOpen:false, message: '', type: '', title:''})

  useEffect(() => {
    // id do usuário que será editado
    const id = window.location.pathname.split("/").pop();
    
    api.get(`${userPermission}/users/${id}`).then(response => {
      setId(response.data.id);
      setName(response.data.name);
      setEmail(response.data.email);
      setTelefone(response.data.telefone);
      setPassword('');
      setConfirmPassword('');
      setRole(response.data.role);
      setAreasSelect(() => {
        if (role === "Administradorr") {
          return "";

        } else if (role === "Controlador") {
          return "";

        } else if (role === "Doutor") {
          return "";
        }
        });
    });
  }, [role, userPermission]);

	function clearForm() {
    setId('');
		setName('');
		setPassword('');
		setConfirmPassword('');
		setEmail('');
		setTelefone('');
		setAreasSelect([]);
		setRole([]);
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
			  data = { id,
                 name, 
                 email,
                 password,
                 telefone,
                 role,
                 manager:areasSelect.map(item => ({id: item.value,  name: item.label}))
              }
				break;
				
			case "Doutor":
			 data = { name,
                 id,
				 email,
				 password,
				 telefone,
				  role,
				 executor:areasSelect.map(item => ({id: item.value, name: item.label}))
             }

             break;

			default:
             data = { id,
               name,
               email,
               password,
               telefone,
               role,
             }
			 break;
		}
    
		if (password !== confirmPassword) {
			setNotify({
				isOpen: true,
				message: 'As senhas não coincidem.',
				type: 'warning'        
			});

		} else if (password.length < 8 || confirmPassword < 8) { 
			//alert('A senha deve conter mais que 8 caracteres.');
			setNotify({
				isOpen: true,
				message: 'A nova senha deve conter no mínimo 8 caracteres.',
				type: 'warning'        
			});

		} else {
			try {
				await api.put(`${userPermission}/users/${data.id}/password`, data);
        
				setNotify({
				isOpen: true,
				message: 'Senha do usuário atualizado com sucesso.',
				type: 'success',
				title: 'Atualizado'      
				});
				clearForm();

			} catch (err) {
				setNotify({
					isOpen: true,
					message: 'Ocorreu um erro ao atualizar a senha do usuário.',
					type: 'error',   
					title: 'Erro',        
				  });
			}
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
            Alterar Senha
        </Typography>

        <Typography variant="body2" align="justify" className={classes.textDescription}>
            Abaixo é possível alterar a senha do usuário selecionado.
        </Typography>

        <form onSubmit={handleUpdate} className="form-register">          
          <TextField placeholder="Digite a senha do usuário"
            disable={false}
            className={classes.textField}
            variant="outlined"
            margin="normal"
            required
            type="password"
            label="Senha"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                <IconButton onClick={() => setEditPassWord(editPassword === true ? false : true)}>
                  <EditIcon />
                </IconButton>
                </InputAdornment>
              ),
              disabled: editPassword,
            }}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <TextField placeholder="Confirme a senha do usuário"
            disable={false}
            className={classes.textField}
            variant="outlined"
            margin="normal"
            required
            error={password !== confirmPassword}
            /*helperText={password !== confirmPassword ? "Senhas não coincidem" : ""}*/
            type="password"
            label="Senha"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                <IconButton onClick={() => setEditConfirmPassWord(editConfirmPassword === true ? false : true)}>
                  <EditIcon />
                </IconButton>
                </InputAdornment>
              ),
              disabled: editConfirmPassword,
            }}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />

          <Notification
            notify={notify}
            setNotify={setNotify}
          />

          <div className="register-user">
            <Button variant="outlined" type='submit'>
                Atualizar Senha
            </Button>

            <Button onClick={() => clearForm()} type="button" className="button-clear">Limpar</Button>
          </div>
        </form>
      </div>
    </Paper>
  );
};
