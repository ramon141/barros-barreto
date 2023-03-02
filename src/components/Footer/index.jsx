import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import ufpaLogo from '../../assets/ufpa.png';
import logoHospital from '../../assets/hospital-logo.png';
import { Grid } from '@material-ui/core';

import { Desc } from "./styles";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">

        <div className="row ">
          {/* Primeira linha do Footer */}
          <div className="col">
            <h5>Parcerias</h5>
          </div>
        </div>

        <Grid container direction='row' justifyContent='center' alignItems="center" spacing={2}>

          <Grid item xs={3} sm={3} md={2} lg={2}>
            <a href="https://portal.ufpa.br/" rel="noreferrer" target="_blank">
              <img src={ufpaLogo} className='logo' alt="Logo UFPA" />
            </a>
          </Grid>

          <Grid item xs={3} sm={3} md={2} lg={2}>
            <a href="https://www.gov.br/ebserh/pt-br/hospitais-universitarios/regiao-norte/chu-ufpa" rel="noreferrer" target="_blank">
              <img src={logoHospital} className='logo' alt="Logo UFPA" />
            </a>
          </Grid>

        </Grid>

        <Desc>
          <hr />
          <div className="row">
            <p className="col-sm">
              &copy;{new Date().getFullYear()} Hospital Universitário João de Barros Barreto | Todos os direitos reservados |
            </p>
          </div>
        </Desc>
      </div>
    </div>
  );
}

export default Footer;