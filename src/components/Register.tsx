import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { AlertColor, Avatar, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { User } from "../models/user";
import { createUser } from '../remote/services/user-service';
import Message from "./Message";

interface IRegisterProps {
    currentUser: User | undefined
}

function Register(props: IRegisterProps) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>("error");
    const navigate = useNavigate();

    let updateUsername = (e: SyntheticEvent) => {
        setUsername((e.target as HTMLInputElement).value);
    }

    let updatePassword = (e: SyntheticEvent) => {
        setPassword((e.target as HTMLInputElement).value);
    }

    let updatePassword2 = (e: SyntheticEvent) => {
        setPassword2((e.target as HTMLInputElement).value);
    }

    let register = async () => {
        if (!username || !password || !password2) {
            setMessage('Please fill out all the required fields.');
        } else {
            if (password !== password2) {
                setMessage('Passwords do not match.');
            } else {
                let response = await createUser({ username, password });

                if (response.status === 201) {
                    setMessage('Register successful!');
                    setSeverity("success");
                    setTimeout(() => navigate('/login'), 2000);
                } else {
                    setMessage('Unable to register.');
                }
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
                    }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AppRegistrationIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register to Task App
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="Re-enter password"
                            type="password"
                            id="password2"
                            onChange={updatePassword2}
                        />
                        <Button
                            onClick={register}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/login">
                                    {"Login"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {
                    message ?
                        <Message message={message} severity={severity!} />
                        :
                        <></>
                }
            </Container>
    );
}

export default Register;