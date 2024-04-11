export const ValidUser = () => {
    if (localStorage.getItem('accessToken') !== null || localStorage.getItem('accessToken') !== undefined || localStorage.getItem('accessToken') !== ''){
        return true;
    }
    return false;
}