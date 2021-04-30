export function logoutfunction () {
    localStorage.removeItem('dossier_session_token')
    localStorage.removeItem('session_user_id')
    window.location.reload()
}