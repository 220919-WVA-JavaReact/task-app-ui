import { Typography, createTheme, Avatar, Box, Button, Container, CssBaseline, Grid, TextField, ThemeProvider, AlertColor } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { User } from "../../models/user";
import Message from "../message/Message";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SyntheticEvent, useState } from "react";

interface IRegisterProps {
    currentUser: User | undefined
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
        if(!username || !password || !password2){
            setMessage('Please fill out all the required fields.');
        } else{
            if(password !== password2){
                setMessage('Passwords do not match.');
            }else {
                let response = await fetch('http://ec2-44-202-4-207.compute-1.amazonaws.com:8080/users',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username, password})
                });

                if(response.status == 201){
                    setMessage('Register successful!');
                    setSeverity("success");
                    setTimeout(() => navigate('/login'), 2000);
                } else{
                    setMessage('Unable to register.');
                }
            }
        }
    }

    return (
        props.currentUser ?
            <Navigate to="/dashboard" />
            :
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
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
    );
}

export default Register;