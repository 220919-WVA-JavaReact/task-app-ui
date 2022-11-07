import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button, Grid, createTheme, AlertColor } from "@mui/material";
import { Navigate, Link } from "react-router-dom";
import { User } from "../../models/user";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from "react";
import Message from "../message/Message";


interface IProfileProps {
    currentUser: User | undefined,
    setCurrentUser: (newUser: User) => void
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

export default function Profile(props: IProfileProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>("error");

    return (
        props.currentUser ?
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
                            Profile Information
                        </Typography>
                        <Typography component="h1" variant="h5">
                            Username: {props.currentUser.username}
                        </Typography>
                        <Typography component="h2" variant="h5">
                            Role: {props.currentUser.role}
                        </Typography>
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
            :
            <Navigate to="/login" />
    );
}