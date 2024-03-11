import { defineStore } from 'pinia'
import type { User } from '@/utils/interfaces'

const __storeId: string = 'user'

export const useUserStore = defineStore(__storeId, {
    state: () => ({ token: '', document: {} as User }),
    getters: {
        isAuthenticated: (state) => state.token.length > 0,
        isDocumentNull: (state)  => Object.keys(state.document).length === 0
    },
    actions: {
        add(arg: string | User) {
            if (typeof arg === 'string') {
                this.token = arg
            } else {
                this.document = arg
            }
        }
    }
})