import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../../models/user";
import Message from "../message/Message";
import Userdisplay from "../user/Userdisplay";

interface IUserdashProps {
    currentUser: User | undefined
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'role', headerName: 'Role', width: 200 }
];

function Userdash(props: IUserdashProps) {

    const [users, setUsers] = useState<User[]>([] as User[]); // <User[]> generic to define type of 'users' variable
    const [message, setErrorMessage] = useState('');
    // default value to be an empty array as an empty user array


    // Higher order function: function that takes function(s) as parameter(s) or return a function
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // console.log('Use effect triggered.');
        fetchUsers();
        return function () {
            console.log('Use effect cleanup (unmounting component)');
        };
    }, []); // with one argument useEffect hook triggers on state change, if a second arg is provided, effect will only activate if the values in the list change. 

    async function fetchUsers() {
        try {
            let res = await fetch('http://localhost:8080/users', {
                method: 'GET',
                headers: {
                    'Authorization': `${sessionStorage.getItem('token')}`
                }
            }); // returns a promise of the response, await lets the promise resolve before we try to use it

            if (res.status != 200) {
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
        props.currentUser?.role == "ADMIN" ?
            <>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>

                    {
                        users ?
                            <>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1, margin: 2 }}>User Registry:</Typography>
                                {/* <table>
                                <tr>
                                    <th>id</th>
                                    <th>username</th>
                                    <th>role</th>
                                </tr>
                                {
                                    // users.map( user => <Userdisplay id={user.id} username={user.username} role={user.role}/>)
                                    users.map(user => <Userdisplay key={user.id} {...user} />) // key attribute helps react with rendering (preferably should be a unique identifier)
                                }
                            </table> */}
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
                            <Message message={message} severity="error"/>
                    }
                </Box>
            </>
            :
            <Navigate to="/login" />
    );
}

export default Userdash;