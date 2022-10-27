import { SyntheticEvent, useState } from "react";

function Login() {

    // let username = '';
    // let password = '';
    // let errorMessage ='Hello';

    // Destructuring assignment
    // destructuring assignment sets username = first element of useState arr and setUsername = second element of useState arr
    const [username, setUsername] = useState(''); // initial value
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    let updateUsername = (e: SyntheticEvent) =>{
        // username = (e.target as HTMLInputElement).value;
        setUsername((e.target as HTMLInputElement).value);
        console.log(`Username is ${username}`);
    }

    let updatePassword = (e: SyntheticEvent) =>{
        setPassword((e.target as HTMLInputElement).value);
        console.log(`Password is ${password}`);
    }

    let login = (e: SyntheticEvent) => {
        console.log(`Username is: ${username}, password is ${password}`);
        if(!username || !password){
            setErrorMessage('You must have valid username and password.');
        } else {
            setErrorMessage('');
        }
    }

    return (
        <>
            <h4>Log into Task App</h4>
            <div id="login-form">
                <input type="text" id="login-username" placeholder="Enter your username" onChange={updateUsername}/>
                <br /><br />
                <input type="password" id="login-password" placeholder="Enter your password" onChange={updatePassword}/>
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