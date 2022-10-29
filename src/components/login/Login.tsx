import { SyntheticEvent, useState } from "react";
import { User } from "../../models/user";
import { Link, Navigate } from 'react-router-dom';
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Avatar, Box, Button, Checkbox, Container, createTheme, CssBaseline, FormControlLabel, Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


interface ILoginProps {
    currentUser: User | undefined,
    setCurrentUser: (nextUser: User) => void
}

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            220919-Java/React{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

function Login(props: ILoginProps) {

    // let username = '';
    // let password = '';
    // let errorMessage ='Hello';

    // Destructuring assignment
    // destructuring assignment sets username = first element of useState arr and setUsername = second element of useState arr
    const [username, setUsername] = useState(''); // initial value
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    let updateUsername = (e: SyntheticEvent) => {
        // username = (e.target as HTMLInputElement).value;
        setUsername((e.target as HTMLInputElement).value);
        // console.log(`Username is ${username}`);
    }

    let updatePassword = (e: SyntheticEvent) => {
        setPassword((e.target as HTMLInputElement).value);
        // console.log(`Password is ${password}`);
    }

    // SyntheticEvents are wrapper around DOM event
    let login = async (e: SyntheticEvent) => {
        // console.log(`Username is: ${username}, password is ${password}`);

        if (!username || !password) {
            setErrorMessage('You must have valid username and password.');
        } else {
            setErrorMessage('');
            try {
                let response = await fetch('http://localhost:8080/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // credentials: 'include', // property to work with Java HTTP Sessions
                    body: JSON.stringify({ username, password })
                });

                if (response.status == 200) {
                    props.setCurrentUser(await response.json());
                } else {
                    setErrorMessage('Could not validate the provided credentials');
                }
            } catch (err) {
                setErrorMessage('Unable to communicate with the API.');
            }
        }
    }

    return (
        props.currentUser ? // condition to be evaluated, ie: if(user)
            // <p> Welcome {props.currentUser.username}! </p> // if true
            <Navigate to="/dashboard" />
            : // else
            <>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in to Task App
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={updateUsername}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={updatePassword}
                                />
                                <Button
                                    onClick={login}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item>
                                        <Link to="/register">
                                            {"Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                        {
                            errorMessage ?
                                <ErrorMessage message={errorMessage} />
                                :
                                <></>
                        }
                        <Copyright sx={{ mt: 8, mb: 4 }} />
                    </Container>
                </ThemeProvider>
                {/* <h4>Log into Task App</h4>
                <div id="login-form">
                    <input type="text" id="login-username" placeholder="Enter your username" onChange={updateUsername} />
                    <br /><br />
                    <input type="password" id="login-password" placeholder="Enter your password" onChange={updatePassword} />
                    <br /><br />
                    <button id="login-button" onClick={login}>Login</button>
                </div> */}

            </>
    );
}

export default Login;