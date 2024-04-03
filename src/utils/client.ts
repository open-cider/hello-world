import axios from 'axios';
import type { SummaryData, User } from './interfaces';
import { useUserStore } from '@/stores/user';
import { useAuthStore } from '@/stores/auth';


const client = axios.create({
    baseURL: 'https://api.opencider.com/user/'
})


/**
 * initialize client auth request for user.
 * @param email - email address of user in question.
 * @returns - a promise of whether the request is successful or not.
*/
export async function initializeAuth(email: string): Promise<boolean> {
    const store = useAuthStore()
    store.addEmail(email)

    const res = await client.post('/auth/request', store.data)
    return res.status == 202
}

/**
 * complete client auth request by providing otp and storing the token on successful response.
 * @param otp - otp provided in the email
 * @returns - a promise of whether the request is successful or not.
*/
export async function completeAuth(otp: string): Promise<boolean> {
    const store = useAuthStore()
    store.addOtp(otp)

    if (store.isEmailNull) {
        return Promise.resolve(false)
    } else {
        const res       = await client.post('/auth/validate', store.data)
        const isSuccess = res.status == 200
        if (isSuccess) {
            const store = useUserStore()
            store.add(res.data.response)

            await fetchDetails()
            await updateSummaryData()
        }

        return isSuccess
    }
}


/**
 * getting summary data for user which contains all previously stored metric data.
 * @returns - a promise containing the summary data.
*/
export async function getSummaryData(): Promise<SummaryData> {
    const store = useUserStore()
    if (!store.isAuthenticated) {
        return Promise.reject('Cannot fetch details for unauthenticated user')
    } else {
        const res = await client.get(`/query/summary-data?token=${store.$state.token}`)
        const data: SummaryData = res.data.response 
        return data
    }
}

/**
 * increments relevant metric data alias on the summary data api.
 * @returns - an empty promise response.
*/
async function updateSummaryData(): Promise<void> {
    const store = useUserStore()
    if (!store.isAuthenticated) {
        return Promise.reject('Cannot update summary data for unauthenticated user')
    } else {
        await client.post('/query/summary-data', {
            token: store.$state.token,
            metric0: 'Shared settings here...',
            metric1: 1,
            metric2: 15,
            metric3: 0,
            metric4: 0,
            incrBy: true
        })
    }
}


/**
 * fetching the user document which contains username, document, and avatar
 * @returns - a promise containing the user document.
*/
export async function fetchDetails(): Promise<User> {
    const store = useUserStore()

    if (!store.isAuthenticated) {
        return Promise.reject('Cannot fetch details for unauthenticated user')
    } else {
        if (!store.isDocumentNull) {
            return Promise.resolve(store.document)
        } else {
            const res = await client.get(`/query/document?token=${store.$state.token}`)
            const document: User = res.data.response
            store.add(document)
            return document
        }
    }
}