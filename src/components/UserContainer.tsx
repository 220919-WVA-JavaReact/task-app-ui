import { Box, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { SyntheticEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../models/user";
import { UserDetails } from "../models/user-details";
import { getManagers, getUsers } from "../remote/services/user-service";
import Message from "./Message";

interface IUserContainerProps {
    currentUser: User | undefined
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'role', headerName: 'Role', width: 200 },
    { field: 'managerUsername', headerName: 'Manager', width: 200 }
];

function UserContainer(props: IUserContainerProps) {

    const [managers, setManagers] = useState<UserDetails[]>([] as UserDetails[]);
    const [users, setUsers] = useState<UserDetails[]>([] as UserDetails[]);
    const [message, setErrorMessage] = useState('');


    // Higher order function: function that takes function(s) as parameter(s) or return a function
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        fetchUsers();
        console.log(sessionStorage.getItem('token'));
        fetchManagers();
        return function () {
        };
    }, []); // with one argument useEffect hook triggers on state change, if a second arg is provided, effect will only activate if the values in the list change. 

    async function fetchUsers() {
        try {
            let res = await getUsers();
            if (res.status !== 200) {
                setErrorMessage('Could not retrieve users.');
            } else {
                setUsers(res.data);
            }
        } catch (err) {
            setErrorMessage('There was an error communicating with the API.');
        }
    }

    async function fetchManagers() {
        try {
            let res = await getManagers();
            if (res.status !== 200) {
                setErrorMessage('Could not retrieve managers.');
            } else {
                setManagers(res.data);
            }
        } catch (err) {
            setErrorMessage('There was an error communicating with the API.');
        }
    }

    let handleChange = (id: string, e: SelectChangeEvent) => {
        console.log((e.target as HTMLInputElement).value);
        console.log(id);
        // console.log((e.target as HTMLInputElement).parentElement.)
    }

    return (
        // only accessible for admin users
        props.currentUser?.role === "ADMIN" ?
            <>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    my: 1 / 2
                }}>

                    {
                        users ?
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
                                                    <TableCell align="center"><FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">{user.role === 'ADMIN' ? 'N/A' : 'Manager'}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            defaultValue={user.managerUsername ? user.managerUsername : ''}
                                                            disabled={user.role === 'ADMIN'}
                                                            variant="standard"
                                                            onChange={(e) => handleChange(user.id, e)}>
                                                            {
                                                                managers.filter((manager) => manager.id !== user.id).map((manager) => (
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
                            <Message message={message} severity="error" />
                    }
                </Box>
            </>
            :
            <Navigate to="/login" />
    );
}

export default UserContainer;