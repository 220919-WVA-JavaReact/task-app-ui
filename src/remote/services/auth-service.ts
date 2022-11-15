import { User } from "../../models/user"
import { appClient } from "../app-client"

export const authenticate = async (credentials: { username: string, password: string }) => {
    return await appClient.post<User>('/auth', credentials, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}