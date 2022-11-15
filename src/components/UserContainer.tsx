import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../models/user";
import Message from "./Message";

interface IUserContainerProps {
    currentUser: User | undefined
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'role', headerName: 'Role', width: 200 }
];

function UserContainer(props: IUserContainerProps) {

    const [users, setUsers] = useState<User[]>([] as User[]);
    const [message, setErrorMessage] = useState('');


    // Higher order function: function that takes function(s) as parameter(s) or return a function
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        fetchUsers();
        return function () {
        };
    }, []); // with one argument useEffect hook triggers on state change, if a second arg is provided, effect will only activate if the values in the list change. 

    async function fetchUsers() {
        try {
            let res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
                method: 'GET',
                headers: {
                    'Authorization': `${sessionStorage.getItem('token')}`
                }
            }); // returns a promise of the response, await lets the promise resolve before we try to use it

            if (res.status !== 200) {
                setErrorMessage('Could not retrieve users.');
            } else {
                setUsers(await res.json());
            }
        } catch (err) {
            setErrorMessage('There was an error communicating with the API.');
        }

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
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1, margin: 2 }}>User Registry:</Typography>
                                <div style={{ height: 400, width: '75%' }}>
                                    <DataGrid
                                        rows={users}
                                        columns={columns}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                    />
                                </div>
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