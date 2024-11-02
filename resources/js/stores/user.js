// stores/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        token: null,
        userInfo: {},
        isLoggedIn: false,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
        getUserInfo: (state) => state.userInfo,
    },
    actions: {
        setToken(token) {
            this.token = token;
            this.isLoggedIn = true;
        },
        clearToken() {
            this.token = null;
            this.isLoggedIn = false;
            this.userInfo = {};
        },
        setUserInfo(userInfo) {
            this.userInfo = userInfo;
        },
        async fetchUserInfo() {
            try {
                // 在這裡調用你的 API 獲取用戶信息
                const response = await someApiService.getUserInfo(this.token);
                this.setUserInfo(response.data);
            } catch (error) {
                console.error('Failed to fetch user info:', error);
            }
        },
    },
});
