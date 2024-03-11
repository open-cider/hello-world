export interface User 
{ 
    id: string,
    username: string, 
    avatar: string, 
    emailAddress: string
}

/* http */
export interface AuthData 
{
    serviceKey: string,
    emailAddress: string,
    otp?: string
}