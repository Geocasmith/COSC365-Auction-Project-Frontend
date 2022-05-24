import create from 'zustand';
interface tokenState {
    //defining functions
    token: Token|null;
    setToken: (token: Token) => void;
    removeToken: () => void;
}
const getLocalStorage = (key: string): Token|null =>
    JSON.parse(window.localStorage.getItem(key) as string);

const setLocalStorage = (key: string, value:Token|null) =>
    window.localStorage.setItem(key, JSON.stringify(value));

const useStore = create<tokenState>((set) => ({
    token: getLocalStorage('User') || null,

    setToken: (token: Token) => set(() => {
        setLocalStorage('User', token);
        return {token: token}
    }),

    removeToken: () => set((state) => {
        setLocalStorage('User', null)
        return {token: null}
    })

}))
export const useTokenStore = useStore;
