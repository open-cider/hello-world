export interface User 
{ 
    id: string,
    username: string, 
    avatar: string, 
    emailAddress: string
}

export interface SummaryData 
{
    metric0: string,
    metric1: number,
    metric2: number,
    metric3: number,
    metric4: number
}

/* http */
export interface AuthData 
{
    serviceKey: string,
    emailAddress: string,
    otp?: string
}