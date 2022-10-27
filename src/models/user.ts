import { Role } from "./role";

// Could have any of those, don't need all of them

export interface IUser {
    id: number;
    username: string;
    role: Role;
}

export type UserType = {
    id: number;
    username: string;
    role: Role;
}

export class User{
    id: number;
    username: string;
    role: Role;

    constructor(id: number, username: string, role:Role){
        this.id = id;
        this.username = username;
        this.role = role;
    }
}