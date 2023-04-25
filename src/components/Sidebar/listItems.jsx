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

  return (
      <div>
        <>
          <ListItem button onClick={handleClickHospital}>
            <ListItemText primary="Hospital" style={classes.cor} />
            {isOpenHospital ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={isOpenHospital} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemLink
                  button
                  href="/edithospital"
                  style={classes.nested}
              >
                <ListItemText primary="Editar" />
              </ListItemLink>


            </List>
          </Collapse>
        </>

        <>
          <ListItem button onClick={handleClickDoctor}>
            <ListItemText primary="Médico" style={classes.cor} />
            {isOpenDoctor ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={isOpenDoctor} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemLink
                  button
                  href="/choice-doctor-edit"
                  style={classes.nested}
              >
                <ListItemText primary="Editar" />
              </ListItemLink>

              <ListItemLink button href="/registerdoctor" style={classes.nested}>
                <ListItemText primary="Cadastro" />
              </ListItemLink>

            </List>
          </Collapse>
        </>

        <>
          <ListItem button onClick={handleClickModule}>
            <ListItemText primary="Módulo" style={classes.cor} />
            {isOpenModule ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={isOpenModule} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemLink
                  button
                  href="/choice-raspberry-edit"
                  style={classes.nested}
              >
                <ListItemText primary="Editar" />
              </ListItemLink>

              <ListItemLink button href="/registermodule" style={classes.nested}>
                <ListItemText primary="Cadastro" />
              </ListItemLink>

              <ListItemLink
                  button
                  href="/choice-module-monitoring"
                  style={classes.nested}
              >
                <ListItemText primary="Monitoramento" />
              </ListItemLink>

              <ListItemLink
                  button
                  href="/choice-raspberry-reports"
                  style={classes.nested}
              >
                <ListItemText primary="Relatório" />
              </ListItemLink>
            </List>
          </Collapse>
        </>



        <>
          <ListItem button onClick={handleClickPatient}>
            <ListItemText primary="Paciente" style={classes.cor} />
            {isOpenPatient ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={isOpenPatient} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemLink
                  button
                  href="/choice-patient-edit"
                  style={classes.nested}
              >
                <ListItemText primary="Editar" />
              </ListItemLink>

              <ListItemLink button href="/registerpatient" style={classes.nested}>
                <ListItemText primary="Cadastro" />
              </ListItemLink>

              <ListItemLink
                  button
                  href="/choice-patient-monitoring"
                  style={classes.nested}
              >
                <ListItemText primary="Monitoramento" />
              </ListItemLink>

              <ListItemLink
                  button
                  href="/choice-patient-reports"
                  style={classes.nested}
              >
                <ListItemText primary="Relatório" />
              </ListItemLink>
            </List>
          </Collapse>
        </>
      </div>
  );
}
