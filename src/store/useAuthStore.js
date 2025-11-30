import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),

    login: (email, password) => {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Mock validation (accept any email/password for now, or specific ones)
                if (email && password) {
                    const user = {
                        id: '1',
                        name: 'Test User',
                        email,
                        role: email.includes('admin') ? 'admin' : 'user'
                    };
                    localStorage.setItem('user', JSON.stringify(user));
                    set({ user, isAuthenticated: true });
                    resolve(user);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1000);
        });
    },

    signup: (name, email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password && name) {
                    const user = { id: Date.now().toString(), name, email, role: 'user' };
                    localStorage.setItem('user', JSON.stringify(user));
                    set({ user, isAuthenticated: true });
                    resolve(user);
                } else {
                    reject(new Error('Please fill all fields'));
                }
            }, 1000);
        });
    },

    logout: () => {
        localStorage.removeItem('user');
        set({ user: null, isAuthenticated: false });
    }
}));

export default useAuthStore;
