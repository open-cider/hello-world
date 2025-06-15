import { defineStore } from 'pinia'
import type { AuthData } from '@/utils/interfaces'

const __storeId = 'auth'

export const useAuthStore = defineStore(__storeId, {
    state: () => ({ data: { serviceKey: 'cidsvc:41e3f3a03010e6c804beb7b52fee6315a29ce01732e4176124b505d8235269b8e66d93595afa6bcf5530e65561544ec1919703aa6c1bbfa2298538eee07dcb5' } as AuthData }),
    getters: {
        isEmailNull: (state) => state.data.emailAddress.length === 0
    },
    actions: {
        addEmail(email: string): void {
            //TODO: email validation...
            this.data.emailAddress = email
        },
        addOtp(otp: string): void {
            this.data.otp = otp
        }
    }
})