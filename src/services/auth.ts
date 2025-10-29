export const getToken = () => {
    const store = localStorage.getItem("authStore");
    if (!store) {
        return null;
    }
    const { state } = JSON.parse(store);
    return state.key;
};
