import { AlertColor, Box, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../models/user";
import { UserDetails } from "../models/user-details";
import { assignManager, getManagers, getUsers } from "../remote/services/user-service";
import SnackbarNotification from "./SnackbarNotification";

interface IUserContainerProps {
    currentUser: User | undefined
}

function UserContainer(props: IUserContainerProps) {

    const [managers, setManagers] = useState<UserDetails[]>([] as UserDetails[]);
    const [users, setUsers] = useState<UserDetails[]>([] as UserDetails[]);
    const [message, setErrorMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>('error');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchManagers();
        fetchUsers();
        return function () {
        };
    }, []);

    async function fetchUsers() {
        try {
            let res = await getUsers();
            if (res.status !== 200) {
                snackbar("error", 'Error retrieving users.');
            } else {
                setUsers(res.data);
            }
        } catch (err) {
            snackbar("error", 'Error communicating with the API.');
        }
    }

    async function fetchManagers() {
        try {
            let res = await getManagers();
            if (res.status !== 200) {
                snackbar("error", 'Error retrieving managers.');
            } else {
                setManagers(res.data);
            }
        } catch (err) {
            snackbar("error", 'Error communicating with the API.');
        }
    }

    let handleChange = async (userId: string, e: SelectChangeEvent) => {
        let managerId = (e.target as HTMLInputElement).value;
        try {
            let res = await assignManager(userId, managerId);
            if (res.status !== 200) {
                snackbar("error", 'Unable to assign manager.');
            } else {
                let updatedUser = res.data;
                const newUsers = users.map((user) => {
                    if (user.id === updatedUser.id) {
                        return updatedUser;
                    } else {
                        return user;
                    }
                });
                setUsers(newUsers);
                snackbar("success", 'Manager succesfully assigned.');

            }
        } catch (err) {
            snackbar("error", 'Error communicating with the API.');
        }
    }

    const snackbar = (severity: AlertColor, message: string) => {
        setErrorMessage(message);
        setSeverity(severity);
        setOpen(true);
        setTimeout(() => setOpen(false), 4000);
    };

    return (
        props.currentUser?.role === "ADMIN" ?
            <>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    my: 1 / 2
                }}>

                    {users ?
                        <>
                            <Typography variant="h5" sx={{ pt: 4, pb: 3 }} gutterBottom>User Registry:</Typography>
                            <TableContainer component={Paper} sx={{ width: '66%' }}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" variant="head">Username</TableCell>
                                            <TableCell align="center" variant="head">Role</TableCell>
                                            <TableCell align="center" variant="head">Manager</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell align="center">{user.username}</TableCell>
                                                <TableCell align="center">{user.role}</TableCell>
                                                <TableCell align="center">
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">{user.role === 'ADMIN' ? 'N/A' : 'Manager'}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={user.managerId ? user.managerId : ''}
                                                            disabled={user.role === 'ADMIN'}
                                                            variant="standard"
                                                            onChange={(e) => handleChange(user.id, e)}>
                                                            {
                                                                managers
                                                                    .filter((manager) => manager.id !== user.id)
                                                                    .map((manager) => (
                                                                        <MenuItem key={manager.id} value={manager.id}>{manager.username}</MenuItem>
                                                                    ))
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                        :
                        <></>
                    }
                    <SnackbarNotification message={message} severity={severity} open={open} />
                </Box>
            </>
            :
            <Navigate to="/login" />
    );
}

export default UserContainer;