import { SyntheticEvent, useState } from "react";
import { User } from "../../models/user";
import { Navigate } from 'react-router-dom';

interface ILoginProps{
    currentUser: User | undefined,
    setCurrentUser: (nextUser: User) => void
}

function Login(props: ILoginProps) {

    // let username = '';
    // let password = '';
    // let errorMessage ='Hello';

    // Destructuring assignment
    // destructuring assignment sets username = first element of useState arr and setUsername = second element of useState arr
    const [username, setUsername] = useState(''); // initial value
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    let updateUsername = (e: SyntheticEvent) => {
        // username = (e.target as HTMLInputElement).value;
        setUsername((e.target as HTMLInputElement).value);
        // console.log(`Username is ${username}`);
    }

    let updatePassword = (e: SyntheticEvent) => {
        setPassword((e.target as HTMLInputElement).value);
        // console.log(`Password is ${password}`);
    }

    // SyntheticEvents are wrapper around DOM event
    let login = async (e: SyntheticEvent) => {
        // console.log(`Username is: ${username}, password is ${password}`);

        if (!username || !password) {
            setErrorMessage('You must have valid username and password.');
        } else {
            setErrorMessage('');
            try {
                let response = await fetch('http://localhost:8080/task-app/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'JSON'
                    },
                    credentials: 'include', // property to work with Java HTTP Sessions
                    body: JSON.stringify({ username, password })
                });

                if (response.status == 200) {
                    props.setCurrentUser(await response.json());
                } else {
                    setErrorMessage('Could not validate the provided credentials');
                }
            } catch (err) {
                setErrorMessage('Unable to communicate with the API.');
            }
        }
    }

    return (
        props.currentUser? // condition to be evaluated, ie: if(user)
        // <p> Welcome {props.currentUser.username}! </p> // if true
        <Navigate to="/dashboard" />
        : // else
        <>
            <h4>Log into Task App</h4>
            <div id="login-form">
                <input type="text" id="login-username" placeholder="Enter your username" onChange={updateUsername} />
                <br /><br />
                <input type="password" id="login-password" placeholder="Enter your password" onChange={updatePassword} />
                <br /><br />
                <button id="login-button" onClick={login}>Login</button>
            </div>
            <div>
                <p>{errorMessage}</p>
            </div>
        </>
    );
}

export default Login;