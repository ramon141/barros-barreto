import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItems from "./listItems";

//import size dimensions
import useWindowDimensions from "./WindowDimensions";

import logoBarrosBarreto from "../../assets/hospital-logo.png";
import { AreaLogo, Area } from "./styles";
import Header from "../Header";
const drawerWidth = 280;

const useStyles = makeStyles((theme, lagura) => ({
  divForbiddenAccess: {
    width: "100%",
    textAlign: "center",
    marginTop: "40vh",
  },

  root: {
    display: "flex",
  },

  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },

  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#016494",
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px + ${lagura}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginRight: 0,
  },

  menuButtonHidden: {
    display: "none",
  },

  title: {
    flexGrow: 1,
  },

  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#F5F5F5",
    width: theme.spacing(32),
  },

  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },

  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },

  fixedHeight: {
    height: 240,
  },
}));

export default function Sidebar({ children }) {
  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState("");
  const [menu, setMenu] = useState("temporary");

  // seta tamanho da janela
  const { width } = useWindowDimensions();

  useEffect(() => {
    setWindowWidth(width);
    // seta o tamanho menor que 750 para renderizar fechado
    if (width < 750) {
      setOpen(false);
      setMenu("temporary");
    } else {
      setOpen(true);
      setMenu("permanent");
    }
  }, [width]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
              style={{ opacity: windowWidth > 750 ? 0.0 : 1 }}
              disabled={windowWidth > 750}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              <Area style={{ display: windowWidth < 750 ? "none" : "block" }}>
                <AreaLogo>
                  <div>
                    <a
                      href="https://www.gov.br/ebserh/pt-br/hospitais-universitarios/regiao-norte/chu-ufpa"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <img
                        src={logoBarrosBarreto}
                        className="bandeira"
                        alt="Logo Barros Barreto"
                      />
                    </a>
                  </div>
                </AreaLogo>
              </Area>
            </Typography>
            <Header />
          </Toolbar>
        </AppBar>
        <Drawer
          variant={menu}
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
          style={{ opacity: open === false ? 0.0 : 1 }}
        >
          <div className={classes.toolbarIcon}>
            <div style={{ padding: 8, width: 60 }}>
              <a
                href="https://www.gov.br/ebserh/pt-br/hospitais-universitarios/regiao-norte/chu-ufpa"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  src={logoBarrosBarreto}
                  style={{ width: 50 }}
                  className="bandeira"
                  alt="Logo UFPA"
                />
              </a>
            </div>

            <IconButton
              onClick={handleDrawerClose}
              disabled={windowWidth > 750}
              style={{ opacity: windowWidth > 750 ? 0.0 : 1 }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </div>

          <Divider />
          <List>
            <ListItems handleDrawerClose={handleDrawerClose} />
          </List>
        </Drawer>
        <main
          className={classes.content}
          style={{ paddingTop: windowWidth > 750 ? 0 : 30 }}
        >
          <div className={classes.appBarSpacer} />
          {children}
        </main>{" "}
        :
      </div>
    </>
  );
}
