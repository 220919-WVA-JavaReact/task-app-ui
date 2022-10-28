import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../../models/user";
import Userdisplay from "../user/Userdisplay";

interface IUserdashProps {
    currentUser: User | undefined
}

function Userdash(props: IUserdashProps) {

    const [users, setUsers] = useState<User[]>([] as User[]); // <User[]> generic to define type of 'users' variable
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
            let res = await fetch('http://localhost:8080/task-app/users', {
                method: 'GET',
                credentials: 'include'
            }); // returns a promise of the response, await lets the promise resolve before we try to use it

            if (res.status != 200) {
                console.log('Could not retrieve users.');
            } else {
                setUsers(await res.json());
            }
        } catch (err) {
            // TODO: Make errorMessage component for reusability
            console.log('There was an error communicating with the API.');
        }

    }

    return (
        // only accessible for admin users
        props.currentUser?.role == "ADMIN" ?
            <>
                <p>User Dashboard:</p>
                <table>
                    <tr>
                        <th>id</th>
                        <th>username</th>
                        <th>role</th>
                    </tr>
                    {
                        // users.map( user => <Userdisplay id={user.id} username={user.username} role={user.role}/>)
                        users.map( user => <Userdisplay key={user.id} {...user} />) // key attribute helps react with rendering (preferably should be a unique identifier)
                    }
                </table>
            </>
            :
            <Navigate to="/login" />
    );
}

export default Userdash;