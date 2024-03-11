import axios from 'axios';
import type { User } from './interfaces';
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
        }

        return isSuccess
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