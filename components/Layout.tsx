import {
  AppBar,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Link,
  Menu,
  MenuItem,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Head from "next/head";
import NextLink from "next/link";
import React, { useContext, useState } from "react";
import { Store } from "../utils/store";
import { useStyles } from "../utils/styles";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Layout = ({ title, children }: any) => {
  const { state, dispatch }: any = useContext(Store);
  const { darkMode, userInfo } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });
  const classes = useStyles();
  const router = useRouter();
  const darkModeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e:any) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e: any, redirect:any) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    router.push("/login");
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Expensia` : "Expensia"}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>Expensia</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch checked={darkMode} onChange={darkModeHandler}></Switch>
              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    className={classes.navButton}
                    onClick={loginClickHandler}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, "/profile")}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>Login</Link>
                </NextLink>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All Right Reserved. Expensia v1.0</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
