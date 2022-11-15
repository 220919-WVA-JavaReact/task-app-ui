import { Role } from "../models/role";

interface IUserdisplayProps{
    role: Role
    id: number,
    username: string,
}

function Userdisplay(props: IUserdisplayProps){

    return(
        <tr>
            <td>{props.id}</td>
            <td>{props.username}</td>
            <td>{props.role}</td>
        </tr>
    );
}

export default Userdisplay;