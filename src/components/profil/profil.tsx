import React from 'react';
import jwt_decode from "jwt-decode";
const axios = require('axios');
const serverUrl=process.env.REACT_APP_SERVER_URL


export class Profile extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      userInfo: {}
    }
  }

  async getUserInfo(userId: Number) {
    const result:any = await axios(serverUrl + '/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': localStorage.getItem('dossier_session_token')
      },
      data: {userId}
    })
    return result.data;
  }


  async componentDidMount() {
    const token: any = localStorage.getItem('dossier_session_token')
    const decoded: any = jwt_decode(token);

    const userInfo: any = await this.getUserInfo(decoded.id);
    // @ts-ignore
    this.setState({ userInfo });
  }

  render () {
    // @ts-ignore
    const user = this.state.userInfo
    return (
      <div> Hei {user.first_name} {user.last_name}, velkommen til din profil</div>
    )
  }
}