export interface IUser {
    email?: string;
    token?: string;
}

export interface IContext extends IUser {
    authenticate: (email: string, password: string) => Promise<void>
    getProfile: (access_token: string) => Promise<any>
    logout: () => void;
}

export interface IAuthProvider {
    children: JSX.Element;
}