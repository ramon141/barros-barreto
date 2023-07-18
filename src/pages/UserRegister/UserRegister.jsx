import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import api from '../../services/api';

/* Material UI */
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';


//alerta
import Notification from '../../components/Notification/Notification';
import ConfirmDialog from '../../components/Notification/ConfirmDialog';

import InputMask from "react-input-mask";

import './styles.css';


const useStyles = makeStyles((theme) => ({
	textField: {
		position: 'relative',
		width: '100%',
		backgroundColor: '#fff',
		zIndex: 0,
	},
	buttonSubmit: {
		marginRight: 30,

	},
}));

const styleMultiSelect = {
	control: (base) => ({
		...base,
		position: 'relative',
		height: 56,
		minHeight: 35,
		width: '100%',
		minWidth: 35,
		marginTop: 15,
		zIndex: 2,
	})
};

export default function UserRegister() {
	const classes = useStyles();

	// Permissão do usuário no sistema
	var userPermission;
	switch (localStorage.getItem('Permission')) {
		case 'Admin':
			userPermission = 'admin';
			break;
		case 'Controlador':
			userPermission = 'managers';
			break;
		case 'Doutor':
			userPermission = 'doctors';
			break;
		default:
			break;
	}

	var validationEmail = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

	// Estados
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setTelefone] = useState("");
	const [role, setRole] = useState([]);
	const [areasSelect, setAreasSelect] = useState([]);
	const [areas, setAreas] = useState([]);

	//alerta
	const [notify, setNotify] = useState({ isOpen: false, message: '', type: '', title: '' })
	const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

	/* Informações dos selects ************************************************ */
	// captura as áreas de atuação.
	// renomeia os campos do objeto para ser legível pelo componente multiselect.
	const areasAtuacao = areas.map(item => ({
		value: item.id,
		label: item.name
	}));

	// Tipos de usuários
	const typeUser = [
		{ value: "1", label: "Administrador" },
		{ value: "2", label: "Técnico"  }
	];
	/* ************************************************************************ */

	useEffect(() => {
		api.get('/admin/areas').then(response => {
			setAreas(response.data);
		});
	}, []);

	function clearForm() {
		setName('');
		setPassword('');
		setConfirmPassword('');
		setEmail('');
		setTelefone('');
		setAreasSelect([]);
		setRole([]);
	}

	function rawValueTelephone(telephone) {
		return telephone.replace(/\D/g, "");
	}

	//chama o alerta para cadastrar
	function confirms(dados) {

		dados.preventDefault();

		let data = {};
		let user = '';

		switch (role) {
			case "Controlador":
				data = {
					name,
					email,
					password,
					phone,
					role,
				}
				break;

			case "Admin":
				data = {
					name,
					email,
					password,
					phone,
					role
				};
				break;

			default:
				break;
		}
		if (role === 'Admin') {
			user = 'Administrador';
		} else if (role === 'Controlador') {
			user = 'Técnico';
		} else {
			user = role;
		}
		setConfirmDialog({
			isOpen: true,
			title: `Você tem certeza que deseja cadastar ${name} como ${user}?`,
			subTitle: '',
			onConfirm: () => { handleRegistrer(data) }
		})
	}

	function handleRole(e) {
		if (e === 'Administrador') {
			setRole('Admin')
		}
		if (e === 'Técnico') {
			setRole('Controlador')
		}
	}

	async function handleRegistrer(data) {

		/* * O objeto data será enviado pela api para o endpoint /users. 
			 * Destaca-se a necessidade de renomear o objeto areasSelect, para que o mesmo
				 tenha os mesmo campos permitidos no campo manager ou executor da api 
				 (value => id | label => name). *

		/* Muda o objeto caso seja selecionado que o usuário é Controlador ou Executor */


		if (password !== confirmPassword) {
			//alert('As senhas não coincidem.');
			setNotify({
				isOpen: true,
				message: 'As senhas não coincidem.',
				type: 'warning'
			});
			setConfirmDialog({
				...confirmDialog,
				isOpen: false,
			});
		} else if (!validationEmail.test(email)) {
			//alert('Digite um email válido.');
			setNotify({
				isOpen: true,
				message: 'Digite um email válido.',
				type: 'warning'
			});
			setConfirmDialog({
				...confirmDialog,
				isOpen: false,
			});
		} else if (password.length < 8 || confirmPassword < 8) {
			//alert('A senha deve conter mais que 8 caracteres.');
			setNotify({
				isOpen: true,
				message: 'A senha deve conter mais que 8 caracteres.',
				type: 'warning'
			});
			setConfirmDialog({
				...confirmDialog,
				isOpen: false,
			});
		} else {
			try {
				await api.post(`admin/users`, data);

				//alert(`Usuário cadastrado com sucesso.`);

				// janela de notificação de sucesso
				setNotify({
					isOpen: true,
					message: 'Usuário cadastrado com sucesso.',
					type: 'success',
					title: 'Cadastrado'
				});

				window.location.reload();

			} catch (err) {
				//alert("Ocorreu um erro ao registrar o usuário.");
				setNotify({
					isOpen: true,
					message: 'Ocorreu um erro ao registrar o usuário.',
					type: 'error',
					title: 'Erro',
				});
				setConfirmDialog({
					...confirmDialog,
					isOpen: false,
				});
			}
		}
	};

	return (
		<>
			<div className="two-fields">
				<Select options={typeUser}
						onChange={e => handleRole(e.label)}
						// onChange={e => e.label === 'Administrador' ? setRole('Admin') : setRole(e.label)}
						styles={styleMultiSelect}
						placeholder="Selecione o tipo de usuário"
						/>
			</div>

			<div className={classes.root}>
				<form onSubmit={confirms} className="form-register">
					<div className="two-fields">
						<TextField placeholder="Digite o nome do usuário"
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
							}}
							value={name}
							onChange={e => setName(e.target.value)}
						/>

						<TextField placeholder="Digite o email do Usuário"
							className={classes.textField}
							variant="outlined"
							margin="normal"
							required
							error={email !== "" ? (!validationEmail.test(email)) : false}
							label="E-mail"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AlternateEmailIcon />
									</InputAdornment>
								),
							}}
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>

					<div className="three-fields">
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
								}}/>}
						</InputMask>

						<TextField placeholder="Digite a senha do usuário"
							className={classes.textField}
							variant="outlined"
							margin="normal"
							required
							type="password"
							label="Senha"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LockIcon />
									</InputAdornment>
								),
							}}
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>

						<TextField placeholder="Confirme a senha do usuário"
							className={classes.textField}
							variant="outlined"
							margin="normal"
							required
							error={password !== confirmPassword}
							/*helperText={password !== confirmPassword ? "Senhas não coincidem" : ""}*/
							type="password"
							label="Senha"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LockIcon />
									</InputAdornment>
								),
							}}
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
						/>
					</div>

					<Notification
						notify={notify}
						setNotify={setNotify}
					/>
					<ConfirmDialog
						confirmDialog={confirmDialog}
						setConfirmDialog={setConfirmDialog}
					/>

					<div className="register-user">
						<Button
							className="Button"
							variant="outlined"
							startIcon={<SaveIcon style={{ 'color': '#FAFAFA' }} />}
							type='submit'
						>
							Cadastrar Usuário
						</Button>

						<Button
							className="Button-clear"
							variant="outlined"
							startIcon={<ClearIcon style={{ 'color': '#FAFAFA' }} />}
							type='button'
							onClick={() => clearForm()}
						>
							Limpar
						</Button>
					</div>
				</form>
			</div>
		</>
	);
}