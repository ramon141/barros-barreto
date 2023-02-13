import React, { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { Collapse, List, ListItemText, ListItem } from "@mui/material";

const classes = {
  nested: {
    paddingLeft: 32,
    color: "#000",
  },
  cor: {
    color: "#000",
  },
};

export default function ListItems() {
  const [isOpenPatient, setIsOpenPatient] = useState(false);

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  const handleClickPatient = () => setIsOpenPatient((prev) => !prev);

  return (
    <div>
      <ListItemLink button href="/registerdoctor" style={classes.cor}>
        <ListItemText primary="Cadastro de Médico" />
      </ListItemLink>

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
