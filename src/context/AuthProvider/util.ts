import { Api } from "../../services/api";
import { IUser } from "./types";

export function setUserLocalStorage (user: IUser | null) {
    localStorage.setItem("u", JSON.stringify(user));
}

export function getUserLocalStorage () {
    const json = localStorage.getItem("u");

    if(!json) {
        return null;
    }

    const user = JSON.parse(json);

    return user ?? null;
}

export async function LoginRequest (email: string, password: string) {
    try {
        const request = await Api.post("login/", {email, password}, {headers: {
            'Accept': 'application/json;version=v1_web',
            'Content-Type': 'application/json',
        }});

        return request.data;
    } catch (error) {
        return null;
    }
}

export async function ProfileRequest (access_token: string) {
    try {
        const request = await Api.get("profile/", {headers: {
            'Authorization': `Bearer ${access_token}`,
            'Accept': 'application/json;version=v1_web',
            'Content-Type': 'application/json',
        },});

        return request.data;
    } catch (error) {
        return null;
    }
}