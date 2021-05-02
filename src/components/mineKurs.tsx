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
    const result: any = await axios(serverUrl + '/mycourses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': localStorage.getItem('dossier_session_token')
      },
      data: {userId}
    })
    return result.data;
  };

  async componentDidMount() {
    try {
      const userId:any = localStorage.getItem('session_user_id');
      const myStartedCourses = await this.getStartedCourses(userId);
      if (!myStartedCourses) {
        this.setState({
          error: 'Could not find courses!'
        })
        return;
      }
      this.setState({myStartedCourses});

      console.log(myStartedCourses);
    } catch (error) {
      this.setState({
        error: 'Component did not mount!'
      })
      return;
    }
  }

  render() {

    // @ts-ignore
    const {myStartedCourses} = this.state;


    return(

      <div>
        Her kommer alle de kule kursene dine!
      </div>
    );
  }

}