import { Navigate } from "react-router-dom";
import { User } from "../../models/user";

interface IRegisterProps{
    currentUser: User | undefined
}

function Register(props: IRegisterProps){

    return(
        props.currentUser? // condition to be evaluated, ie: if(user)
        // <p> Welcome {props.currentUser.username}! </p> // if true
        <Navigate to="/dashboard" />
        : // else
        <p>Register works</p>
    );
}

export default Register;