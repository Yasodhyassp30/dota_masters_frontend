export interface User {
    username:string;
    email:string;
    id:string;
    token:string;
}
export interface userReturn{
    message:string;
    user:{
        username:string;
        _id:string;
        email:string;
        token:string;

    };
}