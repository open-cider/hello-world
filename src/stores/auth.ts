import { defineStore } from 'pinia'
import type { AuthData } from '@/utils/interfaces'

const __storeId = 'auth'

export const useAuthStore = defineStore(__storeId, {
    state: () => ({ data: { serviceKey: 'provide-service-key-here' } as AuthData }),
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