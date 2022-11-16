import { User } from "../../models/user";
import { UserDetails } from "../../models/user-details";
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
    return await authAppClient.get<UserDetails[]>('/users');
}

export const getManagers = async() => {
    return await authAppClient.get<UserDetails[]>('/users?role=MANAGER');
}

export const assignManager = async(userId: string, managerId: string) => {
    return await authAppClient.patch<UserDetails>(`/users/${userId}/manager/${managerId}`);
}