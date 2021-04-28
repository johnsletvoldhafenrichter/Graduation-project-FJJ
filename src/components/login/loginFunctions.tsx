const axios = require('axios');
const serverUrl=process.env.REACT_APP_SERVER_URL

export async function requestSessionToken (userName: string, password: string){
  return axios.post(serverUrl + '/session', {
    userName: userName,
    password: password
  })
      .then(function (response: any) {
        console.log(response);
      })
      .catch(function (error: any) {
        console.log(error);
      });
}