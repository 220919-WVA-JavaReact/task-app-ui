import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { User } from "../../models/user";

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
                        News
                    </Typography>
                    {
                        props.currentUser ?
                            <>
                                {
                                    props.currentUser.role == 'ADMIN' ?
                                        <>
                                            <Button color="inherit"><Link style={{ textDecoration: 'none', color: 'white' }} color="inherit" to="/userdash">Users</Link></Button>
                                            <Button color="inherit"><Link style={{ textDecoration: 'none', color: 'white' }} color="inherit" to="/dashboard">Dashboard</Link></Button>
                                        </>
                                        :
                                        <></>
                                }
                                <Button color="inherit" onClick={logout}>Logout</Button>
                            </>
                            :
                            <>
                                <Button color="inherit"><Link style={{ textDecoration: 'none', color: 'white' }} color="inherit" to="/login">Login</Link></Button>
                                <Button color="inherit"><Link style={{ textDecoration: 'none', color: 'white' }} color="inherit" to="/register">Register</Link></Button>
                            </>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    ); // TO DO: decouple CSS for Link
}

export default Navbar;