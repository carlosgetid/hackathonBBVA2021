import React, { useState } from 'react';
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import '../styles/Login.css';
import { Typography, FormControl, InputLabel, Select, MenuItem, TextField, Paper, Grid, Button, colors } from "@material-ui/core";

import FacebookLogin from 'react-facebook-login';
import getUser from '../services/auth.service';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
}));

function Login(props) {
  const { history } = props;
  const classes = useStyles();
  const [documentType, setDocumentType] = useState(0);
  const [document, setDocument] = useState("");

  const [hasGoogleSession, setHasGoogleSession] = useState(false);
  const [hasFacebookSession, setHasFacebookSession] = useState(false);
  const [hasInstagramSession, setHasInstagramSession] = useState(false);

  const nextStepValidation = documentType && document && (hasGoogleSession || hasFacebookSession || hasInstagramSession);

  const responseFacebook = (response) => {
    console.log('responseFacebook', response);
    // if (response.accessToken) {
    //   getUser(response.accessToken);
    //   setHasInstagramSession(true);
    // }
    getUser("EAAEKa3Ed9QMBAHCb7A6bL0BFQl6v2tc7O5XJ0esaHT7SG4kuFhw6DMrrTIWpm9vDV1oJ1S7TWkWS8vE6DYDqtuakDZCdhLou5dIQdkSlhhJC9qPC4NwHqZCYsZBIVpczuVXTqe6kZA3890yKl84vZCa886KYOHDB0F0eBTmKfkKHmAnk2vWKUsf6ZA5ZADwuQIYOwh3vVJ6XDO2VsLdssWuiGimsA70SplYuAolXZBL9QwZDZD");
  }

  const componentClicked = (response) => {
    console.log('evento click', response);
  }

  const goToProducts = () => history.push("/productos");

  return (
    <div className="Login">
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <br /><br />
              <Typography variant="h4" gutterBottom>
                ¡Bienvenido!
              </Typography>
            </Grid>
            <Grid item xs={3} lg={5}>
              <FormControl autoWidth variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Tipo de documento</InputLabel>
                <Select
                  autoWidth
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                >
                  <MenuItem value={1}>DNI</MenuItem>
                  <MenuItem value={2}>RUC</MenuItem>
                  <MenuItem value={3}>Pasaporte</MenuItem>
                  <MenuItem value={4}>Carnet de extranjería</MenuItem>
                  <MenuItem value={5}>Carnet identidad militar</MenuItem>
                  <MenuItem value={6}>Carnet diplomático</MenuItem>
                  <MenuItem value={7}>Partida de nacimiento</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3} lg={7}>
              <FormControl variant="filled" className={classes.formControl}>
                <TextField id="filled-basic" label="Documento" value={document} variant="filled" onChange={(e) => setDocument(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Para una mejor personalizacion ingresa con todas redes sociales
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3} alignContent="center" alignItems="center">
                <Grid item>
                  <Button className={`google-button${!hasGoogleSession ? '-outlined' : ''}`} color="primary" variant={hasGoogleSession ? "contained" : "outlined"} onClick={() => setHasGoogleSession(true)}>
                    Google
                  </Button>
                </Grid>
                <Grid item className={`facebook-button${!hasFacebookSession ? '-outlined' : ''}`}>
                  <FacebookLogin
                    appId="292931552277763"
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={componentClicked}
                    callback={responseFacebook} />

                </Grid>
                <Grid item>
                  <Button className={`instagram-button${!hasInstagramSession ? '-outlined' : ''}`} color="primary" variant={hasInstagramSession ? "contained" : "outlined"} onClick={() => setHasInstagramSession(true)}>
                    Instagram
                    </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3} justify="flex-end" alignItems="center">
                <Grid item>
                  <br /><br /><br />
                  <Button onClick={goToProducts} variant="contained" color="primary" disabled={!nextStepValidation}>
                    Descubre tus productos ahora
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>





    </div >
  );
}

export default Login;
