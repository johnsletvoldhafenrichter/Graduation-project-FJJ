import React from "react";


const axios = require('axios');
const serverUrl = process.env.REACT_APP_SERVER_URL;

export class MineKurs extends React.Component{
  constructor(props: any) {
    super(props);
    this.state = {
      myStartedCourses: [],
      error: null
    }
  };

  //mycourses-endepunktet gir en 404, men funksjonen går gjennom med /courses som endepunkt.
  // /mycourses skal console.log som første operasjon, men nei... wtf??

  async getStartedCourses(userId: Number) {
    console.log('function working');      // kommer i konsollen
    const result: any = await axios(serverUrl + '/mycourses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': localStorage.getItem('dossier_session_token')
      },
      data: {userId}
    })
    console.log('end of function');  // kommer ikke i konsollen
    return result.data;
  };

  async componentDidMount() {
    const userId:any = localStorage.getItem('session_user_id');

    const myStartedCourses = await this.getStartedCourses(userId);
    console.log(myStartedCourses);
    this.setState({myStartedCourses});

    console.log(myStartedCourses);
  }

  render() {

    // @ts-ignore
    const {myStartedCourses} = this.state;
    // console.trace(myStartedCourses);


    return(
      <div>
        Her kommer alle de kule kursene dine!
      </div>
    );
  }

}