import { React, useEffect, useState } from 'react';
import { BsArrowBarRight } from 'react-icons/bs';
import { logout } from "../../services/auth";
import './styles.css';
// Importa alerta
import { withNotitificationCustom } from '../../contexts/NotificationContext'
import api from '../../services/api';
function Header({ handleOpenNotificationCustom, handleCloseNotificationCustom }) {
	// Permissão do usuário no sistema
	var userPermission;
	switch (localStorage.getItem('Permission')) {
		case 'Admin':
			userPermission = 'admin';
			break;
		case 'Controlador':
			userPermission = 'manager';
			break;
		case 'Executor':
			userPermission = 'executor';
			break;
		default:
			break;
	}

	const userName = localStorage.getItem('NameUser');
	const typeUser = localStorage.getItem('Permission');
	const [infoUser, setInfoUser] = useState([]);

	useEffect(() => {
		api.get(`/profile`).then(res => {
			setInfoUser(res.data.areas);
		}).catch((err) => {
			/* Tratativa caso o token expire. O mesmo foi aplicado aqui pelo fato do Header ser usado em todas as páginas */
			if (err.response.status === 401 || err.response.status === 500) {
				handleOpenNotificationCustom({
					title: `Sua sessão expirou. Por favor realize um novo login.`, onConfirm: () => {
						handleCloseNotificationCustom();
						logout();
						window.location.href = '/'
					}
				});
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<header className='header-pages'>
			<div>
				<span className="name-user">Bem-vindo(a), <b>{userName.toString()}</b></span>
				<span className="type-user">Perfil: <strong>{typeUser.toString()}</strong></span>
				<br></br>
				{/* Irá exibir essa parte do código somente se o usuário for controlador ou executor */}
				{/*{userPermission === 'manager' || userPermission === 'executor' ?*/}
				{/*	<span className="type-user">*/}
				{/*		Categorias: {infoUser.map((res, i) => (*/}
				{/*			<strong key={res}>*/}
				{/*				{res}*/}
				{/*				{infoUser[i + 1] ? ', ' : ''}*/}
				{/*			</strong>*/}
				{/*		))}*/}
				{/*	</span>*/}
				{/*	: false}*/}
			</div>

			{/*<Link className="button">
       	 <img src={profile} alt="Perfil" className="imagem-profile" />
      </Link>*/}

			<button type="button" onClick={logout}>
				<BsArrowBarRight size={22} color="#fff" />
			</button>
		</header>
	)
}


export default withNotitificationCustom(Header)