import AddTaskIcon from '@mui/icons-material/AddTask';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { User } from "../models/user";
import './Navbar.css';

interface INavbarProps {
    currentUser: User | undefined;
    setCurrentUser: (nextUser: User | undefined) => void
}

function Navbar(props: INavbarProps) {

    function logout() {
        sessionStorage.clear();
        props.setCurrentUser(undefined);
    }

    return (
        <AppBar position="relative">
            <Toolbar>
                <Link className="link" to="/dashboard" >
                    <AddTaskIcon sx={{
                    mr: 2
                }} />
                </Link>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Task App
                </Typography>
                {
                    props.currentUser ?
                        <>
                            <Button ><Link className="link" to="/tasks">Tasks</Link></Button>
                            {
                                props.currentUser.role == 'ADMIN' ?
                                    <>
                                        <Button ><Link className="link" to="/userdash">Users</Link></Button>
                                    </>
                                    :
                                    <></>
                            }
                            <Button onClick={logout}>
                                <Avatar sx={{ m: 1, bgcolor: 'inherit' }}>
                                    <ExitToAppIcon />
                                </Avatar>
                            </Button>
                        </>
                        :
                        <>
                            <Button color="inherit"><Link className="link" color="inherit" to="/login">Login</Link></Button>
                            <Button color="inherit"><Link className="link" color="inherit" to="/register">Register</Link></Button>
                        </>
                }
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;