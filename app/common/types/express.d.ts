
declare namespace Express {
    export interface User {
        id: string;
        role: string;
    }

    export interface Request {
        user?: User;
    }
}
