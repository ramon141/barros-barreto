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
    color: "#000",
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
                <ListItem button onClick={handleClickHospital}>
                  <ListItemText primary="Hospital" style={classes.cor} />
                  {isOpenHospital ? <ExpandLess /> : <ExpandMore />}
                </ListItem>


                <Collapse in={isOpenHospital} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemLink
                        button href="/choice-hospital-edit" className={classes.nested}>
                      <ListItemText primary="Editar" />
                    </ListItemLink>


                    <ListItemLink button href="/registerhospital" className={classes.nested}>
                      <ListItemText primary="Cadastro" />
                    </ListItemLink>

                  </List>
                </Collapse>
              </> :false
        }

        {
          typeUser === "Admin" || typeUser === "Controlador" ?
              <>
                <ListItem button onClick={handleClickDoctor}>
                  <ListItemText primary="Médico" className={classes.cor} />
                  {isOpenDoctor ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={isOpenDoctor} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>

                    <ListItemLink button href="/choice-doctor-edit" className={classes.nested}>
                      <ListItemText primary="Editar" />
                    </ListItemLink>

                    <ListItemLink button href="/registerdoctor" className={classes.nested}>
                      <ListItemText primary="Cadastro" />
                    </ListItemLink>

                  </List>
                </Collapse>
              </> :false
        }


        {
          typeUser === "Admin" || typeUser === "Controlador" || typeUser === "Doutor" ?
              <>
                <ListItem button onClick={handleClickModule}>
                  <ListItemText primary="Módulo" className={classes.cor} />
                  {isOpenModule ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={isOpenModule} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemLink button href="/choice-raspberry-edit" className={classes.nested}>
                      <ListItemText primary="Editar" />
                    </ListItemLink>

                    <ListItemLink button href="/registermodule" className={classes.nested}>
                      <ListItemText primary="Cadastro" />
                    </ListItemLink>

                    <ListItemLink button href="/choice-module-monitoring" className={classes.nested}>
                      <ListItemText primary="Monitoramento" />
                    </ListItemLink>

                    <ListItemLink button href="/choice-raspberry-reports" className={classes.nested}>
                      <ListItemText primary="Relatório" />
                    </ListItemLink>

                  </List>
                </Collapse>
              </> : false
        }

        {
          typeUser === "Admin" || typeUser === "Controlador" || typeUser === "Doutor" ?
              <>
                <ListItem button onClick={handleClickPatient}>
                  <ListItemText primary="Paciente" className={classes.cor} />
                  {isOpenPatient ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={isOpenPatient} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemLink button href="/choice-patient-edit" className={classes.nested}>
                      <ListItemText primary="Editar" />
                    </ListItemLink>

                    <ListItemLink button href="/registerpatient" className={classes.nested}>
                      <ListItemText primary="Cadastro" />
                    </ListItemLink>

                    <ListItemLink button href="/choice-patient-monitoring" className={classes.nested}>
                      <ListItemText primary="Monitoramento" />
                    </ListItemLink>

                    <ListItemLink button href="/choice-patient-reports" className={classes.nested}>
                      <ListItemText primary="Relatório" />
                    </ListItemLink>

                  </List>
                </Collapse>
              </> : false
        }

        {
          typeUser === "Admin" ?
              <>
                <ListItem button onClick={handleClickUser}>
                  <ListItemText primary="Usuários" className={classes.cor} />
                  {isOpenUser ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={isOpenUser} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemLink button href="/userRegister" className={classes.nested}>
                      <ListItemText primary="Gerenciamento" />
                    </ListItemLink>

                  </List>
                </Collapse>
              </> : false
        }

      </div>
  );
}