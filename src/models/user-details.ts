import { Role } from "./role";

export class UserDetails {
    id: string;
    username: string;
    role: Role;
    managerUsername: string;
    managerId: string;

    constructor(id: string, username: string, role: Role, manager: string, managerId: string) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.managerUsername = manager;
        this.managerId = managerId;
    }
}