import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { User } from "../../models/user";
import './Navbar.css';

interface INavbarProps {
    currentUser: User | undefined;
    setCurrentUser: (nextUser: User | undefined) => void
}

function Navbar(props: INavbarProps) {

    function logout() {
        console.log('logout invoked!');
        // fetch request to invalidate session

        props.setCurrentUser(undefined);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link className="link" color="inherit" to="/dashboard">
                            Task App
                        </Link>
                    </Typography>
                    {
                        props.currentUser ?
                            <>
                                <Button color="inherit"><Link className="link" color="inherit" to="/tasks">Tasks</Link></Button>
                                {
                                    props.currentUser.role == 'ADMIN' ?
                                        <>
                                            <Button color="inherit"><Link className="link" color="inherit" to="/userdash">Users</Link></Button>
                                        </>
                                        :
                                        <></>
                                }
                                <Button color="inherit" onClick={logout}>Logout</Button>
                            </>
                            :
                            <>
                                <Button color="inherit"><Link className="link" color="inherit" to="/login">Login</Link></Button>
                                <Button color="inherit"><Link className="link" color="inherit" to="/register">Register</Link></Button>
                            </>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;