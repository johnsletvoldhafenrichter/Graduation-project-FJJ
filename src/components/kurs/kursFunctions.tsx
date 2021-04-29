const axios = require('axios');
const serverUrl = process.env.REACT_APP_SERVER_URL;

export async function getCourseById(courseId: Number) {
  const result: any = await axios(serverUrl + '/course', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': localStorage.getItem('dossier_session_token')
    },
    data: {courseId}
  })
  return result;
}