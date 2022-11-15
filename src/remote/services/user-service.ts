import { User } from "../../models/user";
import { appClient } from "../app-client";
import { authAppClient } from "../authenticated-app-client"

export const createUser = async (credentials: { username: string, password: string }) => {
    return await appClient.post<User>('/users', credentials, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const getUsers = async () => {
    return await authAppClient.get<User[]>('/users');
}