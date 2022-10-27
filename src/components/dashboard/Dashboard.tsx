import { User } from "../../models/user";

interface IDashboard{
    currentUser: User | undefined
}

function Dashboard(props: IDashboard){
    return (
        <p>Welcome {props.currentUser?.username}!</p>
    );
}
export default Dashboard;