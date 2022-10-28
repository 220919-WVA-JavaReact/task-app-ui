import { Navigate } from "react-router-dom";
import { User } from "../../models/user";

interface IDashboard{
    currentUser: User | undefined
}

function Dashboard(props: IDashboard){
    return (
        props.currentUser?
        <p>Welcome {props.currentUser?.username}!</p>
        :
        <Navigate to="/login" />
    );
}
export default Dashboard;