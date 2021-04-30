const axios = require('axios');
const serverUrl=process.env.REACT_APP_SERVER_URL

export async function requestSessionToken (userName: string, password: string){
  return axios.post(serverUrl + '/session', {
    userName: userName,
    password: password
  })
      .then(function (response: any) {
        return response.data;
      })
      .catch(function (error: any) {
          const error_obj = {
              error: error
          }
        return error_obj;
      });
}

export function checkSession() {
  return axios(`${serverUrl}/authenticate`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': localStorage.getItem('dossier_session_token')
    }
  })
    .then((res: any) => res.status === 200);
}

