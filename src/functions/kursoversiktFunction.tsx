const axios = require('axios');
const serverUrl = process.env.REACT_APP_SERVER_URL;

export async function getAllCourses() {
  const result: any = await axios(serverUrl + '/courses', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': localStorage.getItem('dossier_session_token')
    }
  })
  return result.data;
}