import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import api from "../../services/api";
import { login } from "../../services/auth";
import "./styles.css";
import imgBarrosBarretoBackground from "../../assets/barros-barreto-background.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${imgBarrosBarretoBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  /* Função javascript que possibilita a navegação entre rotas.
		 Utilizada quando não for possível usar o Link do React-Router-DOM*/
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Requisição do formulário de login
      const response = await api.post("/login", {
        email: email,
        password: senha,
      });
      // Recure o token do login realizado pelo usuário
      login(response.data.token);

      // Verifica a role do usuário. Somente irão logar Controlador, Executor ou Admin
      const res = await api.get(`/profile`);
      const roleUser = res.data.permission;
      console.log("roleUser");
      console.log(roleUser);

      if (
        roleUser === "Admin" ||
        roleUser === "Monitor" ||
        roleUser === "Técnico"
      ) {
        // Salva informações no localstorage para ser usadas no restante do código
        localStorage.setItem("NameUser", res.data.name);
        localStorage.setItem("IdUser", res.data.id);
        localStorage.setItem("Permission", res.data.permission);

        if (roleUser === "Admin") history.push("/choice-patient-edit");
      } else {
        // Caso o usuário não pertença a nenhuma das roles especificadas a página sofre um refresh.
        alert("Houve um problema com o login, verifique suas credenciais!");
        window.location.reload();
      }
    } catch (err) {
      alert("Houve um problema com o login, verifique suas credenciais!");
      window.location.reload();
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className="login-container">
          <CssBaseline />

          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Login
            </Typography>

            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Digite seu e-mail"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Digite sua senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />

              {/*<Grid container>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/>
							</Grid>*/}

              <div className="logar">
                <button type="submit" className="button">
                  Entrar
                </button>
              </div>

              <Grid container>
                <Grid item style={{ textAlign: "left", marginTop: "10px" }}>
                  <p>
                    Problemas para realizar login? Entre em contato com o
                    administrador do sistema.
                  </p>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
