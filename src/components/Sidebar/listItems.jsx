import React, { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemText, ListItem } from "@mui/material";
import { useHistory } from "react-router-dom";


const classes = {

  nested: {
    paddingLeft: 32,
    color: "#000",

  },
  cor: {
    color: "#FAFAFA",

  },
};

export default function ListItems({ handleDrawerClose, isMobile }) {
  const history = useHistory();
  const [isOpenPatient, setIsOpenPatient] = useState(false);
  const [isOpenHospital, setIsOpenHospital] = useState(false);
  const [isOpenDoctor, setIsOpenDoctor] = useState(false);
  const [isOpenModule, setIsOpenModule] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);

  //Informa as permissões que
  const typeUser = localStorage.getItem('Permission');

  function ListItemLink({ href, ...props }) {
    return (
        <ListItem
            onClick={() => {
              history.push(href);
              isMobile && handleDrawerClose();
            }}
            component="button"
            {...props}
        />
    );
  }

  const handleClickPatient = () => setIsOpenPatient((prev) => !prev);
  const handleClickHospital = () => setIsOpenHospital((prev) => !prev);
  const handleClickModule = () => setIsOpenModule((prev) => !prev);
  const handleClickDoctor = () => setIsOpenDoctor((prev) => !prev);
  const handleClickUser = () => setIsOpenUser((prev) => !prev);

  return (
      <div>
        {
          typeUser === "Admin" ?
              <>
                <ListItem Button style={{backgroundColor: "#075d85"}} onClick={handleClickHospital}  >
                  <ListItemText primary="Hospital" style={classes.cor} />
                  {isOpenHospital ? <ExpandLess /> : <ExpandMore />}
                </ListItem>


                <Collapse in={isOpenHospital} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemLink button href="/choice-hospital-edit" style={classes.nested}>
                      <ListItemText primary="Editar" />
                    </ListItemLink>


                    <ListItemLink button href="/registerhospital" style={classes.nested}>
                      <ListItemText primary="Cadastro" />
                    </ListItemLink>

                  </List>
                </Collapse>
              </> :false
        }

        {
          typeUser === "Admin" || typeUser === "Controlador" ?
              <>
                <ListItem Button style={{backgroundColor: "#075d85"}} onClick={handleClickDoctor}>
                  <ListItemText primary="Médico" style={classes.cor} />
                  {isOpenDoctor ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={isOpenDoctor} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>

                    <ListItemLink button href="/choice-doctor-edit" style={classes.nested}>
                      <ListItemText primary="Editar"/>
                    </ListItemLink>

                    <ListItemLink button href="/registerdoctor" style={classes.nested}>
                      <ListItemText primary="Cadastro" />
                    </ListItemLink>

                  </List>
                </Collapse>
              </> :false
        }


        {
          typeUser === "Admin" || typeUser === "Controlador" || typeUser === "Doutor" ?
              <>
                <ListItem Button style={{backgroundColor: "#075d85"}} onClick={handleClickModule} >
                  <ListItemText primary="Módulo" style={classes.cor} />
                  {isOpenModule ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={isOpenModule} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemLink button href="/choice-raspberry-edit" style={classes.nested}>
                      <ListItemText primary="Editar" />
                    </ListItemLink>

                    <ListItemLink button href="/registermodule" style={classes.nested}>
                      <ListItemText primary="Cadastro" />
                    </ListItemLink>

                    <ListItemLink button href="/choice-module-monitoring" style={classes.nested}>
                      <ListItemText primary="Monitoramento" />
                    </ListItemLink>

                    <ListItemLink button href="/choice-raspberry-reports" style={classes.nested}>
                      <ListItemText primary="Relatório" />
                    </ListItemLink>

                  </List>
                </Collapse>
              </> : false
        }

        {
          typeUser === "Admin" || typeUser === "Controlador" || typeUser === "Doutor" ?
              <>
                <ListItem Button style={{backgroundColor: "#075d85"}} onClick={handleClickPatient}>
                  <ListItemText primary="Paciente" style={classes.cor} />
                  {isOpenPatient ? <ExpandLess /> : <ExpandMore /> }
                </ListItem>

                <Collapse in={isOpenPatient} timeout="auto" unmountOnExit >
                  <List component="div" disablePadding >
                    <ListItemLink button href="/choice-patient-edit" style={classes.nested}>
                      <ListItemText primary="Editar" />
                    </ListItemLink>

                    <ListItemLink button href="/registerpatient" style={classes.nested}>
                      <ListItemText primary="Cadastro" />
                    </ListItemLink>

                    <ListItemLink button href="/choice-patient-monitoring" style={classes.nested}>
                      <ListItemText primary="Monitoramento" />
                    </ListItemLink>

                    <ListItemLink button href="/choice-patient-reports" style={classes.nested}>
                      <ListItemText primary="Relatório" />
                    </ListItemLink>

                  </List>
                </Collapse>
              </> : false
        }

        {
          typeUser === "Admin" ?
              <>
                <ListItem Button style={{backgroundColor: "#075d85"}} onClick={handleClickUser}>
                  <ListItemText primary="Usuários" style={classes.cor} />
                  {isOpenUser ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={isOpenUser} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemLink button href="/userRegister" style={classes.nested}>
                      <ListItemText primary="Gerenciamento" />
                    </ListItemLink>

                  </List>
                </Collapse>
              </> : false
        }

      </div>
  );
}