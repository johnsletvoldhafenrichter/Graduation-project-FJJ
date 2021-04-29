export function logoutfunction () {
    localStorage.removeItem('dossier_session_token')
    window.location.reload()
}