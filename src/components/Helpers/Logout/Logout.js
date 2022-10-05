export const Logout = () => {
    sessionStorage.clear()
    localStorage.clear()
    window.location.reload(true)
}