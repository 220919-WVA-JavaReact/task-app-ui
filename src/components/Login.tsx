import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import { User } from "../models/user";
import { authenticate } from '../remote/services/auth-service';
import Message from "./Message";


interface ILoginProps {
    currentUser: User | undefined,
    setCurrentUser: (nextUser: User) => void
}

function Login(props: ILoginProps) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


    let updateUsername = (e: SyntheticEvent) => {
        setUsername((e.target as HTMLInputElement).value);
    }

    let updatePassword = (e: SyntheticEvent) => {
        setPassword((e.target as HTMLInputElement).value);
    }

    let login = async (e: SyntheticEvent) => {

        if (!username || !password) {
            setMessage('You must have valid username and password.');
        } else {
            setMessage('');
            try {

                let response = await authenticate({ username, password });

                if (response.status == 200) {
                    // axios recognizes the headers as lowercase
                    let token = response.headers['authorization'];
                    if (token) {
                        sessionStorage.setItem('token', token);
                    }
                    props.setCurrentUser(response.data);
                } else {
                    setMessage('Could not validate the provided credentials');
                }
            } catch (err) {
                setMessage('Unable to communicate with the API.');
            }
        }
    }

    return (
        props.currentUser ?
            <Navigate to="/dashboard" />
            :
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        pt: 10,
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
                                    Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {
                    message ?
                        <Message message={message} severity="error" />
                        :
                        <></>
                }
            </Container>
    );
}

export default Login;