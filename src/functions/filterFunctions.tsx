const axios = require('axios');
const serverUrl = process.env.REACT_APP_SERVER_URL;

export async function getFilteredCourses(filter:string, path:string){
    let url = serverUrl + '/filter'
    let user_id = localStorage.getItem('session_user_id')
    const result: any = await axios(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('dossier_session_token')
        },
        data: {
            path: path,
            filter: filter,
            user_id: user_id

        }
    })
    return result.data;
}

export async function getQueryResult(activeTab: string, selectedTags: [], path:string) {
    let url = serverUrl + '/filterquery'
    let user_id = localStorage.getItem('session_user_id')
    const result: any = await axios(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('dossier_session_token')
        },
        data: {
            path,
            user_id,
            activeTab,
            selectedTags
        }
    })
    return result.data;
}